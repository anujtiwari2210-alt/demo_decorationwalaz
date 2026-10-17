"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MapPin } from "lucide-react";
import constants from "@/data/constants.json";
import { waLink } from "@/lib/helpers";
import { useIntroReady } from "./Intro";
import { FaWhatsapp } from "react-icons/fa";

const { brand, nav } = constants;

export default function Header() {
  const ready = useIntroReady();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  const handleMobileNavigation = (event, href) => {
    const target = document.querySelector(href);
    setOpen(false);
    if (!target) return;

    event.preventDefault();
    // wait for the drawer to close so layout is stable before scrolling
    setTimeout(() => {
      window.history.pushState(null, "", href);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
  };

  // Scroll-spy: highlights the nav item for the section in view
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    nav.forEach((n) => {
      const el = document.querySelector(n.href);
      el && io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu on Escape, and when resizing up to desktop
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-gold/25 bg-ivory/90 shadow-float backdrop-blur-md"
            : "border-gold/10 bg-ivory/75 backdrop-blur-sm"
        }`}
      >
        <div className="container-x flex h-20 items-center justify-between gap-4">
          {/* Brand */}
          <a href="#home" className="flex min-w-0 items-center gap-3">
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-display text-headline-sm uppercase leading-tight tracking-wider">
                {brand.name}
              </span>
              <span className="label-sm flex items-center gap-1 text-gold-deep">
                <MapPin size={11} className="shrink-0" />
                <span className="truncate">{brand.location}</span>
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 xl:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`label-md relative py-1 transition-colors hover:text-gold-deep ${
                  active === n.href ? "text-gold-deep" : "text-ink"
                }`}
              >
                {n.label}
                {active === n.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-gold"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="label-sm hidden items-center gap-2 rounded border border-gold/30 bg-cream px-3 py-2 transition hover:bg-gold/10 md:inline-flex"
            >
              <FaWhatsapp size={15} className="text-[#25D366]" /> WhatsApp
            </a>
            <a href="#contact" className="btn-outline hidden px-5 py-2.5 sm:inline-flex">
              Plan Your Event
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-gold/40 xl:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer: sibling of the header so the header's transform/blur
          doesn't clip or break it */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-20 z-40 max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-gold/20 bg-ivory shadow-float xl:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-5">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={(event) => handleMobileNavigation(event, n.href)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={`border-b border-ebony/5 py-3 font-display text-headline-md ${
                    active === n.href ? "text-gold-deep" : ""
                  }`}
                >
                  {n.label}
                </motion.a>
              ))}

              <a
                href="#contact"
                onClick={(event) => handleMobileNavigation(event, "#contact")}
                className="btn-primary mt-4"
              >
                Plan Your Event
              </a>

              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="label-sm mt-2 inline-flex items-center justify-center gap-2 rounded border border-gold/30 bg-cream px-3 py-3 md:hidden"
              >
                <FaWhatsapp size={16} className="text-[#25D366]" /> WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}