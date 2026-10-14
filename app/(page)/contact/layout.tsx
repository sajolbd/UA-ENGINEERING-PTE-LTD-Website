import { Metadata } from "next";
import cmsData from "../../../data/cmsData.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uaengineering.com.sg";

export async function generateMetadata(): Promise<Metadata> {
  const seo = (cmsData as any)?.contact?.seo || {};
  return {
    title: seo.metaTitle || "Contact Us | UA Engineering PTE. LTD.",
    description:
      seo.metaDescription ||
      "Request a callback or quotation from UA Engineering Singapore for renovation, engineering, waterproofing, and construction works.",
    keywords: seo.metaKeywords,
    alternates: {
      canonical: `${SITE_URL}/contact`,
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
