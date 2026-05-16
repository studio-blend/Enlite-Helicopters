import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Play, ShieldCheck, Cpu, Globe, Zap, Award, Target, Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { sanityFetch } from "@/lib/sanity";
import { aboutPageQuery } from "@/lib/sanity-queries";
import { PortableText } from "@portabletext/react";

export const metadata: Metadata = { title: "About" };




export default async function AboutPage() {
  let pageData: any = null;

  try {
    pageData = await sanityFetch<any>({ query: aboutPageQuery, tags: ["aboutPage"] });
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  const {
    title: heroTitle = pageData?.title || "About Us",
    subtitle: heroSubtitle = pageData?.subtitle || "Powering the next generation of aerial transport through innovation and excellence.",
    stats = pageData?.stats || [],
    sections = pageData?.sections || [],
    values = pageData?.values || [],
  } = pageData || {};

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-bg-hero pt-32 pb-20 border-b border-border-default transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-text-hero mb-4">
              {heroTitle}
            </h1>
            <p className="text-xl text-text-hero/80 max-w-2xl leading-relaxed">{heroSubtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Shaping the Future (Stats) ─────────────── */}
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
              {stats.map((stat: any, i: number) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-brand-red mb-2">{stat.value}</div>
                  <div className="text-sm text-text-secondary font-medium uppercase tracking-wider mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Our Story & Vision (Founder Video Section) ────────── */}
      <section className="py-24 bg-bg-secondary relative overflow-hidden border-y border-border-default">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-red/5 blur-[120px] rounded-full translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-brand-red/5 blur-[100px] rounded-full -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <h3 className="text-brand-red font-bold text-sm uppercase tracking-widest mb-4">
                  {pageData?.videoSubtitle || "Watch the Journey"}
                </h3>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                  {pageData?.videoTitle || "Our Story & Vision"}
                </h2>
                <div className="relative pl-8 border-l-4 border-brand-red mb-10">
                  <p className="text-xl lg:text-2xl text-text-primary italic font-medium leading-relaxed">
                    {pageData?.videoDescription || "\"Enlite was born out of a desire to solve the hardest problems in transportation. Our journey is just beginning.\""}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-bg-tertiary overflow-hidden border border-border-default">
                    <div className="w-full h-full bg-brand-red/20 flex items-center justify-center text-brand-red font-bold text-lg">M</div>
                  </div>
                  <div>
                    <div className="font-bold text-text-primary">Mohanakannan</div>
                    <div className="text-sm text-text-muted italic">Founder & CEO, Enlite Helicopters</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-3">
              <ScrollReveal direction="right">
                <div className="group relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black cursor-pointer">
                  <Image 
                    src={pageData?.videoThumbnail || "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200&h=800&fit=crop"} 
                    alt="Our Story and Vision Video" 
                    fill 
                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  {pageData?.videoUrl && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-brand-red flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 fill-current ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                          <span className="text-sm font-medium text-white">Watch: Our Journey</span>
                        </div>
                        <div className="text-xs text-white/60 font-medium uppercase tracking-widest">4K Cinematic</div>
                      </div>
                    </>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Identity Grid (Who we are + What we do) ─── */}
      <section className="py-24 bg-bg-primary border-b border-border-default">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-px bg-border-default border border-border-default rounded-3xl overflow-hidden shadow-2xl">
            {/* Who We Are */}
            <div className="bg-bg-card p-12 lg:p-16 relative overflow-hidden group hover:bg-bg-secondary transition-colors duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-red/10 transition-colors" />
              <ScrollReveal direction="left">
                <div className="text-brand-red font-bold text-xs uppercase tracking-widest mb-4">Core Identity</div>
                <h2 className="text-4xl font-bold mb-8">Who we <span className="text-brand-red">are?</span></h2>
                <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                  <p>
                    Enlite is India's first aviation startup focused on designing and manufacturing unmanned, autonomous cargo helicopters.
                  </p>
                  <p>
                    Founded with a vision to revolutionize intercity and remote logistics, our team brings together decades of expertise in aerospace engineering, avionics, and autonomous systems.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* What We Do */}
            <div className="bg-bg-card p-12 lg:p-16 relative overflow-hidden group hover:bg-bg-secondary transition-colors duration-500">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-brand-red/10 transition-colors" />
              <ScrollReveal direction="right">
                <div className="text-brand-red font-bold text-xs uppercase tracking-widest mb-4">Our Mission</div>
                <h2 className="text-4xl font-bold mb-8">What we <span className="text-brand-red">do?</span></h2>
                <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                  <p>
                    We are building a scalable, autonomous logistics network capable of moving heavy cargo across long distances, bypassing traditional road infrastructure.
                  </p>
                  <p>
                    By combining the vertical takeoff capabilities of helicopters with state-of-the-art autonomous flight technology, we provide an efficient, cost-effective, and rapid delivery solution.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content Sections (Dynamic Remaining) ─── */}
      {sections.filter((s: any) => !["Who we are?", "What we do?"].includes(s.title)).map((section: any, i: number) => {
        const isReverse = section.reverse;
        return (
          <section key={i} className={`py-32 ${i % 2 === 0 ? "bg-bg-secondary border-y border-border-default" : "bg-bg-primary"} overflow-hidden`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                
                {isReverse ? (
                  <>
                    <ScrollReveal direction="left" className="order-2 lg:order-1 relative">
                       {(section.videoUrl || section.image) && (
                         <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                           {section.videoUrl ? (
                              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                                <source src={section.videoUrl} type="video/mp4" />
                              </video>
                           ) : (
                              <Image src={section.image} alt={section.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                           )}
                           <div className="absolute inset-0 bg-brand-red/10 mix-blend-multiply" />
                         </div>
                       )}
                       {section.badge && (
                         <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-red rounded-full flex items-center justify-center text-white font-bold text-center p-4 shadow-xl z-10">
                           {section.badge}
                         </div>
                       )}
                    </ScrollReveal>
                    <ScrollReveal direction="right" className="order-1 lg:order-2">
                      <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">
                        {section.highlightText ? (
                          <>{section.title?.replace(section.highlightText || "", "").trim()} <br /><span className="text-brand-red">{section.highlightText}</span></>
                        ) : (
                          section.title
                        )}
                      </h2>
                      <div className="space-y-6 text-text-secondary text-lg leading-relaxed border-l-2 border-brand-red pl-8 prose prose-lg dark:prose-invert max-w-none prose-p:text-text-secondary prose-p:leading-relaxed">
                        {Array.isArray(section.content) && <PortableText value={section.content} />}
                      </div>
                    </ScrollReveal>
                  </>
                ) : (
                  <>
                    <ScrollReveal direction="left">
                      <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">
                        {section.highlightText ? (
                          <>{section.title.replace(section.highlightText, "").trim()} <br /><span className="text-brand-red">{section.highlightText}</span></>
                        ) : (
                          section.title
                        )}
                      </h2>
                      <div className="space-y-6 text-text-secondary text-lg leading-relaxed border-l-2 border-brand-red pl-8 prose prose-lg dark:prose-invert max-w-none prose-p:text-text-secondary prose-p:leading-relaxed">
                        {Array.isArray(section.content) && <PortableText value={section.content} />}
                      </div>
                    </ScrollReveal>
                    <ScrollReveal direction="right" className="relative">
                       {(section.videoUrl || section.image) && (
                         <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                           {section.videoUrl ? (
                              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                                <source src={section.videoUrl} type="video/mp4" />
                              </video>
                           ) : (
                              <Image src={section.image} alt={section.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                           )}
                           <div className="absolute inset-0 bg-brand-red/10 mix-blend-multiply" />
                         </div>
                       )}
                       {section.badge && (
                         <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-red rounded-full flex items-center justify-center text-white font-bold text-center p-4 shadow-xl z-10">
                           {section.badge}
                         </div>
                       )}
                    </ScrollReveal>
                  </>
                )}

              </div>
            </div>
          </section>
        );
      })}

      {/* ── Core Values ─────────────────────────────── */}
      <section className="py-32 bg-bg-secondary border-y border-border-default">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl font-bold tracking-tight mb-4">Our Core Values</h2>
              <p className="text-text-secondary text-lg">The principles that guide every aircraft we design.</p>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((v: any, i: number) => {
              // Map icons to value titles
              const iconMap: Record<string, any> = {
                "Engineering Excellence": Cpu,
                "Reliability": ShieldCheck,
                "Safety First": ShieldCheck,
                "Indigenous Capability": Globe,
                "Innovation": Zap,
                "Quality": Award,
                "Mission Driven": Target,
                "Future Focused": Rocket
              };
              
              const IconComponent = iconMap[v.title] || Award;

              return (
                <StaggerItem key={i}>
                  <div className="rounded-2xl overflow-hidden bg-bg-card border border-border-default hover:shadow-2xl hover:border-brand-red/40 transition-all duration-500 h-full flex flex-col group relative">
                    {/* Background accent gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-red/0 via-transparent to-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {v.image ? (
                      <div className="relative aspect-[4/3] bg-bg-tertiary overflow-hidden">
                        <Image
                          src={v.image}
                          alt={v.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                      </div>
                    ) : (
                      <div className="relative aspect-[4/3] bg-bg-tertiary flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                          <IconComponent className="w-full h-full scale-150 -rotate-12 translate-x-1/4 translate-y-1/4" />
                        </div>
                        <div className="relative w-20 h-20 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-500 shadow-lg">
                          <IconComponent className="w-10 h-10" />
                        </div>
                      </div>
                    )}
                    
                    <div className="p-8 flex-1 flex flex-col relative z-10">
                      <div className="w-10 h-1 bg-brand-red/30 group-hover:w-20 group-hover:bg-brand-red transition-all duration-500 mb-6 rounded-full" />
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-red transition-colors">{v.title}</h3>
                      <p className="text-text-secondary text-lg leading-relaxed">{v.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Contact CTA ─────────────────────────────── */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-brand-red rounded-3xl p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
              </svg>
            </div>
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let&apos;s build the future together.</h2>
              <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                Whether you&apos;re an investor, partner, or potential team member, we&apos;d love to hear from you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-brand-red hover:bg-gray-100 px-10 py-4 h-auto text-lg">
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/investor">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-10 py-4 h-auto text-lg">
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
