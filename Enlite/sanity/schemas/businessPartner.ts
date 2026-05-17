import { defineField, defineType } from "sanity";
import { Handshake } from "lucide-react";

export default defineType({
  name: "businessPartner",
  title: "Business Partner",
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
      title: "Partner Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g. Technical collaborator, co-developer, etc.",
    }),
    defineField({
      name: "logo",
      title: "Partner Logo (Upload)",
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
      name: "partnershipType",
      title: "Partnership Type",
      type: "string",
      description: "e.g. Technology Partner, Operational Partner",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
});
