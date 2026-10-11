"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import content from "@/data/content.json";
import { Icon } from "@/lib/helpers";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const s = content.services;

export default function Services() {
  // CTA click par contact form me event type auto-select hota hai
  const pickEvent = (type) => window.dispatchEvent(new CustomEvent("dw:event-type", { detail: type }));

  return (
    <section id="services" className="section-y bg-white">
      <div className="container-x">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} text={s.text} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {s.items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.1}>
              <motion.article
                whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="card-hairline group flex h-full flex-col justify-between p-5 transition-shadow duration-500 hover:shadow-float-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-[16/10] overflow-hidden rounded bg-sand">
                    <Image
                      src={it.image} alt={it.title} fill sizes="(min-width:1024px) 30vw, (min-width:768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="label-sm absolute left-2 top-2 rounded-sm bg-ebony/80 px-2.5 py-1 text-ivory backdrop-blur-sm">{it.badge}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-headline-sm transition-colors group-hover:text-gold-deep">{it.title}</h3>
                    <p className="mt-1 text-body-sm text-ink/75">{it.text}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-gold/20 pt-4">
                  <a
                    href="#contact" onClick={() => pickEvent(it.eventType)}
                    className="label-md inline-flex items-center gap-1.5 border-b border-gold pb-1 text-ebony transition-all hover:gap-3 hover:text-gold-deep"
                  >
                    {it.cta} <ArrowRight size={13} />
                  </a>
                  <Icon name={it.icon} size={20} className="text-gold/50" />
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
