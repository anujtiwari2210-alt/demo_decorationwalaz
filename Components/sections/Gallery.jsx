"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Eye, X } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink } from "@/lib/helpers";
import Reveal from "../ui/Reveal";

const g = content.gallery;
const SPAN = {
  large: "md:col-span-8",
  medium: "md:col-span-4",
};

export default function Gallery() {
  const [filter, setFilter] = useState(g.filters[0]);
  const [selectedItem, setSelectedItem] = useState(null);

  const items =
    filter === g.filters[0]
      ? g.items
      : g.items.filter((item) => item.category === filter);

  // Close the image modal when Escape is pressed.
  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    // Prevent background scrolling while the modal is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedItem]);

  return (
    <section id="gallery" className="section-y bg-ivory">
      <div className="container-x">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">{g.eyebrow}</span>

            <h2 className="font-display text-display-md-m md:text-display-md">
              {g.title}
            </h2>

            <p className="text-ink/80">{g.text}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {g.filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`label-sm relative rounded-sm border px-3.5 py-2 transition-colors ${
                  filter === f
                    ? "border-ebony text-ivory"
                    : "border-gold/40 text-ebony hover:bg-gold/10"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-sm bg-ebony"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}

                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Gallery grid */}
        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {items.map((it) => (
              <motion.figure
                key={it.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative h-[380px] overflow-hidden rounded bg-sand shadow-float md:h-[520px] ${
                  SPAN[it.size]
                }`}
              >
                <Image
                  src={it.image}
                  alt={it.title}
                  fill
                  sizes={
                    it.size === "large"
                      ? "(min-width:768px) 66vw, 100vw"
                      : "(min-width:768px) 33vw, 100vw"
                  }
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />

                {/* Image gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ebony/85 via-ebony/10 to-transparent" />

                {/* Eye button: visible on hover and keyboard focus */}
                <button
                  type="button"
                  onClick={() => setSelectedItem(it)}
                  aria-label={`Preview image: ${it.title}`}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-ebony/0 transition-colors duration-500 hover:bg-ebony/20 focus-visible:bg-ebony/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
                >
                  <span className="flex h-14 w-14 translate-y-3 items-center justify-center rounded-full border border-gold/60 bg-ebony/75 text-gold-light opacity-0 shadow-xl backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:scale-100 scale-90 focus-within:opacity-100">
                    <Eye size={23} strokeWidth={1.5} />
                  </span>
                </button>

                {/* Image caption */}
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5 md:p-7">
                  <div className="rounded border border-white/15 bg-ivory/10 p-4 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1">
                    <span className="label-sm text-gold-light">
                      {it.label}
                    </span>

                    <h3 className="mt-1 font-display text-headline-md text-ivory">
                      {it.title}
                    </h3>

                    <p className="mt-1 max-w-xl text-body-sm text-ivory/80">
                      {it.text}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Portfolio CTA */}
        <Reveal className="mt-10 flex justify-center">
          <a
            href={waLink(constants.whatsappMessages.portfolio)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            {g.cta} <ArrowRight size={14} />
          </a>
        </Reveal>
      </div>

      {/* Image preview modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Image preview: ${selectedItem.title}`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ebony/90 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedItem(null)}
          >
            {/* Close button */}
            <motion.button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="Close image preview"
              className="absolute right-4 top-4 z-[102] flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ivory/10 text-ivory backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ebony focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:right-8 sm:top-8"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <X size={22} strokeWidth={1.5} />
            </motion.button>

            {/* Preview content */}
            <motion.div
              className="relative w-full max-w-6xl overflow-hidden rounded border border-gold/30 bg-ebony shadow-2xl"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Image */}
              <div className="relative h-[55vh] min-h-[260px] max-h-[760px] w-full sm:h-[70vh]">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1152px"
                  className="object-contain"
                />
              </div>

              {/* Image information */}
              <div className="border-t border-gold/20 bg-ebony px-5 py-5 sm:px-8">
                <span className="label-sm text-gold-light">
                  {selectedItem.label}
                </span>

                <h3 className="mt-1 font-display text-headline-md text-ivory">
                  {selectedItem.title}
                </h3>

                <p className="mt-2 max-w-3xl text-body-sm text-ivory/70">
                  {selectedItem.text}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}