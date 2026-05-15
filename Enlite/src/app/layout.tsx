import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Enlite Helicopters — Autonomous Unmanned Cargo Helicopters",
    template: "%s | Enlite Helicopters",
  },
  description:
    "Enlite designs autonomous unmanned cargo helicopters that deliver 70 kg payloads up to 500 km — next-generation aerial logistics for civilian and defence operations across India's most demanding terrain.",
  authors: [{ name: "Enlite Helicopters" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://enlitehelicopters.com",
    siteName: "Enlite Helicopters",
    title: "Enlite Helicopters — Autonomous Unmanned Cargo Helicopters",
    description:
      "Autonomous unmanned cargo helicopters for long-range logistics — 70 kg payload, 500 km range, fully autonomous operation for civilian and defence missions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enlite Helicopters",
    description: "Autonomous unmanned cargo helicopters for long-range logistics across India.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Enlite Helicopters",
              "url": "https://enlitehelicopters.com",
              "logo": "https://enlitehelicopters.com/images/hero.png",
              "description": "Enlite designs autonomous unmanned cargo helicopters for civilian and defence operations.",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://www.linkedin.com/company/enlite-helicopters"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
