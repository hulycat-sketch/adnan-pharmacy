import type { MetadataRoute } from "next";
import { PHARMACY, SITE, IMAGES } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: PHARMACY.name,
    short_name: "عدنان",
    description: PHARMACY.description,
    lang: SITE.language,
    dir: SITE.dir,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0F3D91",
    icons: [
      {
        src: IMAGES.androidChrome192,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: IMAGES.androidChrome512,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
