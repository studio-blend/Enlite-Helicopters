import { sanityFetch, client } from "@/lib/sanity";
import { allHelicoptersQuery, allArticlesQuery, allPartnersQuery, allClientsQuery, allBusinessPartnersQuery, homePageQuery, siteSettingsQuery } from "@/lib/sanity-queries";
import HomeClient from "@/components/HomeClient";
import { Helicopter, Article, Client, BusinessPartner } from "@/types";
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
  let clients: Client[] = [];
  let businessPartners: BusinessPartner[] = [];
  let homeData = null;
  let settings = null;

  try {
    const [sanityHelicopters, sanityArticles, sanityPartners, sanityClients, sanityBusinessPartners, sanityHomeData, sanitySettings] = await Promise.all([
      sanityFetch<Helicopter[]>({ query: allHelicoptersQuery, tags: ["product"] }),
      sanityFetch<Article[]>({ query: allArticlesQuery, tags: ["article"] }),
      sanityFetch<any[]>({ query: allPartnersQuery, tags: ["partner"] }),
      sanityFetch<Client[]>({ query: allClientsQuery, tags: ["client"] }),
      sanityFetch<BusinessPartner[]>({ query: allBusinessPartnersQuery, tags: ["businessPartner"] }),
      sanityFetch<any>({ query: homePageQuery, tags: ["homePage"] }),
      sanityFetch<any>({ query: siteSettingsQuery, tags: ["settings"] }),
    ]);

    helicopters = sanityHelicopters || [];
    articles = sanityArticles || [];
    partners = sanityPartners || [];
    clients = sanityClients || [];
    businessPartners = sanityBusinessPartners || [];
    homeData = sanityHomeData;
    settings = sanitySettings;
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  return (
    <HomeClient
      helicopters={helicopters}
      articles={articles}
      partners={partners}
      clients={clients}
      businessPartners={businessPartners}
      homeData={homeData}
      settings={settings}
    />
  );
}

