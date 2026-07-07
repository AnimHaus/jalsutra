"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import SectionTag from "./SectionTag";

interface Step {
  num: string;
  label: string;
  descLines: string[];
  detail: string;
  img: string;
  rotate: number;
  offsetX: number;
  offsetY: number;
}

const STEPS: Step[] = [
  {
    num: "01",
    label: "Source",
    descLines: ["Protected water drawn", "under hygienic conditions"],
    detail: "Our water originates from a carefully selected natural source in West Bengal. Every draw is monitored for consistency, stored in sealed tanks, and transported under controlled conditions before purification begins.",
    img: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
    rotate: -4,
    offsetX: -10,
    offsetY: 14,
  },
  {
    num: "02",
    label: "Filter",
    descLines: ["Multi-stage filtration removes", "sediment & particulates"],
    detail: "Water passes through a multi-layer filtration system — sand, carbon, and micro-membrane filters — progressively stripping sediment, suspended particles, and organic matter down to the sub-micron level.",
    img: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80",
    rotate: 3,
    offsetX: 12,
    offsetY: 8,
  },
  {
    num: "03",
    label: "Purify",
    descLines: ["UV & RO treatment", "eliminates microbial risk"],
    detail: "Reverse osmosis removes dissolved solids and heavy metals. A high-intensity UV pass neutralises any remaining microbial threats. The result is water that meets BIS standards — clean, balanced pH, low sodium.",
    img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&q=80",
    rotate: -2,
    offsetX: -6,
    offsetY: -8,
  },
  {
    num: "04",
    label: "Package",
    descLines: ["Sealed tamper-proof bottles,", "200ml – 5000ml"],
    detail: "Bottles are cleaned, filled, and sealed in a fully automated line under ISO 9001:2005 certified conditions. Tamper-evident caps and batch codes are applied before every unit leaves the floor — available in 200ml, 500ml, 1L, 2L, and 5L.",
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    rotate: 2.5,
    offsetX: 8,
    offsetY: 4,
  },
  {
    num: "05",
    label: "Deliver",
    descLines: ["Fast dispatch to homes,", "offices & functions"],
    detail: "Orders are picked, palletised, and dispatched same-day across Kolkata and surrounding districts. Whether it's a single household or a bulk event order, Jalsutra guarantees on-time delivery with full traceability.",
    img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80",
    rotate: 0,
    offsetX: 0,
    offsetY: 0,
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const n = cards.length;

      // All cards start below the viewport
      gsap.set(cards, { y: "110vh", x: 0, rotation: 0 });

      const step = 1 / n;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      // Each card deals in during its own scroll segment and stays on the stack
      cards.forEach((card, i) => {
        const s = STEPS[i];
        tl.fromTo(
          card,
          { y: "110vh", x: 0, rotation: 0 },
          {
            y: s.offsetY,
            x: s.offsetX,
            rotation: s.rotate,
            duration: step,
            ease: "power3.out",
          },
          i * step
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-white"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">

        {/* Header */}
        <div className="mb-8 text-center">
          <SectionTag index="02" label="The Process" />
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--color-ink)] sm:text-5xl">
            From Spring to Bottle
          </h2>
          <p className="mt-2 text-sm text-[var(--color-ink)]/60 sm:text-base">
            A tightly controlled process, every step, every time.
          </p>
        </div>

        {/* Card stack */}
        <div
          className="relative"
          style={{ width: "min(760px, 92vw)", height: "min(420px, 60vh)" }}
        >
          {STEPS.map((s, i) => (
            <div
              key={s.label}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute inset-0 overflow-hidden rounded-3xl"
              style={{
                background: "white",
                boxShadow: "0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.07)",
                border: "1px solid rgba(24,156,216,0.15)",
                zIndex: i + 1,
                transformOrigin: "center center",
              }}
            >
              {/* Mobile: portrait (image top, text bottom) */}
              <div className="flex h-full flex-col sm:hidden">
                <div className="relative w-full" style={{ height: "55%" }}>
                  <Image src={s.img} alt={s.label} fill sizes="88vw" className="object-cover" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur-sm" style={{ color: "#189CD8" }}>
                    Step {s.num}
                  </div>
                </div>
                <div className="flex flex-col justify-center p-5">
                  <h3 className="font-display text-xl font-bold text-[#0d2b3e]">{s.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "rgba(13,43,62,0.6)" }}>{s.descLines.join(" ")}</p>
                </div>
              </div>

              {/* Desktop: landscape (image left, text right) */}
              <div className="hidden h-full sm:flex">
                <div className="relative shrink-0" style={{ width: "42%" }}>
                  <Image src={s.img} alt={s.label} fill sizes="380px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between p-8">
                  <div>
                    <div className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(24,156,216,0.1)", color: "#189CD8" }}>
                      Step {s.num}
                    </div>
                    <h3 className="font-display text-3xl font-bold leading-tight text-[#0d2b3e]">{s.label}</h3>
                    <p className="mt-2 text-sm font-semibold" style={{ color: "rgba(13,43,62,0.5)" }}>{s.descLines.join(" ")}</p>
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(13,43,62,0.65)" }}>{s.detail}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-4">
                    {STEPS.map((_, di) => (
                      <div key={di} className="h-1 rounded-full transition-all" style={{ width: di === i ? 24 : 8, background: di === i ? "#189CD8" : "rgba(24,156,216,0.25)" }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
