import { defineField, defineType } from "sanity";
import { Handshake } from "lucide-react";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: Handshake,
  preview: {
    select: {
      title: "name",
      media: "logo",
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
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
});
