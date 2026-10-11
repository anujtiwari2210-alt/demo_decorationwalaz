"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import { Icon } from "@/lib/helpers";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const p = content.process;

export default function Process() {
  return (
    <section className="section-y bg-cream">
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} text={p.text} />

        <div className="relative grid gap-6 md:grid-cols-3">
          {/* Connecting gold line (desktop) */}
          <motion.span
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute left-[16%] right-[16%] top-14 hidden h-px origin-left bg-gold/40 md:block"
          />
          {p.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.15}>
              <motion.div whileHover={{ y: -6 }} className="relative h-full rounded border border-gold/30 bg-white p-7 transition-shadow hover:shadow-float-lg">
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl text-gold/50">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-ivory text-gold-deep">
                    <Icon name={s.icon} size={18} />
                  </span>
                </div>
                <h3 className="mt-5 font-display text-headline-md">{s.title}</h3>
                <p className="mt-2 text-body-sm text-ink/75">{s.text}</p>
                <span className="label-sm mt-5 inline-block border-t border-gold/30 pt-4 text-gold-deep">{s.phase}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
