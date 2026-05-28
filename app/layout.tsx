import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import ServiceWorkerRegistrar from "./components/ServiceWorkerRegistrar";
import "./globals.css";

export const metadata: Metadata = {
  title: "FR Construction | Builder, Carpentry & Handyman",
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
  appleWebApp: {
    capable: true,
    title: "FR Admin",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="apple-touch-icon" href="/1_black.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        {children}
        <ServiceWorkerRegistrar />
        <Analytics />
      </body>
    </html>
  );
}
