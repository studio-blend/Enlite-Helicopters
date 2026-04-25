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
    default: "Enlite Helicopters — Engineering the Future of Vertical Flight",
    template: "%s | Enlite Helicopters",
  },
  description:
    "Enlite Helicopters is a leading aerospace company specializing in advanced rotorcraft design, manufacturing, and support services for defense and civilian operations.",
  keywords: [
    "helicopters",
    "aerospace",
    "rotorcraft",
    "defense",
    "aviation",
    "Enlite",
    "vertical flight",
  ],
  authors: [{ name: "Enlite Helicopters" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://enlitehelicopters.com",
    siteName: "Enlite Helicopters",
    title: "Enlite Helicopters — Engineering the Future of Vertical Flight",
    description:
      "Advanced rotorcraft design, manufacturing, and support services for defense and civilian operations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enlite Helicopters",
    description: "Engineering the Future of Vertical Flight",
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
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
