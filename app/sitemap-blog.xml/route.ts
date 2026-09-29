import {
  getBlogSitemapEntries,
  buildUrlsetXml,
  createXmlResponse,
} from "../../lib/sitemapGenerator";

export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await getBlogSitemapEntries();
  const xml = buildUrlsetXml(entries);
  return createXmlResponse(xml);
}
