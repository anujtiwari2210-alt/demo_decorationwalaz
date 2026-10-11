"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import constants from "@/data/constants.json";
import content from "@/data/content.json";

/**
 * Royal opening: ebony curtains + gold monogram, phir curtains dono taraf khulte hain.
 * `useIntroReady()` se baaki sections ko pata chalta hai kab animate karna hai.
 */
const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);

const CURTAIN_EASE = [0.76, 0, 0.24, 1];
const { enabled, oncePerSession, durationMs } = constants.intro;
const { brand } = constants;

export default function IntroProvider({ children }) {
  const [showing, setShowing] = useState(enabled);

  // Timer + "already seen" check
  useEffect(() => {
    if (!enabled) return;
    let seen = false;
    try { seen = oncePerSession && sessionStorage.getItem("dw-intro") === "1"; } catch {}
    if (seen) { setShowing(false); return; }

    const t = setTimeout(() => {
      setShowing(false);
      try { sessionStorage.setItem("dw-intro", "1"); } catch {}
    }, durationMs);
    return () => clearTimeout(t);
  }, []);

  // Intro ke dauran scroll lock
  useEffect(() => {
    document.body.style.overflow = showing ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showing]);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={!showing}>
        {children}
        <AnimatePresence>
          {showing && (
            <motion.div key="intro" className="fixed inset-0 z-[100]" exit={{ opacity: 1 }} aria-hidden>
              {/* Two curtains */}
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 border-r border-gold/40 bg-ebony"
                exit={{ x: "-100%", transition: { duration: 1.2, ease: CURTAIN_EASE } }}
              />
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 border-l border-gold/40 bg-ebony"
                exit={{ x: "100%", transition: { duration: 1.2, ease: CURTAIN_EASE } }}
              />
              {/* Soft gold glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.16),transparent_60%)]" />

              {/* Centre emblem */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                exit={{ opacity: 0, scale: 1.12, transition: { duration: 0.6 } }}
              >
                <div className="relative flex h-32 w-32 items-center justify-center">
                  <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
                    <motion.circle
                      cx="60" cy="60" r="56" fill="none" stroke="#C5A059" strokeWidth="1"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 1.6, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx="60" cy="60" r="50" fill="none" stroke="#C5A059" strokeOpacity="0.35" strokeWidth="0.6"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ duration: 1.9, delay: 0.2, ease: "easeInOut" }}
                    />
                  </svg>
                  <motion.span
                    className="font-display text-4xl text-gold-light"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.9 }}
                  >
                    {brand.monogram}
                  </motion.span>
                </div>

                <motion.h1
                  className="mt-8 font-display text-2xl uppercase text-ivory sm:text-3xl"
                  initial={{ opacity: 0, letterSpacing: "0.1em" }}
                  animate={{ opacity: 1, letterSpacing: "0.38em" }}
                  transition={{ delay: 1, duration: 1.6, ease: "easeOut" }}
                >
                  {brand.name}
                </motion.h1>

                <motion.div
                  className="my-5 flex items-center gap-3"
                  initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.5, duration: 0.9 }}
                >
                  <span className="h-px w-16 bg-gold/70" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                  <span className="h-px w-16 bg-gold/70" />
                </motion.div>

                <motion.p
                  className="font-display text-base italic text-gold-light/90"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9, duration: 0.9 }}
                >
                  {content.intro.tagline}
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </IntroContext.Provider>
    </MotionConfig>
  );
}
