"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Download, MapPin, Play, X } from "lucide-react";
import { DynamicVideoPlayer } from "@/components/shared/DynamicVideoPlayer";
import { VideoModal } from "@/components/shared/VideoModal";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { RangeMap } from "@/components/ui/RangeMap";
import { CountUp } from "@/components/ui/CountUp";
import { Helicopter, Article } from "@/types";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { useTheme } from "@/components/shared/ThemeProvider";
import { cn } from "@/lib/utils";

interface HomeClientProps {
  helicopters: Helicopter[];
  articles: Article[];
  partners: { id: string; name: string; logo: string; url?: string }[];
  homeData?: {
    heroTitle?: string;
    heroSubtitle?: string;
    heroDescription?: string;
    heroImageLight?: string;
    heroImageDark?: string;
    solutionTitle?: string;
    solutionDescription?: string;
    solutionImage?: string;
    solutionVideoUrl?: string;
    solutionTags?: string[];
    missionTitle?: string;
    missionSubtitle?: string;
    missionDescription?: string;
    missionVideoUrl?: string;
    missionThumbnail?: string;
    stats?: { label: string; value: string }[];
    featuresTitle?: string;
    features?: { title: string; description: string; image: string }[];
    aircraftTitle?: string;
    aircraftDescription?: string;
    aircraftImage?: string;
    aircraftFeatures?: string[];
    testingTitle?: string;
    testingDescription?: string;
    testingVideos?: { title: string; subtitle: string; videoUrl: string; thumbnail: string }[];
    rangeTitle?: string;
    rangeDescription?: string;
    rangeBullets?: string[];
    videoPlayMode?: "click" | "scroll";
    testingVideoPlayMode?: "click" | "scroll";
  };
}

const features = [
  { image: "/images/why-1.png", title: "Road Infrastructure is Limited & Expensive", description: "Heavy trucks are delayed by poor roads, traffic, and terrain. And fuel-dependent, making them extremely inefficient for remote, hilly, and off-shore deliveries." },
  { image: "/images/why-2.png", title: "Battery-Powered Drones Fall Short in Range", description: "Small drones can only carry small payloads over short distances, restricting them to urban micro-delivery. They cannot handle intercity logistics." },
  { image: "/images/why-3.png", title: "Manned Helicopters Are Expensive and Inflexible", description: "Traditional helicopters are prone to human error and require complex operations and high operating costs, making them unviable for routine autonomous delivery." },
];

const stats = [
  { label: "Payload Capacity", value: "70 kg" },
  { label: "Range", value: "500 km" },
  { label: "Max Speed", value: "200 km/h" },
  { label: "Endurance", value: "3 hours" },
  { label: "Cargo Space", value: "300 L" },
  { label: "Turn Around Time", value: "10 mins" },
];

const solutionTags = ["Autonomous", "VTOL Capable", "High Payload", "Cost Effective", "Rapid Response"];

export default function HomeClient({ helicopters, articles, partners, homeData }: HomeClientProps) {
  const { theme } = useTheme();

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo || ""}
      />
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-24 text-center overflow-hidden">
        <HeroBackground />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl lg:text-8xl font-bold text-text-primary leading-[1] tracking-tighter mb-6">
              {homeData?.heroTitle ? (
                <span dangerouslySetInnerHTML={{ __html: homeData.heroTitle.replace("Enlite", '<span class="text-brand-red">Enlite</span>') }} />
              ) : (
                <><span className="text-brand-red">Enlite</span><br />Helicopters</>
              )}
            </h1>
            <p className="text-xl lg:text-2xl text-text-primary/90 font-medium mb-6">
              {homeData?.heroSubtitle || "Autonomous Cargo Helicopters for Long-Range Logistics"}
            </p>
            <p className="text-base text-text-secondary max-w-xl mb-10 leading-relaxed">
              {homeData?.heroDescription || "Headquartered in Tamil Nadu, Enlite is designing and developing autonomous, unmanned cargo helicopters."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/helicopters">
                <Button size="lg" className="bg-brand-red hover:bg-brand-red-hover text-white border-none px-8 py-3 h-auto text-sm font-semibold uppercase tracking-wider">
                  Our Helicopters
                </Button>
              </Link>
              <a href="/enlite-brochure.pdf" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-border-default hover:bg-bg-tertiary text-text-primary px-8 py-3 h-auto text-sm font-semibold uppercase tracking-wider flex items-center gap-2 backdrop-blur-sm">
                  <Download className="w-4 h-4" /> Download Brochure
                </Button>
              </a>
            </div>
          </motion.div>

          {/* 3D Helicopter Render */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="relative perspective-[1000px]"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateZ: [0, 1, 0, -1, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative aspect-square w-full max-w-[600px] mx-auto flex items-center justify-center"
            >
              <Image
                src={theme === "dark"
                  ? (homeData?.heroImageDark || "/images/hero-3d-dark.png")
                  : (homeData?.heroImageLight || "/images/hero-3d-light.png")}
                alt="Enlite autonomous heavy-lift cargo helicopter - 3D high-fidelity concept render"
                width={800}
                height={800}
                className={cn(
                  "object-contain transition-opacity duration-1000",
                  theme === "dark" ? "mix-blend-screen" : "mix-blend-multiply opacity-95"
                )}
                style={{
                  maskImage: "radial-gradient(circle, black 60%, transparent 95%)",
                  WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 95%)"
                }}
                priority
              />

              {/* Glow effect behind helicopter */}
              <div className="absolute inset-0 bg-brand-red/10 blur-[80px] rounded-full z-[-1]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-bg-secondary text-text-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 divide-x divide-border-default border-y border-border-default">
            {(homeData?.stats || stats).map((stat, i) => {
              // Parse number and suffix from string like "70 kg"
              const match = stat.value?.match(/^([\d.]+)\s*(.*)$/);
              const num = match ? parseFloat(match[1]) : 0;
              const suffix = match ? " " + match[2] : stat.value || "";

              return (
                <div key={i} className="px-6 py-6 text-center flex flex-col items-center justify-center">
                  <div className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">{stat.label}</div>
                  <div className="text-xl md:text-2xl font-bold text-text-primary">
                    {match ? <CountUp end={num} suffix={suffix} /> : stat.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Current Logistics Solutions Don't Scale? */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-16">
              {homeData?.featuresTitle || "Why Current Logistics Solutions Don't Scale?"}
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(homeData?.features || features).map((feature, i) => (
              <StaggerItem key={i}>
                <div className="rounded-xl bg-bg-card border border-border-default overflow-hidden group hover:border-brand-red/30 hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={feature.image} alt={`Logistics Challenge: ${feature.title}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
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

          <div className="mt-24">
            <ScrollReveal>
              <h3 className="text-2xl font-bold tracking-tight text-center mb-10">
                How <span className="text-brand-red">Enlite</span> Changes the Game
              </h3>
            </ScrollReveal>
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* The Enlite Solution */}
      <section className="py-24 bg-bg-secondary border-y border-border-default">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-bg-tertiary shadow-lg group">
              {homeData?.solutionVideoUrl ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
                  poster={homeData?.solutionImage || "/images/solution.png"}
                >
                  <source src={homeData.solutionVideoUrl} type="video/mp4" />
                </video>
              ) : (
                <Image src={homeData?.solutionImage || "/images/solution.png"} alt="Enlite R2 autonomous unmanned cargo helicopter performing a long-range logistics mission" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
            </div>
            <ScrollReveal direction="right">
              <h2 className="text-4xl font-bold mb-6">
                {homeData?.solutionTitle ? (
                  <span dangerouslySetInnerHTML={{ __html: homeData.solutionTitle.replace("Enlite", '<span class="text-brand-red">Enlite</span>') }} />
                ) : (
                  <>The <span className="text-brand-red">Enlite</span> Solution: A New Class of Aerial Logistics</>
                )}
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                {homeData?.solutionDescription || "We are bridging the gap between small-scale battery drones and expensive manned helicopters. Enlite introduces a dedicated class of autonomous cargo platforms designed specifically for the heavy-lift requirements of regional and intercity logistics."}
              </p>
              <div className="flex flex-wrap gap-3">
                {(homeData?.solutionTags || solutionTags).map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider rounded border border-brand-red/20">
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The Vision Behind Enlite (Founder & Mission) */}
      <section className="py-24 bg-bg-primary relative overflow-hidden border-b border-border-default">
        {/* Background Decorative Elements ... */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-red/5 blur-[120px] rounded-full translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-brand-red/5 blur-[100px] rounded-full -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <h3 className="text-brand-red font-bold text-sm uppercase tracking-widest mb-4">
                  {homeData?.missionSubtitle || "A Message from our Founder"}
                </h3>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                  {homeData?.missionTitle || "The Vision Behind Enlite"}
                </h2>
                <div className="relative pl-8 border-l-4 border-brand-red mb-10">
                  <p className="text-xl lg:text-2xl text-text-primary italic font-medium leading-relaxed">
                    {homeData?.missionDescription || "\"We didn't just build a helicopter; we built a lifeline for remote communities and a safer future for logistics.\""}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center text-brand-red font-bold text-lg border border-border-default">M</div>
                  <div>
                    <div className="font-bold text-text-primary">Mohanakannan</div>
                    <div className="text-sm text-text-muted italic opacity-80">Founder & CEO, Enlite Helicopters</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-3">
              <ScrollReveal direction="right">
                <DynamicVideoPlayer
                  videoUrl={homeData?.missionVideoUrl}
                  thumbnail={homeData?.missionThumbnail || "/images/hero.png"}
                  alt="Enlite Helicopters Founder Mohanakannan explaining the mission and vision"
                  playMode={homeData?.videoPlayMode}
                  type="inline"
                  className="aspect-video rounded-3xl overflow-hidden shadow-2xl"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* The Enlite Aircraft Special Features */}
      <section className="py-24 bg-bg-secondary text-center">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {homeData?.aircraftTitle ? (
                <span dangerouslySetInnerHTML={{ __html: homeData.aircraftTitle.replace("Enlite", '<span class="text-brand-red">Enlite</span>') }} />
              ) : (
                <>The <span className="text-brand-red">Enlite</span> Aircraft: Special Features</>
              )}
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-16 max-w-3xl mx-auto">
              {homeData?.aircraftDescription || "Engineered for precision and built for the extremes. Our aircraft are equipped with advanced sensor suites and redundant systems to ensure mission success in environments where traditional logistics fail."}
            </p>
            <div className="relative max-w-5xl mx-auto aspect-video mb-16 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-black">
              <Image
                src={homeData?.aircraftImage || "/images/aircraft.png"}
                alt="Enlite autonomous cargo helicopter fleet overview showing R2 and R3 technical specifications"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1024px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
            {(homeData?.aircraftFeatures || [
              "Fully Autonomous", "Obstacle Avoidance", "Terrain Following",
              "Fail-safe GPS Navigation", "Real-time Telemetrics",
              "Redundant Communication", "Custom Cargo Compartment"
            ]).map((f, i) => (
              <StaggerItem key={i}>
                <div className="flex items-center gap-3 p-4 bg-bg-card border border-border-default rounded-xl shadow-sm hover:border-brand-red/30 transition-colors group">
                  <div className="w-2 h-2 rounded-full bg-brand-red shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-sm font-semibold text-text-primary">{f}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Operational Range Map */}
      <section className="py-24 bg-bg-primary border-t border-border-default">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                {homeData?.rangeTitle ? (
                  <span dangerouslySetInnerHTML={{ __html: homeData.rangeTitle?.replace("Operational Range", '<span class="text-brand-red">Operational Range</span>') }} />
                ) : (
                  <>Unmatched <span className="text-brand-red">Operational Range</span></>
                )}
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-10">
                {homeData?.rangeDescription || "Enlite platforms are designed to operate where others can't. With a 500km range and 3-hour endurance, our helicopters bridge the gap between regional hubs and remote locations."}
              </p>
              <ul className="space-y-4 mb-10">
                {(homeData?.rangeBullets || [
                  "500km operational radius",
                  "3-hour flight endurance",
                  "All-weather capability",
                  "Remote & Offshore landing ready"
                ]).map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-text-primary font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    {item}
                  </li>
                ))}
              </ul>

            </ScrollReveal>
            <ScrollReveal direction="right" className="relative">
              <div className="flex flex-col items-center">
                <RangeMap />
                <Link href="/interactive-range" className="mt-8">
                  <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-colors flex items-center gap-2 group px-8">
                    Interactive Range Map <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Proven in Flight (Testing Gallery) */}
      <section className="py-24 bg-bg-secondary relative overflow-hidden border-y border-border-default">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <ScrollReveal direction="left">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  {homeData?.testingTitle || "Proven in Flight"}
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed">
                  {homeData?.testingDescription || "Our technology is not just on paper. We rigorously test our platforms in real-world conditions to ensure mission reliability across diverse environments."}
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal direction="right">
              <Link href="/gallery?filter=Flight Test">
                <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all group">
                  View More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(homeData?.testingVideos || []).map((test: any, i: number) => (
              <StaggerItem key={i}>
                <div className="group flex flex-col rounded-2xl overflow-hidden bg-bg-card border border-border-default hover:border-brand-red/30 transition-all duration-500 shadow-sm hover:shadow-xl">
                  <DynamicVideoPlayer
                    videoUrl={test.videoUrl}
                    thumbnail={test.thumbnail}
                    alt={test.title}
                    playMode={homeData?.testingVideoPlayMode || "scroll"}
                    type={homeData?.testingVideoPlayMode === "click" ? "modal" : "inline"}
                    onModalOpen={() => setSelectedVideo(test.videoUrl)}
                    className="aspect-video"
                  />
                  <div className="p-6">
                    <div className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2">{test.subtitle}</div>
                    <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-brand-red transition-colors">{test.title}</h3>
                  </div>
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
                      { title: "Intercity Cargo Delivery", desc: "Rapid transportation of goods between urban centers, bypassing ground congestion.", href: "/markets/intercity-cargo-delivery" },
                      { title: "Remote Location Delivery", desc: "Reliable supply chain connection for mountainous, island, and rural areas.", href: "/markets/remote-location-delivery" },
                      { title: "Medical & Emergency", desc: "Swift delivery of critical medical supplies, organs, and disaster relief aid.", href: "/markets/medical-emergency-delivery" }
                    ].map((item, i) => (
                      <Link href={item.href} key={i} className="flex gap-4 group cursor-pointer">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
                        <div>
                          <h4 className="font-bold text-xl mb-1 group-hover:text-brand-red transition-colors">{item.title}</h4>
                          <p className="text-text-secondary">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image src="/images/civilian.png" alt="Enlite R2 helicopter delivering heavy cargo in an urban intercity logistics scenario" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
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
                    <Image src="/images/defence.png" alt="Enlite R3 tactical helicopter performing autonomous resupply at high-altitude defence outpost" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
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
                        <Link href="/markets/defence-applications" key={i} className="flex gap-4 group cursor-pointer">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
                          <div>
                            <h4 className="font-bold text-xl mb-1 group-hover:text-brand-red transition-colors">{item.title}</h4>
                            <p className="text-text-secondary">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>

          <div className="mt-24 text-center">
            <ScrollReveal>
              <Link href="/markets">
                <Button size="lg" className="bg-brand-red hover:bg-brand-red-hover text-white px-10 py-6 h-auto text-lg font-bold">
                  Explore All Use Cases <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      {partners.length > 0 && (
        <section className="py-24 bg-bg-secondary border-t border-border-default">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-center mb-16 uppercase tracking-widest text-text-muted">As Seen In</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 items-center justify-items-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {partners.map((partner) => (
                  <div key={partner.id} className="relative h-10 w-full max-w-[140px] group">
                    {partner.url ? (
                      <a href={partner.url} target="_blank" rel="noopener noreferrer">
                        <Image src={partner.logo} alt={partner.name} fill className="object-contain transition-transform duration-300 group-hover:scale-110" sizes="140px" />
                      </a>
                    ) : (
                      <Image src={partner.logo} alt={partner.name} fill className="object-contain transition-transform duration-300 group-hover:scale-110" sizes="140px" />
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
              const href = `/news/${article.slug}`;
              const isExternal = false;
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
