/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Contact Form API Route
 * Handles contact form submissions with validation, storage, and notifications
 * Production-ready serverless endpoint
 *
 * POST /api/contact
 * Body: { name: string, email: string, message: string }
 */

import { NextRequest, NextResponse } from "next/server";

import { sendNotificationEmail } from "@/lib/email";
import {
  ContactFormPayload,
  ContactMessage,
  ApiResponse,
  ValidationError,
} from "@/types/contact";
import { getContactCollection } from "@/lib/mongodb";

/**
 * Configure CORS and other headers
 */
const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGINS || "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/**
 * Handle OPTIONS requests for CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

/**
 * Validation rules for contact form
 */
const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 255,
  },
  message: {
    minLength: 10,
    maxLength: 5000,
  },
};

/**
 * Sanitize and trim input
 */
function sanitizeInput(
  value: string,
  fieldName: "name" | "email" | "message",
): string {
  const maxLength = VALIDATION_RULES[fieldName]?.maxLength || 5000;
  return value.trim().slice(0, maxLength);
}

/**
 * Validate contact form payload
 */
function validatePayload(data: unknown): {
  valid: boolean;
  errors?: ValidationError[];
  data?: ContactFormPayload;
} {
  // Type check
  if (typeof data !== "object" || data === null) {
    return {
      valid: false,
      errors: [
        { field: "body", message: "Request body must be a JSON object" },
      ],
    };
  }

  const payload = data as Record<string, unknown>;
  const errors: ValidationError[] = [];

  // Validate name
  if (!payload.name || typeof payload.name !== "string") {
    errors.push({
      field: "name",
      message: "Name is required and must be a string",
    });
  } else if (payload.name.length < VALIDATION_RULES.name.minLength) {
    errors.push({
      field: "name",
      message: `Name must be at least ${VALIDATION_RULES.name.minLength} characters`,
    });
  } else if (payload.name.length > VALIDATION_RULES.name.maxLength) {
    errors.push({
      field: "name",
      message: `Name must not exceed ${VALIDATION_RULES.name.maxLength} characters`,
    });
  } else if (!VALIDATION_RULES.name.pattern.test(payload.name)) {
    errors.push({
      field: "name",
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    });
  }

  // Validate email
  if (!payload.email || typeof payload.email !== "string") {
    errors.push({
      field: "email",
      message: "Email is required and must be a string",
    });
  } else if (!VALIDATION_RULES.email.pattern.test(payload.email)) {
    errors.push({
      field: "email",
      message: "Please provide a valid email address",
    });
  } else if (payload.email.length > VALIDATION_RULES.email.maxLength) {
    errors.push({
      field: "email",
      message: `Email must not exceed ${VALIDATION_RULES.email.maxLength} characters`,
    });
  }

  // Validate message
  if (!payload.message || typeof payload.message !== "string") {
    errors.push({
      field: "message",
      message: "Message is required and must be a string",
    });
  } else if (payload.message.length < VALIDATION_RULES.message.minLength) {
    errors.push({
      field: "message",
      message: `Message must be at least ${VALIDATION_RULES.message.minLength} characters`,
    });
  } else if (payload.message.length > VALIDATION_RULES.message.maxLength) {
    errors.push({
      field: "message",
      message: `Message must not exceed ${VALIDATION_RULES.message.maxLength} characters`,
    });
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      name: sanitizeInput(payload.name as string, "name"),
      email: (payload.email as string).toLowerCase().trim(),
      message: sanitizeInput(payload.message as string, "message"),
    },
  };
}

/**
 * Rate limiting (simple in-memory counter)
 * For production, use Redis or a dedicated rate-limiting service
 */
const requestCache = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(
  clientIp: string,
  maxRequests: number = 5,
  windowSeconds: number = 3600,
): boolean {
  const now = Date.now();
  const cached = requestCache.get(clientIp);

  if (cached && now < cached.resetTime) {
    if (cached.count >= maxRequests) {
      return false; // Rate limit exceeded
    }
    cached.count++;
  } else {
    requestCache.set(clientIp, {
      count: 1,
      resetTime: now + windowSeconds * 1000,
    });
  }

  return true; // Rate limit OK
}

/**
 * Get client IP for rate limiting
 */
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Main POST handler for contact form submission
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        { status: 429, headers: corsHeaders },
      );
    }

    // Parse request body
    let payload: unknown;
    try {
      payload = await request.json();
    } catch (error) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Invalid JSON in request body",
        },
        { status: 400, headers: corsHeaders },
      );
    }

    // Validate payload
    const validation = validatePayload(payload);
    if (!validation.valid) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Validation failed",
          data: validation.errors as never,
        },
        { status: 400, headers: corsHeaders },
      );
    }

    // Create contact message document (without _id for insertion)
    const contactMessage: Omit<ContactMessage, "_id"> = {
      name: validation.data!.name,
      email: validation.data!.email,
      message: validation.data!.message,
      createdAt: new Date(),
      status: "new",
    };

    // Store message in MongoDB
    const collection = await getContactCollection();
    const result = await collection.insertOne(contactMessage);

    if (!result.insertedId) {
      throw new Error("Failed to insert message into database");
    }

    console.log(`Message stored successfully with ID: ${result.insertedId}`);

    // Send notification email (fire and forget)
    // Email failure should not block the response
    sendNotificationEmail({
      ...contactMessage,
      _id: result.insertedId.toString(),
    }).catch((error) => {
      console.error("Background email sending failed:", error);
      // Optionally send to error tracking service (Sentry, etc.)
    });

    // Return success response
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Message sent successfully. We'll get back to you soon!",
        data: {
          id: result.insertedId.toString(),
        } as any,
      },
      { status: 201, headers: corsHeaders },
    );
  } catch (error) {
    // Log error with full details for debugging
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "";

    console.error("❌ Contact form submission error:", {
      error: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
    });

    // Return generic error to client
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message:
          "An error occurred while processing your request. Please try again later.",
      },
      { status: 500, headers: corsHeaders },
    );
  }
}
