import {
  getPagesSitemapEntries,
  buildUrlsetXml,
  createXmlResponse,
} from "../../lib/sitemapGenerator";

export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await getPagesSitemapEntries();
  const xml = buildUrlsetXml(entries);
  return createXmlResponse(xml);
}
