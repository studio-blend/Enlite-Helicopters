import { sanityFetch } from "@/lib/sanity";
import { allCareersQuery } from "@/lib/sanity-queries";
import { CareersClient } from "./CareersClient";
import { Career } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Careers | Join the Future of Autonomous Aviation | Enlite",
  },
  description: "Explore career opportunities at Enlite Helicopters. Join our team of aerospace engineers, avionics experts, and innovators building the next generation of autonomous cargo helicopters.",
};


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
