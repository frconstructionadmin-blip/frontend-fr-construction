"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

const PHOTOS = [
  { src: "/works/work-01.jpeg", alt: "FR Construction work in London", caption: "Flooring installation" },
  { src: "/works/work-02.jpeg", alt: "FR Construction work in London", caption: "Repair & renovation" },
  { src: "/works/work-04.jpeg", alt: "FR Construction work in London", caption: "Home improvement" },
  { src: "/works/work-05.jpeg", alt: "FR Construction work in London", caption: "Home improvement" },
  { src: "/works/work-06.jpeg", alt: "FR Construction work in London", caption: "Home improvement" },
  { src: "/works/work-07.jpeg", alt: "FR Construction work in London", caption: "Repair & renovation" },
  { src: "/works/work-08.jpeg", alt: "FR Construction work in London", caption: "Installation work" },
];

function PhotoCard({ src, alt, caption, isActive }: { src: string; alt: string; caption: string; isActive?: boolean }) {
  return (
    <div className={`work-photo${isActive ? " is-active" : ""}`}>
      <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 640px) 300px, 480px" />
      <div className="work-photo-caption">{caption}</div>
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
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  color: "#1d1d1f",
};

export default function WorkCarousel() {
  const mobileRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = PHOTOS.length;

  const handleScroll = useCallback(() => {
    const el = mobileRef.current;
    if (!el) return;
    const cardWidth = (el.querySelector(".work-photo") as HTMLElement)?.offsetWidth ?? 300;
    const index = Math.round(el.scrollLeft / (cardWidth + 20));
    setCurrentIndex(Math.min(Math.max(index, 0), total - 1));
  }, [total]);

  function scroll(dir: "left" | "right") {
    const el = mobileRef.current;
    if (!el) return;
    const card = el.querySelector(".work-photo") as HTMLElement;
    const cardWidth = card?.offsetWidth ?? 300;
    const newIndex = dir === "right"
      ? Math.min(currentIndex + 1, total - 1)
      : Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    el.scrollTo({ left: newIndex * (cardWidth + 20), behavior: "smooth" });
  }

  return (
    <>
      {/* ── MOBILE: swipeable with arrows ─────────────────────────── */}
      <div className="sm:hidden" style={{ position: "relative", margin: "0 -24px" }}>
        {currentIndex > 0 && (
          <button aria-label="Previous photo" onClick={() => scroll("left")} style={{ ...btnStyle, left: 4 }}>
            <ChevronLeft />
          </button>
        )}
        {currentIndex < total - 1 && (
          <button aria-label="Next photo" onClick={() => scroll("right")} style={{ ...btnStyle, right: 4 }}>
            <ChevronRight />
          </button>
        )}
        <div
          ref={mobileRef}
          className="work-mask"
          style={{ padding: "8px 48px 16px" }}
          onScroll={handleScroll}
        >
          <div className="work-track" style={{ animation: "none" }}>
            {PHOTOS.map((p, i) => <PhotoCard key={i} {...p} isActive={i === currentIndex} />)}
          </div>
        </div>
      </div>

      {/* ── DESKTOP: auto-scrolling marquee ───────────────────────── */}
      <div className="hidden sm:block">
        <div className="work-mask">
          <div className="work-track">
            {[...PHOTOS, ...PHOTOS].map((p, i) => <PhotoCard key={i} {...p} />)}
          </div>
        </div>
      </div>
    </>
  );
}
