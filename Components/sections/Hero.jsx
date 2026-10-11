"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink, Icon } from "@/lib/helpers";
import { fadeUp, stagger } from "@/lib/motion";
import { useIntroReady } from "../Intro";
import { FaWhatsapp } from "react-icons/fa";

const h = content.hero;

export default function Hero() {
  const ready = useIntroReady();
  const ref = useRef(null);

  // Parallax: scroll par background halka sa neeche/zoom hota hai
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  return (
    <section id="home" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-ebony text-ivory">
      {/* Background video (poster = fallback image) */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover" autoPlay muted loop playsInline
          preload="metadata" poster={h.poster}
        >
          <source src={h.video} type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/55 to-ebony/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ebony/75 via-transparent to-ebony/30" />

      <motion.div
        variants={stagger(0.16, 0.15)} initial="hidden" animate={ready ? "show" : "hidden"}
        className="container-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-40 md:pb-24"
      >
        <div className="flex max-w-3xl flex-col gap-6">
          <motion.span variants={fadeUp} className="label-sm inline-flex w-fit items-center gap-2 rounded-sm border border-gold/40 bg-white/10 px-3 py-1.5 text-gold-light backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-light" /> {h.badge}
          </motion.span>

          <motion.h1 variants={fadeUp} className="font-display text-display-lg-m md:text-[68px] md:leading-[1.08]">
            {h.titleLine} <br className="hidden sm:inline" />
            <span className="italic text-gold-light">{h.titleAccent}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="max-w-xl text-body-lg font-light text-ivory/80">{h.subtitle}</motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-2">
            <a href="#gallery" className="btn-light">{h.primaryCta}</a>
            <a href={waLink(constants.whatsappMessages.consult)} target="_blank" rel="noopener noreferrer" className="btn-glass">
              <FaWhatsapp size={16} className="text-[#25D366]" /> {h.secondaryCta}
            </a>
          </motion.div>

          <motion.ul variants={fadeUp} className="label-sm mt-4 flex flex-wrap gap-x-6 gap-y-2 text-ivory/70">
            {h.highlights.map((x) => (
              <li key={x.label} className="flex items-center gap-1.5">
                <Icon name={x.icon} size={14} className="text-gold-light" /> {x.label}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.span animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="block h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}
