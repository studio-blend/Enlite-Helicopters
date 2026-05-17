import Link from "next/link";
import { EnliteLogo } from "@/components/ui/Logo";
import { siteConfig, navigation } from "@/lib/constants";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { sanityFetch } from "@/lib/sanity";
import { siteSettingsQuery } from "@/lib/sanity-queries";

export async function Footer() {
  let settings = siteConfig;
  try {
    const sanitySettings = await sanityFetch<any>({ query: siteSettingsQuery, tags: ["settings"] });
    if (sanitySettings) {
      settings = {
        ...siteConfig,
        ...sanitySettings,
        social: {
          ...siteConfig.social,
          ...sanitySettings.social
        }
      };
    }
  } catch (error) {
    console.error("Error fetching site settings for footer:", error);
  }

  return (
    <footer className="relative bg-bg-footer text-text-secondary border-t border-border-default overflow-hidden transition-colors duration-300">
      {/* Subtle Gradient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Main Footer */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="space-y-8 lg:col-span-1">
            <Link href="/" className="inline-block text-text-primary hover:opacity-80 transition-opacity flex items-center">
              {settings.logo ? (
                <img
                  src={settings.logo}
                  alt={settings.name || "Enlite Helicopters"}
                  className="h-10 w-auto object-contain"
                  style={{ maxHeight: "40px" }}
                />
              ) : (
                <EnliteLogo size={32} />
              )}
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              {settings.description}
            </p>
            <div className="flex gap-4">
              {["twitter", "linkedin", "youtube", "instagram"].map((social) => {
                const url = settings.social[social as keyof typeof settings.social];
                if (!url) return null;
                return (
                  <a
                    key={social}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-bg-tertiary hover:bg-brand-red text-text-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                    aria-label={social}
                  >
                    <SocialIcon name={social} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-text-primary font-bold text-xs uppercase tracking-[0.2em] mb-8" role="heading" aria-level={3}>Quick Links</p>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Team", href: "/team" }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[13px] text-text-secondary hover:text-brand-red hover:translate-x-1 inline-block transition-all duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <p className="text-text-primary font-bold text-xs uppercase tracking-[0.2em] mb-8" role="heading" aria-level={3}>Products</p>
            <ul className="space-y-4">
              {[
                { label: "Our Fleet", href: "/helicopters" },
                { label: "Markets", href: "/markets" },
                { label: "Enlite R2", href: "/helicopters/enlite-r2" },
                { label: "Enlite R3", href: "/helicopters/enlite-r3" },
                { label: "Download Brochure", href: "/enlite-helicopters-product-brochure", isExternal: true }
              ].map((item) => (
                <li key={item.label}>
                  {item.isExternal ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-text-secondary hover:text-brand-red hover:translate-x-1 inline-block transition-all duration-200">
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="text-[13px] text-text-secondary hover:text-brand-red hover:translate-x-1 inline-block transition-all duration-200">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-text-primary font-bold text-xs uppercase tracking-[0.2em] mb-8" role="heading" aria-level={3}>Resources</p>
            <ul className="space-y-4">
              {[
                { label: "News", href: "/news" },
                { label: "Careers", href: "/careers" },
                { label: "Gallery", href: "/gallery" }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[13px] text-text-secondary hover:text-brand-red hover:translate-x-1 inline-block transition-all duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enquiry */}
          <div className="lg:col-span-1">
            <p className="text-text-primary font-bold text-xs uppercase tracking-[0.2em] mb-8" role="heading" aria-level={3}>Enquiry</p>
            <ul className="space-y-6">
              <li className="flex flex-col gap-4 mb-2">
                <Link href="/contact" className="text-[13px] text-text-secondary hover:text-brand-red transition-all duration-200 font-semibold flex items-center gap-2">
                  Contact Us <ChevronRight className="w-3 h-3" />
                </Link>
                <Link href="/investor" className="text-[13px] text-text-secondary hover:text-brand-red transition-all duration-200 font-semibold flex items-center gap-2">
                  Investor Relations <ChevronRight className="w-3 h-3" />
                </Link>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center shrink-0 group-hover:bg-brand-red/10 transition-colors">
                  <MapPin className="w-4 h-4 text-brand-red" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Address</p>
                  <p className="text-[13px] text-text-secondary leading-relaxed">{settings.address}</p>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center shrink-0 group-hover:bg-brand-red/10 transition-colors">
                  <Mail className="w-4 h-4 text-brand-red" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Email</p>
                  <a href={`mailto:${settings.email}`} className="text-[13px] text-text-secondary hover:text-brand-red transition-colors">{settings.email}</a>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center shrink-0 group-hover:bg-brand-red/10 transition-colors">
                  <Phone className="w-4 h-4 text-brand-red" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Phone</p>
                  <a href={`tel:${settings.phone}`} className="text-[13px] text-text-secondary hover:text-brand-red transition-colors">{settings.phone}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border-default flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-[11px] text-text-muted uppercase tracking-widest font-medium">
              Copyright © {new Date().getFullYear()} ENLITE Helicopters | all rights reserved
            </p>
            <div className="h-px w-8 bg-border-default hidden md:block" />
            <p className="text-[11px] text-text-muted uppercase tracking-widest">
              Designed by <span className="text-text-primary font-semibold">Studio Blend</span>
            </p>
          </div>
          <div className="flex gap-8">
            <Link href="/sitemap.xml" className="text-[11px] text-text-muted hover:text-text-primary uppercase tracking-widest transition-colors font-medium">Sitemap</Link>
            <Link href="/privacy" className="text-[11px] text-text-muted hover:text-text-primary uppercase tracking-widest transition-colors font-medium">Privacy</Link>
            <Link href="/terms" className="text-[11px] text-text-muted hover:text-text-primary uppercase tracking-widest transition-colors font-medium">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const iconSize = "w-4 h-4";
  switch (name) {
    case "twitter":
      return <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
    case "linkedin":
      return <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
    case "youtube":
      return <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
    case "instagram":
      return <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>;
    default:
      return null;
  }
}
