import React from "react";
import Breadcrumb from "components/layout/Breadcrumb";
import ProjectsSection from "components/projects/ProjectsSection";
import CallBackSection from "components/home/CallBackSection";
import ProjectsFAQ from "components/projects/ProjectsFAQ";
import { Metadata } from "next";
import cmsData from "../../../data/cmsData.json";

export async function generateMetadata(): Promise<Metadata> {
  const seo = cmsData?.projects?.seo || {};
  return {
    title: seo.metaTitle || "Completed Projects | UA Engineering",
    description: seo.metaDescription || "Review our portfolio of successfully delivered projects in Singapore.",
    keywords: seo.metaKeywords || "engineering portfolio Singapore, substation works Singapore",
  };
}

export default function ProjectsPage() {
  const content = cmsData?.projects?.content || {};
  const schemaJson = cmsData?.projects?.seo?.schemaJson || "";

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Schema.org Structured Data */}
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      )}
      <Breadcrumb
        title={content.heroHeading || "Our Projects"}
        description={content.heroSubheading || "A showcase of our successfully delivered engineering and renovation projects across Singapore."}
        bgImage={content.heroImage || "/images/layout/projects-bg.png"}
      />
      <ProjectsSection />
      <CallBackSection />
      <ProjectsFAQ />
    </div>
  );
}
