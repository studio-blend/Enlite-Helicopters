import { defineField, defineType } from "sanity";
import { TrendingUp } from "lucide-react";

export default defineType({
  name: "investorPage",
  title: "Investor Page",
  type: "document",
  icon: TrendingUp,
  fields: [
    defineField({
      name: "title",
      title: "Hero Title",
      type: "string",
      initialValue: "Investor",
    }),
    defineField({
      name: "subtitle",
      title: "Hero Subtitle",
      type: "text",
    }),
    defineField({
      name: "partnerSection",
      title: "Partner Section",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Title" },
        { name: "highlightText", type: "string", title: "Highlight Text" },
        { name: "content", type: "text", title: "Content" },
      ]
    }),
    defineField({
      name: "formTitle",
      title: "Form Section Title",
      type: "string",
      initialValue: "Get in Touch",
    }),
    defineField({
      name: "formDescription",
      title: "Form Section Description",
      type: "text",
    }),
  ],
});
