"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Badge";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { Article } from "@/types";

interface NewsClientProps {
  articles: Article[];
}

export default function NewsClient({ articles }: NewsClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(articles.map(a => a.category))];

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="bg-bg-hero pt-32 pb-20 border-b border-border-default transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-text-hero">
              News & Updates
            </h1>
            <p className="text-xl text-text-hero/80 max-w-2xl leading-relaxed">
              The latest developments, milestones, and insights from Enlite Helicopters.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <Tag key={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)}>
              {cat}
            </Tag>
          ))}
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article) => (
            <StaggerItem key={article.id}>
              <ArticleCard
                title={article.title}
                excerpt={article.excerpt}
                image={article.image}
                category={article.category}
                date={article.publishedAt}
                readingTime={article.readingTime}
                slug={article.slug}
                externalLink={article.externalLink}
                featured={article.featured}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">No articles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
