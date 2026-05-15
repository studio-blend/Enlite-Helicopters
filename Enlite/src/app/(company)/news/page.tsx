import { sanityFetch } from "@/lib/sanity";
import { allArticlesQuery } from "@/lib/sanity-queries";
import NewsClient from "./NewsClient";
import { Article } from "@/types";



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
