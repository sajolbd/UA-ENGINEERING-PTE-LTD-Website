import React from "react";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import ServiceList from "../../../components/services/ServiceList";
import AboutSection from "components/home/AboutSection";
import CallBackSection from "components/home/CallBackSection";
import ServiceProcess from "../../../components/services/ServiceProcess";
import WhyChoose from "components/home/WhyChoose";
import ServiceAreas from "../../../components/services/ServiceAreas";
import Review from "components/home/Review";
import { Metadata } from "next";
import cmsData from "../../../data/cmsData.json";

export async function generateMetadata(): Promise<Metadata> {
  const seo = cmsData?.services?.seo || {};
  return {
    title: seo.metaTitle || "Our Services | UA Engineering",
    description: seo.metaDescription || "Explore our commercial and industrial renovation and engineering services in Singapore.",
    keywords: seo.metaKeywords || "substation electrical works, plumbing Singapore",
  };
}

export default function ServicesPage() {
  const content = cmsData?.services?.content || {};
  const schemaJson = cmsData?.services?.seo?.schemaJson || "";

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
        title={content.heroHeading || "Services"}
        description={content.heroSubheading || ""}
        bgImage={content.heroImage || "/images/layout/services-bg.png"}
      />
      <AboutSection />
      <CallBackSection />
      <ServiceList />
      <ServiceProcess />
      <WhyChoose />
      <ServiceAreas />
      <Review />
    </div>
  );
}
