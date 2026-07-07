"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

type Bubble = {
  x: number;
  baseY: number;
  radius: number;
  wobbleSpeed: number;
  wobbleAmount: number;
  drift: number;
  opacity: number;
};

export default function BubblesTransition() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
    },
    { scope: wrapperRef }
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let bubbles: Bubble[] = [];
    let frameId = 0;

    const makeBubble = (): Bubble => ({
      x: Math.random() * width,
      baseY: Math.random(),
      radius: 3 + Math.random() * 16,
      wobbleSpeed: 0.4 + Math.random() * 0.8,
      wobbleAmount: 6 + Math.random() * 14,
      drift: (Math.random() - 0.5) * 0.4,
      opacity: 0.1 + Math.random() * 0.32,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(30, Math.round((width * height) / 14000));
      bubbles = Array.from({ length: count }, () => makeBubble());
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const progress = progressRef.current;
      // Fade the whole field in/out at the very start/end of the transition
      // so it reads as a wipe between sections rather than a hard cut.
      const fade = Math.min(progress / 0.15, 1, (1 - progress) / 0.15);
      const globalOpacity = Math.max(0, Math.min(1, fade));

      // As scroll progress goes 0 -> 1, bubbles travel from just below the
      // bottom edge up to just above the top edge, driven by scroll rather
      // than an independent clock.
      const rise = (1 - progress) * (height + 80) - 40;

      for (const b of bubbles) {
        const wobble = Math.sin(time * 0.001 * b.wobbleSpeed + b.baseY * 10) * b.wobbleAmount;
        const y = b.baseY * height + rise + wobble;
        const x = b.x + Math.sin(time * 0.0006 + b.baseY * 20) * b.drift * 40;

        if (y < -b.radius * 2 || y > height + b.radius * 2) continue;

        const opacity = b.opacity * globalOpacity;
        if (opacity <= 0.002) continue;

        const gradient = ctx.createRadialGradient(
          x - b.radius * 0.3,
          y - b.radius * 0.3,
          0,
          x,
          y,
          b.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(0.7, `rgba(24, 156, 216, ${opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(24, 156, 216, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
        ctx.lineWidth = 1;
        ctx.arc(x, y, b.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      frameId = requestAnimationFrame(draw);
    };

    resize();
    frameId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative z-10 -my-[18vh] h-[36vh] pointer-events-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
