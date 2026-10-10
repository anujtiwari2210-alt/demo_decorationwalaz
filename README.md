# Decoration Walazz — Royal Editorial

A responsive Next.js App Router website for a luxury wedding and event decor studio. Built with JavaScript, Tailwind CSS v4, Framer Motion and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content setup (intentionally only two JSON files)

- `lib/content.json` — navigation labels, all page copy, services, gallery items, process steps and enquiry options.
- `lib/constants.json` — business name, contact details, WhatsApp number, service area and shared asset paths.

Edit these files to update the website without hunting through JSX. Replace the demo contact details in `lib/constants.json` before launch.

## Public assets

- `public/images/` — local SVG artwork and PNG preview assets for the portfolio cards and logo.
- `public/videos/royal-intro.mp4` — locally hosted, subtle animated intro visual used in the hero. Replace with a licensed event-decor video whenever real footage is available.

The included artwork is an original decorative illustration / design placeholder, not a claim that these are real client installations.

## Contact form

The enquiry form validates the required fields in the browser and opens WhatsApp with the enquiry prefilled. No backend or paid form service is required. Confirm the real WhatsApp number and test it before publishing. For email delivery or CRM storage, connect a backend later.

## Deployment

`next.config.mjs` uses `output: "export"` and unoptimized local images for static hosting. Run `npm run build`; deploy the generated `out/` directory to a static host. For `next start`, remove the static export setting.
