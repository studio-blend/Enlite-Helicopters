import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, Clock, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Intercity Cargo Delivery",
  description: "Rapid, autonomous transportation of high-value goods between urban centers, bypassing ground congestion with 500 km range.",
};

const benefits = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Fraction of the Time",
    description: "Bypass traffic and indirect road routes. Deliver 70 kg of cargo between cities like Chennai and Bangalore in under 2 hours.",
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "High Payload Capacity",
    description: "Unlike multi-rotor drones that carry 2-5 kg, our autonomous helicopters carry up to 70 kg (300 L volume) per trip.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Secure & Tracked",
    description: "Continuous telemetry and custom cargo compartments ensure high-value and sensitive goods arrive safely.",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Point-to-Point",
    description: "VTOL capability means no runway required. Launch from a warehouse in City A and land directly at a distribution center in City B.",
  },
];

export default function IntercityCargoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 border-b border-border-default overflow-hidden bg-bg-hero">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/civilian.png"
            alt="Intercity cargo delivery helicopter"
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
              Intercity Cargo <br />
              <span className="text-brand-red">Delivery</span>
            </h1>
            <p className="text-xl text-text-hero/80 max-w-2xl leading-relaxed mb-10">
              The fastest way to move mid-weight cargo between urban centers. Say goodbye to highway congestion, toll delays, and overnight trucking constraints.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-brand-red hover:bg-brand-red-hover text-white px-8">
                  Request a Payload Trial
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
                Redefining the <span className="text-brand-red">Middle Mile</span>
              </h2>
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                <p>
                  Today's logistics networks are constrained by surface infrastructure. Trucks are delayed by traffic, poor road conditions, and regulatory checkpoints. While battery-powered drones offer a solution for last-mile micro-deliveries (2-5 kg), they lack the range and capacity for serious intercity logistics.
                </p>
                <p>
                  Enlite's autonomous cargo helicopters bridge this gap. Operating at 200 km/h with a 500 km range, they serve as high-speed aerial bridges between distribution centers in different cities.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-bg-tertiary border border-border-default">
                <Image 
                  src="/images/solution.png" 
                  alt="Enlite helicopter over city" 
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
            <h2 className="text-3xl font-bold text-center mb-16">Key Advantages</h2>
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to upgrade your logistics network?</h2>
            <p className="text-lg text-text-secondary mb-10">
              Speak with our integration team to see how Enlite can reduce your intercity transit times by up to 80%.
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
