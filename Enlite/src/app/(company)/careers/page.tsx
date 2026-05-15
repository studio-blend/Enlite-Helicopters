import { sanityFetch } from "@/lib/sanity";
import { allCareersQuery } from "@/lib/sanity-queries";
import { CareersClient } from "./CareersClient";
import { Career } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Careers" };


export default async function CareersPage() {
  let careers: Career[] = [];

  try {
    const sanityCareers = await sanityFetch<Career[]>({ query: allCareersQuery, tags: ["career"] });
    careers = sanityCareers || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  return <CareersClient careers={careers} />;
}
