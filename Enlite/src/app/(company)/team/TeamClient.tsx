"use client";

import Image from "next/image";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface TeamClientProps {
  team: TeamMember[];
}

export default function TeamClient({ team }: TeamClientProps) {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* Hero */}
      <section className="bg-bg-hero pt-32 pb-20 border-b border-border-default transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-text-hero">
              Meet the Team
            </h1>
            <p className="text-xl text-text-hero/80 max-w-2xl mx-auto leading-relaxed">
              The visionary engineers, designers, and aerospace experts behind India's first autonomous heavy-lift cargo helicopters.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member) => (
              <StaggerItem key={member.id}>
                <div className="group flex flex-col h-full bg-bg-card border border-border-default rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-red/30 transition-all duration-300">
                  <div className="relative aspect-square w-full bg-bg-tertiary overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-red/20 to-brand-red/5">
                        <span className="text-6xl font-bold text-brand-red/40">{member.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-1 text-text-primary group-hover:text-brand-red transition-colors">{member.name}</h3>
                    <p className="text-brand-red text-sm font-semibold uppercase tracking-wider mb-4">{member.role}</p>
                    <p className="text-text-secondary leading-relaxed mb-6 flex-1">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      
      {/* Join Us CTA */}
      <section className="py-24 bg-bg-secondary border-t border-border-default text-center">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Want to fly with us?</h2>
            <p className="text-xl text-text-secondary mb-10 leading-relaxed">
              We are always looking for passionate individuals to join our mission of revolutionizing aerial logistics.
            </p>
            <a href="/careers" className="inline-block bg-brand-red hover:bg-brand-red-hover text-white text-base font-bold py-4 px-8 rounded-lg uppercase tracking-wider transition-colors">
              View Open Positions
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
