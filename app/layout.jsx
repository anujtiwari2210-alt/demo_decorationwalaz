import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import IntroProvider from "@/Components/Intro";
import constants from "@/data/constants.json";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: constants.seo.title,
  description: constants.seo.description,
};

export const viewport = { themeColor: "#1A1817" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body>
        <IntroProvider>{children}</IntroProvider>
      </body>
    </html>
  );
}
