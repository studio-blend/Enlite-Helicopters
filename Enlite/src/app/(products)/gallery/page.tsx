import { sanityFetch } from "@/lib/sanity";
import { allGalleryItemsQuery } from "@/lib/sanity-queries";
import GalleryClient from "./GalleryClient";
import { GalleryItem } from "@/types";



export default async function GalleryPage() {
  let galleryItems: GalleryItem[] = [];

  try {
    const sanityGallery = await sanityFetch<GalleryItem[]>({ query: allGalleryItemsQuery, tags: ["gallery"] });
    galleryItems = sanityGallery || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  const categories = ["All", ...new Set(galleryItems.map(item => item.category))];

  return <GalleryClient galleryItems={galleryItems} categories={categories} />;
}
