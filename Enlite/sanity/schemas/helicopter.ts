import { defineField, defineType } from "sanity";
import { Plane } from "lucide-react";

export default defineType({
  name: "product",
  title: "Helicopter",
  type: "document",
  icon: Plane,
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      media: "image",
    },
  },
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Military", value: "Military" },
          { title: "Civilian", value: "Civilian" },
          { title: "Cargo", value: "Cargo" },
          { title: "Medical", value: "Medical" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "externalImageUrl",
      title: "External Image URL",
      type: "string",
      description: "Fallback image URL if no image is uploaded",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "externalGalleryUrls",
      title: "External Gallery URLs",
      type: "array",
      of: [{ type: "string" }],
      description: "Fallback gallery URLs",
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
            { name: "unit", type: "string", title: "Unit" },
          ],
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Production", value: "production" },
          { title: "Development", value: "development" },
          { title: "Concept", value: "concept" },
        ],
      },
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
    }),
  ],
});
