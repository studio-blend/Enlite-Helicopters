import { defineField, defineType } from "sanity";
import { Users } from "lucide-react";

export default defineType({
  name: "team",
  title: "Team",
  type: "document",
  icon: Users,
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
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
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
});
