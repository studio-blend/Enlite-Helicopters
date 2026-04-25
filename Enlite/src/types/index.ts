export interface Helicopter {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  image: string;
  gallery: string[];
  specs: HelicopterSpec[];
  features: string[];
  status: "production" | "development" | "concept";
  price?: string;
}

export interface HelicopterSpec {
  label: string;
  value: string;
  unit?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: any; // Using any for PortableText content blocks
  image: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  externalLink?: string;
}

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  date: string;
}

export interface Career {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  description: string;
  requirements: string[];
  postedAt: string;
  closingDate?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  url?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  address: string;
  social: {
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
  };
}
