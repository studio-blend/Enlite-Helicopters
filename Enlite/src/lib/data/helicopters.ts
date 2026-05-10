import type { Helicopter } from "@/types";

export const helicopters: Helicopter[] = [
  {
    id: "r2",
    slug: "enlite-r2",
    name: "Enlite R2",
    tagline: "Medium-Lift Autonomous Cargo Helicopter",
    description:
      "Our flagship medium-lift autonomous cargo helicopter designed for long-range logistics. Built to carry substantial payloads over hundreds of kilometers, the R2 ensures rapid and reliable delivery across diverse terrains. It offers a 500 km range, 70 kg payload, and 200 km/h speed, making it ideal for intercity cargo delivery and rapid logistics. By bypassing traffic and reducing delivery times, Enlite's UAV-based solution streamlines supply chains while lowering costs and improving reliability.",
    category: "Cargo Transfer",
    image: "/images/r2-main.png",
    gallery: [
      "/images/r2-main.png",
      "/images/solution.png",
      "/images/aircraft.png",
    ],
    specs: [
      { label: "Max Speed", value: "200", unit: "km/h" },
      { label: "Range", value: "500", unit: "km" },
      { label: "Payload Capacity", value: "70", unit: "kg" },
      { label: "Turnaround Time", value: "10", unit: "mins" },
      { label: "Propulsion", value: "Electric VTOL", unit: "" },
    ],
    features: [
      "Autonomous flight and navigation",
      "10-minute rapid turnaround",
      "Minimal ground infrastructure required",
      "All-weather capability",
      "Real-time tracking and telemetrics",
      "Collision avoidance systems",
    ],
    status: "production",
  },
  {
    id: "r3",
    slug: "enlite-r3",
    name: "Enlite R3",
    tagline: "High-Altitude Tactical Cargo Helicopter",
    description:
      "A specialized variant optimized for defense applications and mountainous regions, providing unmatched operational endurance for the most demanding supply chain challenges. Engineered to operate at ceilings up to 20,000 ft, the R3 utilizes a sophisticated speed-vs-altitude tradeoff algorithm to deliver up to 50 kg of critical payload to extreme elevations. With advanced terrain-following navigation and stealthy low-altitude flight capabilities, the R3 is the ultimate workhorse for tactical resupply.",
    category: "Defense",
    image: "/images/r3-main.png",
    gallery: [
      "/images/r3-main.png",
      "/images/solution.png",
      "/images/aircraft.png",
    ],
    specs: [
      { label: "Max Speed", value: "240", unit: "km/h" },
      { label: "Range", value: "800", unit: "km" },
      { label: "Standard Payload", value: "200+", unit: "kg" },
      { label: "High-Altitude Payload", value: "50", unit: "kg" },
      { label: "Max Altitude", value: "20,000", unit: "ft" },
    ],
    features: [
      "20,000 ft operational ceiling variant",
      "Dynamic speed-vs-altitude optimization",
      "Stealthy low-altitude flight capability",
      "Redundant triple-flight systems",
      "Automated dangerous supply routes",
      "Heavy-duty sling load support",
    ],
    status: "development",
  },
];
