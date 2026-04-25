import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Users, Target, Lightbulb, Zap, Rocket, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";

export const metadata: Metadata = { title: "About" };

const values = [
  { 
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop", 
    title: "Engineering Excellence", 
    description: "Our team of experts continuously pushes the boundaries of aerospace technology, focusing on robust and scalable designs." 
  },
  { 
    image: "https://images.unsplash.com/photo-1580893223894-2b24de58e5fe?w=800&h=600&fit=crop", 
    title: "Reliability in Real-World Operations", 
    description: "We build platforms meant to endure extreme conditions and deliver consistent performance, day in and day out." 
  },
  { 
    image: "https://images.unsplash.com/photo-1534481016308-0fca71578ae5?w=800&h=600&fit=crop", 
    title: "Indigenous Capability", 
    description: "Proudly designed and manufactured in India, strengthening the nation's self-reliance in advanced aviation technology." 
  },
];

const stats = [
  { label: "Year Founded", value: "2020" },
  { label: "Max Speed", value: "200 km/h" },
  { label: "Flight Range", value: "500 km" },
  { label: "Make in India", value: "70%" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="bg-bg-hero pt-32 pb-20 border-b border-border-default transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
             <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-text-hero mb-4">
               About Us
             </h1>
             <p className="text-xl text-text-hero/80 max-w-2xl leading-relaxed">
               Powering the next generation of aerial transport through innovation and excellence.
             </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Shaping the Future (Stats) ─────────────────────── */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <ScrollReveal direction="left">
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Shaping the Future of <span className="text-brand-red">Aerial Logistics</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed border-l-2 border-brand-red pl-8">
                <p>
                  Enlite Helicopters Private Limited was incorporated to revolutionize aerial logistics. We design, develop and operate large cargo carrying unmanned helicopters for Civilian and Defence Applications.
                </p>
                <p>
                  With 70% of the components manufactured in India, our unmanned helicopters outperform multicopter drones in speed, range, endurance, payload capacity and turn around time.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-border-default">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-brand-red mb-2">{stat.value}</div>
                  <div className="text-sm text-text-secondary font-medium uppercase tracking-wider mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Who we are? ────────────────────────── */}
      <section className="py-24 bg-bg-secondary border-y border-border-default">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal direction="left">
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Who we <span className="text-brand-red">are?</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed border-l-2 border-brand-red pl-8">
                <p>
                  Enlite is India's first aviation startup focused on designing and manufacturing unmanned, autonomous cargo helicopters.
                </p>
                <p>
                  Founded with a vision to revolutionize intercity and remote logistics, our team brings together decades of expertise in aerospace engineering, avionics, and autonomous systems.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── What we do? ────────────────────────── */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed border-r-2 border-brand-red pr-8 text-right">
                <p>
                  We are building a scalable, autonomous logistics network capable of moving heavy cargo across long distances, bypassing traditional road infrastructure.
                </p>
                <p>
                  By combining the vertical takeoff capabilities of helicopters with state-of-the-art autonomous flight technology, we provide an efficient, cost-effective, and rapid delivery solution.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="order-1 lg:order-2 text-right lg:text-left">
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                What we <span className="text-brand-red">do?</span>
              </h2>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Unmanned Cargo Helicopters ─────────────── */}
      <section className="py-32 bg-bg-secondary border-y border-border-default overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal direction="left">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">
                Unmanned Cargo <br /><span className="text-brand-red">Helicopters</span>
              </h2>
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed border-l-2 border-brand-red pl-8">
                <p>
                  In the last few years the global drone industry has grown by leaps and bounds. However drone regulation in India has also accelerated this growth trajectory and paved the way for Indian drone companies to compete internationally.
                </p>
                <p>
                  We have chosen to take up challenging tasks such as aerial assistance platforms for missions and vaccines to remote, hilly, and inaccessible locations.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="relative">
               <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                 <Image src="https://images.unsplash.com/photo-1534481016308-0fca71578ae5?w=1200&h=800&fit=crop" alt="Innovation" fill className="object-cover" />
                 <div className="absolute inset-0 bg-brand-red/10 mix-blend-multiply" />
               </div>
               <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-red rounded-full flex items-center justify-center text-white font-bold text-center p-4 shadow-xl z-10">
                 Made in India
               </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Redefining Drone Technology ────────────── */}
      <section className="py-32 bg-bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal direction="left" className="order-2 lg:order-1 relative">
               <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                 <Image src="https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200&h=800&fit=crop" alt="Technology" fill className="object-cover" />
                 <div className="absolute inset-0 bg-brand-red/10 mix-blend-multiply" />
               </div>
               <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-red rounded-full flex items-center justify-center text-white font-bold text-center p-4 shadow-xl z-10">
                 Future Ready
               </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">
                Redefining Drone <br /><span className="text-brand-red">Technology</span>
              </h2>
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed border-l-2 border-brand-red pl-8">
                <p>
                  Traditional Multicopter Drones fly at a top speed of around 60 km/h with a range of 5-8 km. These battery-operated drones have an endurance of under 30 mins and max payload capacity is only around 2 to 5 kg.
                </p>
                <p>
                  Enlite is taking this technology to the next level. With experts from industry-leading companies like Airbus and ADA, our product has reached a high level of maturity, offering 500+ km range and 70-100 kg payload capacity.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────── */}
      <section className="py-32 bg-bg-secondary border-y border-border-default">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl font-bold tracking-tight mb-4">Our Core Values</h2>
              <p className="text-text-secondary text-lg">The principles that guide every aircraft we design.</p>
            </div>
          </ScrollReveal>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((v, i) => (
              <StaggerItem key={i}>
                <div className="rounded-xl overflow-hidden bg-bg-card border border-border-default hover:shadow-xl hover:border-brand-red/30 transition-all duration-300 h-full flex flex-col group">
                  <div className="relative aspect-[4/3] bg-bg-tertiary overflow-hidden">
                     <Image src={v.image} alt={v.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                    <p className="text-text-secondary leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Contact CTA ─────────────────────────── */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-brand-red rounded-3xl p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
               </svg>
            </div>
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's build the future together.</h2>
              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                Whether you're an investor, partner, or potential team member, we'd love to hear from you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-brand-red hover:bg-gray-100 px-10 py-4 h-auto text-lg">
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/investor">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 py-4 h-auto text-lg">
                    Investor Relations
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
