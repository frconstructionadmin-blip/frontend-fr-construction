import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FR Construction London | Builder, Carpentry & Handyman",
  description:
    "Professional building, carpentry & handyman services across London. Franco Reyes and his team deliver quality work. Get a free quote on WhatsApp today.",
  openGraph: {
    title: "FR Construction London",
    description: "Builder, carpentry & handyman services across London.",
    url: "https://frconstructionlondon.com",
    siteName: "FR Construction",
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "FR Construction",
  description:
    "Professional construction, carpentry and handyman services across London.",
  telephone: "+447944623838",
  areaServed: "London",
  url: "https://frconstructionlondon.com",
  founder: { "@type": "Person", name: "Franco Reyes" },
  serviceType: ["Construction", "Carpentry", "Handyman"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
