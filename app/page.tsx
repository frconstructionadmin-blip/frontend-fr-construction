import Image from "next/image";
import FadeIn from "./components/FadeIn";
import WorkSection from "./components/WorkSection";

const WA_LINK =
  "https://wa.me/447944623838?text=Hi%2C%20how%20are%20you%3F%20I%20am%20looking%20for%20construction%2C%20carpentry%20and%20handyman%20solutions";

const testimonials = [
  {
    quote:
      "Franco and his team transformed our loft into a beautiful living space. Exceptional craftsmanship and they kept to the timeline perfectly.",
    name: "James Turner",
    photo: "https://i.pravatar.cc/80?img=11",
  },
  {
    quote:
      "The fitted wardrobes they built are stunning — exactly what I had in mind. Very professional from start to finish.",
    name: "Sarah Mitchell",
    photo: "https://i.pravatar.cc/80?img=44",
  },
  {
    quote:
      "We hired FR Construction for a full kitchen renovation. Brilliant work, fair pricing, and a really friendly crew.",
    name: "David King",
    photo: "https://i.pravatar.cc/80?img=52",
  },
  {
    quote:
      "Quick, tidy, and great quality. Had several odd jobs done around the house and couldn't be happier.",
    name: "Rachel Brooks",
    photo: "https://i.pravatar.cc/80?img=36",
  },
];

export default function Home() {
  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-start px-4 sm:px-8" style={{ background: "transparent", height: 80, paddingTop: 8 }}>
        <Image
          src="/logoreal.png"
          alt="FR Construction logo"
          width={72}
          height={72}
          style={{ objectFit: "contain" }}
        />
      </nav>

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 overflow-hidden"
        style={{ paddingTop: 80 }}
      >
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", zIndex: 0 }}
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.55)", zIndex: 1 }}
        />
        {/* Content */}
        <div className="relative flex flex-col items-center w-full" style={{ zIndex: 2 }}>
        <p
          className="hero-tag text-sm font-semibold mb-4"
          style={{ color: "var(--primary-on-dark)", letterSpacing: "-0.374px" }}
        >
          London&apos;s construction specialists
        </p>
        <h1
          className="hero-h1 font-semibold mb-5 max-w-2xl"
          style={{
            fontFamily: "'SF Pro Display', system-ui, -apple-system, sans-serif",
            fontSize: "clamp(36px, 6vw, 56px)",
            lineHeight: 1.07,
            letterSpacing: "-0.28px",
            color: "var(--on-dark)",
          }}
        >
          London&apos;s Trusted Builder,
          <br />
          Carpenter &amp; Handyman
        </h1>
        <p
          className="hero-sub font-normal mb-10 max-w-lg"
          style={{
            fontFamily: "'SF Pro Display', system-ui, -apple-system, sans-serif",
            fontSize: "clamp(17px, 2.5vw, 24px)",
            lineHeight: 1.14,
            letterSpacing: "0.196px",
            color: "var(--body-muted)",
          }}
        >
          Quality construction, carpentry, and handyman services across all of London.
        </p>
        <div className="hero-btns flex gap-3 flex-wrap justify-center">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white rounded-full transition-transform active:scale-95"
            style={{
              background: "var(--primary)",
              padding: "11px 28px",
              fontSize: 17,
              letterSpacing: "-0.374px",
              textDecoration: "none",
            }}
          >
            Contact us
          </a>
          <a
            href="#services"
            className="rounded-full transition-transform active:scale-95"
            style={{
              color: "var(--primary-on-dark)",
              border: "1px solid var(--primary-on-dark)",
              padding: "11px 28px",
              fontSize: 17,
              letterSpacing: "-0.374px",
              textDecoration: "none",
            }}
          >
            What we do
          </a>
        </div>
        </div>
      </section>

      {/* ── 2. WORK PHOTOS ───────────────────────────────────────────────── */}
      <WorkSection />

      {/* ── 3. ABOUT ─────────────────────────────────────────────────────── */}
      <section style={{ background: "rgb(250, 250, 250)", padding: "80px 24px" }}>
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="font-semibold mb-8"
              style={{
                fontFamily: "'SF Pro Display', system-ui, -apple-system, sans-serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: 1.1,
                color: "var(--ink)",
              }}
            >
              About Us
            </h2>
            <p className="mb-5" style={{ color: "var(--ink)" }}>
              FR Construction is a professional construction, carpentry, and
              handyman company operating across all of London. We take on projects
              of every scale — from full extensions and loft conversions to bespoke
              fitted wardrobes and everyday repairs — always delivering the same
              high standard of work.
            </p>
            <p className="mb-5" style={{ color: "var(--ink)" }}>
              We work closely with each client to understand their vision and bring
              it to life. Our pricing is always transparent, our sites are always
              left tidy, and you will always have a direct point of contact
              throughout the job.
            </p>
            <p className="mb-10" style={{ color: "var(--ink)" }}>
              Quality, reliability, and attention to detail are at the core of
              everything we do — on every job, every time.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white rounded-full inline-block transition-transform active:scale-95"
              style={{
                background: "var(--primary)",
                padding: "11px 28px",
                fontSize: 17,
                letterSpacing: "-0.374px",
                textDecoration: "none",
              }}
            >
              Contact us
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── 4. TESTIMONIALS ──────────────────────────────────────────────── */}
      <section style={{ background: "rgb(247, 245, 242)", padding: "80px 24px" }}>
        <FadeIn>
          <h2
            className="text-center font-semibold mb-12"
            style={{
              fontFamily: "'SF Pro Display', system-ui, -apple-system, sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              lineHeight: 1.1,
              color: "var(--ink)",
            }}
          >
            What Our Clients Say
          </h2>
        </FadeIn>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mx-auto"
          style={{ maxWidth: 900 }}
        >
          {testimonials.map(({ quote, name, photo }, i) => (
            <FadeIn key={name} delay={i * 100}>
              <div
                className="flex flex-col justify-between"
                style={{
                  background: "#1a1a1a",
                  borderRadius: 18,
                  padding: 24,
                  minHeight: 160,
                }}
              >
                <p
                  style={{
                    color: "#ffffff",
                    fontSize: 16,
                    lineHeight: 1.55,
                    letterSpacing: "-0.2px",
                    marginBottom: 24,
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={name}
                    width={38}
                    height={38}
                    style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                  />
                  <p
                    className="font-semibold"
                    style={{ color: "#ffffff", fontSize: 14, letterSpacing: "-0.2px" }}
                  >
                    {name}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ background: "#0d0d0d", padding: "48px 24px 32px" }}>
        <div
          className="flex flex-col md:flex-row md:justify-between mx-auto"
          style={{ maxWidth: 1100, gap: 40, alignItems: "start" }}
        >
          {/* Left — brand */}
          <div className="flex flex-col" style={{ gap: 16 }}>
            <Image src="/logoreal.png" alt="FR Construction" width={56} height={56} style={{ objectFit: "contain" }} />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6, maxWidth: 260 }}>
              Professional construction, carpentry &amp; handyman services across all of London.
            </p>
            {/* Socials */}
            <div className="flex gap-4" style={{ marginTop: 8 }}>
              <a
                href="https://www.instagram.com/FR_contruction"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.2s" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right — link columns */}
          <div className="grid grid-cols-2" style={{ gap: "0 48px" }}>
            {/* Services */}
            <div>
              <p style={{ color: "var(--primary)", fontSize: 13, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 16 }}>Services</p>
              {["Construction", "Carpentry", "Handyman"].map(s => (
                <p key={s} style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, marginBottom: 10 }}>{s}</p>
              ))}
            </div>
            {/* Contact */}
            <div>
              <p style={{ color: "var(--primary)", fontSize: 13, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 16 }}>Contact</p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, display: "block", marginBottom: 10, textDecoration: "none" }}>WhatsApp</a>
              <a href="https://www.instagram.com/FR_contruction" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, display: "block", marginBottom: 10, textDecoration: "none" }}>Instagram</a>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, marginBottom: 10 }}>London, UK</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mx-auto"
          style={{ maxWidth: 1100, marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, letterSpacing: "-0.12px" }}>
            © {new Date().getFullYear()} FR Construction Ltd · London · All rights reserved
          </p>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ────────────────────────────────────────────── */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-7 right-7 z-50 flex items-center justify-center rounded-full transition-transform active:scale-90"
        style={{
          width: 56,
          height: 56,
          background: "#25D366",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
