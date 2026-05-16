import type { Metadata } from "next";
import InteractiveMapClient from "./InteractiveMapClient";

export const metadata: Metadata = {
  title: {
    absolute: "Interactive Range Map | Visualize Logistics Coverage | Enlite",
  },
  description:
    "Experience the massive 500 km operational range of Enlite autonomous cargo helicopters. Interactive mapping tool showing tactical reach across India.",
};

export default function InteractiveRangePage() {
  return (
    <div className="min-h-screen bg-bg-primary overflow-hidden">
      <InteractiveMapClient />
    </div>
  );
}
