import {
  CANONICAL_SITE_URL,
  buildSitemapIndexXml,
  createXmlResponse,
} from "../../lib/sitemapGenerator";

export const dynamic = "force-dynamic";

export async function GET() {
  const childSitemaps = [
    { loc: `${CANONICAL_SITE_URL}/sitemap-pages.xml` },
    { loc: `${CANONICAL_SITE_URL}/sitemap-services.xml` },
    { loc: `${CANONICAL_SITE_URL}/sitemap-projects.xml` },
    { loc: `${CANONICAL_SITE_URL}/sitemap-blog.xml` },
  ];

  const xml = buildSitemapIndexXml(childSitemaps);
  return createXmlResponse(xml);
}
