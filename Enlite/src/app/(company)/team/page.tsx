import { client } from "@/lib/sanity";
import { allTeamMembersQuery } from "@/lib/sanity-queries";
import TeamClient from "./TeamClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Meet the Team" };
export const revalidate = 60;



export default async function TeamPage() {
  let team = [];

  try {
    const sanityTeam = await client.fetch(allTeamMembersQuery);
    team = sanityTeam || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  return <TeamClient team={team} />;
}
