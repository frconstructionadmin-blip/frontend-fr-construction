"use client";

import Image from "next/image";
import { useState } from "react";
import FadeIn from "./FadeIn";

const works = [
  {
    src: "/work1.jpg",
    alt: "Carpentry and construction work by FR Construction in London",
    description: "Bespoke garden shed built and installed from scratch in South London.",
    video: "/work_video1.mp4",
  },
  {
    src: "/work2.jpg",
    alt: "Garden and outdoor construction work by FR Construction in London",
    description: "Raised timber decking platform constructed for an outdoor garden space in London.",
    video: "/work_video2.mp4",
  },
];

export default function WorkSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="services" style={{ background: "rgb(247, 245, 242)", padding: "80px 24px" }}>
      <FadeIn>
        <h2
          className="text-center font-semibold mb-3"
          style={{
            fontFamily: "'SF Pro Display', system-ui, -apple-system, sans-serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            lineHeight: 1.1,
            color: "#1d1d1f",
          }}
        >
          Our Work
        </h2>
        <p
          className="text-center pb-10"
          style={{
            fontFamily: "'SF Pro Display', system-ui, -apple-system, sans-serif",
            fontSize: "clamp(16px, 2vw, 22px)",
            color: "#6b6b6b",
            letterSpacing: "-0.2px",
          }}
        >
          Some of our recent projects with our clients across London
        </p>
      </FadeIn>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto"
        style={{ maxWidth: 1200 }}
      >
        {works.map(({ src, alt, description, video }, i) => (
          <FadeIn key={src} delay={i * 120}>
            <div style={{
              background: "#ffffff",
              borderRadius: 24,
              padding: 16,
              boxShadow: "0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
            }}>
            <button
              onClick={() => setActiveVideo(video)}
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "3/2", borderRadius: 14, display: "block", padding: 0, border: "none", cursor: "pointer" }}
              aria-label="Play project video"
            >
              <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="50vw" />
              {/* overlay */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
              {/* play button */}
              <div
                style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(255,255,255,0.92)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                    transition: "transform 0.2s",
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#111111">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
            <p style={{
              marginTop: 14,
              marginBottom: 4,
              fontSize: 15,
              fontWeight: 600,
              color: "#1d1d1f",
              lineHeight: 1.4,
              letterSpacing: "-0.2px",
              textAlign: "center",
              fontFamily: "'SF Pro Display', system-ui, -apple-system, sans-serif",
            }}>
              {description}
            </p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Video modal */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.88)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", width: "90vw", maxWidth: 900 }}
          >
            <button
              onClick={() => setActiveVideo(null)}
              style={{
                position: "absolute", top: -44, right: 0,
                color: "#fff", background: "none", border: "none",
                fontSize: 32, cursor: "pointer", lineHeight: 1,
              }}
              aria-label="Close video"
            >
              ×
            </button>
            <video
              key={activeVideo}
              src={activeVideo}
              controls
              autoPlay
              style={{ width: "100%", maxHeight: "80vh", borderRadius: 14, display: "block", objectFit: "contain", background: "#000" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
