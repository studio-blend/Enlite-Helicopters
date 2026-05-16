import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Package, Shield, Mountain, Wind, HeartPulse, Battery, Timer, ThermometerSnowflake, Activity, ShieldPlus, Radar, Crosshair, PlaneTakeoff, MapPin, ShieldCheck, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { client, sanityFetch } from "@/lib/sanity";
import { allMarketsQuery, marketBySlugQuery } from "@/lib/sanity-queries";

// Map icon name strings from Sanity → actual Lucide components
const iconMap: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-6 h-6" />,
  Package: <Package className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Mountain: <Mountain className="w-6 h-6" />,
  Wind: <Wind className="w-6 h-6" />,
  HeartPulse: <HeartPulse className="w-6 h-6" />,
  Battery: <Battery className="w-6 h-6" />,
  Timer: <Timer className="w-6 h-6" />,
  ThermometerSnowflake: <ThermometerSnowflake className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  ShieldPlus: <ShieldPlus className="w-6 h-6" />,
  Radar: <Radar className="w-6 h-6" />,
  Crosshair: <Crosshair className="w-6 h-6" />,
  PlaneTakeoff: <PlaneTakeoff className="w-6 h-6" />,
  MapPin: <MapPin className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
};



// Pre-render all market slugs at build time
export async function generateStaticParams() {
  const markets = await client.fetch<{ slug: string }[]>(allMarketsQuery);
  return (markets || []).map((m) => ({ slug: m.slug }));
}

// Dynamic SEO metadata per market
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const market = await sanityFetch<any>({ query: marketBySlugQuery, params: { slug }, tags: ["marketPage"] });
  if (!market) return { title: "Market Not Found" };
  return {
    title: market.title,
    description: market.seoDescription || `${market.title} — Enlite autonomous helicopter logistics solutions.`,
  };
}



export default async function MarketPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch from Sanity
  let market = await sanityFetch<any>({ query: marketBySlugQuery, params: { slug }, tags: ["marketPage"] }).catch(() => null);

  if (!market) notFound();

  const data = {
    category: market?.category || "",
    heroHeadline: market?.heroHeadline || market?.title || "",
    heroHeadlineHighlight: market?.heroHeadlineHighlight || "",
    heroSubtitle: market?.heroSubtitle || "",
    heroCtaText: market?.heroCtaText || "Contact Our Team",
    heroImage: market?.heroImage || "",
    heroVideo: market?.heroVideoUrl || "",
    contextTitle: market?.contextTitle || "",
    contextTitleHighlight: market?.contextTitleHighlight || "",
    contextParagraphs: market?.contextParagraphs || [],
    contextImage: market?.contextImage || "",
    capabilitiesTitle: market?.capabilitiesTitle || "Key Advantages",
    capabilities: market?.capabilities || [],
    ctaTitle: market?.ctaTitle || "",
    ctaDescription: market?.ctaDescription || "",
    ctaButtonText: market?.ctaButtonText || "Contact Our Team",
    themeVariant: market?.themeVariant || "default",
  };

  const isDefence = data.themeVariant === "defence";
  const accentClass = isDefence ? "text-slate-400" : "text-brand-red";
  const badgeBg = isDefence
    ? "bg-slate-800 border-slate-600 text-slate-300"
    : "bg-brand-red/10 border-brand-red/20 text-brand-red";
  const ctaBtnClass = isDefence
    ? "bg-slate-700 hover:bg-slate-600 text-white border-none"
    : "bg-brand-red hover:bg-brand-red-hover text-white";
  const iconBg = isDefence ? "bg-slate-800 text-slate-300" : "bg-brand-red/10 text-brand-red";
  const borderAccent = isDefence ? "border-slate-700" : "border-brand-red";
  const capabilitiesTitleClass = isDefence
    ? "uppercase tracking-widest text-slate-400"
    : "";

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-border-default overflow-hidden bg-bg-hero">
        {(data.heroVideo || data.heroImage) && (
          <div className="absolute inset-0 z-0">
            {data.heroVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105"
                poster={data.heroImage}
              >
                <source src={data.heroVideo} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={data.heroImage}
                alt={`${data.heroHeadline} - Enlite Autonomous Helicopter Solutions for ${data.category}`}
                fill
                className="object-cover opacity-25 scale-105"
                priority
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 to-bg-primary" />
          </div>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            {data.category && (
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-6 ${badgeBg}`}>
                {data.category}
              </div>
            )}
            <h1 className={`text-5xl lg:text-7xl font-bold tracking-tight text-text-hero mb-6 ${isDefence ? "uppercase" : ""}`}>
              {data.heroHeadline}
              {data.heroHeadline && data.heroHeadlineHighlight && <br />}
              {data.heroHeadlineHighlight && (
                <span className={accentClass}>{data.heroHeadlineHighlight}</span>
              )}
            </h1>
            {data.heroSubtitle && (
              <p className="text-xl text-text-hero/80 max-w-2xl leading-relaxed mb-10">
                {data.heroSubtitle}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className={`px-8 ${ctaBtnClass}`}>
                  {data.heroCtaText}
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Context Section */}
      {(data.contextTitle || data.contextParagraphs.length > 0) && (
        <section className="py-24 bg-bg-primary">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal direction="left">
                {data.contextTitle && (
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    {data.contextTitle}{" "}
                    {data.contextTitleHighlight && (
                      <span className={accentClass}>{data.contextTitleHighlight}</span>
                    )}
                  </h2>
                )}
                <div className={`space-y-6 text-text-secondary text-lg leading-relaxed border-l-2 ${borderAccent} pl-6`}>
                  {data.contextParagraphs.map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </ScrollReveal>
              {data.contextImage && (
                <ScrollReveal direction="right">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-bg-tertiary border border-border-default">
                    <Image
                      src={data.contextImage}
                      alt={`${data.contextTitle} - Visualizing ${market.title} autonomous operations and logistical impact`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities / Benefits Grid */}
      {data.capabilities.length > 0 && (
        <section className="py-24 bg-bg-secondary border-y border-border-default">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <h2 className={`text-3xl font-bold text-center mb-16 ${capabilitiesTitleClass}`}>
                {data.capabilitiesTitle}
              </h2>
            </ScrollReveal>
            <StaggerContainer className={`grid gap-8 ${data.capabilities.length <= 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-2 lg:grid-cols-4"}`}>
              {data.capabilities.map((cap: { title: string; description: string; icon: string }, i: number) => (
                <StaggerItem key={i}>
                  <div className={`bg-bg-card border border-border-default rounded-2xl p-8 h-full hover:border-opacity-50 transition-colors ${isDefence ? "hover:border-slate-700" : "hover:border-brand-red/30"}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${iconBg}`}>
                      {iconMap[cap.icon] || <Package className="w-6 h-6" />}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{cap.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{cap.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {data.ctaTitle && (
        <section className="py-24 bg-bg-primary text-center">
          <div className="max-w-4xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">{data.ctaTitle}</h2>
              {data.ctaDescription && (
                <p className="text-lg text-text-secondary mb-10">{data.ctaDescription}</p>
              )}
              <Link href="/contact">
                <Button size="lg" className={`px-10 py-6 h-auto text-lg ${ctaBtnClass}`}>
                  {data.ctaButtonText} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}
    </div>
  );
}
