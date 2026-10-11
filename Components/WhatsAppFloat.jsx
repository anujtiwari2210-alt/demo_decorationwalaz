"use client";

import { motion } from "framer-motion";
import constants from "@/data/constants.json";
import { waLink } from "@/lib/helpers";
import { useIntroReady } from "./Intro";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  const ready = useIntroReady();
  return (
    <motion.a
      href={waLink(constants.whatsappMessages.floating)} target="_blank" rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }} animate={ready ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: 1.2, type: "spring", stiffness: 220, damping: 16 }}
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-float-lg"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
      <FaWhatsapp className="relative" size={26} />
    </motion.a>
  );
}
