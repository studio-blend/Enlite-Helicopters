import { sanityFetch } from "@/lib/sanity";
import { allTeamMembersQuery } from "@/lib/sanity-queries";
import TeamClient from "./TeamClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Our Team | The Visionaries Behind Enlite Helicopters",
  },
  description:
    "Meet the expert team of aerospace engineers, roboticists, and aviation professionals designing India's most advanced autonomous cargo helicopters.",
};




export default async function TeamPage() {
  let team = [];

  try {
    const sanityTeam = await sanityFetch<any[]>({ query: allTeamMembersQuery, tags: ["team"] });
    team = sanityTeam || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  return <TeamClient team={team} />;
}
