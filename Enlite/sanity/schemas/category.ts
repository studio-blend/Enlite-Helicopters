import { defineField, defineType } from "sanity";
import { Layers } from "lucide-react";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: Layers,
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
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
