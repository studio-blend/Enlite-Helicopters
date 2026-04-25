"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity/sanity.config";
import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    // Hide the main site header and footer when in the studio
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const main = document.querySelector("main");

    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";
    if (main) {
      main.style.minHeight = "100vh";
      main.style.padding = "0";
    }

    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
      if (main) {
        main.style.minHeight = "";
        main.style.padding = "";
      }
    };
  }, []);

  return <NextStudio config={config} />;
}
