import type { NavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Enlite Helicopters",
  tagline: "Engineering the Future of Vertical Flight",
  description:
    "Enlite designs autonomous unmanned cargo helicopters that deliver 70 kg payloads up to 500 km — next-generation aerial logistics for civilian and defence operations across India's most demanding terrain.",
  url: "https://enlitehelicopters.com",
  email: "info@enlitehelicopters.com",
  phone: "+91 81486 70820",
  address: "Thiruvallur, Tamil Nadu, India",
  social: {
    twitter: "https://twitter.com/enlitehelicopters",
    linkedin: "https://linkedin.com/company/enlite-helicopters",
    youtube: "https://youtube.com/@enlitehelicopters",
    instagram: "https://instagram.com/enlitehelicopters",
  },
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/helicopters" },
  { label: "Markets", href: "/markets" },
  { label: "Team", href: "/team" },
  { label: "Investor", href: "/investor" },
  { label: "Gallery", href: "/gallery" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const categories = [
  { id: "all", name: "All", slug: "all", count: 0 },
  { id: "defense", name: "Defense", slug: "defense", count: 5 },
  { id: "civilian", name: "Civilian", slug: "civilian", count: 3 },
  { id: "cargo", name: "Cargo Transfer", slug: "cargo-transfer", count: 4 },
  { id: "medical", name: "Medical Evacuation", slug: "medical-evacuation", count: 2 },
  { id: "maritime", name: "Maritime Operations", slug: "maritime-operations", count: 3 },
];
