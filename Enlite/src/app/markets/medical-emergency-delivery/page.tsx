import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Timer, Activity, ShieldPlus, ThermometerSnowflake } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Medical & Emergency Logistics",
  description: "Swift, autonomous delivery of critical medical supplies, organs, and disaster relief aid with rapid response times and temperature-controlled cargo capabilities.",
};

const benefits = [
  {
    icon: <Timer className="w-6 h-6" />,
    title: "Golden Hour Delivery",
    description: "When every minute counts, bypass road traffic entirely to deliver life-saving supplies, antivenoms, or blood within the critical golden hour.",
  },
  {
    icon: <ThermometerSnowflake className="w-6 h-6" />,
    title: "Cold Chain Integrity",
    description: "Customizable cargo compartments support active temperature control for vaccines, organs, and temperature-sensitive pharmaceuticals.",
  },
  {
    icon: <ShieldPlus className="w-6 h-6" />,
    title: "Disaster Relief",
    description: "Deploy instant supply lines during floods or earthquakes when roads and bridges are washed out or impassable.",
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Hospital to Hospital",
    description: "VTOL capabilities allow direct landing and takeoff from existing hospital helipads, ensuring zero last-mile transfer delays.",
  },
];

export default function MedicalEmergencyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-border-default overflow-hidden bg-bg-hero">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/why-3.png"
            alt="Medical and emergency delivery helicopter"
            fill
            className="object-cover opacity-20 scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 to-bg-primary" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-bold uppercase tracking-wider mb-6">
              Critical Response
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-text-hero mb-6">
              Medical & Emergency <br />
              <span className="text-brand-red">Logistics</span>
            </h1>
            <p className="text-xl text-text-hero/80 max-w-2xl leading-relaxed mb-10">
              Swift delivery of critical medical supplies, organs, and disaster relief aid. Bypassing ground congestion to save lives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-brand-red hover:bg-brand-red-hover text-white px-8">
                  Partner with Us
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Seconds Save <span className="text-brand-red">Lives</span>
              </h2>
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                <p>
                  In medical emergencies, road infrastructure is too slow, and traditional manned medevac helicopters are scarce and prohibitively expensive for routine transport of blood, organs, and emergency medical equipment.
                </p>
                <p>
                  Enlite's autonomous heavy-lift platforms provide hospitals and disaster relief agencies with a dedicated, high-speed aerial corridor. With a 70 kg payload and 200 km/h cruising speed, critical care logistics become predictable, rapid, and cost-effective.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-bg-tertiary border border-border-default">
                <Image 
                  src="/images/solution.png" 
                  alt="Enlite helicopter providing medical aid" 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 1024px) 100vw, 50vw" 
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-bg-secondary border-y border-border-default">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-16">Critical Capabilities</h2>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <StaggerItem key={i}>
                <div className="bg-bg-card border border-border-default rounded-2xl p-8 h-full hover:border-brand-red/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {benefit.description}
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Equip Your Healthcare Network</h2>
            <p className="text-lg text-text-secondary mb-10">
              Speak with our integration team to establish high-speed aerial medical corridors for your institution.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-brand-red hover:bg-brand-red-hover text-white px-10 py-6 h-auto text-lg">
                Contact Our Team <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
