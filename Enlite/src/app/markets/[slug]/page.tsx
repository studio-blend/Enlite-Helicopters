import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Package, Shield, Mountain, Wind, HeartPulse, Battery, Timer, ThermometerSnowflake, Activity, ShieldPlus, Radar, Crosshair, PlaneTakeoff, MapPin, ShieldCheck, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { client } from "@/lib/sanity";
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

export const revalidate = 60;

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
  const market = await client.fetch(marketBySlugQuery, { slug });
  if (!market) return { title: "Market Not Found" };
  return {
    title: market.title,
    description: market.seoDescription || `${market.title} — Enlite autonomous helicopter logistics solutions.`,
  };
}

// ── Fallback data (used when Sanity fields are empty) ───────────────────────
const fallbacks: Record<
  string,
  {
    category: string;
    heroHeadline: string;
    heroHeadlineHighlight: string;
    heroSubtitle: string;
    heroCtaText: string;
    heroImage: string;
    heroVideo?: string;
    contextTitle: string;
    contextTitleHighlight: string;
    contextParagraphs: string[];
    contextImage: string;
    capabilitiesTitle: string;
    capabilities: { title: string; description: string; icon: string }[];
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
    themeVariant: string;
  }
> = {
  "intercity-cargo-delivery": {
    category: "Civilian Logistics",
    heroHeadline: "Intercity Cargo",
    heroHeadlineHighlight: "Delivery",
    heroSubtitle: "The fastest way to move mid-weight cargo between urban centers. Say goodbye to highway congestion, toll delays, and overnight trucking constraints.",
    heroCtaText: "Request a Payload Trial",
    heroImage: "/images/civilian.png",
    contextTitle: "Redefining the",
    contextTitleHighlight: "Middle Mile",
    contextParagraphs: [
      "Today's logistics networks are constrained by surface infrastructure. Trucks are delayed by traffic, poor road conditions, and regulatory checkpoints. While battery-powered drones offer a solution for last-mile micro-deliveries (2-5 kg), they lack the range and capacity for serious intercity logistics.",
      "Enlite's autonomous cargo helicopters bridge this gap. Operating at 200 km/h with a 500 km range, they serve as high-speed aerial bridges between distribution centers in different cities.",
    ],
    contextImage: "/images/solution.png",
    capabilitiesTitle: "Key Advantages",
    capabilities: [
      { title: "Fraction of the Time", description: "Bypass traffic and indirect road routes. Deliver 70 kg of cargo between cities like Chennai and Bangalore in under 2 hours.", icon: "Clock" },
      { title: "High Payload Capacity", description: "Unlike multi-rotor drones that carry 2-5 kg, our autonomous helicopters carry up to 70 kg (300 L volume) per trip.", icon: "Package" },
      { title: "Secure & Tracked", description: "Continuous telemetry and custom cargo compartments ensure high-value and sensitive goods arrive safely.", icon: "ShieldCheck" },
      { title: "Point-to-Point", description: "VTOL capability means no runway required. Launch from a warehouse in City A and land directly at a distribution center in City B.", icon: "MapPin" },
    ],
    ctaTitle: "Ready to upgrade your logistics network?",
    ctaDescription: "Speak with our integration team to see how Enlite can reduce your intercity transit times by up to 80%.",
    ctaButtonText: "Contact Our Team",
    themeVariant: "default",
  },
  "remote-location-delivery": {
    category: "Civilian Logistics",
    heroHeadline: "Remote Location",
    heroHeadlineHighlight: "Delivery",
    heroSubtitle: "Connecting the disconnected. Delivering 70 kg of essential supplies to mountainous, island, and rural areas lacking reliable surface infrastructure.",
    heroCtaText: "Discuss Your Requirements",
    heroImage: "/images/why-1.png",
    contextTitle: "Overcoming",
    contextTitleHighlight: "Geography",
    contextParagraphs: [
      "For many regions in India and worldwide, building and maintaining road infrastructure is ecologically destructive and economically unviable. During monsoons or natural disasters, these fragile links are severed completely.",
      "Enlite autonomous helicopters act as an instant, resilient supply chain. Requiring zero ground infrastructure other than a clear landing spot, they provide reliable logistics for mining operations, remote healthcare facilities, and disconnected communities.",
    ],
    contextImage: "/images/hero.png",
    capabilitiesTitle: "Operational Capabilities",
    capabilities: [
      { title: "Terrain Independent", description: "Mountains, valleys, and rivers are no longer obstacles. Fly directly over impassable terrain.", icon: "Mountain" },
      { title: "All-Weather Capability", description: "Engineered to withstand high winds and challenging weather conditions that ground smaller battery drones.", icon: "Wind" },
      { title: "Medical Evacuation & Supply", description: "Deliver life-saving medical supplies, vaccines, and disaster relief aid to cut-off communities instantly.", icon: "HeartPulse" },
      { title: "Extended Endurance", description: "With a 3-hour flight endurance, reach deep into remote territories and return without needing refueling infrastructure.", icon: "Battery" },
    ],
    ctaTitle: "Need logistics in hard-to-reach areas?",
    ctaDescription: "Speak with our team to discuss how Enlite can solve your remote logistics challenges.",
    ctaButtonText: "Contact Us",
    themeVariant: "default",
  },
  "medical-emergency-delivery": {
    category: "Critical Response",
    heroHeadline: "Medical & Emergency",
    heroHeadlineHighlight: "Logistics",
    heroSubtitle: "Swift delivery of critical medical supplies, organs, and disaster relief aid. Bypassing ground congestion to save lives.",
    heroCtaText: "Partner with Us",
    heroImage: "/images/why-3.png",
    contextTitle: "Seconds Save",
    contextTitleHighlight: "Lives",
    contextParagraphs: [
      "In medical emergencies, road infrastructure is too slow, and traditional manned medevac helicopters are scarce and prohibitively expensive for routine transport of blood, organs, and emergency medical equipment.",
      "Enlite's autonomous heavy-lift platforms provide hospitals and disaster relief agencies with a dedicated, high-speed aerial corridor. With a 70 kg payload and 200 km/h cruising speed, critical care logistics become predictable, rapid, and cost-effective.",
    ],
    contextImage: "/images/solution.png",
    capabilitiesTitle: "Critical Capabilities",
    capabilities: [
      { title: "Golden Hour Delivery", description: "When every minute counts, bypass road traffic entirely to deliver life-saving supplies, antivenoms, or blood within the critical golden hour.", icon: "Timer" },
      { title: "Cold Chain Integrity", description: "Customizable cargo compartments support active temperature control for vaccines, organs, and temperature-sensitive pharmaceuticals.", icon: "ThermometerSnowflake" },
      { title: "Disaster Relief", description: "Deploy instant supply lines during floods or earthquakes when roads and bridges are washed out or impassable.", icon: "ShieldPlus" },
      { title: "Hospital to Hospital", description: "VTOL capabilities allow direct landing and takeoff from existing hospital helipads, ensuring zero last-mile transfer delays.", icon: "Activity" },
    ],
    ctaTitle: "Equip Your Healthcare Network",
    ctaDescription: "Speak with our integration team to establish high-speed aerial medical corridors for your institution.",
    ctaButtonText: "Contact Our Team",
    themeVariant: "default",
  },
  "defence-applications": {
    category: "Tactical Resupply",
    heroHeadline: "Tactical",
    heroHeadlineHighlight: "Resupply",
    heroSubtitle: "Autonomous logistics for forward operating bases. Safe delivery of ammunition, fuel, and supplies to the front lines without risking human life.",
    heroCtaText: "Request Defence Briefing",
    heroImage: "/images/defence.png",
    contextTitle: "Redefining the",
    contextTitleHighlight: "Kill Chain Logistics",
    contextParagraphs: [
      "In modern warfare, logistics convoys are often the most vulnerable targets. Manned helicopters are expensive assets that are risky to deploy for routine resupply, while ground convoys are susceptible to ambushes and IEDs.",
      "Enlite's autonomous heavy-lift platforms provide a resilient, distributed logistics network. Operating independently of runways or roads, they ensure forward operating bases receive continuous resupply even in contested environments.",
    ],
    contextImage: "/images/defence.png",
    capabilitiesTitle: "Tactical Capabilities",
    capabilities: [
      { title: "High-Altitude Operations", description: "Specialized variants engineered with an operational ceiling of 20,000 ft and capable of delivering 50 kg payloads to high-altitude outposts.", icon: "PlaneTakeoff" },
      { title: "Stealth & Evasion", description: "Low-altitude, terrain-following autonomous flight paths minimize radar cross-section and detection probability in hostile zones.", icon: "Radar" },
      { title: "Precision Drops", description: "GPS-denied navigation capabilities and precision airdrop mechanisms for supplying moving units without landing.", icon: "Crosshair" },
      { title: "Risk Reduction", description: "Eliminate the need to put human pilots or vulnerable supply convoys at risk for routine tactical resupply missions.", icon: "Shield" },
    ],
    ctaTitle: "Equip Your Forces",
    ctaDescription: "Contact our defence integration team to discuss specialized variants and tactical deployment.",
    ctaButtonText: "Procurement Inquiry",
    themeVariant: "defence",
  },
};

export default async function MarketPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try fetching from Sanity first
  let market = await client.fetch(marketBySlugQuery, { slug }).catch(() => null);

  // If no Sanity document, use fallback data (graceful degradation)
  const fb = fallbacks[slug];
  if (!market && !fb) notFound();

  // Merge: Sanity data takes precedence; fallback fills any missing fields
  const data = {
    category: market?.category || fb?.category || "",
    heroHeadline: market?.heroHeadline || fb?.heroHeadline || market?.title || "",
    heroHeadlineHighlight: market?.heroHeadlineHighlight || fb?.heroHeadlineHighlight || "",
    heroSubtitle: market?.heroSubtitle || fb?.heroSubtitle || "",
    heroCtaText: market?.heroCtaText || fb?.heroCtaText || "Contact Our Team",
    heroImage: market?.heroImage || fb?.heroImage || "",
    heroVideo: market?.heroVideoUrl || fb?.heroVideo || "",
    contextTitle: market?.contextTitle || fb?.contextTitle || "",
    contextTitleHighlight: market?.contextTitleHighlight || fb?.contextTitleHighlight || "",
    contextParagraphs: market?.contextParagraphs || fb?.contextParagraphs || [],
    contextImage: market?.contextImage || fb?.contextImage || "",
    capabilitiesTitle: market?.capabilitiesTitle || fb?.capabilitiesTitle || "Key Advantages",
    capabilities: (market?.capabilities?.length ? market.capabilities : fb?.capabilities) || [],
    ctaTitle: market?.ctaTitle || fb?.ctaTitle || "",
    ctaDescription: market?.ctaDescription || fb?.ctaDescription || "",
    ctaButtonText: market?.ctaButtonText || fb?.ctaButtonText || "Contact Our Team",
    themeVariant: market?.themeVariant || fb?.themeVariant || "default",
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
                alt={data.heroHeadline}
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
                      alt={data.contextTitle || ""}
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
