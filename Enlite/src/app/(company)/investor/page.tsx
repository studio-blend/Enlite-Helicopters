import type { Metadata } from "next";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { sanityFetch } from "@/lib/sanity";
import { investorPageQuery } from "@/lib/sanity-queries";

export const metadata: Metadata = { title: "Investor" };


export default async function InvestorPage() {
  let pageData: {
    title?: string;
    subtitle?: string;
    partnerSection?: {
      title?: string;
      highlightText?: string;
      content?: string;
    };
    formTitle?: string;
    formDescription?: string;
  } | null = null;

  try {
    pageData = await sanityFetch<any>({ query: investorPageQuery, tags: ["investorPage"] });
  } catch {
    // use fallbacks
  }

  const heroTitle = pageData?.title || "Investor";
  const heroSubtitle = pageData?.subtitle || "Partner with Enlite Helicopters to build the future of autonomous aerial logistics.";
  const partnerTitle = pageData?.partnerSection?.title || "Partner with";
  const partnerHighlight = pageData?.partnerSection?.highlightText || "Enlite Helicopters";
  const partnerContent = pageData?.partnerSection?.content ||
    "At Enlite Helicopters, we are revolutionizing the future of unmanned aerial cargo transportation. With cutting-edge technology, a strong team of industry experts, and a commitment to innovation, we are poised to transform civilian and defense logistics. We invite forward-thinking investors to join us on this exciting journey as we scale new heights in the aviation industry. Your support will help us accelerate our vision, enhance our product capabilities, and expand our market reach.";
  const formTitle = pageData?.formTitle || "Get in Touch";
  const formDescription = pageData?.formDescription ||
    "If you're interested in exploring investment opportunities with us, please fill out the form below, and our team will get back to you promptly.";

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* ── Hero ─────────────────────────────────── */}
      <section className="bg-bg-hero pt-32 pb-20 border-b border-border-default transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-text-hero mb-4">
              {heroTitle}
            </h1>
            <p className="text-xl text-text-hero/80 max-w-2xl leading-relaxed">
              {heroSubtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Partner Section ──────────────────────── */}
      <section className="py-24 bg-bg-secondary border-y border-border-default">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-tight">
                {partnerTitle}
                <br />
                <span className="text-brand-red">{partnerHighlight}</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <p className="text-text-secondary text-lg leading-relaxed border-l-2 border-brand-red pl-8">
                {partnerContent}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Form Section ─────────────────────────── */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="bg-bg-card border border-border-default rounded-2xl p-8 lg:p-12 shadow-xl">
              <h2 className="text-3xl font-bold mb-4">{formTitle}</h2>
              <p className="text-text-secondary mb-10 text-lg">{formDescription}</p>

              <h3 className="text-2xl font-bold mb-8">Investor Contact Form</h3>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input name="name" label="Name *" placeholder="Your name" required />
                  <Input name="profession" label="Profession *" placeholder="Your profession" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input name="email" label="Email *" type="email" placeholder="Your email" required />
                  <Input name="phone" label="Phone Number *" type="tel" placeholder="+91" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary">Country *</label>
                  <select
                    required
                    className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>Select country</option>
                    <option value="india">India</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <Textarea name="information" label="Other Information *" placeholder="Your message..." rows={6} required />
                <Button size="lg" className="bg-brand-red hover:bg-brand-red-hover text-white px-8">
                  Send Message
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
