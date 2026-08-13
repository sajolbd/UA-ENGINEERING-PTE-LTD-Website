"use client";

import React from "react";
import Breadcrumb from "components/layout/Breadcrumb";
import ProjectsSection from "components/projects/ProjectsSection";
import CallBackSection from "components/home/CallBackSection";
import ProjectsFAQ from "components/projects/ProjectsFAQ";
import { useCmsData } from "../../context/CmsContext";

export default function ProjectsPage() {
  const { cmsData } = useCmsData();
  const content = (cmsData as any)?.projects?.content || {};
  const schemaJson = (cmsData as any)?.projects?.seo?.schemaJson || "";

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
