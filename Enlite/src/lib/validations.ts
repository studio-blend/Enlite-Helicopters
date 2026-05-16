import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const investorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  profession: z.string().min(2, "Profession is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  country: z.string().min(2, "Please select a country"),
  information: z.string().min(5, "Please provide more information").max(5000),
});

export type InvestorFormData = z.infer<typeof investorSchema>;

export const careerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  city: z.string().min(2, "City is required"),
  position: z.string().min(2, "Please select a position"),
  source: z.string().min(2, "Please select how you heard about us"),
  bio: z.string().min(10, "Please provide a brief bio").max(5000),
});

export type CareerFormData = z.infer<typeof careerSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
