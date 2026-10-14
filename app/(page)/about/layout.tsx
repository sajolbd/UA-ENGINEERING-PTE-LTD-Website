import { Metadata } from "next";
import cmsData from "../../../data/cmsData.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uaengineering.com.sg";

export async function generateMetadata(): Promise<Metadata> {
  const seo = (cmsData as any)?.about?.seo || {};
  return {
    title: seo.metaTitle || "About UA Engineering | Renovation & Building Services Singapore",
    description:
      seo.metaDescription ||
      "Learn about UA Engineering, a Singapore-based company providing renovation, structural, glazing, electrical, plumbing, aircon, waterproofing and solar solutions.",
    keywords: seo.metaKeywords,
    alternates: {
      canonical: `${SITE_URL}/about`,
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
