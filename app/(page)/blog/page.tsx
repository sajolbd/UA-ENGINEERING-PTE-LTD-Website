import React from "react";
import Breadcrumb from "components/layout/Breadcrumb";
import FeaturedBlog from "components/blog/FeaturedBlog";
import BlogGrid from "components/blog/BlogGrid";
import { Metadata } from "next";
import cmsData from "../../../data/cmsData.json";

export async function generateMetadata(): Promise<Metadata> {
  const seo = cmsData?.blog?.seo || {};
  return {
    title: seo.metaTitle || "Blog & Engineering Resources | UA Engineering",
    description: seo.metaDescription || "Read the latest engineering articles, safety tips, BTO renovation rules, and electrical rewiring checklists written by our expert engineers.",
    keywords: seo.metaKeywords || "engineering blog, BTO renovation tips, electrical safety HDB, Singapore building code audit",
  };
}

export default function BlogPage() {
  const content = cmsData?.blog?.content || {};
  const schemaJson = cmsData?.blog?.seo?.schemaJson || "";

  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* Schema.org Structured Data */}
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      )}
      <Breadcrumb
        title={content.heroHeading || "Blog & Articles"}
        description={content.heroSubheading || "Stay updated with the latest construction insights, renovation guides, and engineering standards in Singapore."}
        bgImage={content.heroImage || "/images/layout/blog-bg.png"}
      />
      <FeaturedBlog />
      <BlogGrid />
    </div>
  );
}
