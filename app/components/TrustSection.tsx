"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import Reveal from "./Reveal";

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const blobs = sectionRef.current.querySelectorAll("[data-blob]");
      gsap.to(blobs, {
        y: (i) => (i % 2 === 0 ? -60 : 60),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-navy)] py-28 text-white"
    >
      <div
        data-blob
        className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-[var(--color-blue)]/20 blur-3xl"
      />
      <div
        data-blob
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[var(--color-blue)]/10 blur-3xl"
      />

      <Reveal className="relative mx-auto max-w-4xl px-6 text-center sm:px-10">
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Sourced. Purified. Delivered.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          Jalsutra Packaged Drinking Water is manufactured under strict
          quality control, carrying ISO 9001:2005 certification. Registered
          as a trademark since 2011, our water travels from source to seal
          without compromise.
        </p>
      </Reveal>
    </section>
  );
}
