import { defineField, defineType } from "sanity";
import { Mail } from "lucide-react";

export default defineType({
  name: "contact",
  title: "Contact Submission",
  type: "document",
  icon: Mail,
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
      name: "subject",
      title: "Subject",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
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
      subtitle: "subject",
      date: "submittedAt",
    },
    prepare({ title, subtitle, date }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : "No date";
      return {
        title: title || "Unknown",
        subtitle: `${dateStr} — ${subtitle || "No subject"}`,
      };
    },
  },
});
