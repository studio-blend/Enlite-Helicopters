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
    { name: "mission", title: "Mission & Founder Video" },
    { name: "aircraft", title: "Aircraft Section" },
    { name: "testing", title: "Flight Testing / Proof" },
    { name: "range", title: "Range Map Section" },
  ],
  fields: [
    // ... hero fields ...
    // ... stats fields ...
    // ... features fields ...

    // --- TESTING / PROVEN IN FLIGHT SECTION ---
    defineField({
      name: "testingTitle",
      title: "Testing Section Title",
      type: "string",
      group: "testing",
      initialValue: "Proven in Flight",
    }),
    defineField({
      name: "testingDescription",
      title: "Testing Section Description",
      type: "text",
      group: "testing",
      initialValue: "Our technology is not just on paper. We rigorously test our platforms in real-world conditions to ensure mission reliability.",
    }),
    defineField({
      name: "testingVideoPlayMode",
      title: "Testing Videos Playback Mode",
      type: "string",
      options: {
        list: [
          { title: "Play on Click (Opens Modal)", value: "click" },
          { title: "Play on Scroll (Inline)", value: "scroll" },
        ],
        layout: "radio",
      },
      initialValue: "scroll",
      group: "testing",
      description: "Choose how videos in this section behave. 'Click' opens a modal, 'Scroll' plays inline.",
    }),
    defineField({
      name: "testingSourceNote",
      title: "Source Note",
      type: "string",
      group: "testing",
      readOnly: true,
      description: "Note: Videos in this section are now automatically pulled from the Gallery (Category: 'Flight Test'). The field below is deprecated.",
    }),
    defineField({
      name: "testingVideos",
      title: "Deprecated: Testing Videos (Legacy)",
      type: "array",
      group: "testing",
      description: "This field is deprecated. Please manage flight test videos in the Gallery collection instead.",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "subtitle", type: "string" },
            { name: "thumbnailUrl", type: "url" },
            { name: "video", type: "file" },
          ],
        },
      ],
    }),
    // ... other fields ...
    // ... after product section fields ...
    // --- MISSION / FOUNDER VIDEO SECTION ---
    defineField({
      name: "missionTitle",
      title: "Mission Section Title",
      type: "string",
      group: "mission",
      initialValue: "The Vision Behind Enlite",
    }),
    defineField({
      name: "missionSubtitle",
      title: "Mission Section Subtitle",
      type: "string",
      group: "mission",
      initialValue: "A Message from our Founder",
    }),
    defineField({
      name: "missionDescription",
      title: "Mission Description / Quote",
      type: "text",
      group: "mission",
    }),
    defineField({
      name: "missionVideo",
      title: "Video (Upload)",
      type: "file",
      options: { accept: "video/*" },
      group: "mission",
    }),
    defineField({
      name: "missionVideoUrl",
      title: "Video URL (External)",
      type: "url",
      group: "mission",
      description: "YouTube or Vimeo URL",
    }),
    defineField({
      name: "missionThumbnail",
      title: "Video Thumbnail",
      type: "image",
      options: { hotspot: true },
      group: "mission",
    }),
    defineField({
      name: "videoThumbnailUrl",
      title: "External Video Thumbnail URL",
      type: "url",
      group: "mission",
    }),
    defineField({
      name: "videoPlayMode",
      title: "Video Playback Mode",
      type: "string",
      options: {
        list: [
          { title: "Play on Click (Inline)", value: "click" },
          { title: "Play on Scroll (Auto)", value: "scroll" },
        ],
        layout: "radio",
      },
      initialValue: "click",
      group: "mission",
    }),
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
    defineField({
      name: "heroImageLightUrl",
      title: "Hero Image (Light) External URL",
      type: "url",
      group: "hero",
    }),
    defineField({
      name: "heroImageDarkUrl",
      title: "Hero Image (Dark) External URL",
      type: "url",
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
            { name: "imageUrl", type: "url", title: "External Image URL" },
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
      initialValue: "The Enlite Solution: A New Class of Aerial Logistics",
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
      name: "solutionImageUrl",
      title: "External Image URL",
      type: "url",
      group: "solution",
    }),
    defineField({
      name: "solutionVideo",
      title: "Solution Section Background Video",
      type: "file",
      options: { accept: "video/mp4" },
      group: "solution",
      description: "Optional. Upload a short MP4 video. If provided, this will loop automatically and override the image.",
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
      initialValue: "The Enlite Aircraft: Special Features",
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
      name: "aircraftImageUrl",
      title: "External Image URL",
      type: "url",
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
