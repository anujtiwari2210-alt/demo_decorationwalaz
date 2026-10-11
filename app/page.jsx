import Header from "@/Components/Header";
import Hero from "@/Components/sections/Hero";
import About from "@/Components/sections/About";
import Services from "@/Components/sections/Services";
import Gallery from "@/Components/sections/Gallery";
import Process from "@/Components/sections/Process";
import Contact from "@/Components/sections/Contact";
import Footer from "@/Components/Footer";
import WhatsAppFloat from "@/Components/WhatsAppFloat";

// Single-page site: har section apni id (#home, #about...) se nav se jud-ta hai
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
