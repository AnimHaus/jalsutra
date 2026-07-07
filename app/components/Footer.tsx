import Reveal from "./Reveal";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "Our Waters", href: "#products" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const LEGAL = [
  { label: "Legal Notice", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] py-16 text-white">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 sm:grid-cols-4 sm:px-10">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/50">
            Navigation
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            {NAV.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/50">
            Legal
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            {LEGAL.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/50">
            Contact
          </p>
          <p className="text-sm text-white/80">info@jalsutra.com</p>
          <p className="mt-1 text-sm text-white/80">
            North 24 Parganas, Kolkata, West Bengal
          </p>
        </div>

        <div className="col-span-2 flex items-end sm:col-span-1">
          <p className="font-display text-4xl font-bold tracking-tight text-white/20 sm:text-6xl">
            Jalsutra
          </p>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 max-w-6xl px-6 text-xs text-white/40 sm:px-10">
        <p>
          {new Date().getFullYear()} © Jalsutra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
