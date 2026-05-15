import { client } from "@/lib/sanity";
import { allArticlesQuery } from "@/lib/sanity-queries";
import NewsClient from "./NewsClient";
import { Article } from "@/types";

export const revalidate = 60;

export default async function NewsPage() {
  let articles: Article[] = [];

  try {
    const sanityArticles = await client.fetch<Article[]>(allArticlesQuery);
    articles = sanityArticles || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  return <NewsClient articles={articles} />;
}
