"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "../lib/gsap";
import { NAV_LINKS } from "../lib/nav";

const SECTIONS = [{ label: "Home", href: "#top" }, ...NAV_LINKS];

export default function SectionNav() {
  const [active, setActive] = useState("#top");
  const lenis = useLenis();

  useGSAP(() => {
    const triggers = SECTIONS.map(({ href }) =>
      ScrollTrigger.create({
        trigger: href,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(href),
        onEnterBack: () => setActive(href),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  const go = (href: string) => {
    lenis?.scrollTo(href, { offset: -20 });
  };

  return (
    <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex">
      <div className="flex flex-col items-end gap-3 rounded-full border border-black/5 bg-white/70 px-3 py-4 shadow-lg backdrop-blur-md">
        {SECTIONS.map((s) => (
          <button
            key={s.href}
            onClick={() => go(s.href)}
            className="flex items-center gap-2"
            aria-label={`Go to ${s.label}`}
          >
            {active === s.href && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)]">
                {s.label}
              </span>
            )}
            <span
              className={`block h-2 w-2 rounded-full transition-all duration-300 ${
                active === s.href
                  ? "scale-125 bg-[var(--color-blue)]"
                  : "bg-[var(--color-ink)]/25"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
