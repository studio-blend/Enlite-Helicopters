"use server";

import { 
  contactSchema, type ContactFormData,
  investorSchema, type InvestorFormData,
  careerSchema, type CareerFormData 
} from "@/lib/validations";
import { writeClient } from "@/lib/sanity";
import fs from "fs";
import path from "path";

interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

function sanitize(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

async function saveLocally(data: any, filename: string) {
  try {
    const dbPath = path.join(process.cwd(), "data");
    if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath, { recursive: true });
    
    const dbFile = path.join(dbPath, filename);
    const existing = fs.existsSync(dbFile) ? JSON.parse(fs.readFileSync(dbFile, "utf-8")) : [];
    existing.push({ ...data, submittedAt: new Date().toISOString(), id: crypto.randomUUID() });
    fs.writeFileSync(dbFile, JSON.stringify(existing, null, 2));
  } catch (e) {
    console.warn(`[Submissions] Local storage failed for ${filename}, continuing...`);
  }
}

export async function submitContactForm(formData: FormData): Promise<ActionResult> {
  try {
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

    const sanitized: ContactFormData = {
      name: sanitize(result.data.name),
      email: sanitize(result.data.email),
      phone: result.data.phone ? sanitize(result.data.phone) : undefined,
      subject: sanitize(result.data.subject),
      message: sanitize(result.data.message),
    };

    await saveLocally(sanitized, "contact_submissions.json");

    if (process.env.SANITY_API_TOKEN) {
      await writeClient.create({
        _type: "contact",
        ...sanitized,
        submittedAt: new Date().toISOString(),
      });
    }

    return { success: true, message: "Thank you! We'll get back to you within 24 hours." };
  } catch (error) {
    console.error("[Contact Form] Error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function submitInvestorInquiry(formData: FormData): Promise<ActionResult> {
  try {
    const raw = {
      name: formData.get("name") as string,
      profession: formData.get("profession") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      country: formData.get("country") as string,
      information: formData.get("information") as string,
    };

    const result = investorSchema.safeParse(raw);
    if (!result.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: result.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    const sanitized: InvestorFormData = {
      name: sanitize(result.data.name),
      profession: sanitize(result.data.profession),
      email: sanitize(result.data.email),
      phone: sanitize(result.data.phone),
      country: sanitize(result.data.country),
      information: sanitize(result.data.information),
    };

    await saveLocally(sanitized, "investor_submissions.json");

    if (process.env.SANITY_API_TOKEN) {
      await writeClient.create({
        _type: "investorInquiry",
        ...sanitized,
        submittedAt: new Date().toISOString(),
      });
    }

    return { success: true, message: "Thank you for your interest. Our investor relations team will contact you." };
  } catch (error) {
    console.error("[Investor Form] Error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function submitCareerApplication(formData: FormData): Promise<ActionResult> {
  try {
    const raw = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      city: formData.get("city") as string,
      position: formData.get("position") as string,
      source: formData.get("source") as string,
      bio: formData.get("bio") as string,
    };

    const result = careerSchema.safeParse(raw);
    if (!result.success) {
      return {
        success: false,
        message: "Validation failed.",
        errors: result.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    const sanitized: CareerFormData = {
      name: sanitize(result.data.name),
      email: sanitize(result.data.email),
      phone: sanitize(result.data.phone),
      city: sanitize(result.data.city),
      position: sanitize(result.data.position),
      source: sanitize(result.data.source),
      bio: sanitize(result.data.bio),
    };

    await saveLocally(sanitized, "career_submissions.json");

    if (process.env.SANITY_API_TOKEN) {
      await writeClient.create({
        _type: "careerApplication",
        ...sanitized,
        submittedAt: new Date().toISOString(),
      });
    }

    return { success: true, message: "Application received! Our team will review and reach out if there's a match." };
  } catch (error) {
    console.error("[Career Form] Error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
