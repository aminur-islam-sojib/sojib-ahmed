/**
 * Contact Form Types
 * Defines the structure of contact messages and API responses
 */

import { ObjectId } from "mongodb";

/**
 * Contact message as stored in MongoDB
 * Includes MongoDB-specific _id field with ObjectId type
 */
export interface ContactMessage {
  _id?: ObjectId | string; // ObjectId when retrieved from DB, string when converted
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  // Future fields for scalability
  phone?: string;
  subject?: string;
  attachments?: string[]; // URLs to uploaded files
  status?: "new" | "read" | "responded"; // For admin dashboard
}

/**
 * Contact message payload for insertion (without _id)
 * Used when creating new messages
 */
export type ContactMessageInsert = Omit<ContactMessage, "_id">;

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ValidationError {
  field: string;
  message: string;
}
