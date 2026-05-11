import { defineField, defineType } from "sanity";
import { Info } from "lucide-react";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: Info,
  fields: [
    defineField({
      name: "title",
      title: "Hero Title",
      type: "string",
      initialValue: "About Us",
    }),
    defineField({
      name: "subtitle",
      title: "Hero Subtitle",
      type: "text",
    }),
    defineField({
      name: "videoTitle",
      title: "Video Section Title",
      type: "string",
      initialValue: "Our Story & Vision",
    }),
    defineField({
      name: "videoSubtitle",
      title: "Video Section Subtitle",
      type: "string",
      initialValue: "Watch the Journey",
    }),
    defineField({
      name: "videoDescription",
      title: "Video Description",
      type: "text",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
    }),
    defineField({
      name: "videoThumbnail",
      title: "Video Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "highlightText", type: "string", title: "Highlight Text (Red)" },
            { name: "content", type: "array", of: [{ type: "text" }], title: "Paragraphs" },
            { name: "image", type: "image", title: "Image", options: { hotspot: true } },
            { 
              name: "video", 
              type: "file", 
              title: "Background Video", 
              options: { accept: "video/mp4" },
              description: "Optional. Upload a short MP4 video. If provided, this will loop automatically and override the image." 
            },
            { name: "badge", type: "string", title: "Badge Text" },
            { name: "reverse", type: "boolean", title: "Reverse Layout", initialValue: false },
          ],
        },
      ],
    }),
    defineField({
      name: "values",
      title: "Core Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
            { name: "image", type: "image", title: "Image", options: { hotspot: true } },
          ],
        },
      ],
    }),
  ],
});
