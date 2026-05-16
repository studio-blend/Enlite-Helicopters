"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";

// ─── Article Card ─────────────────────────────────────
interface ArticleCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readingTime?: number;
  slug: string;
  externalLink?: string;
  featured?: boolean;
  className?: string;
}

export function ArticleCard({
  title, excerpt, image, category, date, readingTime, slug, externalLink, featured, className,
}: ArticleCardProps) {
  const href = `/news/${slug}`;
  const isExternal = false;
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("group relative bg-bg-card rounded-xl border border-border-default overflow-hidden transition-shadow duration-300 hover:shadow-card-hover", featured && "md:col-span-2", className)}
    >
      <Link 
        href={href} 
        className="block"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        <div className="relative overflow-hidden aspect-[16/10]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="red">{category}</Badge>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-brand-red transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2 mb-4">{excerpt}</p>
          <div className="flex items-center justify-between text-xs text-text-muted">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              {readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime} min read
                </span>
              )}
            </div>
            <span className="flex items-center gap-1 text-brand-red font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Read More <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Helicopter Card ──────────────────────────────────
interface HelicopterCardProps {
  name: string;
  tagline: string;
  image: string;
  category: string;
  slug: string;
  status: string;
  className?: string;
}

export function HelicopterCard({
  name, tagline, image, category, slug, status, className,
}: HelicopterCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("group relative bg-bg-card rounded-xl border border-border-default overflow-hidden transition-shadow duration-300 hover:shadow-card-hover", className)}
    >
      <Link href={`/helicopters/${slug}`} className="block">
        <div className="relative overflow-hidden aspect-[4/3]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={status === "production" ? "green" : "orange"}>
                {status === "production" ? "In Production" : "In Development"}
              </Badge>
              <Badge variant="navy">{category}</Badge>
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-text-primary mb-1 group-hover:text-brand-red transition-colors">
            {name}
          </h3>
          <p className="text-sm text-text-secondary mb-3">{tagline}</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-red opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-1">
            View Details <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Feature Card ─────────────────────────────────────
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn("group p-6 rounded-xl bg-bg-card border border-border-default hover:border-brand-red/30 transition-all duration-300 hover:shadow-lg", className)}
    >
      <div className="w-12 h-12 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-text-primary mb-2">{title}</h4>
      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ─── Gallery Card ─────────────────────────────────────
interface GalleryCardProps {
  title: string;
  image: string;
  category: string;
  onClick?: () => void;
  className?: string;
}

export function GalleryCard({ title, image, category, onClick, className }: GalleryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={cn("group relative rounded-xl overflow-hidden cursor-pointer aspect-square", className)}
    >
      <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 33vw" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white font-semibold text-lg text-center px-4">{title}</p>
        <span className="text-white/70 text-sm mt-1">{category}</span>
      </div>
    </motion.div>
  );
}
