import HeroTrust from "./components/HeroTrust";
import Features from "./components/Features";
import SvgBubblesTransition from "./components/SvgBubblesTransition";
import ProcessSection from "./components/ProcessSection";
import Products from "./components/Products";
import Testimonial from "./components/Testimonial";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import ScrollProgressBar from "./components/ScrollProgressBar";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <ScrollProgressBar />
      <HeroTrust />
      <SvgBubblesTransition />
      <Features />
      <ProcessSection />
      <Products />
      <Testimonial />
      <About />
      <Contact />
      <Footer />
      <CookieConsent />
    </div>
  );
}
