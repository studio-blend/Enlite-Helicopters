import { defineField, defineType } from "sanity";
import { Info } from "lucide-react";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: Info,
  fields: [
    defineField({
      name: "title",
      title: "Hero Title",
      type: "string",
      initialValue: "About Us",
    }),
    defineField({
      name: "subtitle",
      title: "Hero Subtitle",
      type: "text",
    }),
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "highlightText", type: "string", title: "Highlight Text (Red)" },
            { name: "content", type: "array", of: [{ type: "text" }], title: "Paragraphs" },
            { name: "image", type: "image", title: "Image", options: { hotspot: true } },
            { name: "badge", type: "string", title: "Badge Text" },
            { name: "reverse", type: "boolean", title: "Reverse Layout", initialValue: false },
          ],
        },
      ],
    }),
    defineField({
      name: "values",
      title: "Core Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
            { name: "image", type: "image", title: "Image", options: { hotspot: true } },
          ],
        },
      ],
    }),
  ],
});
