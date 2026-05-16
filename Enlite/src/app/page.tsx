import { sanityFetch, client } from "@/lib/sanity";
import { allHelicoptersQuery, allArticlesQuery, allPartnersQuery, homePageQuery, siteSettingsQuery } from "@/lib/sanity-queries";
import HomeClient from "@/components/HomeClient";
import { Helicopter, Article } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Enlite Helicopters — Autonomous Unmanned Cargo Helicopters",
  },
  description:
    "Autonomous unmanned cargo helicopters for long-range logistics — 70 kg payload, 500 km range, fully autonomous operation for civilian and defence missions across India.",
};

export default async function HomePage() {
  let helicopters: Helicopter[] = [];
  let articles: Article[] = [];
  let partners = [];
  let homeData = null;
  let settings = null;

  try {
    const [sanityHelicopters, sanityArticles, sanityPartners, sanityHomeData, sanitySettings] = await Promise.all([
      sanityFetch<Helicopter[]>({ query: allHelicoptersQuery, tags: ["product"] }),
      sanityFetch<Article[]>({ query: allArticlesQuery, tags: ["article"] }),
      sanityFetch<any[]>({ query: allPartnersQuery, tags: ["partner"] }),
      sanityFetch<any>({ query: homePageQuery, tags: ["homePage"] }),
      sanityFetch<any>({ query: siteSettingsQuery, tags: ["settings"] }),
    ]);

    helicopters = sanityHelicopters || [];
    articles = sanityArticles || [];
    partners = sanityPartners || [];
    homeData = sanityHomeData;
    settings = sanitySettings;
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  return <HomeClient helicopters={helicopters} articles={articles} partners={partners} homeData={homeData} settings={settings} />;
}
