import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://uaengineering.com.sg";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/login/",
          "/privacy-policy",
          "/terms-conditions",
          "/llms.txt",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
