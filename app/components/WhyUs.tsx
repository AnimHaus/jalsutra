"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import SectionTag from "./SectionTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faShieldHalved, faFlask, faFeather, faBoxesStacked, faStar } from "@fortawesome/free-solid-svg-icons";

const REASONS = [
  {
    icon: <FontAwesomeIcon icon={faDroplet} className="h-9 w-9" style={{ color: "#189CD8" }} />,
    title: "Natural Spring Source",
    copy: "Water drawn from a trusted, hygienic source in West Bengal.",
  },
  {
    icon: <FontAwesomeIcon icon={faShieldHalved} className="h-9 w-9" style={{ color: "#189CD8" }} />,
    title: "ISO 9001:2005 Certified",
    copy: "Manufactured under an internationally recognised quality standard.",
  },
  {
    icon: <FontAwesomeIcon icon={faFlask} className="h-9 w-9" style={{ color: "#189CD8" }} />,
    title: "Balanced pH",
    copy: "Consistently tested to keep pH levels safe and balanced.",
  },
  {
    icon: <FontAwesomeIcon icon={faFeather} className="h-9 w-9" style={{ color: "#189CD8" }} />,
    title: "Low Sodium",
    copy: "Light on sodium, easy on the body, every single bottle.",
  },
  {
    icon: <FontAwesomeIcon icon={faBoxesStacked} className="h-9 w-9" style={{ color: "#189CD8" }} />,
    title: "Multiple Pack Sizes",
    copy: "From 200ml to 5000ml — the right size for every need.",
  },
  {
    icon: <FontAwesomeIcon icon={faStar} className="h-9 w-9" style={{ color: "#189CD8" }} />,
    title: "Trusted Since 2011",
    copy: "A registered trademark with over a decade of consistent quality.",
  },
];

// Decorative background bubbles
const BG_BUBBLES = [
  { size: 260, left: "-6%", top: "-8%", opacity: 0.07 },
  { size: 180, right: "2%", top: "12%", opacity: 0.06 },
  { size: 120, left: "30%", top: "5%", opacity: 0.05 },
  { size: 320, right: "-10%", bottom: "0%", opacity: 0.06 },
  { size: 90,  left: "10%", bottom: "8%", opacity: 0.07 },
  { size: 60,  left: "55%", bottom: "18%", opacity: 0.06 },
];

function BubbleCard({ reason, i }: { reason: (typeof REASONS)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const lift = gsap.quickTo(el, "y", { duration: 0.4, ease: "power2.out" });
    const onEnter = () => lift(-8);
    const onLeave = () => lift(0);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="relative flex flex-col gap-4 rounded-[2rem] p-7"
      style={{
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1.5px solid rgba(255,255,255,0.9)",
        boxShadow: "0 8px 40px rgba(24,156,216,0.12), 0 1px 0 rgba(255,255,255,0.8) inset",
        cursor: "default",
        animationDelay: `${i * 0.18}s`,
      }}
    >
      {/* Bubble gloss top-left */}
      <div
        className="pointer-events-none absolute left-4 top-3 h-10 w-20 rounded-full"
        style={{ background: "rgba(255,255,255,0.55)", filter: "blur(6px)" }}
      />
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: "rgba(214,240,251,0.8)", border: "1px solid rgba(24,156,216,0.18)" }}>
        {reason.icon}
      </div>
      <div className="relative z-10">
        <h3 className="font-display text-lg font-bold text-[var(--color-ink)]">{reason.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink)]/65">{reason.copy}</p>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".whyus-card",
      { opacity: 0, y: 40, scale: 0.92 },
      {
        opacity: 1, y: 0, scale: 1,
        ease: "back.out(1.4)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative overflow-hidden py-32"
      style={{ background: "linear-gradient(160deg, #0a3652 0%, #0d6ba3 50%, #189CD8 100%)" }}
    >
      {/* Decorative background bubbles */}
      {BG_BUBBLES.map((b, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            right: (b as { right?: string }).right,
            top: b.top,
            bottom: (b as { bottom?: string }).bottom,
            background: "white",
            opacity: b.opacity,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col items-center text-center">
          <SectionTag index="04" label="Why Us" />
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            We believe purity should<br className="hidden sm:block" /> never be compromised.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60">
            Six reasons thousands of homes, offices, and events trust Jalsutra every single day.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <div key={r.title} className="whyus-card">
              <BubbleCard reason={r} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
