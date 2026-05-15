import { sanityFetch } from "@/lib/sanity";
import { allHelicoptersQuery } from "@/lib/sanity-queries";
import HelicoptersClient from "./HelicoptersClient";
import { Helicopter } from "@/types";



export default async function ProductsPage() {
  let helicopters: Helicopter[] = [];

  try {
    const sanityHelicopters = await sanityFetch<Helicopter[]>({ query: allHelicoptersQuery, tags: ["product"] });
    helicopters = sanityHelicopters || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  return <HelicoptersClient helicopters={helicopters} />;
}
