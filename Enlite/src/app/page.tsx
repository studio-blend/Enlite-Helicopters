import { client } from "@/lib/sanity";
import { allHelicoptersQuery, allArticlesQuery, allPartnersQuery, homePageQuery } from "@/lib/sanity-queries";
import HomeClient from "@/components/HomeClient";
import { Helicopter, Article } from "@/types";

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  let helicopters: Helicopter[] = [];
  let articles: Article[] = [];
  let partners = [];
  let homeData = null;

  try {
    const [sanityHelicopters, sanityArticles, sanityPartners, sanityHomeData] = await Promise.all([
      client.fetch<Helicopter[]>(allHelicoptersQuery),
      client.fetch<Article[]>(allArticlesQuery),
      client.fetch(allPartnersQuery),
      client.fetch(homePageQuery),
    ]);

    helicopters = sanityHelicopters || [];
    articles = sanityArticles || [];
    partners = sanityPartners || [];
    homeData = sanityHomeData;
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  return <HomeClient helicopters={helicopters} articles={articles} partners={partners} homeData={homeData} />;
}
