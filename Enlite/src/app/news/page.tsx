import { client } from "@/lib/sanity";
import { allArticlesQuery } from "@/lib/sanity-queries";
import NewsClient from "./NewsClient";
import { articles as staticArticles } from "@/lib/data/articles";
import { Article } from "@/types";

export const revalidate = 60;

export default async function NewsPage() {
  let articles: Article[] = [];

  try {
    const sanityArticles = await client.fetch<Article[]>(allArticlesQuery);
    articles = sanityArticles?.length > 0 ? sanityArticles : staticArticles;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    articles = staticArticles;
  }

  return <NewsClient articles={articles} />;
}
