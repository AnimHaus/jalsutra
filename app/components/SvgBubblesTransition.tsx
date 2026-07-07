"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

type BubbleDef = {
  id: number;
  left: number;   // % across width
  top: number;    // % down the wrapper (0 = top, 100 = bottom)
  size: number;   // px – rendered size at resting position
  parallax: number; // how many px it moves upward on full scroll-through
  opacity: number;
};

// 3 rows with distinct vertical bands:
//   row 0 → near bottom  (top 65–85%) — large
//   row 1 → middle       (top 35–55%) — medium
//   row 2 → near top     (top  8–25%) — small
const ROW_CONFIG = [
  { count: 5, topMin: 65, topMax: 85, sizeMin: 40, sizeMax:  90, parallaxMin: 120, parallaxMax: 200, opacityMin: 0.5, opacityMax: 0.85 },
  { count: 5, topMin: 35, topMax: 55, sizeMin: 22, sizeMax:  50, parallaxMin:  80, parallaxMax: 140, opacityMin: 0.4, opacityMax: 0.70 },
  { count: 4, topMin:  8, topMax: 25, sizeMin: 10, sizeMax:  28, parallaxMin:  40, parallaxMax:  90, opacityMin: 0.3, opacityMax: 0.55 },
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function generateBubbles(): BubbleDef[] {
  const result: BubbleDef[] = [];
  let id = 0;
  ROW_CONFIG.forEach((row) => {
    const positions: number[] = [];
    const minGap = 90 / row.count;
    for (let i = 0; i < row.count; i++) {
      let pos = 3 + Math.random() * 94;
      let attempt = 0;
      while (attempt < 40 && positions.some((p) => Math.abs(p - pos) < minGap * 0.75)) {
        pos = 3 + Math.random() * 94;
        attempt++;
      }
      positions.push(pos);
      result.push({
        id: id++,
        left: pos,
        top: rand(row.topMin, row.topMax),
        size: rand(row.sizeMin, row.sizeMax),
        parallax: rand(row.parallaxMin, row.parallaxMax),
        opacity: rand(row.opacityMin, row.opacityMax),
      });
    }
  });
  return result;
}

export default function SvgBubblesTransition() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<BubbleDef[]>([]);

  useEffect(() => {
    setBubbles(generateBubbles());
  }, []);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper || bubbles.length === 0) return;

      const items = wrapper.querySelectorAll<HTMLElement>(".svgb");

      items.forEach((el) => {
        const parallax = parseFloat(el.dataset.parallax ?? "80");

        gsap.fromTo(
          el,
          { y: parallax },
          {
            y: -parallax * 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
          }
        );
      });
    },
    { scope: wrapperRef, dependencies: [bubbles] }
  );

  return (
    <div
      ref={wrapperRef}
      className="relative z-20 -mt-[75vh] h-[80vh] overflow-visible pointer-events-none"
    >
      {bubbles.map((b) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={b.id}
          src="/bubbles.svg"
          alt=""
          className="svgb absolute"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `clamp(${b.size * 0.45}px, ${b.size * 0.07}vw + ${b.size * 0.35}px, ${b.size}px)`,
            height: `clamp(${b.size * 0.45}px, ${b.size * 0.07}vw + ${b.size * 0.35}px, ${b.size}px)`,
            transform: "translate(-50%, -50%)",
            opacity: b.opacity,
            willChange: "transform",
          }}
          data-parallax={b.parallax}
        />
      ))}
    </div>
  );
}