import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ArticleCard } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { client } from "@/lib/sanity";
import { articleBySlugQuery, allArticlesQuery } from "@/lib/sanity-queries";
import { Article } from "@/types";
import { PortableText } from "@portabletext/react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const sanityArticles = await client.fetch<Article[]>(allArticlesQuery);
    if (sanityArticles?.length > 0) {
      return sanityArticles.map((a) => ({ slug: a.slug }));
    }
  } catch (error) {
    console.error("Error generating static params for news:", error);
  }
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let article: Article | undefined;

  try {
    article = await client.fetch<Article>(articleBySlugQuery, { slug });
  } catch (error) {
    console.error("Error fetching article for metadata:", error);
  }

  if (!article) return { title: "Not Found" };
  return { title: `${article.title} | Enlite News`, description: article.excerpt };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  let article: Article | undefined;

  try {
    article = await client.fetch<Article>(articleBySlugQuery, { slug });
  } catch (error) {
    console.error("Error fetching article:", error);
  }

  if (!article) notFound();

  // Related articles from sanity
  let related: Article[] = [];
  try {
    const allArticles = await client.fetch<Article[]>(allArticlesQuery);
    related = allArticles.filter((a) => a.id !== article!.id && a.category === article!.category).slice(0, 2);
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary">
      
      {/* Hero Header */}
      <section className="bg-bg-hero pt-32 pb-24 border-b border-border-default transition-colors duration-400">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <Link href="/news" className="inline-flex items-center gap-2 text-sm text-text-hero/70 hover:text-text-hero transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to News
            </Link>
            <div className="mb-6">
              <Badge variant="red">{article.category}</Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-hero tracking-tight mb-8 leading-[1.1]">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-text-hero/70 pb-8 border-b border-text-hero/10">
              <div className="flex items-center gap-3">
                {article.author?.avatar && (
                  <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" sizes="40px" />
                  </div>
                )}
                <div>
                  <span className="block font-medium text-text-hero">{article.author?.name}</span>
                  <span className="block text-xs">{article.author?.role}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l border-text-hero/20 pl-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} min read
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 my-12">
        <ScrollReveal>
          <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden bg-bg-secondary">
            <Image src={article.image} alt={article.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" priority />
          </div>
        </ScrollReveal>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-red hover:prose-a:text-brand-red/80 prose-p:text-text-secondary prose-p:leading-relaxed prose-li:text-text-secondary">
            {Array.isArray(article.content) ? (
              <PortableText value={article.content} />
            ) : (
              article.content?.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))
            )}
          </article>
        </ScrollReveal>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border-default">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="gray">{tag}</Badge>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-24 pt-16 border-t border-border-default pb-24">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8 tracking-tight text-text-primary">Related Articles</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {related.map((a) => (
              <ArticleCard key={a.id} title={a.title} excerpt={a.excerpt} image={a.image} category={a.category} date={a.publishedAt} readingTime={a.readingTime} slug={a.slug} externalLink={a.externalLink} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
