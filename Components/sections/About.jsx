"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import { Icon } from "@/lib/helpers";
import Reveal from "../ui/Reveal";

const a = content.about;

export default function About() {
  return (
    <section id="about" className="section-y bg-ivory">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="flex flex-col gap-4 lg:col-span-6">
          <span className="eyebrow">{a.eyebrow}</span>
          <h2 className="font-display text-headline-lg-m md:text-headline-lg">
            {a.title} <br /> <span className="italic text-gold-deep">{a.accent}</span>
          </h2>
          {a.paragraphs.map((p) => <p key={p} className="text-ink/80">{p}</p>)}
          <div className="mt-2 flex items-center gap-5">
            {a.stats.map((s, i) => (
              <div key={s.value} className="flex items-center gap-5">
                {i > 0 && <span className="h-8 w-px bg-gold/40" />}
                <div className="flex flex-col">
                  <span className="font-display text-headline-sm">{s.value}</span>
                  <span className="label-sm text-ink/60">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="flex flex-col gap-4 lg:col-span-6">
          {a.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <motion.div whileHover={{ x: 6 }} className="card-hairline flex gap-4 p-5 transition-shadow hover:shadow-float">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-gold/15 text-gold-deep">
                  <Icon name={p.icon} size={20} />
                </div>
                <div>
                  <h3 className="font-display text-headline-sm">{p.title}</h3>
                  <p className="mt-1 text-body-sm text-ink/75">{p.text}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
