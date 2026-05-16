"use client";

import { useState } from "react";
import { ArrowRight, Search, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { Career } from "@/types";
import { submitCareerApplication } from "@/lib/actions/submissions";

interface CareersClientProps {
  careers: Career[];
}

export function CareersClient({ careers }: CareersClientProps) {
  const [view, setView] = useState<"listings" | "form" | "success">("listings");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const filteredCareers = careers.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApplyClick = (title: string) => {
    setSelectedRole(title);
    setFormError("");
    setView("form");
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setFormError("");
    
    try {
      const result = await submitCareerApplication(formData);
      if (result.success) {
        setView("success");
      } else {
        setFormError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setFormError("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 w-full">
        {view === "listings" && (
          <ScrollReveal>
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">Work with <span className="text-brand-red">us</span></h1>
              <p className="text-text-secondary text-lg leading-relaxed">
                At Enlite Helicopters, we lead the way in unmanned helicopter innovation for civilian and defense applications. Our commitment to cutting-edge technology and excellence ensures impactful solutions. Join us and be part of a forward-thinking team shaping the future of aviation.
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <h2 className="text-3xl font-bold tracking-tight">Open Roles</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search for roles"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-3 w-full md:w-80 rounded-full border border-border-default bg-bg-tertiary focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col">
              {filteredCareers.map((job) => (
                <div key={job.id} className="py-8 border-b border-border-default group flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1 pr-8">
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-brand-red transition-colors">{job.title}</h2>
                    <p className="text-text-secondary line-clamp-2">{job.description}</p>
                  </div>
                  <Button
                    onClick={() => handleApplyClick(job.title)}
                    className="shrink-0 bg-brand-red hover:bg-brand-red-hover text-white rounded-md px-8 py-3 h-auto uppercase tracking-wider text-sm font-semibold"
                    iconRight={<ArrowRight className="w-4 h-4" />}
                  >
                    Apply Now
                  </Button>
                </div>
              ))}
              {filteredCareers.length === 0 && (
                <div className="py-12 text-center text-text-secondary">
                  No roles found matching "{searchQuery}"
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {view === "form" && (
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <button
                onClick={() => setView("listings")}
                className="text-text-secondary hover:text-text-primary mb-8 text-sm font-medium transition-colors"
              >
                &larr; Back to Listings
              </button>
              
              <h1 className="text-4xl font-bold mb-4">Explore Careers at <span className="text-brand-red">Enlite</span> Helicopters</h1>
              <p className="text-text-secondary text-lg mb-10">
                Join us in revolutionizing unmanned aerial technology and shaping the future of aviation innovation. Fill this Form to Apply.
              </p>

              <div className="bg-bg-card border border-border-default rounded-2xl p-8 lg:p-10 shadow-sm">
                <form action={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Full Name</label>
                      <input name="name" required type="text" className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Email</label>
                      <input name="email" required type="email" className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Mobile number</label>
                      <input name="phone" required type="tel" className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">City</label>
                      <input name="city" required type="text" className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors" placeholder="Bengaluru" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Position Applying</label>
                      <select name="position" required className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors appearance-none" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="" disabled>Select Position</option>
                        {careers.map(job => (
                          <option key={job.id} value={job.title}>{job.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">How did you hear about us?</label>
                      <select name="source" required className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors appearance-none" defaultValue="">
                        <option value="" disabled>Select Source</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Tell us about yourself</label>
                    <textarea name="bio" required rows={4} className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors resize-none" placeholder="A brief introduction..."></textarea>
                  </div>
                  
                  {formError && <p className="text-red-500 text-sm">{formError}</p>}

                  <Button type="submit" size="lg" loading={isSubmitting} className="w-full bg-brand-red hover:bg-brand-red-hover text-white text-base py-4 h-auto uppercase tracking-wider font-bold">
                    Apply
                  </Button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        )}

        {view === "success" && (
          <ScrollReveal>
            <div className="max-w-xl mx-auto text-center py-20">
              <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h1 className="text-4xl font-bold mb-6">Thanks for applying :)</h1>
              <p className="text-text-secondary text-lg mb-10 leading-relaxed">
                If shortlisted, our hiring team will contact you via email with further details.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="outline" size="lg" onClick={() => setView("listings")} className="w-full sm:w-auto px-8">
                  Back
                </Button>
                <Button size="lg" onClick={() => setView("listings")} className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-hover text-white px-8">
                  Explore Jobs
                </Button>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
