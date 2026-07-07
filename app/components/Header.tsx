"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { gsap } from "../lib/gsap";
import { NAV_LINKS } from "../lib/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useLenis(({ scroll, direction }) => {
    const el = headerRef.current;
    if (!el || open) return;

    if (scroll > 120 && direction === 1) {
      gsap.to(el, { yPercent: -130, duration: 0.4, ease: "power3.out", overwrite: true });
    } else if (direction === -1 || scroll <= 120) {
      gsap.to(el, { yPercent: 0, duration: 0.4, ease: "power3.out", overwrite: true });
    }
  });

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-black/5 bg-[var(--color-cream)]/90 px-4 py-2.5 shadow-sm backdrop-blur-md sm:px-6">
        <Link
          href="#top"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-[var(--color-ink)]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-blue-dark)] text-sm font-bold text-white">
            J
          </span>
          Jalsutra
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-[var(--color-ink)]/70 transition-colors hover:text-[var(--color-blue)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-[var(--color-blue)] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-blue-dark)] lg:block"
          >
            Find Us
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-[var(--color-ink)] lg:hidden"
            aria-label="Open menu"
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl border border-black/5 bg-[var(--color-cream)] p-4 shadow-xl lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-semibold text-[var(--color-ink)] hover:bg-black/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-xl bg-[var(--color-blue)] px-4 py-3 text-center text-base font-bold text-white"
          >
            Find Us
          </a>
        </nav>
      )}
    </header>
  );
}