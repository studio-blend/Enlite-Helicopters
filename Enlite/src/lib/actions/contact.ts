"use server";

import { contactSchema, type ContactFormData } from "@/lib/validations";
import { writeClient } from "@/lib/sanity";
import fs from "fs";
import path from "path";

interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 }); // 1 min window
    return true;
  }
  if (limit.count >= 5) return false; // 5 per minute
  limit.count++;
  return true;
}

function sanitize(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

export async function submitContactForm(formData: FormData): Promise<ActionResult> {
  try {
    // Rate limiting
    const ip = "127.0.0.1"; // In production, extract from headers
    if (!checkRateLimit(ip)) {
      return { success: false, message: "Too many requests. Please try again later." };
    }

    // Parse and validate
    const raw = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const result = contactSchema.safeParse(raw);
    if (!result.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: result.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    // Sanitize inputs
    const sanitized: ContactFormData = {
      name: sanitize(result.data.name),
      email: sanitize(result.data.email),
      phone: result.data.phone ? sanitize(result.data.phone) : undefined,
      subject: sanitize(result.data.subject),
      message: sanitize(result.data.message),
    };

    // Store in local JSON "database"
    try {
      const dbPath = path.join(process.cwd(), "data");
      if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath, { recursive: true });
      
      const dbFile = path.join(dbPath, "submissions.json");
      const existing = fs.existsSync(dbFile) ? JSON.parse(fs.readFileSync(dbFile, "utf-8")) : [];
      existing.push({ ...sanitized, submittedAt: new Date().toISOString(), id: crypto.randomUUID() });
      fs.writeFileSync(dbFile, JSON.stringify(existing, null, 2));
    } catch (e) {
      console.warn("[Contact Form] Local storage failed, continuing...");
    }

    // Store in Sanity if token available
    if (process.env.SANITY_API_TOKEN) {
      try {
        await writeClient.create({
          _type: "contact",
          ...sanitized,
          submittedAt: new Date().toISOString(),
        });
        console.log("[Contact Form] Submission stored in Sanity:", sanitized.email);
      } catch (err) {
        console.error("[Contact Form] Sanity storage failed:", err);
      }
    }

    // In production: send email notification via nodemailer/resend
    console.log("[Contact Form] Submission processed:", sanitized.email);

    return {
      success: true,
      message: "Thank you for your message. We'll get back to you within 24 hours.",
    };
  } catch (error) {
    console.error("[Contact Form] Error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
