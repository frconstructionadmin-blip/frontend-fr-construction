export interface Testimonial {
  name: string;
  job: string;
  quote: string;
  date: string;
  rating: number;
}

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    quote: "The flooring job was excellent — everything was done professionally, on time, and with great attention to detail. I'm really happy with how it turned out.",
    name: "Fernanda",
    job: "Laminate Flooring",
    date: "Apr 2026",
    rating: 5,
  },
  {
    quote: "Very efficient, and available for this last minute job. Completed everything in a timely manner and helped with some additional things too. Very reasonable too. Highly recommend.",
    name: "Sj",
    job: "Flat Pack Assembly",
    date: "Apr 2026",
    rating: 5,
  },
  {
    quote: "Excellent job done, knew exactly what he was doing. He was quick and polite — would definitely use him again.",
    name: "Virginia",
    job: "Furniture Assembly",
    date: "Apr 2026",
    rating: 5,
  },
  {
    quote: "Very impressed with the service offered. Was able to complete the job within a matter of a few hours from the job being tendered out. I would wholeheartedly recommend — if I needed more work in the future I would go straight to Franco.",
    name: "Ian",
    job: "Shed Assembly",
    date: "Mar 2026",
    rating: 5,
  },
];

const MJQ_URL = "https://www.myjobquote.co.uk/t/fr-construction-1";

// Formats "Apr 20, 2026" → "Apr 2026"
function formatDate(raw: string): string {
  const m = raw.match(/([A-Za-z]+)\s+\d+,\s+(\d{4})/);
  return m ? `${m[1]} ${m[2]}` : raw.trim();
}

// Pure parsing function — takes raw HTML, returns structured testimonials
export function parseReviews(html: string, limit = 4): Testimonial[] {
  // Split on each review block using the schema.org marker
  const blocks = html.split('itemprop="review"').slice(1);
  const results: Testimonial[] = [];

  for (const block of blocks.slice(0, limit)) {
    const jobMatch = block.match(/class="subcat"[^>]*>\s*([^<]+)/);
    const ratingMatch = block.match(/itemprop="ratingValue" content="(\d)"/);
    const bodyMatch = block.match(/itemprop="reviewBody"[^>]*>([\s\S]*?)<\/p>/);
    // Extract reviewer text: find "Reviewed by ... - Month DD, YYYY" and strip inner HTML tags
    const reviewerSection = block.match(/Reviewed by([\s\S]{0,600}?[A-Za-z]+ \d+, \d{4})/)?.[0] ?? "";
    const authorRaw = reviewerSection.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const authorParts = authorRaw.match(/Reviewed by\s+(.+?)\s+-\s+([A-Za-z]+ \d+, \d{4})/);

    const quote = bodyMatch?.[1]?.replace(/<[^>]+>/g, "").trim() ?? "";
    if (!quote) continue;

    results.push({
      name: authorParts?.[1]?.trim() ?? "Anonymous",
      job: jobMatch?.[1]?.trim() ?? "",
      quote,
      date: formatDate(authorParts?.[2] ?? ""),
      rating: parseInt(ratingMatch?.[1] ?? "5"),
    });
  }

  return results;
}

export async function fetchTestimonials(limit = 4): Promise<Testimonial[]> {
  try {
    const res = await fetch(MJQ_URL, {
      next: { revalidate: 86400 },
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; FRConstruction/1.0; +https://frconstructionlondon.com)",
      },
    });

    if (!res.ok) return FALLBACK_TESTIMONIALS;

    const html = await res.text();
    const reviews = parseReviews(html, limit);

    // Need at least 2 parsed reviews to consider the scrape successful
    return reviews.length >= 2 ? reviews : FALLBACK_TESTIMONIALS;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}
