import AboutSection from "components/home/AboutSection";
import CallBackSection from "components/home/CallBackSection";
import Hero from "components/home/Hero";
import Service from "components/home/Service";
import CompletedProjects from "components/home/CompletedProjects";
import WorkingProcess from "components/home/WorkingProcess";
import React from "react";
import Services from "components/home/Services";
import WhyRely from "components/home/WhyRely";
import WhyChoose from "components/home/WhyChoose";
import Testimonial from "components/home/Testimonial";
import Review from "components/home/Review";
import { Metadata } from "next";
import cmsData from "../data/cmsData.json";
import ServiceAreas from "components/services/ServiceAreas";
import AboutFAQ from "components/about/AboutFAQ";

export async function generateMetadata(): Promise<Metadata> {
  const seo = cmsData?.home?.seo || {};
  return {
    title: seo.metaTitle || "UA Engineering PTE. LTD.",
    description: seo.metaDescription || "UA Engineering PTE. LTD. provides renovation, waterproofing, steel works, roofing, electrical, plumbing, aircon, aluminium glazing and maintenance services across Singapore.",
    keywords: seo.metaKeywords || "UA Engineering, Singapore Renovation, Waterproofing Singapore",
  };
}

const page = () => {
  const schemaJson = cmsData?.home?.seo?.schemaJson || "";

  return (
    <div>
      {/* Schema.org Structured Data */}
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      )}
      <Hero />
      <Services />
      <CallBackSection />
      <AboutSection />
      <Service />
      <CompletedProjects />
      <WorkingProcess />
      <WhyRely />
      <WhyChoose />
      <Testimonial />
      <Review />
      <ServiceAreas />
      <AboutFAQ />
    </div>
  );
};

export default page;