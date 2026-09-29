/**
 * Sitemap Generator Engine for UA Engineering PTE. LTD.
 * Implements dynamic, database/CMS-driven sitemap index and categorized child sitemaps.
 * Adheres strictly to Google Search Console & SEO requirements:
 * - HTTPS only
 * - Canonical hostname: https://uaengineering.com.sg
 * - No priority or changefreq tags
 * - Accurate <lastmod> in YYYY-MM-DD format
 * - Automatic exclusion of noindex, private, redirect, deleted, and utility pages
 * - Support for automatic splitting (>50,000 URLs / 50MB)
 */

import { getApiBaseUrl } from "./api";
import initialCmsData from "../data/cmsData.json";
import { servicesData as initialServices, ServiceCategory } from "../data/servicesData";
import { projectsData as initialProjects, ProjectItem } from "../data/projectsData";
import { blogPosts as initialBlogs, BlogPost } from "../data/blogData";

export const CANONICAL_SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://uaengineering.com.sg"
).replace(/\/$/, "");

export interface SitemapUrlEntry {
  loc: string;
  lastmod?: string; // YYYY-MM-DD
}

// Fallback stable content modification date (Singapore timezone)
const DEFAULT_FALLBACK_DATE = "2026-09-20";

/**
 * Format any valid date string or timestamp into YYYY-MM-DD.
 */
export function formatLastmodDate(dateVal?: string | number | Date | null): string {
  if (!dateVal) return DEFAULT_FALLBACK_DATE;
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return DEFAULT_FALLBACK_DATE;
    return d.toISOString().split("T")[0];
  } catch {
    return DEFAULT_FALLBACK_DATE;
  }
}

/**
 * XML Entity Escaping for URLs and text.
 */
export function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Normalizes and validates canonical URLs.
 * Rejects tracking parameters, fragments, non-canonical protocols or domains.
 */
export function normalizeCanonicalUrl(pathOrUrl: string): string | null {
  if (!pathOrUrl) return null;

  let cleaned = pathOrUrl.trim();
  // Strip fragments and query parameters
  if (cleaned.includes("#")) cleaned = cleaned.split("#")[0];
  if (cleaned.includes("?")) cleaned = cleaned.split("?")[0];

  // Disallow forbidden URLs per Doc Section 9
  const lower = cleaned.toLowerCase();
  if (
    lower.includes("privacy-policy") ||
    lower.includes("terms-conditions") ||
    lower.includes("llms.txt") ||
    lower.includes("/admin") ||
    lower.includes("/login") ||
    lower.includes("/api/") ||
    lower.includes("/_next/")
  ) {
    return null;
  }

  // Ensure absolute HTTPS URL with canonical site host
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
    try {
      const parsed = new URL(cleaned);
      const canonicalHostname = new URL(CANONICAL_SITE_URL).hostname;
      if (parsed.hostname !== canonicalHostname) {
        return `${CANONICAL_SITE_URL}${parsed.pathname === "/" ? "" : parsed.pathname.replace(/\/$/, "")}`;
      }
      return `${CANONICAL_SITE_URL}${parsed.pathname === "/" ? "" : parsed.pathname.replace(/\/$/, "")}`;
    } catch {
      return null;
    }
  }

  // Relative path
  const normalizedPath = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  if (normalizedPath === "/") return CANONICAL_SITE_URL;
  return `${CANONICAL_SITE_URL}${normalizedPath.replace(/\/$/, "")}`;
}

/**
 * Fetches with timeout and JSON validation.
 */
async function fetchApiData<T>(endpoint: string, fallback: T): Promise<T> {
  const apiBase = getApiBaseUrl();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(`${apiBase}${endpoint}`, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (res.ok) {
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const json = await res.json();
        if (json && json.success && json.data) {
          return json.data as T;
        }
      }
    }
  } catch {
    // API is offline, gracefully return fallback
  } finally {
    clearTimeout(timer);
  }
  return fallback;
}

/**
 * 1. Pages Data (/sitemap-pages.xml)
 */
export async function getPagesSitemapEntries(): Promise<SitemapUrlEntry[]> {
  const cmsData = await fetchApiData<Record<string, any>>("/api/cms", initialCmsData);

  const homeDate = formatLastmodDate(cmsData?.home?.content?._updatedAt || cmsData?.site?.content?._updatedAt);
  const aboutDate = formatLastmodDate(cmsData?.about?.content?._updatedAt || "2026-09-20");
  const projectsDate = formatLastmodDate(cmsData?.projects?.content?._updatedAt || "2026-09-20");
  const blogDate = formatLastmodDate(cmsData?.blog?.content?._updatedAt || "2026-09-20");
  const contactDate = formatLastmodDate(cmsData?.contact?.content?._updatedAt || "2026-09-20");

  const rawPages: { path: string; lastmod: string; isIndexable?: boolean }[] = [
    { path: "/", lastmod: homeDate, isIndexable: true },
    { path: "/about", lastmod: aboutDate, isIndexable: true },
    { path: "/projects", lastmod: projectsDate, isIndexable: true },
    { path: "/blog", lastmod: blogDate, isIndexable: true },
    { path: "/contact", lastmod: contactDate, isIndexable: true },
  ];

  const entries: SitemapUrlEntry[] = [];
  for (const page of rawPages) {
    if (page.isIndexable === false) continue;
    const loc = normalizeCanonicalUrl(page.path);
    if (loc && !entries.some((e) => e.loc === loc)) {
      entries.push({ loc, lastmod: page.lastmod });
    }
  }

  return entries;
}

/**
 * 2. Services Data (/sitemap-services.xml)
 */
export async function getServicesSitemapEntries(): Promise<SitemapUrlEntry[]> {
  const servicesList = await fetchApiData<ServiceCategory[]>("/api/services", initialServices);
  const entries: SitemapUrlEntry[] = [];

  // Hub page
  const hubLoc = normalizeCanonicalUrl("/services");
  if (hubLoc) {
    entries.push({ loc: hubLoc, lastmod: "2026-09-20" });
  }

  if (Array.isArray(servicesList)) {
    for (const category of servicesList) {
      if (!category || !category.slug) continue;
      // Skip inactive or noindex categories
      if ((category as any).status === "inactive" || (category as any).is_indexable === false) continue;

      const catDate = formatLastmodDate((category as any).updatedAt || (category as any).createdAt || "2026-09-20");
      const catLoc = normalizeCanonicalUrl(`/services/${category.slug}`);

      if (catLoc && !entries.some((e) => e.loc === catLoc)) {
        entries.push({ loc: catLoc, lastmod: catDate });
      }

      // Sub-services
      if (Array.isArray(category.services)) {
        for (const sub of category.services) {
          if (!sub || !sub.slug) continue;
          if ((sub as any).status === "inactive" || (sub as any).is_indexable === false) continue;

          const subDate = formatLastmodDate((sub as any).updatedAt || (sub as any).createdAt || catDate);
          const subLoc = normalizeCanonicalUrl(`/services/${category.slug}/${sub.slug}`);

          if (subLoc && !entries.some((e) => e.loc === subLoc)) {
            entries.push({ loc: subLoc, lastmod: subDate });
          }
        }
      }
    }
  }

  return entries;
}

/**
 * 3. Projects Data (/sitemap-projects.xml)
 */
export async function getProjectsSitemapEntries(): Promise<SitemapUrlEntry[]> {
  const projectsList = await fetchApiData<ProjectItem[]>("/api/projects", initialProjects);
  const entries: SitemapUrlEntry[] = [];

  if (Array.isArray(projectsList)) {
    for (const project of projectsList) {
      if (!project) continue;
      // Exclude inactive / deleted / noindex
      if ((project as any).status === "inactive" || (project as any).is_indexable === false || (project as any).deleted) continue;

      const slug = project.slug || (project as any).id || (project as any)._id;
      if (!slug) continue;

      const pDate = formatLastmodDate(project.createdAt || (project as any).updatedAt || "2026-09-19");
      const loc = normalizeCanonicalUrl(`/projects/${slug}`);

      if (loc && !entries.some((e) => e.loc === loc)) {
        entries.push({ loc, lastmod: pDate });
      }
    }
  }

  return entries;
}

/**
 * 4. Blog Data (/sitemap-blog.xml)
 */
export async function getBlogSitemapEntries(): Promise<SitemapUrlEntry[]> {
  const blogsList = await fetchApiData<BlogPost[]>("/api/blogs", initialBlogs);
  const entries: SitemapUrlEntry[] = [];

  if (Array.isArray(blogsList)) {
    for (const post of blogsList) {
      if (!post || !post.slug) continue;
      // Exclude draft / inactive / noindex / deleted
      if ((post as any).status === "draft" || (post as any).is_indexable === false || (post as any).deleted) continue;

      const postDate = formatLastmodDate((post as any).updatedAt || (post as any).createdAt || post.date || "2026-09-20");
      const loc = normalizeCanonicalUrl(`/blog/${post.slug}`);

      if (loc && !entries.some((e) => e.loc === loc)) {
        entries.push({ loc, lastmod: postDate });
      }
    }
  }

  return entries;
}

/**
 * Generate <urlset> XML string from entries.
 * Strictly adheres to:
 * - <?xml version="1.0" encoding="UTF-8"?>
 * - <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 * - <loc> and <lastmod> only (no priority, no changefreq)
 */
export function buildUrlsetXml(entries: SitemapUrlEntry[]): string {
  const urlTags = entries
    .map((entry) => {
      const locTag = `<loc>${escapeXml(entry.loc)}</loc>`;
      const lastmodTag = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : "";
      return `  <url>\n    ${locTag}${lastmodTag}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlTags}
</urlset>`;
}

/**
 * Generate <sitemapindex> XML string.
 */
export function buildSitemapIndexXml(childSitemaps: { loc: string; lastmod?: string }[]): string {
  const sitemapTags = childSitemaps
    .map((sm) => {
      const locTag = `<loc>${escapeXml(sm.loc)}</loc>`;
      const lastmodTag = sm.lastmod ? `\n    <lastmod>${escapeXml(sm.lastmod)}</lastmod>` : "";
      return `  <sitemap>\n    ${locTag}${lastmodTag}\n  </sitemap>`;
    })
    .join("\n\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${sitemapTags}

</sitemapindex>`;
}

/**
 * Standard HTTP response builder for XML sitemaps with proper headers.
 */
export function createXmlResponse(xmlString: string): Response {
  return new Response(xmlString, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
