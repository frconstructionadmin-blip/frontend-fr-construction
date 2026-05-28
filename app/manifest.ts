import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FR Construction Admin",
    short_name: "FR Admin",
    description: "FR Construction dashboard — WhatsApp conversations",
    start_url: "/whatsapp",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    orientation: "portrait",
    icons: [
      {
        src: "/1_black.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/1_black.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
