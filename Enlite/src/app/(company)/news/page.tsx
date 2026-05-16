import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { allArticlesQuery } from "@/lib/sanity-queries";
import NewsClient from "./NewsClient";
import { Article } from "@/types";

export const metadata: Metadata = {
  title: {
    absolute: "News & Press Releases | Enlite Helicopters",
  },
  description: "Stay updated with the latest news, milestones, and press releases from Enlite Helicopters as we build the future of autonomous aerial logistics.",
};



export default async function NewsPage() {
  let articles: Article[] = [];

  try {
    const sanityArticles = await sanityFetch<Article[]>({ query: allArticlesQuery, tags: ["article"] });
    articles = sanityArticles || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  return <NewsClient articles={articles} />;
}
