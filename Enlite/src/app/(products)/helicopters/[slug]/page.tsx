import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { client, sanityFetch } from "@/lib/sanity";
import { helicopterBySlugQuery, allHelicoptersQuery } from "@/lib/sanity-queries";
import { Helicopter } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const sanityHelicopters = await client.fetch<Helicopter[]>(allHelicoptersQuery);
    if (sanityHelicopters?.length > 0) {
      return sanityHelicopters.map((h) => ({ slug: h.slug }));
    }
  } catch (error) {
    console.error("Error generating static params:", error);
  }
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let heli: Helicopter | undefined;

  try {
    heli = await sanityFetch<Helicopter>({ query: helicopterBySlugQuery, params: { slug }, tags: ["product"] });
  } catch (error) {
    console.error("Error fetching helicopter for metadata:", error);
  }

  if (!heli) return { title: "Not Found" };
  return { title: `${heli.name} | Enlite Helicopters`, description: heli.tagline };
}

export default async function HelicopterDetailPage({ params }: Props) {
  const { slug } = await params;
  let heli: Helicopter | undefined;

  try {
    heli = await sanityFetch<Helicopter>({ query: helicopterBySlugQuery, params: { slug }, tags: ["product"] });
  } catch (error) {
    console.error("Error fetching helicopter:", error);
  }

  if (!heli) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": heli.name,
            "image": `https://enlitehelicopters.com${heli.image}`,
            "description": heli.tagline,
            "brand": {
              "@type": "Brand",
              "name": "Enlite Helicopters"
            }
          })
        }}
      />
      {/* Hero Section */}
      <section className="bg-bg-hero pt-32 pb-20 border-b border-border-default transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <Link href="/helicopters" className="inline-flex items-center gap-2 text-sm text-text-hero/70 hover:text-text-hero transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Fleet
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={heli.status === "production" ? "green" : "orange"}>
                {heli.status === "production" ? "In Production" : "In Development"}
              </Badge>
              <Badge variant="navy">{heli.category}</Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-hero tracking-tight mb-4">
              {heli.name}
            </h1>
            <p className="text-xl text-text-hero/80 max-w-3xl leading-relaxed">
              {heli.tagline}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">

        {/* Image Layout */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-16">
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden aspect-[16/10] bg-bg-secondary">
              <Image src={heli.image} alt={heli.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" priority />
            </div>
            <div className="flex flex-col gap-4">
              {heli.gallery?.slice(0, 2).map((img, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:flex-1 bg-bg-secondary">
                  <Image src={img} alt={`${heli.name} gallery ${i}`} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 33vw" />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Content Section */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <h2 className="text-2xl font-bold mb-6 text-text-primary tracking-tight">Overview</h2>
              <div className="text-text-secondary leading-relaxed text-lg space-y-4">
                {heli.description.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>

            {heli.features && heli.features.length > 0 && (
              <ScrollReveal>
                <h3 className="text-xl font-bold mt-12 mb-6 text-text-primary tracking-tight">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {heli.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-bg-secondary border border-border-default">
                      <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-primary leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Specs Sidebar */}
          <div>
            <ScrollReveal direction="right">
              <div className="sticky top-28 p-8 rounded-2xl bg-bg-card border border-border-default shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-text-primary tracking-tight">
                  Technical Specifications
                </h3>
                <div className="space-y-4">
                  {heli.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-baseline pb-4 border-b border-border-default last:border-0 last:pb-0">
                      <span className="text-sm text-text-muted font-medium">{spec.label}</span>
                      <span className="text-sm font-semibold text-text-primary text-right pl-4">
                        {spec.value} {spec.unit && <span className="text-text-muted font-normal ml-1">{spec.unit}</span>}
                      </span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="block mt-8">
                  <Button fullWidth size="lg">Request Information</Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
