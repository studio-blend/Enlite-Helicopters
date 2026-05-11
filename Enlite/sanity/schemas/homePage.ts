import { defineField, defineType } from "sanity";
import { Home } from "lucide-react";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: Home,
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "stats", title: "Statistics" },
    { name: "features", title: "Features (Problems)" },
    { name: "solution", title: "The Solution" },
    { name: "aircraft", title: "Aircraft Section" },
    { name: "range", title: "Range Map Section" },
  ],
  fields: [
    // --- HERO SECTION ---
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      group: "hero",
      description: "Use 'Enlite' to get the red styling applied automatically.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      group: "hero",
    }),
    defineField({
      name: "heroImageLight",
      title: "Hero Image (Light Mode)",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "heroImageDark",
      title: "Hero Image (Dark Mode)",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),

    // --- STATS SECTION ---
    defineField({
      name: "stats",
      title: "Key Stats",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value (e.g., '70 kg')" },
          ],
        },
      ],
    }),

    // --- FEATURES SECTION ---
    defineField({
      name: "featuresTitle",
      title: "Features Section Title",
      type: "string",
      group: "features",
      initialValue: "Why Current Logistics Solutions Don't Scale?",
    }),
    defineField({
      name: "features",
      title: "Features / Problems List",
      type: "array",
      group: "features",
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

    // --- SOLUTION SECTION ---
    defineField({
      name: "solutionTitle",
      title: "Solution Section Title",
      type: "string",
      group: "solution",
    }),
    defineField({
      name: "solutionDescription",
      title: "Solution Section Description",
      type: "text",
      group: "solution",
    }),
    defineField({
      name: "solutionImage",
      title: "Solution Section Image",
      type: "image",
      options: { hotspot: true },
      group: "solution",
    }),
    defineField({
      name: "solutionTags",
      title: "Solution Tags",
      type: "array",
      group: "solution",
      of: [{ type: "string" }],
    }),

    // --- AIRCRAFT SECTION ---
    defineField({
      name: "aircraftTitle",
      title: "Aircraft Section Title",
      type: "string",
      group: "aircraft",
      initialValue: "The Enlite Aircraft",
    }),
    defineField({
      name: "aircraftDescription",
      title: "Aircraft Section Description",
      type: "text",
      group: "aircraft",
    }),
    defineField({
      name: "aircraftImage",
      title: "Aircraft Image",
      type: "image",
      options: { hotspot: true },
      group: "aircraft",
    }),
    defineField({
      name: "aircraftFeatures",
      title: "Aircraft Bullet Features",
      type: "array",
      group: "aircraft",
      of: [{ type: "string" }],
    }),

    // --- RANGE SECTION ---
    defineField({
      name: "rangeTitle",
      title: "Range Section Title",
      type: "string",
      group: "range",
      initialValue: "Unmatched Operational Range",
    }),
    defineField({
      name: "rangeDescription",
      title: "Range Section Description",
      type: "text",
      group: "range",
    }),
    defineField({
      name: "rangeBullets",
      title: "Range Bullet Points",
      type: "array",
      group: "range",
      of: [{ type: "string" }],
    }),
  ],
});
