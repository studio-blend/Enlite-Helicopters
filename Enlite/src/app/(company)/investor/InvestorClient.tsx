"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { submitInvestorInquiry } from "@/lib/actions/submissions";

interface InvestorClientProps {
  formTitle: string;
  formDescription: string;
}

export function InvestorClient({ formTitle, formDescription }: InvestorClientProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    setErrors({});
    const result = await submitInvestorInquiry(formData);
    if (result.success) {
      setStatus("success");
      setMessage(result.message);
    } else {
      setStatus("error");
      setMessage(result.message);
      if (result.errors) setErrors(result.errors);
    }
  }

  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <div className="bg-bg-card border border-border-default rounded-2xl p-8 lg:p-12 shadow-xl">
            <h2 className="text-3xl font-bold mb-4">{formTitle}</h2>
            <p className="text-text-secondary mb-10 text-lg">{formDescription}</p>

            {status === "success" ? (
              <div className="p-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text-primary mb-2">Inquiry Received!</h3>
                <p className="text-text-secondary">{message}</p>
                <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
                  New Inquiry
                </Button>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input name="name" label="Name *" placeholder="Your name" required error={errors.name?.[0]} />
                  <Input name="profession" label="Profession *" placeholder="Your profession" required error={errors.profession?.[0]} />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input name="email" label="Email *" type="email" placeholder="Your email" required error={errors.email?.[0]} />
                  <Input name="phone" label="Phone Number *" type="tel" placeholder="+91" required error={errors.phone?.[0]} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary">Country *</label>
                  <select
                    name="country"
                    required
                    className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>Select country</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.country?.[0] && <p className="text-red-500 text-xs">{errors.country[0]}</p>}
                </div>
                <Textarea name="information" label="Other Information *" placeholder="Your message..." rows={6} required error={errors.information?.[0]} />
                
                {status === "error" && !Object.keys(errors).length && (
                  <p className="text-red-500 text-sm">{message}</p>
                )}

                <Button type="submit" size="lg" loading={status === "loading"} icon={<Send className="w-4 h-4" />}>
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
