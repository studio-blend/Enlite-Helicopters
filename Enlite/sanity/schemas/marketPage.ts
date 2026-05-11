import { defineField, defineType } from "sanity";
import { Target } from "lucide-react";

export default defineType({
  name: "marketPage",
  title: "Market Application",
  type: "document",
  icon: Target,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "overview",
      title: "Market Overview",
      type: "text",
    }),
    defineField({
      name: "challenges",
      title: "Current Challenges",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "solutions",
      title: "Our Solutions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
            { name: "icon", type: "string", title: "Lucide Icon Name" },
          ],
        },
      ],
    }),
    defineField({
      name: "benefits",
      title: "Key Benefits",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "string", title: "Description" },
          ],
        },
      ],
    }),
  ],
});
