import { defineField, defineType } from "sanity";
import { UserPlus } from "lucide-react";

export default defineType({
  name: "careerApplication",
  title: "Career Application",
  type: "document",
  icon: UserPlus,
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
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
      title: "Phone Number",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "position",
      title: "Position Applying For",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "source",
      title: "How did they hear about us?",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "bio",
      title: "Bio/Introduction",
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
      subtitle: "position",
    },
  },
});
