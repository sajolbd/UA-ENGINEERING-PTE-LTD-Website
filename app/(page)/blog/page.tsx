"use client";

import React from "react";
import Breadcrumb from "components/layout/Breadcrumb";
import FeaturedBlog from "components/blog/FeaturedBlog";
import BlogGrid from "components/blog/BlogGrid";
import { useCmsData } from "../../context/CmsContext";

export default function BlogPage() {
  const { cmsData } = useCmsData();
  const content = (cmsData as any)?.blog?.content || {};
  const schemaJson = (cmsData as any)?.blog?.seo?.schemaJson || "";

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
