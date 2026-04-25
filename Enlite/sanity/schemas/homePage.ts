import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "solutionTitle",
      title: "Solution Section Title",
      type: "string",
    }),
    defineField({
      name: "solutionDescription",
      title: "Solution Section Description",
      type: "text",
    }),
    defineField({
      name: "solutionImage",
      title: "Solution Section Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "stats",
      title: "Key Stats",
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
  ],
});
