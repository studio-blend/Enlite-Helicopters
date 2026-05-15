import { client } from "@/lib/sanity";
import { allGalleryItemsQuery } from "@/lib/sanity-queries";
import GalleryClient from "./GalleryClient";
import { GalleryItem } from "@/types";

export const revalidate = 60;

export default async function GalleryPage() {
  let galleryItems: GalleryItem[] = [];

  try {
    const sanityGallery = await client.fetch<GalleryItem[]>(allGalleryItemsQuery);
    galleryItems = sanityGallery || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

  const categories = ["All", ...new Set(galleryItems.map(item => item.category))];

  return <GalleryClient galleryItems={galleryItems} categories={categories} />;
}
