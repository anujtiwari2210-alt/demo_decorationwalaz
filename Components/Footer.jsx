import { Phone, Mail } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink, Icon } from "@/lib/helpers";
import { FaWhatsapp } from "react-icons/fa";

const { brand, contact, nav } = constants;
const f = content.footer;

export default function Footer() {
  return (
    <footer className="bg-ebony text-ivory/80">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="font-display text-headline-md uppercase tracking-wider text-gold-light">{brand.name}</span>
            <p className="text-body-sm">{f.about}</p>
            <span className="label-sm flex items-center gap-2 text-gold-light">
              <Icon name="verified" size={14} /> {f.badge}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="label-md text-gold-light">{f.categoriesTitle}</span>
            {f.categories.map((c) => (
              <a key={c} href="#services" className="text-body-sm transition hover:text-gold-light">{c}</a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="label-md text-gold-light">{f.navTitle}</span>
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-body-sm transition hover:text-gold-light">{n.label}</a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="label-md text-gold-light">{f.coverageTitle}</span>
            <p className="flex gap-2 text-body-sm"><Icon name="building" size={16} className="mt-0.5 shrink-0 text-gold" />{contact.address}</p>
            <p className="flex gap-2 text-body-sm"><Icon name="compass" size={16} className="mt-0.5 shrink-0 text-gold" />{f.coverage}</p>
            <a href={`tel:${contact.phoneRaw}`} className="flex items-center gap-2 text-body-sm hover:text-gold-light"><Phone size={15} className="text-gold" />{contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-body-sm hover:text-gold-light"><Mail size={15} className="text-gold" />{contact.email}</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-glass w-fit px-5 py-3">
              <FaWhatsapp size={15} className="text-[#25D366]" /> {f.whatsappCta}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gold/20 pt-6 md:flex-row">
          <p className="label-sm text-ivory/50">© {new Date().getFullYear()} {brand.name}. All Rights Reserved. Kanpur, Uttar Pradesh.</p>
          <span className="label-sm text-gold/80">{f.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
