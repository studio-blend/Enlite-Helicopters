import { defineField, defineType } from "sanity";
import { Star } from "lucide-react";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: Star,
  preview: {
    select: {
      title: "name",
      subtitle: "company",
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
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "User Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],
});
