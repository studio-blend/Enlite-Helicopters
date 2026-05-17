import { defineField, defineType } from "sanity";
import { ShieldCheck } from "lucide-react";

export default defineType({
  name: "client",
  title: "Client",
  type: "document",
  icon: ShieldCheck,
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g. Indian Army",
    }),
    defineField({
      name: "logo",
      title: "Client Logo (Upload)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "externalLogoUrl",
      title: "External Logo URL",
      type: "url",
      description: "Fallback direct URL if no logo is uploaded",
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Case Study / Client Details",
      type: "text",
      description: "Optional details about what we provide to this client",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
});
