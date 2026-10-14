import { Metadata } from "next";
import cmsData from "../../../data/cmsData.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uaengineering.com.sg";

export async function generateMetadata(): Promise<Metadata> {
  const seo = (cmsData as any)?.services?.seo || {};
  return {
    title: seo.metaTitle || "Renovation & Upgrading Service Singapore | UA Engineering",
    description:
      seo.metaDescription ||
      "Professional renovation and upgrading services in Singapore for HDB, condos, landed homes, offices and commercial spaces.",
    keywords: seo.metaKeywords,
    alternates: {
      canonical: `${SITE_URL}/services`,
    },
  };
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
