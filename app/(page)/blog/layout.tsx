import { Metadata } from "next";
import cmsData from "../../../data/cmsData.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uaengineering.com.sg";

export async function generateMetadata(): Promise<Metadata> {
  const seo = (cmsData as any)?.blog?.seo || {};
  return {
    title: seo.metaTitle || "Blog & Engineering Resources | UA Engineering",
    description:
      seo.metaDescription ||
      "Read the latest engineering articles, safety tips, BTO renovation rules, and electrical rewiring checklists in Singapore.",
    keywords: seo.metaKeywords,
    alternates: {
      canonical: `${SITE_URL}/blog`,
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
