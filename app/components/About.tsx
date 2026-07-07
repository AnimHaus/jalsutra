import Reveal from "./Reveal";
import SectionTag from "./SectionTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const FACTS = [
  { label: "Trademark Since", value: "2011" },
  { label: "ISO Certification", value: "9001:2005" },
  { label: "Team Size", value: "11–25 People" },
  { label: "Base", value: "Kolkata, West Bengal" },
];

export default function About() {
  return (
    <section id="about" className="bg-[var(--color-cream)] py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-[var(--color-ink)] sm:text-5xl">
            A trusted name in packaged drinking water since 2011.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-[var(--color-ink)]/70">
            Jalsutra is a registered trademark manufactured out of Kolkata,
            West Bengal, backed by an ISO 9001:2005 certified process. What
            started as a single source has grown into a trusted supply
            across homes, offices, and retailers throughout the region.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--color-ink)] px-7 py-4 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            Get In Touch
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
          </a>
        </Reveal>

        <Reveal stagger={0.1} y={26} delay={0.1} className="grid grid-cols-2 gap-4">
          {FACTS.map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl bg-white p-6 text-[var(--color-ink)]"
            >
              <p className="font-display text-2xl font-bold leading-snug">
                {fact.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-ink)]/60">
                {fact.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
