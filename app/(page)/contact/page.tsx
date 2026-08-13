"use client";

import React from "react";
import Breadcrumb from "components/layout/Breadcrumb";
import ContactFormSection from "components/contact/ContactFormSection";
import { useCmsData } from "../../../context/CmsContext";

export default function ContactPage() {
  const { cmsData } = useCmsData();
  const content = (cmsData as any)?.contact?.content || {};
  const schemaJson = (cmsData as any)?.contact?.seo?.schemaJson || "";

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
