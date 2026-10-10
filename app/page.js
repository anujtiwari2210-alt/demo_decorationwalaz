"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  Flower2,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import content from "@/lib/content.json";
import constants from "@/lib/constants.json";

const ease = [0.22, 1, 0.36, 1];
const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  center = false,
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`section-heading ${center ? "text-center items-center" : ""}`}
    >
      <span className="eyebrow">
        <i />
        {eyebrow}
      </span>
      <h2>
        {title} {accent && <em>{accent}</em>}
      </h2>
      {description && <p>{description}</p>}
    </motion.div>
  );
}

function WhatsAppLink({ children, className = "", message }) {
  const text = encodeURIComponent(message || constants.whatsappMessage);
  return (
    <a
      className={className}
      href={`https://wa.me/${constants.phoneDigits}?text=${text}`}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All moments");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    event: "",
    date: "",
    venue: "",
    notes: "",
  });
  const reduceMotion = useReducedMotion();
  const galleryItems = useMemo(
    () =>
      content.gallery.items.filter(
        (item) => filter === "All moments" || item.category === filter,
      ),
    [filter],
  );

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }
  function submitEnquiry(event) {
    event.preventDefault();
    const message = `Hello ${constants.brandName}, I would like to enquire about an event.\nName: ${form.name}\nPhone: ${form.phone}\nEvent: ${form.event}\nDate: ${form.date || "Not decided"}\nVenue: ${form.venue || "Not decided"}\nDetails: ${form.notes || "Please guide me"}`;
    setSubmitted(true);
    window.open(
      `https://wa.me/${constants.phoneDigits}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="intro-curtain"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.2, delay: 0.25, ease }}
          style={{ transformOrigin: "top" }}
        >
          <motion.div
            className="intro-mark"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Image
              src={constants.assets.logo}
              alt="Decoration Walazz monogram"
              width={70}
              height={70}
              priority
            />
            <span>{constants.brandName}</span>
            <small>{constants.tagline}</small>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <header className="site-header">
        <a
          href="#home"
          className="brand-lockup"
          aria-label={`${constants.brandName} home`}
        >
          <Image
            src={constants.assets.logo}
            alt=""
            width={42}
            height={42}
            priority
          />
          <span>
            <strong>{constants.brandName}</strong>
            <small>{constants.city}</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {content.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <WhatsAppLink className="header-whatsapp">
            <span className="whatsapp-dot" /> WhatsApp
          </WhatsAppLink>
          <a className="button button-dark header-cta" href="#contact">
            Plan your event <ArrowRight size={15} />
          </a>
        </div>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            aria-label="Mobile navigation"
          >
            {content.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                <ArrowRight size={16} />
              </a>
            ))}
            <WhatsAppLink className="button button-gold">
              Chat with our team <ArrowRight size={16} />
            </WhatsAppLink>
          </motion.nav>
        )}
      </AnimatePresence>

      <main>
        <section className="hero" id="home">
          <div className="hero-media">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={constants.assets.heroPoster}
              aria-label="Atmospheric royal wedding decoration"
            >
              <source src={constants.assets.heroVideo} type="video/mp4" />
            </video>
            <Image
              className="hero-fallback"
              src={constants.assets.heroPoster}
              alt="Illustrated royal wedding mandap"
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="hero-shade" />
          <div className="hero-frame">
            <motion.div
              className="hero-copy"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.15, delayChildren: 1.05 },
                },
              }}
            >
              <motion.span variants={reveal} className="hero-eyebrow">
                <Sparkles size={13} />
                {content.hero.eyebrow}
              </motion.span>
              <motion.h1 variants={reveal}>
                {content.hero.title.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
                <em>{content.hero.accent}</em>
              </motion.h1>
              <motion.p variants={reveal}>{content.hero.description}</motion.p>
              <motion.div variants={reveal} className="hero-buttons">
                <a className="button button-ivory" href="#gallery">
                  {content.hero.primaryCta}
                  <ArrowDownRight size={16} />
                </a>
                <WhatsAppLink className="button button-glass">
                  {content.hero.secondaryCta}
                  <ArrowRight size={16} />
                </WhatsAppLink>
              </motion.div>
              <motion.div variants={reveal} className="hero-highlights">
                {content.hero.highlights.map((item, index) => (
                  <span key={item}>
                    {index > 0 && <b>·</b>}
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
          <div className="hero-index">
            <span>01</span>
            <i />
            <span>04</span>
          </div>
          <a href="#story" className="scroll-cue">
            <span>Scroll to discover</span>
            <ArrowDownRight size={17} />
          </a>
        </section>

        <section className="story section-pad" id="story">
          <div className="container story-grid">
            <div className="story-copy">
              <SectionHeading
                eyebrow={content.story.eyebrow}
                title={content.story.title}
                accent={content.story.accent}
              />
              {content.story.paragraphs.map((p) => (
                <p className="body-copy" key={p}>
                  {p}
                </p>
              ))}
              <div className="story-signature">
                <span className="signature-flower">
                  <Flower2 size={24} />
                </span>
                <span>
                  <strong>Designed with intention.</strong>
                  <small>Made with heart in Kanpur.</small>
                </span>
              </div>
            </div>
            <div className="craft-stack">
              {content.story.pillars.map((pillar, index) => (
                <motion.article
                  className="craft-row"
                  key={pillar.number}
                  initial={{ opacity: 0, x: 22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: index * 0.13, ease }}
                >
                  <span className="craft-number">{pillar.number}</span>
                  <div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                  </div>
                  <ArrowDownRight className="craft-arrow" size={19} />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="container">
            <SectionHeading center {...content.servicesTitle} />
            <div className="service-grid">
              {content.services.map((service, index) => (
                <motion.article
                  className="service-card"
                  key={service.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: (index % 3) * 0.09,
                    ease,
                  }}
                >
                  <a
                    href="#contact"
                    onClick={() =>
                      setForm((old) => ({
                        ...old,
                        event: {
                          wedding: "Wedding & Mandap",
                          engagement: "Engagement",
                          haldi: "Haldi & Mehndi",
                          reception: "Reception",
                          birthday: "Birthday / Private Party",
                          custom: "Custom Event",
                        }[service.id],
                      }))
                    }
                    className="service-image"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                    />
                    <span className="image-tag">{service.tag}</span>
                    <span className="image-arrow">
                      <ArrowUpRightIcon />
                    </span>
                  </a>
                  <div className="service-body">
                    <span className="service-category">{service.category}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <a
                      href="#contact"
                      onClick={() =>
                        setForm((old) => ({
                          ...old,
                          event: {
                            wedding: "Wedding & Mandap",
                            engagement: "Engagement",
                            haldi: "Haldi & Mehndi",
                            reception: "Reception",
                            birthday: "Birthday / Private Party",
                            custom: "Custom Event",
                          }[service.id],
                        }))
                      }
                      className="text-link"
                    >
                      Let’s discuss <ArrowRight size={15} />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery section-pad" id="gallery">
          <div className="container">
            <div className="gallery-heading">
              <SectionHeading {...content.gallery} />
              <div
                className="filter-list"
                role="group"
                aria-label="Filter portfolio"
              >
                {content.gallery.filters.map((option) => (
                  <button
                    key={option}
                    className={
                      filter === option ? "filter-chip active" : "filter-chip"
                    }
                    onClick={() => setFilter(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <motion.div layout className="gallery-grid">
              <AnimatePresence mode="popLayout">
                {galleryItems.map((item) => (
                  <motion.article
                    layout
                    key={item.title}
                    className={`gallery-card gallery-${item.size}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 700px) 100vw, 60vw"
                    />
                    <div className="gallery-overlay">
                      <span>{item.category}</span>
                      <h3>{item.title}</h3>
                      <p>{item.caption}</p>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
            <div className="gallery-footnote">
              <span>Every celebration is different. So is every design.</span>
              <WhatsAppLink className="text-link">
                Request our lookbook <ArrowRight size={15} />
              </WhatsAppLink>
            </div>
          </div>
        </section>

        <section className="process section-pad">
          <div className="container">
            <SectionHeading center {...content.process} />
            <div className="process-grid">
              {content.process.steps.map((step, index) => (
                <motion.article
                  className="process-card"
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease }}
                >
                  <div className="process-top">
                    <span>{step.number}</span>
                    <i>
                      <Sparkles size={16} />
                    </i>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="process-rule" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <SectionHeading {...content.contact} />
              <div className="contact-note">
                <span className="contact-note-icon">
                  <Flower2 size={21} />
                </span>
                <div>
                  <strong>Prefer a quick conversation?</strong>
                  <p>
                    Message us directly to talk through your date, ideas and the
                    kind of celebration you have in mind.
                  </p>
                  <WhatsAppLink className="text-link">
                    Chat on WhatsApp <ArrowRight size={15} />
                  </WhatsAppLink>
                </div>
              </div>
              <div className="contact-details">
                <div>
                  <span>Visit our studio</span>
                  <p>{constants.address}</p>
                </div>
                <div>
                  <span>Call / WhatsApp</span>
                  <p>{constants.phoneDisplay}</p>
                </div>
                <div>
                  <span>Our service area</span>
                  <p>{constants.availabilityNote}</p>
                </div>
              </div>
            </div>
            <motion.div
              className="enquiry-panel"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="form-heading">
                <span className="eyebrow">
                  <i />A few little details
                </span>
                <h3>{content.contact.formTitle}</h3>
                <p>Share what you know. We can figure out the rest together.</p>
              </div>
              <form onSubmit={submitEnquiry}>
                <div className="form-row">
                  <label>
                    Your name *
                    <input
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      placeholder="Full name"
                      required
                      autoComplete="name"
                    />
                  </label>
                  <label>
                    Phone / WhatsApp *
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={updateField}
                      placeholder="Your contact number"
                      required
                      type="tel"
                      pattern="[+0-9() -]{8,20}"
                      autoComplete="tel"
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    What are we celebrating? *
                    <span className="select-wrap">
                      <select
                        name="event"
                        value={form.event}
                        onChange={updateField}
                        required
                      >
                        <option value="">Choose an occasion</option>
                        {content.contact.eventTypes.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                      <ChevronDown size={15} />
                    </span>
                  </label>
                  <label>
                    Event date
                    <input
                      name="date"
                      value={form.date}
                      onChange={updateField}
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </label>
                </div>
                <label>
                  Venue / city
                  <input
                    name="venue"
                    value={form.venue}
                    onChange={updateField}
                    placeholder="Venue name or city"
                  />
                </label>
                <label>
                  Anything else we should know?
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={updateField}
                    placeholder="Your ideas, colours, guest count, budget…"
                    rows={3}
                  />
                </label>
                <button
                  type="submit"
                  className="button button-dark submit-button"
                >
                  Send enquiry on WhatsApp <ArrowRight size={16} />
                </button>
                {submitted && (
                  <p className="form-success">
                    <Check size={16} />
                    {content.contact.success}
                  </p>
                )}
                <small className="privacy-note">
                  Your details are used only to respond to this enquiry.
                </small>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <a href="#home" className="brand-lockup footer-brand">
            <Image src={constants.assets.logo} alt="" width={46} height={46} />
            <span>
              <strong>{constants.brandName}</strong>
              <small>{constants.city}</small>
            </span>
          </a>
          <p>{content.footer.note}</p>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#gallery">Portfolio</a>
            <a href="#contact">Contact</a>
            <WhatsAppLink>WhatsApp ↗</WhatsAppLink>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} {constants.brandName}. Made for
            meaningful moments.
          </span>
          <span>{constants.tagline}</span>
        </div>
      </footer>
      <WhatsAppLink
        className="floating-whatsapp"
        aria-label="Chat with Decoration Walazz on WhatsApp"
      >
        <span className="whatsapp-dot" />
        <span>Let’s talk</span>
      </WhatsAppLink>
    </>
  );
}

function ArrowUpRightIcon() {
  return <ArrowDownRight size={17} style={{ transform: "rotate(-135deg)" }} />;
}
