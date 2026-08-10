import React from "react";
import Breadcrumb from "components/layout/Breadcrumb";
import AboutHero from "components/about/AboutHero";
import OurProcess from "components/about/OurProcess";
import ResidentialServices from "components/about/ResidentialServices";
import ServiceAreas from "components/services/ServiceAreas";
import ContactFormSection from "components/contact/ContactFormSection";
import AboutFAQ from "components/about/AboutFAQ";
import { Metadata } from "next";
import cmsData from "../../../data/cmsData.json";

export async function generateMetadata(): Promise<Metadata> {
  const seo = cmsData?.about?.seo || {};
  return {
    title: seo.metaTitle || "About Us | UA Engineering",
    description: seo.metaDescription || "Learn more about UA Engineering's team, licensed professional engineers, safety track record.",
    keywords: seo.metaKeywords || "about UA engineering, Singapore Renovation",
  };
}

export default function AboutPage() {
  const content = cmsData?.about?.content || {};
  const schemaJson = cmsData?.about?.seo?.schemaJson || "";

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
        bgImage={content.bgImage || "/images/layout/about-bg.png"}
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
