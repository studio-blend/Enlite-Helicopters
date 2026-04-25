import { client } from "@/lib/sanity";
import { allHelicoptersQuery, allArticlesQuery, allPartnersQuery, homePageQuery } from "@/lib/sanity-queries";
import HomeClient from "./HomeClient";
import { helicopters as staticHelicopters } from "@/lib/data/helicopters";
import { articles as staticArticles } from "@/lib/data/articles";
import { Helicopter, Article } from "@/types";

export const revalidate = 60; // Revalidate every minute

const staticPartners = [
  { id: "1", name: "Thanthi TV", logo: "/images/partner-thanthi.png" },
  { id: "2", name: "Vikatan", logo: "/images/partner-vikatan.png" },
  { id: "3", name: "India Today", logo: "/images/partner-indiatoday.png" },
  { id: "4", name: "Dinamalar", logo: "/images/partner-dinamalar.png" },
  { id: "5", name: "Polimer News", logo: "/images/partner-polimer.png" },
  { id: "6", name: "Zee News Bharat", logo: "/images/partner-zee.png" },
  { id: "7", name: "Times of India", logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/The_Times_of_India_logo.svg" },
];

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

    helicopters = sanityHelicopters?.length > 0 ? sanityHelicopters : staticHelicopters;
    articles = sanityArticles?.length > 0 ? sanityArticles : staticArticles;
    partners = sanityPartners?.length > 0 ? sanityPartners : staticPartners;
    homeData = sanityHomeData;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    helicopters = staticHelicopters;
    articles = staticArticles;
    partners = staticPartners;
  }

  return <HomeClient helicopters={helicopters} articles={articles} partners={partners} homeData={homeData} />;
}
