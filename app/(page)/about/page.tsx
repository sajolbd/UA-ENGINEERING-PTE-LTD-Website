"use client";

import React from "react";
import Breadcrumb from "components/layout/Breadcrumb";
import AboutHero from "components/about/AboutHero";
import OurProcess from "components/about/OurProcess";
import ResidentialServices from "components/about/ResidentialServices";
import ServiceAreas from "components/services/ServiceAreas";
import ContactFormSection from "components/contact/ContactFormSection";
import AboutFAQ from "components/about/AboutFAQ";
import { useCmsData } from "../../../context/CmsContext";

export default function AboutPage() {
  const { cmsData } = useCmsData();
  const content = (cmsData as any)?.about?.content || {};
  const schemaJson = (cmsData as any)?.about?.seo?.schemaJson || "";

  return (
    <div className="bg-white min-h-screen">
      {/* Schema.org Structured Data */}
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      )}
      <Breadcrumb
        title={content.heroHeading || "About Us"}
        description={content.heroSubheading || ""}
        bgImage={content.heroImage || "/images/layout/about-bg.png"}
      />
      <AboutHero />
      <OurProcess />
      <ResidentialServices />
      <ServiceAreas />
      <ContactFormSection />
      <AboutFAQ />
    </div>
  );
}
