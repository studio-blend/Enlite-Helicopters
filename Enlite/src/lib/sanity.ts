import { createClient } from "next-sanity";
import { cache } from "react";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "58dq9m9q",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "58dq9m9q",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Request-level cache using React's cache.
// Since React's cache compares arguments using ===, we serialize params and tags to strings.
const memoizedFetch = cache(async (query: string, paramsStr: string, tagsStr: string) => {
  const params = JSON.parse(paramsStr);
  const tags = JSON.parse(tagsStr);
  return client.fetch(query, params, {
    next: {
      tags,
      revalidate: 60, // ISR fallback: re-fetch every 60s at most
    },
  });
});

/**
 * Wrapper around client.fetch that attaches Next.js cache tags
 * for on-demand revalidation via the /api/revalidate webhook.
 * Optimized with request-level memoization using React cache.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  const paramsStr = JSON.stringify(params);
  const tagsStr = JSON.stringify(tags);
  return memoizedFetch(query, paramsStr, tagsStr) as Promise<T>;
}
