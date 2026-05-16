import { Suspense } from "react";
import { sanityFetch } from "@/lib/sanity";
import { allGalleryItemsQuery } from "@/lib/sanity-queries";
import GalleryClient from "./GalleryClient";
import { GalleryItem } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Gallery | High-Fidelity Renders & Flight Test Media | Enlite",
  },
  description:
    "View the Enlite autonomous helicopter fleet in action. High-fidelity 3D renders, tactical flight test videos, and behind-the-scenes engineering media.",
};

export default async function GalleryPage() {
  let galleryItems: GalleryItem[] = [];

  try {
    const sanityGallery = await sanityFetch<GalleryItem[]>({ query: allGalleryItemsQuery, tags: ["gallery"] });
    galleryItems = sanityGallery || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  const categories = ["All", ...new Set(galleryItems.map(item => item.category))];

  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-primary flex items-center justify-center text-text-primary">Loading Gallery...</div>}>
      <GalleryClient galleryItems={galleryItems} categories={categories} />
    </Suspense>
  );
}
