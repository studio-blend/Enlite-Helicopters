import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crosshair, Radar, Shield, PlaneTakeoff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Defence Applications",
  description: "Tactical autonomous logistics for forward operating bases. Low-altitude, stealthy supply delivery with heavy-lift capabilities.",
};

const capabilities = [
  {
    icon: <PlaneTakeoff className="w-6 h-6" />,
    title: "High-Altitude Operations",
    description: "Specialized variants engineered with an operational ceiling of 20,000 ft and capable of delivering 50 kg payloads to high-altitude outposts.",
  },
  {
    icon: <Radar className="w-6 h-6" />,
    title: "Stealth & Evasion",
    description: "Low-altitude, terrain-following autonomous flight paths minimize radar cross-section and detection probability in hostile zones.",
  },
  {
    icon: <Crosshair className="w-6 h-6" />,
    title: "Precision Drops",
    description: "GPS-denied navigation capabilities and precision airdrop mechanisms for supplying moving units without landing.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Risk Reduction",
    description: "Eliminate the need to put human pilots or vulnerable supply convoys at risk for routine tactical resupply missions.",
  },
];

export default function DefenceApplicationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-border-default overflow-hidden bg-bg-hero">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/defence.png"
            alt="Defence and tactical operations helicopter"
            fill
            className="object-cover opacity-30 scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 to-bg-primary" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-slate-300 text-xs font-bold uppercase tracking-wider mb-6">
              Defence Operations
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-text-hero mb-6 uppercase">
              Tactical <br />
              <span className="text-slate-400">Resupply</span>
            </h1>
            <p className="text-xl text-text-hero/80 max-w-2xl leading-relaxed mb-10">
              Autonomous logistics for forward operating bases. Safe delivery of ammunition, fuel, and supplies to the front lines without risking human life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-slate-700 hover:bg-slate-600 text-white px-8 border-none">
                  Request Defence Briefing
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Defense Context */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Redefining the <span className="text-slate-400">Kill Chain Logistics</span>
              </h2>
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed border-l-2 border-slate-700 pl-6">
                <p>
                  In modern warfare, logistics convoys are often the most vulnerable targets. Manned helicopters are expensive assets that are risky to deploy for routine resupply, while ground convoys are susceptible to ambushes and IEDs.
                </p>
                <p>
                  Enlite's autonomous heavy-lift platforms provide a resilient, distributed logistics network. Operating independently of runways or roads, they ensure forward operating bases receive continuous resupply even in contested environments.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-bg-tertiary border border-border-default">
                <Image 
                  src="/images/defence.png" 
                  alt="Tactical operations" 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 1024px) 100vw, 50vw" 
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-bg-secondary border-y border-border-default">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-widest text-slate-400">Tactical Capabilities</h2>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {capabilities.map((cap, i) => (
              <StaggerItem key={i}>
                <div className="bg-bg-card border border-border-default rounded-2xl p-8 h-full hover:border-slate-700 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 mb-6">
                    {cap.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{cap.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 bg-bg-primary text-center">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Equip Your Forces</h2>
            <p className="text-lg text-text-secondary mb-10">
              Contact our defence integration team to discuss specialized variants and tactical deployment.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-slate-700 hover:bg-slate-600 text-white px-10 py-6 h-auto text-lg border-none">
                Procurement Inquiry <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
