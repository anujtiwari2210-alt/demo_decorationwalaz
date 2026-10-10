import "./globals.css";
import constants from "@/lib/constants.json";

export const metadata = {
  title: `${constants.brandName} | ${constants.tagline}`,
  description: "Bespoke wedding and event decoration in Kanpur and across Uttar Pradesh.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
