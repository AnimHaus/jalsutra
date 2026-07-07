"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { gsap } from "../lib/gsap";

const TEXT = "ISO 9001:2005 Certified · Made in India · Trusted Since 2011 · ";

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const setTimeScaleRef = useRef<((value: number) => void) | null>(null);
  const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;
      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 22,
        repeat: -1,
        ease: "none",
      });
      setTimeScaleRef.current = gsap.quickTo(tween, "timeScale", {
        duration: 0.5,
        ease: "power2.out",
      });

      return () => {
        if (idleTimeout.current) clearTimeout(idleTimeout.current);
      };
    },
    { scope: trackRef }
  );

  useLenis(({ velocity }) => {
    const setTimeScale = setTimeScaleRef.current;
    if (!setTimeScale) return;

    const boost = 1 + Math.min(Math.abs(velocity) * 0.08, 4);
    setTimeScale(boost);

    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(() => setTimeScale(1), 160);
  });

  return (
    <div className="overflow-hidden border-y border-black/5 bg-[var(--color-lavender)] py-6">
      <div ref={trackRef} className="flex w-max whitespace-nowrap">
        {Array.from({ length: 2 }).map((_, groupI) => (
          <div key={groupI} className="flex shrink-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="font-display px-4 text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl"
              >
                {TEXT}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
