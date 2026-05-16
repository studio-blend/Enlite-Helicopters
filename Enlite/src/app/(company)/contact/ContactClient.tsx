"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { submitContactForm } from "@/lib/actions/submissions";
import { siteConfig } from "@/lib/constants";

export function ContactClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    setErrors({});
    const result = await submitContactForm(formData);
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
    <div className="flex flex-col min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="bg-bg-hero pt-32 pb-20 border-b border-border-default transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-text-hero">
              Contact Us
            </h1>
            <p className="text-xl text-text-hero/80 max-w-2xl leading-relaxed">
              Have a question or want to learn more about our helicopter platforms? Get in
              touch with our team.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              {status === "success" ? (
                <div className="p-8 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-center">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-text-primary mb-2">Message Sent!</h3>
                  <p className="text-text-secondary">{message}</p>
                  <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form action={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      name="name"
                      label="Full Name"
                      placeholder="John Doe"
                      required
                      error={errors.name?.[0]}
                    />
                    <Input
                      name="email"
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      required
                      error={errors.email?.[0]}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      name="phone"
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 98765 43210"
                      error={errors.phone?.[0]}
                    />
                    <Input
                      name="subject"
                      label="Subject"
                      placeholder="Product inquiry"
                      required
                      error={errors.subject?.[0]}
                    />
                  </div>
                  <Textarea
                    name="message"
                    label="Message"
                    placeholder="Tell us about your requirements..."
                    rows={6}
                    required
                    error={errors.message?.[0]}
                  />
                  {status === "error" && !Object.keys(errors).length && (
                    <p className="text-red-500 text-sm">{message}</p>
                  )}
                  <Button type="submit" size="lg" loading={status === "loading"} icon={<Send className="w-4 h-4" />}>
                    Send Message
                  </Button>
                </form>
              )}
            </ScrollReveal>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="right">
              <div className="sticky top-28 space-y-6">
                <div className="p-8 rounded-2xl bg-brand-red text-white shadow-xl">
                  <h4 className="text-xl font-bold mb-2">Investor Relations</h4>
                  <p className="text-white/80 text-sm mb-6 leading-relaxed">
                    Interested in exploring investment opportunities with Enlite Helicopters?
                  </p>
                  <Link href="/investor" className="inline-block w-full text-center bg-white text-brand-red font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                    Investor Enquiry
                  </Link>
                </div>

                <div className="p-8 rounded-2xl bg-bg-secondary border border-border-default">
                  <h3 className="text-2xl font-bold mb-8 text-text-primary">Get In Touch</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-brand-red" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary mb-1">Address</p>
                        <p className="text-text-secondary leading-relaxed">{siteConfig.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-brand-red" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary mb-1">Email</p>
                        <div className="space-y-1 mt-2">
                          <a href="mailto:info@enlitehelicopters.com" className="text-sm text-text-secondary hover:text-brand-red transition-colors block">
                            <span className="font-semibold mr-2">Sales:</span>info@enlitehelicopters.com
                          </a>
                          <a href="mailto:admin@enlitehelicopters.com" className="text-sm text-text-secondary hover:text-brand-red transition-colors block">
                            <span className="font-semibold mr-2">Investors:</span>admin@enlitehelicopters.com
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-brand-red" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary mb-1">Phone</p>
                        <div className="space-y-1 mt-2">
                          <a href="tel:+918148670820" className="text-sm text-text-secondary hover:text-brand-red transition-colors block">
                            <span className="font-semibold mr-2">Mobile:</span>+91 81486 70820
                          </a>
                          <a href="https://wa.me/918148670820" target="_blank" rel="noreferrer" className="text-sm text-text-secondary hover:text-brand-red transition-colors block">
                            <span className="font-semibold mr-2">WhatsApp:</span>+91 81486 70820
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
