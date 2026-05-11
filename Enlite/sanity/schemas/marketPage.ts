import { defineField, defineType } from "sanity";
import { Target } from "lucide-react";

export default defineType({
  name: "marketPage",
  title: "Market Application",
  type: "document",
  icon: Target,
  preview: {
    select: { title: "title", subtitle: "category" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "context", title: "Context Section" },
    { name: "capabilities", title: "Capabilities / Benefits" },
    { name: "cta", title: "Call to Action" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── IDENTITY ──────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "e.g. 'Intercity Cargo Delivery'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title" },
      description: "Auto-generated from title. The URL will be /markets/[slug]",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. 'Civilian Logistics', 'Critical Response', 'Tactical Resupply'",
    }),
    defineField({
      name: "themeVariant",
      title: "Theme Variant",
      type: "string",
      options: {
        list: [
          { title: "Default (Red)", value: "default" },
          { title: "Defence (Slate/Dark)", value: "defence" },
        ],
        layout: "radio",
      },
      initialValue: "default",
      description: "Defence pages use a dark slate colour scheme.",
    }),

    // ── HERO SECTION ─────────────────────────────────────────
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Background Video",
      type: "file",
      options: { accept: "video/mp4" },
      group: "hero",
      description: "Optional. Upload a short MP4 video. If provided, this will loop automatically and override the hero image.",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      group: "hero",
      description: "e.g. 'Intercity Cargo' — the first part of the large H1",
    }),
    defineField({
      name: "heroHeadlineHighlight",
      title: "Hero Headline Highlight (Red/Accent)",
      type: "string",
      group: "hero",
      description: "e.g. 'Delivery' — the second line shown in the accent colour",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle Paragraph",
      type: "text",
      group: "hero",
      description: "The short paragraph under the headline",
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA Button Text",
      type: "string",
      group: "hero",
      initialValue: "Contact Our Team",
    }),

    // ── CONTEXT SECTION ───────────────────────────────────────
    defineField({
      name: "contextTitle",
      title: "Context Section Title",
      type: "string",
      group: "context",
      description: "e.g. 'Redefining the Middle Mile'",
    }),
    defineField({
      name: "contextTitleHighlight",
      title: "Context Title Highlight",
      type: "string",
      group: "context",
      description: "The part of the title shown in the accent colour",
    }),
    defineField({
      name: "contextParagraphs",
      title: "Context Paragraphs",
      type: "array",
      group: "context",
      of: [{ type: "text" }],
      description: "Two paragraphs explaining the problem and Enlite's solution",
    }),
    defineField({
      name: "contextImage",
      title: "Context Section Image",
      type: "image",
      options: { hotspot: true },
      group: "context",
      description: "The image shown on the right side of the context section",
    }),

    // ── CAPABILITIES / BENEFITS ───────────────────────────────
    defineField({
      name: "capabilitiesTitle",
      title: "Capabilities Section Heading",
      type: "string",
      group: "capabilities",
      initialValue: "Key Advantages",
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities / Benefits Cards",
      type: "array",
      group: "capabilities",
      description: "The grid of capability or benefit cards (typically 4)",
      of: [
        {
          type: "object",
          preview: {
            select: { title: "title" },
          },
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
            {
              name: "icon",
              type: "string",
              title: "Lucide Icon Name",
              description: "e.g. 'Clock', 'Package', 'Shield'. Case-sensitive Lucide icon name.",
            },
          ],
        },
      ],
    }),

    // ── CTA SECTION ───────────────────────────────────────────
    defineField({
      name: "ctaTitle",
      title: "CTA Section Title",
      type: "string",
      group: "cta",
      description: "e.g. 'Ready to upgrade your logistics network?'",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Section Description",
      type: "text",
      group: "cta",
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
      group: "cta",
      initialValue: "Contact Our Team",
    }),

    // ── SEO ───────────────────────────────────────────────────
    defineField({
      name: "seoDescription",
      title: "SEO Meta Description",
      type: "text",
      group: "seo",
      description: "Shown in Google search results. Keep under 160 characters.",
      validation: (Rule) => Rule.max(160),
    }),
  ],
});
