import { defineField, defineType } from "sanity";
import { Image as ImageIcon } from "lucide-react";

export default defineType({
  name: "gallery",
  title: "Gallery Item",
  type: "document",
  icon: ImageIcon,
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
      externalImageUrl: "externalImageUrl",
    },
    prepare({ title, subtitle, media, externalImageUrl }) {
      return {
        title,
        subtitle,
        media: media || undefined,
        description: !media && externalImageUrl ? `🔗 ${externalImageUrl}` : undefined,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Image (Upload)",
      type: "image",
      options: { hotspot: true },
      description: "Upload a local image. If provided, this takes priority over the External Image URL.",
    }),
    defineField({
      name: "externalImageUrl",
      title: "External Image URL",
      type: "url",
      description: "Paste a direct image URL (e.g. from Unsplash or a CDN). Used only if no image is uploaded above.",
    }),
    defineField({
      name: "video",
      title: "Video (Upload)",
      type: "file",
      options: { accept: "video/*" },
      description: "Upload a video file. If provided, this item will be treated as a video.",
    }),
    defineField({
      name: "videoUrl",
      title: "External Video URL",
      type: "url",
      description: "Paste a direct video URL (e.g. from a CDN). Used only if no video is uploaded above.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Flight Test", value: "Flight Test" },
          { title: "Manufacturing", value: "Manufacturing" },
          { title: "Events", value: "Events" },
          { title: "People", value: "People" },
          { title: "Testing", value: "Testing" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date Taken",
      type: "date",
    }),
  ],
});
