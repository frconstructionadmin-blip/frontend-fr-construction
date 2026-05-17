"use client";

import { useRef, useState, useCallback } from "react";
import type { Testimonial } from "../lib/testimonials";

function Card({ name, job, quote, date }: Testimonial) {
  return (
    <div
      className="testimonials-card flex flex-col justify-between"
      style={{
        background: "#ffffff",
        borderRadius: 18,
        padding: 24,
        width: "min(320px, 78vw)",
        flexShrink: 0,
        minHeight: 180,
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span style={{ color: "#FFB800", fontSize: 17, letterSpacing: 2 }}>★★★★★</span>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.2 }}>
            <span style={{ color: "#E53935" }}>my</span>
            <span style={{ color: "#1565C0" }}>Job</span>
            <span style={{ color: "#E53935" }}>Quote</span>
          </span>
        </div>
        <p style={{ color: "#1d1d1f", fontSize: 15, lineHeight: 1.55, letterSpacing: "-0.2px", marginBottom: 20 }}>
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <div>
        <p className="font-semibold" style={{ color: "#1d1d1f", fontSize: 14, letterSpacing: "-0.2px" }}>
          {name}
        </p>
        <p style={{ color: "rgba(0,0,0,0.4)", fontSize: 12, letterSpacing: "-0.1px", marginTop: 2 }}>
          {job} · {date}
        </p>
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const mobileRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = testimonials.length;

  const handleScroll = useCallback(() => {
    const el = mobileRef.current;
    if (!el) return;
    const cardWidth = (el.querySelector(".testimonials-card") as HTMLElement)?.offsetWidth ?? 300;
    const index = Math.round(el.scrollLeft / (cardWidth + 20));
    setCurrentIndex(Math.min(Math.max(index, 0), total - 1));
  }, [total]);

  function scroll(dir: "left" | "right") {
    const el = mobileRef.current;
    if (!el) return;
    const card = el.querySelector(".testimonials-card") as HTMLElement;
    const cardWidth = card?.offsetWidth ?? 300;
    const newIndex = dir === "right"
      ? Math.min(currentIndex + 1, total - 1)
      : Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    el.scrollTo({ left: newIndex * (cardWidth + 20), behavior: "smooth" });
  }

  const btnStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: "50%",
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    color: "#1d1d1f",
  };

  return (
    <>
      {/* ── MOBILE: scrollable with arrows ────────────────────────── */}
      <div className="sm:hidden" style={{ position: "relative" }}>
        {currentIndex > 0 && (
          <button aria-label="Previous review" onClick={() => scroll("left")} style={{ ...btnStyle, left: 4 }}>
            <ChevronLeft />
          </button>
        )}
        {currentIndex < total - 1 && (
          <button aria-label="Next review" onClick={() => scroll("right")} style={{ ...btnStyle, right: 4 }}>
            <ChevronRight />
          </button>
        )}
        <div
          ref={mobileRef}
          className="testimonials-mask"
          style={{ padding: "8px 48px 16px" }}
          onScroll={handleScroll}
        >
          <div className="testimonials-track" style={{ animation: "none" }}>
            {testimonials.map((t, i) => <Card key={i} {...t} />)}
          </div>
        </div>
      </div>

      {/* ── DESKTOP: auto-scrolling marquee ───────────────────────── */}
      <div className="hidden sm:block">
        <div className="testimonials-mask">
          <div className="testimonials-track">
            {[...testimonials, ...testimonials].map((t, i) => <Card key={i} {...t} />)}
          </div>
        </div>
      </div>
    </>
  );
}
