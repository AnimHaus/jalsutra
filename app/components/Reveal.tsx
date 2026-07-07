"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  scaleFrom?: number;
};

export default function Reveal({
  children,
  className,
  y = 40,
  duration = 1,
  delay = 0,
  stagger,
  start = "top 85%",
  scaleFrom,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = stagger
        ? gsap.utils.toArray<HTMLElement>(ref.current.children)
        : ref.current;

      gsap.fromTo(
        targets,
        { opacity: 0, y, ...(scaleFrom !== undefined && { scale: scaleFrom }) },
        {
          opacity: 1,
          y: 0,
          ...(scaleFrom !== undefined && { scale: 1 }),
          duration,
          delay,
          ease: "power3.out",
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: ref.current,
            start,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
