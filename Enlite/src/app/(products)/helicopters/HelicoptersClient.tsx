"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { Helicopter } from "@/types";

interface HelicoptersClientProps {
  helicopters: Helicopter[];
  brochureUrl?: string;
}

const markets = [
  { 
    image: "/images/civilian.png", 
    title: "Intercity Cargo Delivery",
    description: "Enlite's unmanned helicopters enable fast, reliable, and cost-effective intercity cargo transport. With a 70 kg payload, 500 km range, and 200 km/h speed, they outperform road logistics and traditional air cargo for medium-distance deliveries. Requiring minimal ground infrastructure and offering a 10-minute turnaround, they are ideal for time-critical cargo such as medical supplies, e-commerce shipments, and industrial spares."
  },
  { 
    image: "/images/hero.png", 
    title: "Remote Location Delivery",
    description: "Enlite's unmanned helicopters enable reliable cargo delivery to hard-to-reach locations. With a 500 km range, 70 kg payload, and terrain-following navigation, they transport medical supplies, relief materials, and critical equipment to remote villages, mountainous regions, border outposts, and offshore facilities."
  },
  { 
    image: "/images/defence.png", 
    title: "Defense Application",
    description: "Enlite's unmanned helicopters provide tactical advantage and operational flexibility for defense logistics. With a 70 kg payload, 500 km range, and 200 km/h speed, they enable rapid resupply of forward operating bases and border outposts."
  },
];

function MarketCard({ market }: { market: typeof markets[0] }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] [perspective:1000px] group">
      <div 
        className={`w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Front Face */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-bg-card border border-border-default rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div className="relative flex-1 overflow-hidden bg-bg-tertiary">
            <Image 
              src={market.image} 
              alt={market.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
              sizes="(max-width: 768px) 100vw, 33vw" 
            />
          </div>
          <div className="p-5 flex justify-between items-center bg-bg-card border-t border-border-default">
            <h3 className="text-base font-bold text-text-primary truncate pr-4">{market.title}</h3>
            <button 
              onClick={() => setIsFlipped(true)}
              className="text-sm font-medium text-text-secondary hover:text-brand-red transition-colors shrink-0"
            >
              View more
            </button>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-bg-card border border-border-default rounded-xl p-6 md:p-8 flex flex-col shadow-lg overflow-y-auto custom-scrollbar">
          <h3 className="text-lg font-bold text-text-primary underline decoration-brand-red/50 decoration-2 underline-offset-4 mb-6">{market.title}</h3>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed flex-1">
            {market.description}
          </p>
          <div className="mt-6 flex justify-center border-t border-border-light pt-4">
            <button 
              onClick={() => setIsFlipped(false)}
              className="text-sm font-medium text-text-secondary hover:text-brand-red transition-colors"
            >
              View less
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HelicoptersClient({ helicopters, brochureUrl = "/enlite-helicopters-product-brochure" }: HelicoptersClientProps) {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-bg-primary text-center">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-text-primary">
              Our Products
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Helicopters List */}
      {helicopters.map((helicopter, index) => (
        <section key={helicopter.id} className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <ScrollReveal direction={index % 2 === 0 ? "left" : "right"} className={index % 2 === 0 ? "" : "order-1 lg:order-2"}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-tertiary">
                  {helicopter.image && (
                    <Image 
                      src={helicopter.image} 
                      alt={helicopter.name} 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-500" 
                      sizes="(max-width: 1024px) 100vw, 50vw" 
                      priority={index === 0}
                    />
                  )}
                </div>
              </ScrollReveal>
              <ScrollReveal direction={index % 2 === 0 ? "right" : "left"} className={index % 2 === 0 ? "" : "order-2 lg:order-1"}>
                <div>
                  <h2 className="text-4xl font-bold mb-6">
                    Enlite <span className="text-brand-red">{helicopter.name.split(' ').pop()}</span>
                  </h2>
                  <p className="text-text-secondary text-lg leading-relaxed mb-8">
                    {helicopter.description}
                  </p>
                  <Link href={`/helicopters/${helicopter.slug}`}>
                    <Button size="lg" className="bg-brand-red hover:bg-brand-red-hover text-white rounded-md px-8">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* Markets & Brochure */}
      <section className="py-24 bg-bg-secondary border-t border-border-default mt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-12 text-center">
              Markets
            </h2>
          </ScrollReveal>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {markets.map((market, i) => (
              <StaggerItem key={i} className="h-full">
                <MarketCard market={market} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mb-16">
            <ScrollReveal>
              <Link href="/markets">
                <Button size="lg" className="bg-brand-red hover:bg-brand-red-hover text-white px-10 py-6 h-auto text-lg font-bold">
                  Explore All Use Cases <ArrowRight className="ml-2 w-5 h-5 inline" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="bg-bg-tertiary rounded-2xl p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-border-default">
              <div>
                <h3 className="text-2xl font-bold mb-2">Company Brochure</h3>
                <p className="text-text-secondary">Download our complete portfolio and technical specifications.</p>
              </div>
              <a href={brochureUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="shrink-0 bg-bg-primary !text-brand-red !border-brand-red hover:!bg-brand-red hover:!text-white hover:!border-brand-red px-8 transition-all duration-300" iconRight={<Download className="w-4 h-4" />}>
                  Download PDF
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
