import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { sanityFetch } from "@/lib/sanity";
import { allMarketsQuery } from "@/lib/sanity-queries";

export const metadata: Metadata = {
  title: "Markets | Enlite Helicopters",
  description:
    "Explore the civilian and defence markets served by Enlite's autonomous cargo helicopters, including intercity delivery, remote logistics, medical supply, and tactical resupply.",
};



export default async function MarketsPage() {
  // Fetch markets from Sanity
  let markets: {
    _id: string;
    title: string;
    slug: string;
    category?: string;
    heroSubtitle?: string;
    heroImage?: string;
  }[] = [];

  try {
    const sanityMarkets = await sanityFetch<any[]>({ query: allMarketsQuery, tags: ["marketPage"] });
    if (sanityMarkets?.length > 0) {
      markets = sanityMarkets;
    }
  } catch {
    console.error("Sanity fetch error");
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <section className="bg-bg-hero pt-32 pb-20 border-b border-border-default transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-text-hero">
              Markets &amp; <span className="text-brand-red">Applications</span>
            </h1>
            <p className="text-xl text-text-hero/80 max-w-2xl mx-auto leading-relaxed">
              Discover how Enlite&apos;s autonomous heavy-lift cargo helicopters are transforming
              logistics across civilian and defence sectors.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Markets Grid */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <StaggerContainer className="grid md:grid-cols-2 gap-10">
            {markets.map((market) => (
              <StaggerItem key={market._id}>
                <Link
                  href={`/markets/${market.slug}`}
                  className="group flex flex-col h-full bg-bg-card border border-border-default rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-red/30 transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] w-full bg-bg-tertiary overflow-hidden">
                    {market.heroImage ? (
                      <Image
                        src={market.heroImage}
                        alt={market.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                        <Target className="w-16 h-16 opacity-20" />
                      </div>
                    )}
                    {market.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/10">
                          {market.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-text-primary group-hover:text-brand-red transition-colors">
                      {market.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-8 flex-1">
                      {market.heroSubtitle}
                    </p>
                    <div className="flex items-center text-sm font-bold text-brand-red uppercase tracking-wider">
                      Explore Use Case{" "}
                      <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
