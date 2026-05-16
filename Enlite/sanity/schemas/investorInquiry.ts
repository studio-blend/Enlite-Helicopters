import { defineField, defineType } from "sanity";
import { TrendingUp } from "lucide-react";

export default defineType({
  name: "investorInquiry",
  title: "Investor Inquiry",
  type: "document",
  icon: TrendingUp,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "profession",
      title: "Profession",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "information",
      title: "Additional Information",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
  },
});
