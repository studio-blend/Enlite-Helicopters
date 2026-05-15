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
      title: "Logo (Upload)",
      type: "image",
      options: { hotspot: true },
      description: "Upload a logo image. Takes priority over the External Logo URL.",
    }),
    defineField({
      name: "externalLogoUrl",
      title: "External Logo URL",
      type: "url",
      description: "Paste a direct image URL for the logo (e.g. Wikipedia SVG, CDN). Used only if no logo is uploaded.",
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
