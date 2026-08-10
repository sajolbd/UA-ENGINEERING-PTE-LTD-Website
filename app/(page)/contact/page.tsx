import React from "react";
import Breadcrumb from "components/layout/Breadcrumb";
import ContactFormSection from "components/contact/ContactFormSection";
import { Metadata } from "next";
import cmsData from "../../../data/cmsData.json";

export async function generateMetadata(): Promise<Metadata> {
  const seo = cmsData?.contact?.seo || {};
  return {
    title: seo.metaTitle || "Contact Us | UA Engineering",
    description: seo.metaDescription || "Request a callback or quotation from UA Engineering Singapore.",
    keywords: seo.metaKeywords || "contact UA engineering, Singapore engineer inspection",
  };
}

export default function ContactPage() {
  const content = cmsData?.contact?.content || {};
  const schemaJson = cmsData?.contact?.seo?.schemaJson || "";

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
        title={content.heroHeading || "Contact Us"}
        description={content.heroSubheading || "Get in touch with our team today to get a free site assessment and quote."}
        bgImage={content.heroImage || "/images/layout/contact-bg.png"}
      />
      <ContactFormSection />
    </div>
  );
}
