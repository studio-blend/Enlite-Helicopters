import { MetadataRoute } from "next";
import { client } from "@/lib/sanity";
import { allMarketsQuery, allHelicoptersQuery, allArticlesQuery } from "@/lib/sanity-queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://enlite-helicopters.vercel.app";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/helicopters",
    "/markets",
    "/team",
    "/investor",
    "/gallery",
    "/news",
    "/careers",
    "/contact",
    "/interactive-range",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic routes from Sanity
  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const [markets, helicopters, articles] = await Promise.all([
      client.fetch<any[]>(allMarketsQuery),
      client.fetch<any[]>(allHelicoptersQuery),
      client.fetch<any[]>(allArticlesQuery),
    ]);

    const marketRoutes = (markets || []).map((m) => ({
      url: `${baseUrl}/markets/${m.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const helicopterRoutes = (helicopters || []).map((h) => ({
      url: `${baseUrl}/helicopters/${h.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const articleRoutes = (articles || []).map((a) => ({
      url: `${baseUrl}/news/${a.slug}`,
      lastModified: new Date(a.publishedAt || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    dynamicRoutes = [...marketRoutes, ...helicopterRoutes, ...articleRoutes];
  } catch (error) {
    console.error("Error generating dynamic sitemap routes:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
