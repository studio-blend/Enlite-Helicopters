import type { Metadata } from "next";
import InteractiveMapClient from "./InteractiveMapClient";

export const metadata: Metadata = {
  title: "Interactive Range Map | Enlite Helicopters",
  description: "Visualize the 500 km operational range of Enlite's autonomous cargo helicopters across India.",
};

export default function InteractiveRangePage() {
  return (
    <div className="min-h-screen bg-bg-primary overflow-hidden">
      <InteractiveMapClient />
    </div>
  );
}
