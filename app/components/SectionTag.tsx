"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

type SectionTagProps = {
  index: string;
  label: string;
  light?: boolean;
  className?: string;
};

export default function SectionTag({
  index,
  label,
  light = false,
  className = "",
}: SectionTagProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <span
      ref={ref}
      className={`inline-flex items-center gap-2.5 rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] ${
        light
          ? "border-white/15 bg-white/5 text-white"
          : "border-black/10 bg-white text-[var(--color-ink)] shadow-sm"
      } ${className}`}
    >
      <span className="text-[var(--color-blue)]">{index}</span>
      {label}
    </span>
  );
}
