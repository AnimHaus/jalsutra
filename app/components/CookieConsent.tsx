"use client";

import { useRef, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

const STORAGE_KEY = "jalsutra-cookie-consent";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return "accepted";
}

export default function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || consent) return;
      gsap.from(ref.current, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: 0.3,
        ease: "power3.out",
      });
    },
    { scope: ref, dependencies: [consent] }
  );

  const decide = (value: "accepted" | "rejected") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event("storage"));
  };

  if (consent) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-xl flex-col gap-4 rounded-3xl bg-white p-6 text-[var(--color-navy)] shadow-2xl sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm leading-relaxed text-[var(--color-navy)]/80">
        Cookies, what can you do. We use them to improve your experience and
        understand how you browse around here. Choose which ones you keep.
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          onClick={() => decide("rejected")}
          className="rounded-full border border-[var(--color-navy)]/20 px-4 py-2 text-sm font-semibold"
        >
          Reject
        </button>
        <button
          onClick={() => decide("accepted")}
          className="rounded-full bg-[var(--color-navy)] px-4 py-2 text-sm font-semibold text-white"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
