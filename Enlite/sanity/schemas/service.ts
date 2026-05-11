import { defineField, defineType } from "sanity";
import { Layers } from "lucide-react";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: Layers,
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
  fields: [
    defineField({
      name: "name",
      title: "Service Name",
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
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "icon",
      title: "Icon (Lucide name)",
      type: "string",
    }),
  ],
});
