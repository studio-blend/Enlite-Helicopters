"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { Helicopter, Article } from "@/types";

interface HomeClientProps {
  helicopters: Helicopter[];
  articles: Article[];
  partners: { id: string; name: string; logo: string; url?: string }[];
  homeData?: {
    heroTitle?: string;
    heroSubtitle?: string;
    heroDescription?: string;
    heroImage?: string;
    solutionTitle?: string;
    solutionDescription?: string;
    solutionImage?: string;
    stats?: { label: string; value: string }[];
  };
}

const features = [
  { image: "/images/why-1.png", title: "Road Infrastructure is Limited & Expensive", description: "Heavy trucks are delayed by poor roads, traffic, and terrain. And fuel-dependent, making them extremely inefficient for remote, hilly, and off-shore deliveries." },
  { image: "/images/why-2.png", title: "Battery-Powered Drones Fall Short in Range", description: "Small drones can only carry small payloads over short distances, restricting them to urban micro-delivery. They cannot handle intercity logistics." },
  { image: "/images/why-3.png", title: "Manned Helicopters Are Expensive and Inflexible", description: "Traditional helicopters are prone to human error and require complex operations and high operating costs, making them unviable for routine autonomous delivery." },
];

const stats = [
  { label: "Payload Capacity", value: "100 kg" },
  { label: "Range", value: "500 km" },
  { label: "Max Speed", value: "260 km/h" },
  { label: "Endurance", value: "3 hours" },
  { label: "Cargo Space", value: "1.2 m³" },
];

const solutionTags = ["Autonomous", "VTOL Capable", "High Payload", "Cost Effective", "Rapid Response"];

export default function HomeClient({ helicopters, articles, partners, homeData }: HomeClientProps) {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-bg-hero pt-32 pb-24 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-bg-primary/20 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 z-[-1]">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover scale-105"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-mountain-landscape-4028-large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl lg:text-8xl font-bold text-text-primary leading-[1] tracking-tighter mb-6">
              {homeData?.heroTitle ? (
                <span dangerouslySetInnerHTML={{ __html: homeData.heroTitle.replace("Enlite", '<span class="text-brand-red">Enlite</span>') }} />
              ) : (
                <><span className="text-brand-red">Enlite</span> Helicopters</>
              )}
            </h1>
            <p className="text-xl lg:text-2xl text-text-primary/90 font-medium mb-4">
              {homeData?.heroSubtitle || "Autonomous Cargo Helicopters for Long-Range Logistics"}
            </p>
            <p className="text-base text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              {homeData?.heroDescription || "Headquartered in Tamil Nadu, Enlite is designing and developing autonomous, unmanned cargo helicopters."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/helicopters">
                <Button size="lg" className="bg-brand-red hover:bg-brand-red-hover text-white border-none px-8 py-3 h-auto text-sm font-semibold uppercase tracking-wider">
                  Our Helicopters
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="bg-brand-red hover:bg-brand-red-hover text-white border-none px-8 py-3 h-auto text-sm font-semibold uppercase tracking-wider">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-white/10 border-y border-white/10">
            {(homeData?.stats || stats).map((stat, i) => (
              <div key={i} className="px-6 py-6 text-center flex flex-col items-center justify-center">
                <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">{stat.label}</div>
                <div className="text-lg font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Current Logistics Solutions Don't Scale? */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-16">
              Why Current Logistics Solutions Don't Scale?
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <StaggerItem key={i}>
                <div className="rounded-xl bg-bg-card border border-border-default overflow-hidden group hover:border-brand-red/30 hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={feature.image} alt={feature.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* The Enlite Solution */}
      <section className="py-24 bg-bg-secondary border-y border-border-default">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-bg-tertiary">
               <Image src={homeData?.solutionImage || "/images/solution.png"} alt="Enlite autonomous cargo helicopter in flight" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <ScrollReveal direction="right">
              <h2 className="text-3xl font-bold mb-6">
                {homeData?.solutionTitle ? (
                  <span dangerouslySetInnerHTML={{ __html: homeData.solutionTitle.replace("Enlite", '<span class="text-brand-red">Enlite</span>') }} />
                ) : (
                  <>The <span className="text-brand-red">Enlite</span> Solution: A New Class of Aerial Logistics</>
                )}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                {homeData?.solutionDescription || "Enlite Helicopters introduces a new class of cargo helicopters designed to combine the heavy-lift capabilities of traditional helicopters with the cost efficiency and autonomy of modern drones. Our platforms are built for intercity, high-payload cargo logistics, enabling businesses to scale deliveries effortlessly across regions."}
              </p>
              <div className="flex flex-wrap gap-3">
                {solutionTags.map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-brand-red text-white text-xs font-bold uppercase tracking-wider rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The Enlite Aircraft */}
      <section className="py-24 bg-bg-primary text-center">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              The <span className="text-brand-red">Enlite</span> Aircraft
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-16 max-w-3xl mx-auto">
              Enlite Helicopters has pioneered the next era of logistics with our class of cargo helicopters. Built for speed, endurance, and reliability, these aircraft deliver unmatched performance in intercity, remote, and offshore delivery operations.
            </p>
            <div className="relative max-w-5xl mx-auto aspect-video mb-16 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-black">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
                poster="/images/aircraft.png"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-down-a-mountain-41541-large.mp4" type="video/mp4" />
              </video>
            </div>
          </ScrollReveal>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
            {[
              "Fully Autonomous", "Obstacle Avoidance", "Terrain Following",
              "Fail-safe GPS Navigation", "Real-time Telemetrics",
              "Redundant Communication", "Custom Cargo Compartment"
            ].map((f, i) => (
              <StaggerItem key={i}>
                <div className="flex items-center gap-3 p-4 bg-bg-card border border-border-default rounded-xl shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-brand-red shrink-0" />
                  <span className="text-sm font-semibold text-text-primary">{f}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Markets Scope */}
      <section className="py-24 bg-bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-20 uppercase tracking-widest">Markets Scope</h2>
          </ScrollReveal>

          <div className="space-y-32">
            {/* Civilian */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal direction="left">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-brand-red font-bold text-sm uppercase tracking-widest mb-4">Market Segment</h3>
                    <h2 className="text-5xl lg:text-6xl font-bold text-text-primary">CIVILIAN</h2>
                  </div>
                  <div className="space-y-6">
                    {[
                      { title: "Intercity Cargo Delivery", desc: "Rapid transportation of goods between urban centers, bypassing ground congestion." },
                      { title: "Remote Location Delivery", desc: "Reliable supply chain connection for mountainous, island, and rural areas." },
                      { title: "Medical & Emergency", desc: "Swift delivery of critical medical supplies, organs, and disaster relief aid." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
                        <div>
                          <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                          <p className="text-text-secondary">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image src="/images/civilian.png" alt="Civilian Cargo Operations" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <p className="text-white font-bold text-2xl">Urban Logistics</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Defence */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <ScrollReveal direction="left">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                    <Image src="/images/defence.png" alt="Defence Cargo Operations" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-8 left-8">
                      <p className="text-white font-bold text-2xl">Tactical Resupply</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
              <div className="order-1 lg:order-2">
                <ScrollReveal direction="right">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-brand-red font-bold text-sm uppercase tracking-widest mb-4">Market Segment</h3>
                      <h2 className="text-5xl lg:text-6xl font-bold text-text-primary">DEFENCE</h2>
                    </div>
                    <div className="space-y-6">
                      {[
                        { title: "Last-Mile Tactical Logistics", desc: "Safe delivery of ammunition, fuel, and supplies to forward operating bases." },
                        { title: "Stealthy Operations", desc: "Low-altitude, autonomous flight paths to minimize radar detection." },
                        { title: "Heavy-Lift Capabilities", desc: "Transporting critical equipment in rugged terrains where trucks cannot reach." }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4 group">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
                          <div>
                            <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                            <p className="text-text-secondary">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      {partners.length > 0 && (
        <section className="py-24 bg-bg-secondary border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-center mb-16 uppercase tracking-widest text-text-muted">Featured In & Trusted By</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 items-center justify-items-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {partners.map((partner) => (
                  <div key={partner.id} className="relative h-10 w-full max-w-[140px] group">
                    {partner.url ? (
                      <a href={partner.url} target="_blank" rel="noopener noreferrer">
                        <Image src={partner.logo} alt={partner.name} fill className="object-contain transition-transform duration-300 group-hover:scale-110" />
                      </a>
                    ) : (
                      <Image src={partner.logo} alt={partner.name} fill className="object-contain transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Latest News */}
      <section className="py-24 lg:py-32 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-text-primary mb-3">
                  Latest News
                </h2>
                <p className="text-lg text-text-secondary">
                  Stay updated with our latest developments, milestones, and industry insights.
                </p>
              </div>
              <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-brand-red transition-colors group">
                All Articles <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article) => {
              const href = article.externalLink || `/news/${article.slug}`;
              const isExternal = !!article.externalLink;
              return (
                <StaggerItem key={article.id}>
                  <Link 
                    href={href} 
                    className="group block h-full"
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                  <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-bg-card border border-border-default transition-all duration-300 hover:shadow-xl hover:shadow-black/10">
                    <div className="relative aspect-[16/10] overflow-hidden bg-bg-tertiary">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-brand-red text-white shadow-md">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-brand-red transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-text-secondary text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs font-medium text-text-muted pt-5 border-t border-border-light">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readingTime} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
