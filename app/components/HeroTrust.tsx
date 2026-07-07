"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const BottleShowcase = dynamic(() => import("./BottleShowcase"), { ssr: false });

export default function HeroTrust() {
  const wrapperRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const trustTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;

      gsap.set(bgRef.current, { backgroundColor: "#f6f9fb" });
      gsap.set(trustTextRef.current, { opacity: 0, pointerEvents: "none" });

      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      introTl
        .from(".hero-line-inner", { yPercent: 115, duration: 1.1, stagger: 0.12 })
        .from(".hero-mark", { opacity: 0, y: -16, duration: 0.7 }, "-=0.9")
        .fromTo(
          ".hero-bottle-mask",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" },
          "-=0.7"
        )
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=1.1")
        .from(".hero-stats > *", { opacity: 0, y: 10, duration: 0.5, stagger: 0.05 }, "-=0.6")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.7, stagger: 0.08 }, "-=0.6");

      const scrollTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      scrollTl
        .to(heroTextRef.current, { opacity: 0, duration: 0.3 }, 0.12)
        .to(trustTextRef.current, { opacity: 1, duration: 0.3 }, 0.55);

      // Slide bottle right on desktop only
      const mm = gsap.matchMedia();
      mm.add("(min-width: 640px)", () => {
        scrollTl.to(bottleRef.current, { xPercent: 60, scale: 1, duration: 1 }, 0);
      });
    },
    { scope: wrapperRef }
  );

  return (
    <section ref={wrapperRef} id="top" className="relative h-[230vh]">
      <div ref={bgRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="hero-bottle-mask pointer-events-none absolute inset-0 z-10 flex items-center justify-center sm:z-20">
          <div
            ref={bottleRef}
            className="relative h-[70vh] w-[min(45vh,70vw)] max-h-[1500px] max-w-[600px] -translate-x-[2vh] rotate-[10deg] will-change-transform sm:h-[90vh] sm:w-[min(61vh,90vw)] sm:-translate-x-[4vh]"
          >
            <BottleShowcase />
          </div>
        </div>

        <div
          ref={heroTextRef}
          className="absolute inset-0 z-30 flex flex-col justify-between px-6 pb-10 pt-8 text-[var(--color-ink)] sm:px-10 sm:pb-14 sm:pt-10"
        >
          <div className="flex items-start justify-between gap-4">
            <h1 className="max-w-[80%] font-display text-3xl font-bold leading-[1.1] tracking-tight sm:max-w-4xl sm:text-6xl lg:text-8xl">
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-inner inline-block">
                  Purity you can trust,
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line-inner inline-block text-[var(--color-blue)]">
                  bottled with care.
                </span>
              </span>
            </h1>

            <span className="hero-mark shrink-0 font-display text-xl font-bold tracking-tight sm:text-4xl">
              Jalsutra
            </span>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xs sm:max-w-sm lg:max-w-md">
              <p className="hero-sub text-xs leading-relaxed text-[var(--color-ink)]/70 sm:text-base">
                ISO 9001:2005 certified packaged drinking water, trusted since
                2011. From our source in Kolkata to every home across India —
                clean, safe, and refreshing in every bottle.
              </p>
            </div>

            <div className="relative z-30 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#products"
                className="hero-cta rounded-full bg-[var(--color-blue)] px-6 py-3 text-xs font-bold text-white transition-colors hover:bg-[var(--color-blue-dark)] sm:px-7 sm:py-3.5 sm:text-sm"
              >
                Explore Our Waters
              </a>
              <a
                href="#contact"
                className="hero-cta rounded-full border border-black/10 bg-white px-6 py-3 text-xs font-bold text-[var(--color-ink)] transition-colors hover:border-[var(--color-blue)] hover:text-[var(--color-blue)] sm:px-7 sm:py-3.5 sm:text-sm"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        <div
          ref={trustTextRef}
          className="absolute inset-0 z-30 flex flex-col justify-between px-6 py-14 text-[var(--color-ink)] sm:px-10 sm:py-20"
        >
          <div className="max-w-lg">
            <h2 className="font-display text-2xl font-bold leading-[1.05] tracking-tight sm:text-4xl lg:text-6xl">
              Sourced. Purified. Delivered.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--color-ink)]/70 sm:mt-6 sm:text-base lg:text-lg">
              Jalsutra Packaged Drinking Water is manufactured under strict
              quality control, carrying ISO 9001:2005 certification.
              Registered as a trademark since 2011, our water travels from
              source to seal without compromise.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--color-ink)]/60">
              ISO 9001:2005
            </span>
            <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--color-ink)]/60">
              Trusted Since 2011
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
