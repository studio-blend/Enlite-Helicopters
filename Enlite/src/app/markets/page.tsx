import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, Mountain, ShieldPlus, Crosshair } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Markets | Enlite Helicopters",
  description: "Explore the civilian and defence markets served by Enlite's autonomous cargo helicopters, including intercity delivery, remote logistics, medical supply, and tactical resupply.",
};

const markets = [
  {
    id: "intercity",
    title: "Intercity Cargo Delivery",
    category: "Civilian Logistics",
    description: "Rapid transportation of high-value goods between urban centers, bypassing ground congestion with a 500 km range.",
    href: "/markets/intercity-cargo-delivery",
    image: "/images/civilian.png",
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: "remote",
    title: "Remote Location Delivery",
    category: "Civilian Logistics",
    description: "Reliable supply chain connections for mountainous, island, and rural areas using autonomous heavy-lift helicopters.",
    href: "/markets/remote-location-delivery",
    image: "/images/why-1.png",
    icon: <Mountain className="w-5 h-5" />,
  },
  {
    id: "medical",
    title: "Medical & Emergency",
    category: "Critical Response",
    description: "Swift, autonomous delivery of critical medical supplies, organs, and disaster relief aid within the golden hour.",
    href: "/markets/medical-emergency-delivery",
    image: "/images/why-3.png",
    icon: <ShieldPlus className="w-5 h-5" />,
  },
  {
    id: "defence",
    title: "Defence Applications",
    category: "Tactical Resupply",
    description: "Tactical autonomous logistics for forward operating bases. Low-altitude, stealthy supply delivery with heavy-lift capabilities.",
    href: "/markets/defence-applications",
    image: "/images/defence.png",
    icon: <Crosshair className="w-5 h-5" />,
  },
];

export default function MarketsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <section className="bg-bg-hero pt-32 pb-20 border-b border-border-default transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-text-hero">
              Markets & <span className="text-brand-red">Applications</span>
            </h1>
            <p className="text-xl text-text-hero/80 max-w-2xl mx-auto leading-relaxed">
              Discover how Enlite's autonomous heavy-lift cargo helicopters are transforming logistics across civilian and defence sectors.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Markets Grid */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <StaggerContainer className="grid md:grid-cols-2 gap-10">
            {markets.map((market) => (
              <StaggerItem key={market.id}>
                <Link href={market.href} className="group flex flex-col h-full bg-bg-card border border-border-default rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-red/30 transition-all duration-300">
                  <div className="relative aspect-[16/9] w-full bg-bg-tertiary overflow-hidden">
                    <Image
                      src={market.image}
                      alt={market.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/10">
                        {market.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
                      {market.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-text-primary group-hover:text-brand-red transition-colors">
                      {market.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-8 flex-1">
                      {market.description}
                    </p>
                    <div className="flex items-center text-sm font-bold text-brand-red uppercase tracking-wider">
                      Explore Use Case <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
