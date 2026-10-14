import { Metadata } from "next";
import cmsData from "../../../data/cmsData.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uaengineering.com.sg";

export async function generateMetadata(): Promise<Metadata> {
  const seo = (cmsData as any)?.projects?.seo || {};
  return {
    title: seo.metaTitle || "Completed Projects | UA Engineering Portfolio",
    description:
      seo.metaDescription ||
      "Review our portfolio of successfully delivered engineering and renovation projects in Singapore.",
    keywords: seo.metaKeywords,
    alternates: {
      canonical: `${SITE_URL}/projects`,
    },
  };
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
