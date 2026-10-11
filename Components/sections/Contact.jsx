"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink, Icon } from "@/lib/helpers";
import Reveal from "../ui/Reveal";
import { FaWhatsapp } from "react-icons/fa";

const c = content.contact;
const f = c.form;
const EMPTY = { name: "", phone: "", eventType: "", date: "", budget: "premium", venue: "", message: "" };

// Label + input wrapper (component ke bahar rakha hai taaki typing me focus na jaye)
function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label-md text-ink">{label}</label>
      {children}
      {error && <span className="text-body-sm text-red-700">{error}</span>}
    </div>
  );
}

export default function Contact() {
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
    // Services section ke CTA se event type aata hai
    const onPick = (e) => setData((d) => ({ ...d, eventType: e.detail }));
    window.addEventListener("dw:event-type", onPick);
    return () => window.removeEventListener("dw:event-type", onPick);
  }, []);

  const set = (key) => (e) => {
    setData((d) => ({ ...d, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (data.name.trim().length < 2) er.name = "Please enter your name";
    if (data.phone.replace(/\D/g, "").length < 10) er.phone = "Enter a valid phone number";
    if (!data.eventType) er.eventType = "Select an event type";
    if (!data.date) er.date = "Choose a date";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  // Backend ki zarurat nahi: enquiry WhatsApp par pre-filled message ban kar khulti hai
  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const label = (list, v) => list.find((x) => x.value === v)?.label || v;
    const msg = [
      `Hello ${constants.brand.name}, new enquiry:`,
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Event: ${label(f.eventTypes, data.eventType)}`,
      `Date: ${data.date}`,
      `Budget: ${label(f.budgets, data.budget)}`,
      data.venue && `Venue: ${data.venue}`,
      data.message && `Notes: ${data.message}`,
    ].filter(Boolean).join("\n");

    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
    setData(EMPTY);
    setTimeout(() => setSent(false), 7000);
  };

  return (
    <section id="contact" className="section-y bg-ivory">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        {/* Left: concierge */}
        <Reveal className="flex flex-col gap-6 lg:col-span-5">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 className="font-display text-headline-lg-m md:text-display-md">{c.title}</h2>
          <p className="text-ink/80">{c.text}</p>

          <div className="card-hairline p-6">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]"><FaWhatsapp size={22} /></span>
              <div>
                <h3 className="font-display text-headline-sm">{c.whatsappCard.title}</h3>
                <p className="mt-1 text-body-sm text-ink/75">{c.whatsappCard.text}</p>
              </div>
            </div>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn mt-5 w-full border-[#25D366] bg-[#25D366] text-white hover:brightness-95">
              <FaWhatsapp size={16} /> {c.whatsappCard.cta}
            </a>
          </div>

          <ul className="flex flex-col gap-3">
            {c.badges.map((b) => (
              <li key={b.text} className="flex items-start gap-3 text-body-sm text-ink/80">
                <Icon name={b.icon} size={16} className="mt-0.5 shrink-0 text-gold-deep" /> {b.text}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={0.15} className="lg:col-span-7">
          <form onSubmit={submit} noValidate className="flex flex-col gap-5 rounded border border-gold/30 bg-white p-6 shadow-float md:p-9">
            <div>
              <h3 className="font-display text-headline-md">{f.title}</h3>
              <p className="mt-1 text-body-sm text-ink/70">{f.text}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Your Full Name *" error={errors.name}>
                <input id="name" value={data.name} onChange={set("name")} placeholder="e.g. Rajesh Kumar" className={`field ${errors.name ? "field-error" : ""}`} />
              </Field>
              <Field id="phone" label="Phone Number (WhatsApp) *" error={errors.phone}>
                <input id="phone" type="tel" value={data.phone} onChange={set("phone")} placeholder="+91 98765 43210" className={`field ${errors.phone ? "field-error" : ""}`} />
              </Field>
              <Field id="eventType" label="Event Type *" error={errors.eventType}>
                <select id="eventType" value={data.eventType} onChange={set("eventType")} className={`field ${errors.eventType ? "field-error" : ""}`}>
                  <option value="" disabled>Select event category</option>
                  {f.eventTypes.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </Field>
              <Field id="date" label="Expected Event Date *" error={errors.date}>
                <input id="date" type="date" min={today} value={data.date} onChange={set("date")} className={`field ${errors.date ? "field-error" : ""}`} />
              </Field>
              <Field id="budget" label="Decor Budget Range">
                <select id="budget" value={data.budget} onChange={set("budget")} className="field">
                  {f.budgets.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </Field>
              <Field id="venue" label="Venue or City in UP">
                <input id="venue" value={data.venue} onChange={set("venue")} placeholder="e.g. Landmark Hotel / Lawn, Kanpur" className="field" />
              </Field>
            </div>

            <Field id="message" label="Specific Decor Ideas or Preferences">
              <textarea id="message" rows={3} value={data.message} onChange={set("message")} placeholder="Tell us about your theme, floral inclinations, or stage dimensions..." className="field resize-none" />
            </Field>

            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="btn-primary w-full sm:w-auto"><Send size={14} /> {f.submit}</button>
              <span className="label-sm text-ink/50">{f.note}</span>
            </div>

            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start gap-3 rounded border border-gold/40 bg-gold/10 p-4 text-body-sm">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold-deep" /> {f.success}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
