"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const SIZES = [
  {
    size: "200ml",
    label: "MINI",
    desc: "Compact size for events, functions, and travel.",
    bg: "#B8DFF0",
    img: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=80",
    labelColor: "#0d6ba3",
  },
  {
    size: "500ml",
    label: "CLASSIC",
    desc: "Our most popular size for everyday hydration.",
    bg: "#5BAFD6",
    img: "https://images.unsplash.com/photo-1564419320461-6870880221ad?w=600&q=80",
    labelColor: "#ffffff",
  },
  {
    size: "1000ml",
    label: "LARGE",
    desc: "Ideal for offices, desks, and longer outings.",
    bg: "#1B6CA8",
    img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80",
    labelColor: "#ffffff",
  },
  {
    size: "2000ml",
    label: "FAMILY",
    desc: "Great for families and shared spaces.",
    bg: "#1A4F72",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    labelColor: "#7dd3f7",
  },
  {
    size: "5000ml",
    label: "BULK",
    desc: "Bulk size for homes, offices, and bulk orders.",
    bg: "#0d2b3e",
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    labelColor: "#7dd3f7",
  },
];

function ProductCard({ p, index }: { p: (typeof SIZES)[number]; index: number }) {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl"
      style={{
        background: p.bg,
        aspectRatio: "3 / 4",
        transform: `rotate(${index % 2 === 0 ? "1deg" : "-1.5deg"})`,
        transition: "transform 0.35s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg) scale(1.03)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = `rotate(${index % 2 === 0 ? "1deg" : "-1.5deg"})`; }}
    >
      {/* Product image */}
      <Image
        src={p.img}
        alt={`Jalsutra ${p.size} water bottle`}
        fill
        sizes="(max-width: 768px) 90vw, 33vw"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}>
        <p className="font-display text-xs font-bold tracking-[0.3em] uppercase" style={{ color: p.labelColor === "#ffffff" ? "rgba(255,255,255,0.7)" : p.labelColor }}>
          Jalsutra
        </p>
        <p className="font-display text-2xl font-bold text-white">
          {p.label}
        </p>
        <p className="mt-1 text-sm text-white/70">{p.size}</p>
      </div>
    </div>
  );
}

export default function Products() {
  const row1 = SIZES.slice(0, 3);
  const row2 = SIZES.slice(3);

  return (
    <section id="products" className="bg-[var(--color-cream)] py-28">
      <div className="mx-auto w-full max-w-8xl px-6 md:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              Our Waters
            </h2>
            <p className="mt-4 max-w-md text-[var(--color-ink)]/70">
              Packaged Drinking Water, made in India, available in sizes
              that fit every need — 200ml to 5000ml.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-white"
          >
            Order Now
          </a>
        </div>

        {/* Mobile: 2×2 + 1 centred. Desktop: row1=3, row2=2 centred */}
        {/* Mobile grid — all 5 in one 2-col grid; last card spans both cols */}
        <div className="sm:hidden">
          <Reveal stagger={0.1} y={30} className="grid grid-cols-2 gap-4">
            {SIZES.map((p, i) => (
              <div key={p.size} className={i === 4 ? "col-span-2 flex justify-center" : ""}>
                <div className={i === 4 ? "w-1/2" : "w-full"}>
                  <ProductCard p={p} index={i} />
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Desktop grid — row1: 3, row2: 2 centred */}
        <div className="hidden sm:block">
          <Reveal stagger={0.1} y={30} className="grid grid-cols-3 gap-6">
            {row1.map((p, i) => (
              <ProductCard key={p.size} p={p} index={i} />
            ))}
          </Reveal>
          <Reveal stagger={0.1} y={30} className="mt-6 grid grid-cols-2 gap-6 sm:w-2/3 sm:mx-auto">
            {row2.map((p, i) => (
              <ProductCard key={p.size} p={p} index={i + 3} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}