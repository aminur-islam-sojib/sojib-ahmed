import { cookies } from "next/headers";

export const COOKIE_NAME = "admin_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

interface JWTPayload {
  username: string;
  exp: number;
  iat: number;
}

// Convert string secret to CryptoKey for Web Crypto API
async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  return await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

// Base64Url Encoding/Decoding helpers
function base64UrlEncode(data: ArrayBuffer | Uint8Array): string {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Sign payload to create JWT
export async function signToken(username: string): Promise<string> {
  const secret = process.env.AUTH_SECRET || "fallback_default_secret_key_sojib_2026";
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload: JWTPayload = {
    username,
    iat: now,
    exp: now + SESSION_DURATION_SECONDS,
  };

  const encoder = new TextEncoder();
  const encodedHeader = base64UrlEncode(encoder.encode(JSON.stringify(header)));
  const encodedPayload = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const tokenData = `${encodedHeader}.${encodedPayload}`;

  const key = await getCryptoKey(secret);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(tokenData)
  );

  const encodedSignature = base64UrlEncode(signature);
  return `${tokenData}.${encodedSignature}`;
}

// Verify JWT token signature and expiration
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const tokenData = `${encodedHeader}.${encodedPayload}`;

    const secret = process.env.AUTH_SECRET || "fallback_default_secret_key_sojib_2026";
    const key = await getCryptoKey(secret);
    const signatureBytes = base64UrlDecode(encodedSignature);
    const encoder = new TextEncoder();

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes.buffer as ArrayBuffer,
      encoder.encode(tokenData)
    );

    if (!isValid) return null;

    const payloadJson = new TextDecoder().decode(base64UrlDecode(encodedPayload));
    const payload: JWTPayload = JSON.parse(payloadJson);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) return null;

    return payload;
  } catch (error) {
    return null;
  }
}

// Check admin credentials
export function verifyAdminCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME || "sojib";
  const expectedPass = process.env.ADMIN_PASSWORD || "admin123";

  return username.trim() === expectedUser && password === expectedPass;
}

// Get session from server component cookies
export async function getAdminSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyToken(token);
}
