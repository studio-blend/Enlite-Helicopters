import { client } from "@/lib/sanity";
import { allTeamMembersQuery } from "@/lib/sanity-queries";
import TeamClient from "./TeamClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Meet the Team" };
export const revalidate = 60;

const staticTeam = [
  {
    id: "1",
    name: "Dr. Arvind Kumar",
    role: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=600&fit=crop&crop=faces",
    bio: "Former Director of Aerospace Research with 20+ years of experience in autonomous flight systems.",
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&crop=faces",
    bio: "Pioneer in electric VTOL propulsion systems. Led multiple successful UAV programs for the defense sector.",
  },
  {
    id: "3",
    name: "Rahul Desai",
    role: "Head of Engineering",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop&crop=faces",
    bio: "Specializes in composite materials and structural integrity. Holds multiple patents in airframe design.",
  },
  {
    id: "4",
    name: "Meera Reddy",
    role: "VP of Operations",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&crop=faces",
    bio: "Expert in aerospace manufacturing and supply chain management with a focus on lean production.",
  },
  {
    id: "5",
    name: "Vikram Singh",
    role: "Lead Software Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=faces",
    bio: "Architect behind the Enlite autonomous flight control software suite.",
  },
  {
    id: "6",
    name: "Anjali Gupta",
    role: "Director of Aerodynamics",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=600&h=600&fit=crop&crop=faces",
    bio: "Leading the CFD and wind tunnel testing division to optimize the aerodynamic efficiency of our fleet.",
  },
];

export default async function TeamPage() {
  let team = [];

  try {
    const sanityTeam = await client.fetch(allTeamMembersQuery);
    team = sanityTeam?.length > 0 ? sanityTeam : staticTeam;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    team = staticTeam;
  }

  return <TeamClient team={team} />;
}
