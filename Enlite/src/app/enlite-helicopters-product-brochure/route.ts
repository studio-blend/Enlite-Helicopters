import { NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "@/lib/sanity";
import { siteSettingsQuery } from "@/lib/sanity-queries";

export async function GET(request: NextRequest) {
  try {
    const settings = await sanityFetch<any>({
      query: siteSettingsQuery,
      tags: ["settings"],
    });

    const brochureUrl = settings?.brochure;

    if (!brochureUrl) {
      // Redirect to fallback in public folder dynamically using request origin
      const origin = request.nextUrl.origin;
      return NextResponse.redirect(new URL("/enlite-brochure.pdf", origin));
    }

    // Fetch PDF from Sanity CDN
    const response = await fetch(brochureUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF from Sanity CDN: ${response.statusText}`);
    }

    const pdfBuffer = await response.arrayBuffer();

    // Stream/serve the PDF to the browser for inline rendering
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=\"enlite-helicopters-product-brochure.pdf\"",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving brochure PDF:", error);
    const origin = request.nextUrl.origin;
    return NextResponse.redirect(new URL("/enlite-brochure.pdf", origin));
  }
}
