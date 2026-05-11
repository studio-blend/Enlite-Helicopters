import { defineField, defineType } from "sanity";
import { Image as ImageIcon } from "lucide-react";

export default defineType({
  name: "gallery",
  title: "Gallery Item",
  type: "document",
  icon: ImageIcon,
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Military", value: "Military" },
          { title: "Civilian", value: "Civilian" },
          { title: "Interiors", value: "Interiors" },
          { title: "Action", value: "Action" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date Taken",
      type: "date",
    }),
  ],
});
