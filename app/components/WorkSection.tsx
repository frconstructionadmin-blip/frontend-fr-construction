import FadeIn from "./FadeIn";
import WorkCarousel from "./WorkCarousel";

export default function WorkSection() {
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
      <WorkCarousel />
    </section>
  );
}
