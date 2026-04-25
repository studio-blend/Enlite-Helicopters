import type { GalleryItem } from "@/types";

export const galleryItems: GalleryItem[] = [
  { id: "1", title: "R2 Maiden Flight", description: "First prototype taking to the skies", image: "/images/r2-main.png", category: "Flight Test", date: "2025-12-15" },
  { id: "2", title: "Defence Expo 2025 Static Display", description: "Full fleet showcase at the exhibition", image: "/images/r3-main.png", category: "Events", date: "2025-11-28" },
  { id: "3", title: "High-Altitude Trials", description: "R2 operating in Himalayan mountains", image: "/images/hero.png", category: "Flight Test", date: "2025-10-20" },
  { id: "4", title: "Assembly Line", description: "State-of-the-art manufacturing facility", image: "/images/aircraft.png", category: "Manufacturing", date: "2025-09-15" },
  { id: "5", title: "Avionics Integration", description: "Advanced flight control avionics testing", image: "/images/solution.png", category: "Manufacturing", date: "2025-08-22" },
  { id: "6", title: "VIP Delegation Visit", description: "Defense officials touring the facility", image: "/images/why-3.png", category: "Events", date: "2025-08-10" },
  { id: "7", title: "Rotor System Fabrication", description: "Advanced composite rotor manufacturing", image: "/images/aircraft.png", category: "Manufacturing", date: "2025-07-05" },
  { id: "8", title: "Night Flight Operations", description: "Low-altitude operations testing", image: "/images/why-1.png", category: "Flight Test", date: "2025-06-18" },
  { id: "9", title: "Maritime Trials", description: "Ship deck landing operations", image: "/images/hero.png", category: "Flight Test", date: "2025-06-01" },
  { id: "10", title: "Engineering Team", description: "Our world-class engineering team", image: "/images/why-3.png", category: "People", date: "2025-05-20" },
  { id: "11", title: "Rotor Head Testing", description: "Dynamic rotor head stress testing", image: "/images/aircraft.png", category: "Manufacturing", date: "2025-05-10" },
  { id: "12", title: "Aero India 2025", description: "Aero India exhibition showcase", image: "/images/r3-main.png", category: "Events", date: "2025-04-15" },
];

export const galleryCategories = ["All", "Flight Test", "Manufacturing", "Events", "People"];
