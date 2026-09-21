import { MetadataRoute } from "next";
import { blogPosts } from "../data/blogData";
import { getLiveServices } from "../lib/servicesUtils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uaengineering.com.sg";
  const liveServices = await getLiveServices();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Service Category & Sub-Service routes
  const serviceRoutes: MetadataRoute.Sitemap = [];
  liveServices.forEach((category) => {
    serviceRoutes.push({
      url: `${baseUrl}/services/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    });

    if (Array.isArray(category.services)) {
      category.services.forEach((subService) => {
        serviceRoutes.push({
          url: `${baseUrl}/services/${category.slug}/${subService.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.80,
        });
      });
    }
  });

  // Blog Post routes
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}

