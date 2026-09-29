import {
  getProjectsSitemapEntries,
  buildUrlsetXml,
  createXmlResponse,
} from "../../lib/sitemapGenerator";

export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await getProjectsSitemapEntries();
  const xml = buildUrlsetXml(entries);
  return createXmlResponse(xml);
}
