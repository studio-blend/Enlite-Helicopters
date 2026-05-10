import type { Article } from "@/types";

export const articles: Article[] = [
  {
    id: "1",
    slug: "enlite-aero-defcon-2025",
    title: "Enlite Helicopters at Aero DefCon 2025",
    excerpt:
      "Enlite Helicopters showcased its autonomous unmanned cargo helicopter technology at Aero DefCon 2025, drawing attention from defence officials and aerospace industry leaders for its innovative R2 platform.",
    content: `Enlite Helicopters made a strong impression at Aero DefCon 2025, presenting its autonomous unmanned cargo helicopter platform to an audience of defence professionals, aerospace engineers, and government officials.\n\nThe R2 autonomous cargo helicopter was the centrepiece of the Enlite display, demonstrating the company's vision for unmanned logistics across civilian and defence applications. Attendees showed strong interest in the platform's 70 kg payload capacity, 500 km range, and fully autonomous operation.\n\nThe event provided an important opportunity for Enlite to connect with potential partners in the defence and logistics sectors, and to demonstrate the maturity of its technology platform. Multiple productive conversations were held with defence procurement officials regarding potential applications for military resupply operations.`,
    image: "/images/aircraft.png",
    category: "Events",
    tags: ["Aero DefCon", "Exhibition", "Defence", "R2"],
    author: {
      name: "Enlite Team",
      avatar: "/images/hero.png",
      role: "Communications",
    },
    publishedAt: "2025-03-15",
    readingTime: 3,
    featured: true,
    externalLink: "https://enlitehelicopters.com",
  },
  {
    id: "2",
    slug: "thanthi-news-enlite-coverage",
    title: "Thanthi News Covers Enlite's Autonomous Helicopter Technology",
    excerpt:
      "Tamil Nadu's leading news channel Thanthi TV featured Enlite Helicopters, highlighting the startup's breakthrough in autonomous unmanned cargo helicopter development from its base in Thiruvallur.",
    content: `Thanthi News, one of Tamil Nadu's most prominent news channels, aired a segment covering Enlite Helicopters and its groundbreaking work in autonomous unmanned cargo helicopter technology.\n\nThe coverage highlighted Enlite's journey as a Tamil Nadu-based aerospace startup, focusing on the R2 autonomous cargo helicopter's potential to transform logistics across India. The segment featured insights into the company's technical capabilities, including the helicopter's 70 kg payload capacity, 500 km operational range, and fully autonomous flight systems.\n\nThe news piece also covered the broader implications of Enlite's technology for remote area logistics, defence applications, and emergency medical supply delivery across challenging terrain.`,
    image: "/images/solution.png",
    category: "Press",
    tags: ["Thanthi", "Media", "Tamil Nadu", "Coverage"],
    author: {
      name: "Enlite Team",
      avatar: "/images/hero.png",
      role: "Communications",
    },
    publishedAt: "2025-02-20",
    readingTime: 2,
    featured: true,
    externalLink: "https://enlitehelicopters.com",
  },
  {
    id: "3",
    slug: "vikatan-aero-defcon-photo-album",
    title: "Vikatan Features Enlite at AeroDefCon Photo Album",
    excerpt:
      "Vikatan's photo coverage of AeroDefCon highlighted Enlite Helicopters among the standout exhibitors, showcasing the R2 unmanned cargo helicopter prototype and the team's vision for autonomous aerial logistics.",
    content: `Vikatan, one of India's most widely read Tamil media platforms, featured Enlite Helicopters in their AeroDefCon photo album coverage, highlighting the company as one of the notable exhibitors at the aerospace and defence event.\n\nThe photo feature captured the Enlite team presenting the R2 autonomous cargo helicopter concept to visitors and officials at the event. The coverage helped bring visibility to Enlite's mission of building practical, autonomous cargo helicopters for the Indian logistics and defence ecosystem.\n\nThe Vikatan coverage is part of a growing media recognition of Enlite's work in the unmanned aerial cargo space, a sector that is gaining increasing attention from both commercial and government stakeholders in India.`,
    image: "/images/civilian.png",
    category: "Press",
    tags: ["Vikatan", "AeroDefCon", "Media", "Photo Album"],
    author: {
      name: "Enlite Team",
      avatar: "/images/hero.png",
      role: "Communications",
    },
    publishedAt: "2025-03-18",
    readingTime: 2,
    featured: false,
    externalLink: "https://enlitehelicopters.com",
  },
];
