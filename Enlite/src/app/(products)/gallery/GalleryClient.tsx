"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Tag } from "@/components/ui/Badge";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { GalleryItem } from "@/types";

interface GalleryClientProps {
  galleryItems: GalleryItem[];
  categories: string[];
}

export default function GalleryClient({ galleryItems, categories }: GalleryClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const activeCategory = searchParams.get("filter") || "All";
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("filter");
    } else {
      params.set("filter", cat);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((g) => g.category.toLowerCase() === activeCategory.toLowerCase());

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const next = () => setLightboxIndex((prev) => prev !== null ? (prev + 1) % filtered.length : null);
  const prev = () => setLightboxIndex((prev) => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-bg-primary">
        {/* Hero Section */}
        <section className="bg-bg-hero pt-32 pb-20 border-b border-border-default transition-colors duration-400">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-text-hero">
                Gallery
              </h1>
              <p className="text-xl text-text-hero/80 max-w-2xl leading-relaxed">
                A visual showcase of our aircraft, facilities, and milestones.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 w-full">
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <Tag key={cat} active={activeCategory.toLowerCase() === cat.toLowerCase()} onClick={() => handleCategoryChange(cat)}>
                {cat}
              </Tag>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 auto-rows-[250px]">
            {filtered.map((item, idx) => {
              // Create a pattern for the grid spans to match the reference image
              const spans = [
                "lg:row-span-2", // 0: Tall
                "",              // 1: Normal
                "lg:row-span-2", // 2: Tall
                "lg:col-span-2", // 3: Wide
                "",              // 4: Normal
                "",              // 5: Normal
                "lg:row-span-2", // 6: Tall
                "",              // 7: Normal
                "lg:col-span-2", // 8: Wide
              ];
              const span = spans[idx % spans.length];
              
              return (
                <div key={item.id} className={`${span}`}>
                  <ScrollReveal className="h-full">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => openLightbox(idx)}
                      className="group relative h-full rounded-xl overflow-hidden cursor-pointer"
                    >
                      {item.image && (
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-110" 
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority={idx < 4}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
                      
                      {item.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-brand-red/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-5 h-5 fill-current ml-1" />
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 pointer-events-none">
                        <p className="text-white font-semibold text-center">{item.title}</p>
                        <span className="text-white/70 text-sm mt-1">{item.category}</span>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }} className="absolute top-6 right-6 text-white/70 hover:text-white z-10 cursor-pointer" aria-label="Close">
              <X className="w-8 h-8" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-6 text-white/70 hover:text-white z-10 cursor-pointer" aria-label="Previous">
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-6 text-white/70 hover:text-white z-10 cursor-pointer" aria-label="Next">
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90vw] h-[80vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {filtered[lightboxIndex].videoUrl ? (
                <div className="w-full h-full flex items-center justify-center bg-black rounded-xl overflow-hidden">
                  <video
                    src={filtered[lightboxIndex].videoUrl}
                    controls
                    autoPlay
                    className="max-w-full max-h-full"
                  />
                </div>
              ) : (
                <Image
                  src={filtered[lightboxIndex].image}
                  alt={filtered[lightboxIndex].title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-semibold text-lg">{filtered[lightboxIndex].title}</p>
                {filtered[lightboxIndex].description && (
                  <p className="text-white/70 text-sm mt-1">{filtered[lightboxIndex].description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
