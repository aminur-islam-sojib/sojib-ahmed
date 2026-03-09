"use client";
import type React from "react";

import { useState } from "react";
import SentButton from "./SentButton";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send formData to backend
    console.log(formData);
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
            className="p-3 pl-4 bg-transparent border border-[#383838] w-full rounded-[8px] focus:outline-none focus:ring-[1px] focus:ring-primary focus:border-primary"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 pl-4 bg-transparent border border-[#383838] w-full rounded-[8px] focus:outline-none focus:ring-[1px] focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Your Message"
          className="p-3 pl-4 bg-transparent border border-[#383838] rounded-xl focus:outline-none focus:ring-[1px] focus:ring-primary focus:border-primary"
          required
        />
        <SentButton />
      </form>
    </section>
  );
};

export default ContactForm;
