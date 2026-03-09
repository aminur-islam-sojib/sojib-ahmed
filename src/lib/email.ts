/**
 * Email Service
 * Handles sending notification emails via NodeMailer
 * Optimized for serverless environments with queue-ready design
 */

import nodemailer from "nodemailer";
import { ContactMessage } from "@/types/contact";

// Validate email environment variables
const requiredEnvVars = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CONTACT_EMAIL",
];

const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName],
);

if (missingEnvVars.length > 0) {
  console.warn(
    `Warning: Missing email config variables: ${missingEnvVars.join(", ")}. Emails will not be sent.`,
  );
}

/**
 * Create email transporter with connection pooling
 * Reuses transporter connection for better performance
 */
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (transporter) {
    return transporter;
  }

  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "",
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
    pool: {
      maxConnections: 3, // Serverless connection pool
      maxMessages: 100,
      rateDelta: 20 * 1000, // 20 seconds between connections
      rateLimit: 14, // Send max 14 emails per second
    },
  } as nodemailer.TransportOptions);

  return transporter;
}

/**
 * Generate HTML email template
 * Professional and responsive email design
 */
function generateEmailTemplate(message: ContactMessage): string {
  const formattedDate = new Date(message.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          border-bottom: 3px solid #0066cc;
          padding-bottom: 15px;
          margin-bottom: 20px;
        }
        .header h1 {
          margin: 0;
          color: #0066cc;
          font-size: 24px;
        }
        .section {
          margin-bottom: 25px;
        }
        .label {
          font-weight: 600;
          color: #555;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .value {
          color: #333;
          font-size: 14px;
          word-break: break-word;
          padding: 10px;
          background-color: #f9f9f9;
          border-left: 3px solid #0066cc;
          border-radius: 4px;
        }
        .message-content {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .footer {
          border-top: 1px solid #eee;
          padding-top: 15px;
          margin-top: 20px;
          font-size: 12px;
          color: #999;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
        </div>

        <div class="section">
          <div class="label">📝 Name</div>
          <div class="value">${escapeHtml(message.name)}</div>
        </div>

        <div class="section">
          <div class="label">💌 Email</div>
          <div class="value">
            <a href="mailto:${escapeHtml(message.email)}" style="color: #0066cc; text-decoration: none;">
              ${escapeHtml(message.email)}
            </a>
          </div>
        </div>

        <div class="section">
          <div class="label">💬 Message</div>
          <div class="value message-content">${escapeHtml(message.message)}</div>
        </div>

        <div class="section">
          <div class="label">⏰ Submitted At</div>
          <div class="value">${formattedDate} UTC</div>
        </div>

        <div class="footer">
          <p>This is an automated notification from your contact form.<br>
          Do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Escape HTML special characters to prevent injection
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Send email notification to admin
 * Returns success/failure status without throwing
 */
export async function sendNotificationEmail(
  message: ContactMessage,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Skip if SMTP not configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.warn(
        "Email service not configured. Skipping notification email.",
      );
      return { success: true }; // Don't fail the request
    }

    const transporter = getTransporter();
    const recipientEmail = process.env.CONTACT_EMAIL;

    if (!recipientEmail) {
      throw new Error("CONTACT_EMAIL not configured");
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: recipientEmail,
      subject: `New Contact: ${message.name}`,
      html: generateEmailTemplate(message),
      replyTo: message.email, // Easy reply to sender
      text: `New message from ${message.name} (${message.email}):\n\n${message.message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return { success: true };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to send notification email:", errorMessage);

    // Return error but don't throw - email is secondary to message storage
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * FUTURE: Queue email sending for better scalability
 * Pattern ready for integration with Bull Queue, Firebase Cloud Tasks, etc.
 */
export async function queueEmailNotification(
  message: ContactMessage,
): Promise<void> {
  // TODO: Implement queue integration
  // Options:
  // - Bull Queue + Redis
  // - AWS SQS
  // - Firebase Cloud Tasks
  // - Inngest
  // For now, send immediately
  await sendNotificationEmail(message);
}

/**
 * Verify email configuration is working
 * Useful for testing/setup
 */
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.warn("Email config incomplete");
      return false;
    }

    const transporter = getTransporter();
    await transporter.verify();
    console.log("Email configuration verified successfully");
    return true;
  } catch (error) {
    console.error("Email config verification failed:", error);
    return false;
  }
}
