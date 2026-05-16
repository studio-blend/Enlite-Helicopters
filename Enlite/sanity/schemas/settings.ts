import { defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

export default defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  icon: Settings,
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Contact Phone",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Contact Address",
      type: "text",
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "twitter", type: "url", title: "Twitter" },
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "youtube", type: "url", title: "YouTube" },
        { name: "instagram", type: "url", title: "Instagram" },
      ],
    }),
    defineField({
      name: "brochure",
      title: "Company Brochure",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
  ],
});
