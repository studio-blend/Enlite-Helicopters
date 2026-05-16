"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { DynamicVideoPlayer } from "@/components/shared/DynamicVideoPlayer";

interface AboutVideoSectionProps {
  videoTitle: string;
  videoSubtitle: string;
  videoDescription: string;
  videoUrl: string;
  videoThumbnail: string;
  videoPlayMode?: "click" | "scroll";
}

export const AboutVideoSection = ({
  videoTitle,
  videoSubtitle,
  videoDescription,
  videoUrl,
  videoThumbnail,
  videoPlayMode = "click"
}: AboutVideoSectionProps) => {
  return (
    <section className="py-24 bg-bg-secondary relative overflow-hidden border-y border-border-default">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-red/5 blur-[120px] rounded-full translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-brand-red/5 blur-[100px] rounded-full -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-2">
            <ScrollReveal direction="left">
              <h3 className="text-brand-red font-bold text-sm uppercase tracking-widest mb-4">
                {videoSubtitle || "Watch the Journey"}
              </h3>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                {videoTitle || "Our Story & Vision"}
              </h2>
              <div className="relative pl-8 border-l-4 border-brand-red mb-10">
                <p className="text-xl lg:text-2xl text-text-primary italic font-medium leading-relaxed">
                  {videoDescription || "\"Enlite was born out of a desire to solve the hardest problems in transportation. Our journey is just beginning.\""}
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
              <DynamicVideoPlayer
                videoUrl={videoUrl}
                thumbnail={videoThumbnail || "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200&h=800&fit=crop"}
                alt="Our Story and Vision Video"
                playMode={videoPlayMode}
                type="inline"
                className="aspect-video rounded-3xl overflow-hidden shadow-2xl"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
