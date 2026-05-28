"use client";

import { useState } from "react";
import Image from "next/image";

const LINKS = [
  { label: "Our Work", href: "#work" },
  { label: "About Us", href: "#about" },
  { label: "Client Voices", href: "#testimonials" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center px-6 sm:px-10"
        style={{
          background: "#0d0d0d",
          height: 64,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image
            src="/official_logo_white.png"
            alt="FR Construction logo"
            width={28}
            height={28}
            style={{ objectFit: "contain" }}
          />
        </a>

        {/* Desktop links — centred */}
        <div
          className="hidden sm:flex items-center absolute left-1/2 -translate-x-1/2"
          style={{ gap: 32 }}
        >
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="sm:hidden ml-auto flex flex-col justify-center items-center"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{ width: 36, height: 36, gap: 5, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "transform 0.2s, opacity 0.2s", transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "opacity 0.2s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "transform 0.2s, opacity 0.2s", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="sm:hidden fixed top-16 inset-x-0 z-40 flex flex-col"
          style={{ background: "#0d0d0d", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "8px 0 16px" }}
        >
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="nav-link"
              onClick={() => setOpen(false)}
              style={{ padding: "14px 24px", fontSize: 16 }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
