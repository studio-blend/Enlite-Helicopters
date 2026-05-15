import { sanityFetch } from "@/lib/sanity";
import { allTeamMembersQuery } from "@/lib/sanity-queries";
import TeamClient from "./TeamClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Meet the Team" };




export default async function TeamPage() {
  let team = [];

  try {
    const sanityTeam = await sanityFetch({ query: allTeamMembersQuery, tags: ["team"] });
    team = sanityTeam || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  return <TeamClient team={team} />;
}
