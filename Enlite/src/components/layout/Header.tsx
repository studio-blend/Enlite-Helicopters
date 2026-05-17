"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/lib/constants";
import { EnliteLogo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function Header({ logo }: { logo?: string | null }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setIsScrolled(current > 20);
      setHidden(current > lastScroll && current > 100);
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass border-b border-border-light shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[80px]">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex-shrink-0 flex items-center">
              {logo ? (
                <img
                  src={logo}
                  alt="Enlite Helicopters"
                  className="h-8 w-auto object-contain"
                  style={{ maxHeight: "32px" }}
                />
              ) : (
                <EnliteLogo size={28} />
              )}
            </Link>

            <div className="flex items-center gap-8">
              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                        isActive
                          ? "text-brand-red"
                          : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-red rounded-full origin-left"
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Right side */}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-text-primary hover:bg-bg-tertiary transition-colors cursor-pointer"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-bg-overlay" onClick={() => setMobileOpen(false)} />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-bg-primary shadow-2xl p-6 pt-20"
            >
              <div className="flex flex-col gap-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive
                          ? "bg-brand-red/10 text-brand-red"
                          : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
