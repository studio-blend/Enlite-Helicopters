import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { allHelicoptersQuery } from "@/lib/sanity-queries";
import HelicoptersClient from "./HelicoptersClient";
import { Helicopter } from "@/types";

export const metadata: Metadata = {
  title: {
    absolute: "Autonomous Unmanned Cargo Helicopter Fleet | Enlite R2 & R3",
  },
  description: "Explore the Enlite fleet of autonomous heavy-lift helicopters. From the R2 intercity delivery drone to the R3 tactical resupply platform, we define the future of aerial logistics.",
};

export default async function ProductsPage() {
  let helicopters: Helicopter[] = [];

  try {
    helicopters = await sanityFetch<Helicopter[]>({ query: allHelicoptersQuery, tags: ["product"] }) || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  return <HelicoptersClient helicopters={helicopters} brochureUrl="/enlite-helicopters-product-brochure" />;
}
