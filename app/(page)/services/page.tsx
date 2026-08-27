"use client";

import React from "react";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import ServiceList from "../../../components/services/ServiceList";
import AboutSection from "components/home/AboutSection";
import CallBackSection from "components/home/CallBackSection";
import ServiceProcess from "../../../components/services/ServiceProcess";
import WhyChoose from "components/home/WhyChoose";
import ServiceAreas from "../../../components/services/ServiceAreas";
import Review from "components/home/Review";
import HomeFAQ from "components/home/HomeFAQ";
import { useCmsData } from "../../../context/CmsContext";

export default function ServicesPage() {
  const { cmsData } = useCmsData();
  const content = (cmsData as any)?.services?.content || {};
  const schemaJson = (cmsData as any)?.services?.seo?.schemaJson || "";

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
      <HomeFAQ />
    </div>
  );
}
