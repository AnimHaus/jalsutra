"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const BottleShowcase = dynamic(() => import("./BottleShowcase"), { ssr: false });

export default function BottleJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapRef.current) return;
      gsap.to(wrapRef.current, {
        yPercent: 12,
        rotate: 3,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className="h-full w-full will-change-transform">
      <BottleShowcase />
    </div>
  );
}
