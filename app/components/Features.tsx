"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const ROWS = [
  {
    title: "Sourced Responsibly",
    copy: "Every bottle begins with carefully selected water, drawn and stored under hygienic conditions before it ever reaches the purification line.",
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1200&q=80",
  },
  {
    title: "Purified to Perfection",
    copy: "Multi-stage filtration and treatment removes impurities while preserving essential minerals, balanced pH, and low sodium content.",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1200&q=80",
  },
  {
    title: "Packaged With Care",
    copy: "Sealed in tamper-proof bottles ranging from 200ml to 5000ml, ready for homes, offices, functions, and everything in between.",
    image: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?w=1200",
  },
];

export default function Features() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;
      const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];
      const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
      const n = ROWS.length;

      // All text blocks start at their rest position; only first is visible.
      gsap.set(texts[0], { opacity: 1, y: 0 });
      gsap.set(texts.slice(1), { opacity: 0, y: 20 });
      gsap.set(images.slice(1), { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      const step = 1 / (n - 1);
      const fadeDuration = step * 0.35; // each fade-out or fade-in takes this long
      const gap = step * 0.05;          // brief pause between out and in

      for (let i = 0; i < n - 1; i++) {
        const at = i * step;
        // Fade OUT current text + image
        tl.to(texts[i],  { y: -32, opacity: 0, ease: "power2.in",  duration: fadeDuration }, at);
        tl.to(images[i], { opacity: 0,          ease: "power2.in",  duration: fadeDuration }, at);
        // Fade IN next text + image — starts only after current is gone
        const inAt = at + fadeDuration + gap;
        tl.to(texts[i + 1],  { y: 0, opacity: 1, ease: "power2.out", duration: fadeDuration }, inAt);
        tl.to(images[i + 1], { opacity: 1,        ease: "power2.out", duration: fadeDuration }, inAt);
      }
    },
    { scope: wrapperRef }
  );

  return (
    <section id="features">
      {/* ── Mobile layout: plain vertical stack ── */}
      <div className="block px-6 py-16 lg:hidden">
        <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-[var(--color-ink)]">
          Pure at the source.
          <br />
          Trusted to the last drop.
        </h2>
        <div className="mt-10 flex flex-col gap-12">
          {ROWS.map((row) => (
            <div key={row.title}>
              <div className="relative mb-5 w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={row.image}
                  alt={row.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-[var(--color-ink)]">
                {row.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/60">
                {row.copy}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop layout: sticky scroll animation ── */}
      <div ref={wrapperRef} className="relative hidden lg:block" style={{ height: `${ROWS.length * 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="mx-auto flex h-full max-w-8xl flex-col px-6 sm:px-10 lg:flex-row">

            {/* Left column: static header at top, scrolling text at bottom */}
            <div className="relative flex w-full shrink-0 flex-col lg:w-1/2">
              <div className="pt-16 sm:pt-20">
                <h2 className="max-w-lg font-display text-3xl font-bold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
                  Pure at the source.
                  <br />
                  Trusted to the last drop.
                </h2>
              </div>

              <div className="relative flex-1">
                {ROWS.map((row, i) => (
                  <div
                    key={row.title}
                    ref={(el) => { textRefs.current[i] = el; }}
                    className="absolute bottom-0 left-0 right-0 pb-16 sm:pb-20 sm:pr-10"
                  >
                    <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-3xl">
                      {row.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--color-ink)]/60">
                      {row.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: crossfading images */}
            <div className="relative hidden w-1/2 shrink-0 py-10 lg:flex lg:items-center">
              <div className="relative h-[80vh] w-full">
                {ROWS.map((row, i) => (
                  <div
                    key={row.title}
                    ref={(el) => { imageRefs.current[i] = el; }}
                    className="absolute inset-0 overflow-hidden rounded-3xl"
                  >
                    <Image
                      src={row.image}
                      alt={row.title}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
