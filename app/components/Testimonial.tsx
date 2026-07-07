"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "../lib/gsap";
import SectionTag from "./SectionTag";
import * as THREE from "three";

/* ─── Testimonial data ─────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      "Clean, consistent, and always available. Jalsutra has been our go-to water supplier for years. Every delivery is on time and every bottle is perfect.",
    name: "RAHUL SHARMA",
    role: "Retail Partner, Kolkata",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
  },
  {
    quote:
      "We switched to Jalsutra for our office and the quality has been impeccable. The balanced pH and low sodium make it the healthiest choice for our team.",
    name: "ANANYA KAPOOR",
    role: "Office Manager, Howrah",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
  },
  {
    quote:
      "Every bottle we serve at catering events is Jalsutra. Our clients immediately notice the clarity and freshness — it elevates the entire experience.",
    name: "MOHAN PILLAI",
    role: "Caterer, Durgapur",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
  },
  {
    quote:
      "Sourced right, filtered right. Jalsutra is the only brand I recommend to all my restaurant clients when it comes to packaged drinking water.",
    name: "SNEHA GHOSH",
    role: "F&B Consultant, Siliguri",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
  },
];

/* ─── 3-D Bottle ────────────────────────────────────────────────────── */
function BottleModel({ flipX = false }: { flipX?: boolean }) {
  const { scene } = useGLTF("/WaterBottle.glb");
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.18;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.1 - 0.2;
  });

  return (
    <group
      ref={groupRef}
      scale={[0.6, 0.6, 0.6]}
      rotation={[0.22, flipX ? 0.55 : -0.55, flipX ? -0.18 : 0.18]}
    >
      <primitive object={scene.clone()} />
    </group>
  );
}

/* ─── Card ──────────────────────────────────────────────────────────── */
function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <div
      className="flex h-full flex-col justify-between rounded-2xl p-8 select-none"
      style={{
        background: "#eeeff1",
        border: "1.5px solid rgba(0,0,0,0.07)",
        minWidth: 340,
        maxWidth: 380,
        minHeight: 360,
      }}
    >
      <div>
        <img
          src={t.img}
          alt={t.name}
          draggable={false}
          className="mb-6 h-14 w-14 rounded-full object-cover"
          style={{ border: "2px solid rgba(24,156,216,0.3)" }}
        />
        <p className="text-[0.95rem] leading-[1.7] text-[#444]">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>
      <div className="mt-8 border-t border-black/10 pt-6">
        <p className="font-display text-sm font-bold tracking-widest text-[var(--color-ink)]">
          {t.name}
        </p>
        <p className="mt-0.5 text-sm text-[var(--color-ink)]/50">{t.role}</p>
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────────────── */
export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useGSAP(() => {
    /* Bottles fade + slide in from sides on scroll */
    gsap.fromTo(leftRef.current, { opacity: 0, x: -500, rotateZ: -18 }, {
      opacity: 1, x: 0, rotateZ: 0, duration: 1.4, ease: "power4.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(rightRef.current, { opacity: 0, x: 500, rotateZ: 18 }, {
      opacity: 1, x: 0, rotateZ: 0, duration: 1.4, ease: "power4.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
    });

    /* Cards stagger in */
    gsap.fromTo(".t-card", { opacity: 0, y: 36 }, {
      opacity: 1, y: 0, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
    });
  }, { scope: sectionRef });

  function goTo(dir: 1 | -1) {
    const next = Math.max(0, Math.min(TESTIMONIALS.length - 1, current + dir));
    if (next === current) return;
    setCurrent(next);
    if (!trackRef.current) return;
    const cardWidth = Math.min(380, window.innerWidth * 0.85);
    gsap.to(trackRef.current, {
      x: -next * (cardWidth + 24),
      duration: 0.55,
      ease: "power3.inOut",
    });
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f3f4f6] py-28"
    >
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Left bottle — hidden on mobile */}
      <div
        ref={leftRef}
        className="pointer-events-none absolute left-0 hidden sm:block"
        style={{ width: "clamp(180px, 20vw, 320px)", top: "0", bottom: "20%", opacity: 0 }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 42 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 6, 3]} intensity={1.4} />
          <Suspense fallback={null}>
            <BottleModel />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to right, #f3f4f6 0%, transparent 60%), linear-gradient(to bottom, #f3f4f6 0%, transparent 18%, transparent 82%, #f3f4f6 100%)" }} />
      </div>

      {/* Right bottle — hidden on mobile */}
      <div
        ref={rightRef}
        className="pointer-events-none absolute right-0 hidden sm:block"
        style={{ width: "clamp(180px, 20vw, 320px)", top: "20%", bottom: "0", opacity: 0 }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 42 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[-4, 6, 3]} intensity={1.4} />
          <Suspense fallback={null}>
            <BottleModel flipX />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to left, #f3f4f6 0%, transparent 60%), linear-gradient(to bottom, #f3f4f6 0%, transparent 18%, transparent 82%, #f3f4f6 100%)" }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Become part of<br className="hidden sm:block" /> our community
          </h2>
        </div>

        {/* Horizontal card slider */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6"
            style={{ willChange: "transform" }}
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="t-card flex-shrink-0" style={{ width: "min(380px, 85vw)" }}>
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>

        {/* Arrow controls */}
        <div className="mt-10 flex justify-center gap-3">
          {(["prev", "next"] as const).map((dir) => {
            const isPrev = dir === "prev";
            const disabled = isPrev ? current === 0 : current === TESTIMONIALS.length - 1;
            return (
              <button
                key={dir}
                onClick={() => goTo(isPrev ? -1 : 1)}
                disabled={disabled}
                className="flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200"
                style={{
                  background: disabled ? "rgba(0,0,0,0.08)" : "#0d2b3e",
                  color: disabled ? "rgba(0,0,0,0.25)" : "white",
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
              >
                <FontAwesomeIcon icon={isPrev ? faChevronLeft : faChevronRight} className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

useGLTF.preload("/WaterBottle.glb");

// Floating bubble positions for decoration
const BUBBLES = [
  { size: 80,  x: "8%",  y: "15%", dur: 6 },
  { size: 48,  x: "18%", y: "70%", dur: 8 },
  { size: 120, x: "82%", y: "10%", dur: 7 },
  { size: 60,  x: "88%", y: "65%", dur: 9 },
  { size: 36,  x: "50%", y: "5%",  dur: 5 },
  { size: 28,  x: "65%", y: "85%", dur: 7 },
];