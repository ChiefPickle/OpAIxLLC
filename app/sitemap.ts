import type { MetadataRoute } from "next";

import { ORIGIN } from "@/lib/agent/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${ORIGIN}/`,
      lastModified: new Date("2026-09-27"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
