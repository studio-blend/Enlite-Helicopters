import { defineField, defineType } from "sanity";
import { ShoppingBag } from "lucide-react";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: ShoppingBag,
  preview: {
    select: {
      title: "name",
      subtitle: "category",
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
      options: {
        source: "name",
        maxLength: 96,
      },
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
          { title: "Defense", value: "Defense" },
          { title: "Civilian", value: "Civilian" },
          { title: "Cargo", value: "Cargo" },
          { title: "Cargo Transfer", value: "Cargo Transfer" },
          { title: "Medical", value: "Medical" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "externalImageUrl",
      title: "External Image URL",
      type: "string",
      description: "Fallback image URL if no image is uploaded (e.g. /images/r2-main.png)",
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "externalGalleryUrls",
      title: "External Gallery URLs",
      type: "array",
      of: [{ type: "string" }],
      description: "Fallback gallery URLs if no gallery images are uploaded",
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
            { name: "unit", type: "string", title: "Unit (optional)" },
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
      title: "Price (optional)",
      type: "string",
    }),
  ],
});
