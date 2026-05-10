import { client } from "@/lib/sanity";
import { allCareersQuery } from "@/lib/sanity-queries";
import { CareersClient } from "./CareersClient";
import { careers as staticCareers } from "@/lib/data/careers";
import { Career } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Careers" };
export const revalidate = 60;

export default async function CareersPage() {
  let careers: Career[] = [];

  try {
    const sanityCareers = await client.fetch<Career[]>(allCareersQuery);
    careers = sanityCareers?.length > 0 ? sanityCareers : staticCareers;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    careers = staticCareers;
  }

  return <CareersClient careers={careers} />;
}
