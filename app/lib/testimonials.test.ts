import { describe, it, expect } from "vitest";
import { parseReviews, FALLBACK_TESTIMONIALS } from "./testimonials";

// Minimal HTML that mirrors the real MyJobQuote review structure
const SAMPLE_HTML = `
<div class="single" itemprop="review">
  <div class="subcat">Lay Laminate Flooring In Three Rooms</div>
  <div itemprop="ratingValue" content="5" class="rating"></div>
  <p itemprop="reviewBody">The flooring job was excellent—everything was done professionally, on time, and with great attention to detail.</p>
  <span itemprop="author">Reviewed by Fernanda - Apr 20, 2026</span>
</div>
<div class="single" itemprop="review">
  <div class="subcat">Assemble Multiple Flat Pack Furniture Items</div>
  <div itemprop="ratingValue" content="5" class="rating"></div>
  <p itemprop="reviewBody">Very efficient, and available for this last minute job. Highly recommend.</p>
  <span itemprop="author">Reviewed by Sj - Apr 10, 2026</span>
</div>
<div class="single" itemprop="review">
  <div class="subcat">Assemble Stool and TV Stand</div>
  <div itemprop="ratingValue" content="4" class="rating"></div>
  <p itemprop="reviewBody">Good job overall.</p>
  <span itemprop="author">Reviewed by Virginia - Apr 7, 2026</span>
</div>
`;

describe("parseReviews", () => {
  it("extracts the correct number of reviews", () => {
    const results = parseReviews(SAMPLE_HTML, 4);
    expect(results).toHaveLength(3);
  });

  it("respects the limit parameter", () => {
    const results = parseReviews(SAMPLE_HTML, 2);
    expect(results).toHaveLength(2);
  });

  it("parses name, job, quote, rating, and date correctly", () => {
    const [first] = parseReviews(SAMPLE_HTML, 1);
    expect(first.name).toBe("Fernanda");
    expect(first.job).toBe("Lay Laminate Flooring In Three Rooms");
    expect(first.quote).toContain("flooring job was excellent");
    expect(first.rating).toBe(5);
    expect(first.date).toBe("Apr 2026");
  });

  it("formats date as 'Mon YYYY'", () => {
    const [, second] = parseReviews(SAMPLE_HTML, 2);
    expect(second.date).toBe("Apr 2026");
  });

  it("parses ratings other than 5", () => {
    const results = parseReviews(SAMPLE_HTML, 4);
    expect(results[2].rating).toBe(4);
  });

  it("returns empty array for HTML with no reviews", () => {
    const results = parseReviews("<html><body>no reviews here</body></html>");
    expect(results).toHaveLength(0);
  });
});

describe("FALLBACK_TESTIMONIALS", () => {
  it("has at least 4 entries", () => {
    expect(FALLBACK_TESTIMONIALS.length).toBeGreaterThanOrEqual(4);
  });

  it("every entry has required fields", () => {
    for (const t of FALLBACK_TESTIMONIALS) {
      expect(t.name).toBeTruthy();
      expect(t.quote).toBeTruthy();
      expect(t.job).toBeTruthy();
      expect(t.date).toBeTruthy();
      expect(t.rating).toBeGreaterThanOrEqual(1);
    }
  });
});
