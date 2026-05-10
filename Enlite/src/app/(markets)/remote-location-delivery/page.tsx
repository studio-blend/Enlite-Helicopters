import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mountain, Wind, Battery, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Remote Location Delivery",
  description: "Reliable supply chain connections for mountainous, island, and rural areas using autonomous heavy-lift helicopters.",
};

const features = [
  {
    icon: <Mountain className="w-6 h-6" />,
    title: "Terrain Independent",
    description: "Mountains, valleys, and rivers are no longer obstacles. Fly directly over impassable terrain.",
  },
  {
    icon: <Wind className="w-6 h-6" />,
    title: "All-Weather Capability",
    description: "Engineered to withstand high winds and challenging weather conditions that ground smaller battery drones.",
  },
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: "Medical Evacuation & Supply",
    description: "Deliver life-saving medical supplies, vaccines, and disaster relief aid to cut-off communities instantly.",
  },
  {
    icon: <Battery className="w-6 h-6" />,
    title: "Extended Endurance",
    description: "With a 3-hour flight endurance, reach deep into remote territories and return without needing refueling infrastructure.",
  },
];

export default function RemoteLocationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-border-default overflow-hidden bg-bg-hero">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/why-1.png"
            alt="Remote location delivery helicopter"
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
              Civilian Logistics
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-text-hero mb-6">
              Remote Location <br />
              <span className="text-brand-red">Delivery</span>
            </h1>
            <p className="text-xl text-text-hero/80 max-w-2xl leading-relaxed mb-10">
              Connecting the disconnected. Delivering 70 kg of essential supplies to mountainous, island, and rural areas lacking reliable surface infrastructure.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-brand-red hover:bg-brand-red-hover text-white px-8">
                  Discuss Your Requirements
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
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-bg-tertiary border border-border-default">
                <Image 
                  src="/images/hero.png" 
                  alt="Enlite helicopter over mountains" 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 1024px) 100vw, 50vw" 
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Overcoming <span className="text-brand-red">Geography</span>
              </h2>
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                <p>
                  For many regions in India and worldwide, building and maintaining road infrastructure is ecologically destructive and economically unviable. During monsoons or natural disasters, these fragile links are severed completely.
                </p>
                <p>
                  Enlite autonomous helicopters act as an instant, resilient supply chain. Requiring zero ground infrastructure other than a clear landing spot, they provide reliable logistics for mining operations, remote healthcare facilities, and disconnected communities.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-bg-secondary border-y border-border-default">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-16">Operational Capabilities</h2>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature, i) => (
              <StaggerItem key={i}>
                <div className="bg-bg-card border border-border-default rounded-2xl p-8 h-full hover:border-brand-red/30 transition-colors flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Need logistics in hard-to-reach areas?</h2>
            <Link href="/contact">
              <Button size="lg" className="bg-brand-red hover:bg-brand-red-hover text-white px-10 py-6 h-auto text-lg mt-8">
                Contact Us <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
