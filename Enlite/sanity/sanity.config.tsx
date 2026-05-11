import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { Plane } from "lucide-react";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";

// Singleton document types — only one instance allowed, no "create new" option
const singletonTypes = new Set(["settings", "homePage", "aboutPage", "investorPage"]);

// Permitted actions for singleton documents (no delete/duplicate/unpublish)
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

// Custom Logo Component for the Studio navbar
const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <Plane size={24} color="#C41E3A" />
    <span style={{ fontWeight: "bold", fontSize: "1.2rem", letterSpacing: "-0.02em" }}>
      ENLITE <span style={{ color: "#C41E3A" }}>STUDIO</span>
    </span>
  </div>
);

export default defineConfig({
  name: "default",
  title: "Enlite Helicopters",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/admin",

  plugins: [
    deskTool({
      structure,
    }),
    visionTool(),
  ],

  studio: {
    components: {
      logo: Logo,
    },
  },

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global "New document" menu options
    templates: (prev) =>
      prev.filter((template) => !singletonTypes.has(template.schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly allowed
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({ action }) => action && singletonActions.has(action));
      }
      return prev;
    },
  },
});
