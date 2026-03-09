"use client";
import type React from "react";

import { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import SentButton from "./SentButton";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ValidationError {
  field: string;
  message: string;
}

interface ResponseMessage {
  type: "success" | "error" | "validation";
  text: string;
  errors?: ValidationError[];
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseMessage | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      // Send data to backend
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setResponse({
          type: "success",
          text: "Message sent successfully! We'll get back to you soon.",
        });
        // Reset form
        setFormData({ name: "", email: "", message: "" });
        // Clear message after 5 seconds
        setTimeout(() => setResponse(null), 5000);
      } else {
        // Check if it's a validation error with field details
        if (data.data && Array.isArray(data.data)) {
          setResponse({
            type: "validation",
            text: "Please fix the following errors:",
            errors: data.data,
          });
        } else {
          setResponse({
            type: "error",
            text: data.message || "Failed to send message. Please try again.",
          });
        }
      }
    } catch (error) {
      setResponse({
        type: "error",
        text: "Network error occurred. Please check your connection and try again.",
      });
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="my-5">
      <h1 className="text-2xl font-medium">Contact Form</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-3 md:gap-5 mt-5"
      >
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-3 pl-4 bg-transparent border border-[#383838] w-full rounded-[8px] focus:outline-none focus:ring-[1px] focus:ring-primary focus:border-primary transition-colors"
            required
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 pl-4 bg-transparent border border-[#383838] w-full rounded-[8px] focus:outline-none focus:ring-[1px] focus:ring-primary focus:border-primary transition-colors"
            required
            disabled={loading}
          />
        </div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Your Message"
          className="p-3 pl-4 bg-transparent border border-[#383838] rounded-xl focus:outline-none focus:ring-[1px] focus:ring-primary focus:border-primary transition-colors resize-none"
          required
          disabled={loading}
        />

        {/* Success Message */}
        {response?.type === "success" && (
          <div className="p-4 rounded-lg bg-linear-to-r from-green-900/40 to-green-800/20 border border-green-700/50 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-green-300">Success!</p>
                <p className="text-sm text-green-200/80 mt-1">
                  {response.text}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Validation Errors */}
        {response?.type === "validation" && response.errors && (
          <div className="p-4 rounded-lg bg-linear-to-r from-red-900/40 to-red-800/20 border border-red-700/50 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-300">
                  {response.text}
                </p>
                <ul className="mt-2 space-y-1">
                  {response.errors.map((error, index) => (
                    <li key={index} className="text-xs text-red-200/80">
                      <span className="font-medium text-red-300 capitalize">
                        {error.field}:
                      </span>{" "}
                      {error.message}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* General Error Message */}
        {response?.type === "error" && (
          <div className="p-4 rounded-lg bg-linear-to-r from-orange-900/40 to-orange-800/20 border border-orange-700/50 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-orange-300">Error</p>
                <p className="text-sm text-orange-200/80 mt-1">
                  {response.text}
                </p>
              </div>
            </div>
          </div>
        )}

        <SentButton disabled={loading} />
      </form>
    </section>
  );
};

export default ContactForm;
