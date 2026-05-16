import type { Metadata } from "next";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { sanityFetch } from "@/lib/sanity";
import { investorPageQuery } from "@/lib/sanity-queries";
import { InvestorClient } from "./InvestorClient";

export const metadata: Metadata = {
  title: {
    absolute: "Investor Relations | Partner in Autonomous Aerial Logistics | Enlite",
  },
  description:
    "Explore investment opportunities with Enlite Helicopters. Join us in revolutionizing the future of unmanned aerial cargo transportation and intercity logistics.",
};

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
      <InvestorClient formTitle={formTitle} formDescription={formDescription} />
    </div>
  );
}
