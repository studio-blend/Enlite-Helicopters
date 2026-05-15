import { sanityFetch } from "@/lib/sanity";
import { allHelicoptersQuery, allArticlesQuery, allPartnersQuery, homePageQuery } from "@/lib/sanity-queries";
import HomeClient from "@/components/HomeClient";
import { Helicopter, Article } from "@/types";

export default async function HomePage() {
  let helicopters: Helicopter[] = [];
  let articles: Article[] = [];
  let partners = [];
  let homeData = null;

  try {
    const [sanityHelicopters, sanityArticles, sanityPartners, sanityHomeData] = await Promise.all([
      sanityFetch<Helicopter[]>({ query: allHelicoptersQuery, tags: ["product"] }),
      sanityFetch<Article[]>({ query: allArticlesQuery, tags: ["article"] }),
      sanityFetch<any[]>({ query: allPartnersQuery, tags: ["partner"] }),
      sanityFetch<any>({ query: homePageQuery, tags: ["homePage"] }),
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
