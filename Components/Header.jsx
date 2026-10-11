"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

  // Scroll-spy: jis section me ho wo nav me highlight hoga
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    nav.forEach((n) => { const el = document.querySelector(n.href); el && io.observe(el); });

    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled ? "border-gold/25 bg-ivory/90 shadow-float backdrop-blur-md" : "border-gold/10 bg-ivory/75 backdrop-blur-sm"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-4">
        {/* Brand */}
        <a href="#home" className="flex shrink-0 items-center gap-3">
          {/* <Image src={brand.logo} alt={`${brand.name} logo`} width={40} height={40} className="h-9 w-auto object-contain" priority /> */}
          <div className="flex flex-col">
            <span className="font-display text-headline-sm uppercase leading-tight tracking-wider">{brand.name}</span>
            <span className="label-sm flex items-center gap-1 text-gold-deep">
              <MapPin size={11} /> {brand.location}
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 xl:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`label-md relative py-1 transition-colors hover:text-gold-deep ${active === n.href ? "text-gold-deep" : "text-ink"}`}
            >
              {n.label}
              {active === n.href && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-px bg-gold" />
              )}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href={waLink()} target="_blank" rel="noopener noreferrer"
            className="label-sm hidden items-center gap-2 rounded border border-gold/30 bg-cream px-3 py-2 transition hover:bg-gold/10 md:inline-flex"
          >
            <FaWhatsapp size={15} className="text-[#25D366]" /> WhatsApp
          </a>
          <a href="#contact" className="btn-outline hidden px-5 py-2.5 sm:inline-flex">Plan Your Event</a>
          <button
            onClick={() => setOpen((v) => !v)} aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded border border-gold/40 xl:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-gold/20 bg-ivory xl:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-5">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href} href={n.href} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
                  className={`border-b border-ebony/5 py-3 font-display text-headline-md ${active === n.href ? "text-gold-deep" : ""}`}
                >
                  {n.label}
                </motion.a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-4">Plan Your Event</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
