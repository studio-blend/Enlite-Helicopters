import { client } from "@/lib/sanity";
import { allHelicoptersQuery } from "@/lib/sanity-queries";
import HelicoptersClient from "./HelicoptersClient";
import { helicopters as staticHelicopters } from "@/lib/data/helicopters";
import { Helicopter } from "@/types";

export const revalidate = 60;

export default async function ProductsPage() {
  let helicopters: Helicopter[] = [];

  try {
    const sanityHelicopters = await client.fetch<Helicopter[]>(allHelicoptersQuery);
    helicopters = sanityHelicopters?.length > 0 ? sanityHelicopters : staticHelicopters;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    helicopters = staticHelicopters;
  }

  return <HelicoptersClient helicopters={helicopters} />;
}
