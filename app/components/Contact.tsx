import Reveal from "./Reveal";
import SectionTag from "./SectionTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--color-navy)] py-28 text-white"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--color-blue)]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s talk water
          </h2>
          <p className="mt-4 max-w-md text-white/70">
            Write to us to place a bulk order, become a retail partner, or
            just say hello.
          </p>

          <div className="mt-10 space-y-4 text-sm text-white/80">
            <a
              href="tel:+913300000000"
              className="flex items-center gap-3 hover:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
              </span>
              +91 33 0000 0000
            </a>
            <a
              href="mailto:info@jalsutra.com"
              className="flex items-center gap-3 hover:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
              </span>
              info@jalsutra.com
            </a>
            <p className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4" />
              </span>
              North 24 Parganas, Kolkata, West Bengal, India
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <a
              href="https://www.facebook.com/jalsutrawater/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/jalsutraofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="grid grid-cols-1 gap-4 rounded-3xl bg-white/5 p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm placeholder:text-white/50 focus:border-white/40 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm placeholder:text-white/50 focus:border-white/40 focus:outline-none"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone number"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm placeholder:text-white/50 focus:border-white/40 focus:outline-none"
            />
            <textarea
              rows={4}
              placeholder="Tell us something"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm placeholder:text-white/50 focus:border-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[var(--color-navy)] transition-transform hover:scale-105"
            >
              Send message
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
