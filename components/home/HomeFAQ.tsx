"use client";

import React, { useState } from "react";
import Container from "../shared/Container";
import { ChevronDown } from "lucide-react";
import { useCmsData } from "../../context/CmsContext";

interface FAQItem {
  question: string;
  answer: string;
}

const DEFAULT_HOME_FAQS: FAQItem[] = [
  {
    question: "1. What services does UA Engineering provide in Singapore?",
    answer: "We provide comprehensive building and property solutions including residential and commercial renovation & upgrading, structural steel works, roof extension, interior & exterior painting, waterproofing, electrical rewiring, plumbing, aircon servicing, aluminium glazing, and solar panel installation across Singapore.",
  },
  {
    question: "2. Does UA Engineering handle both residential and commercial projects?",
    answer: "Yes. We undertake projects for HDB flats, BTO, condominiums, landed homes, commercial offices, retail shops, and industrial properties across Singapore. Our team manages projects of all scales, from individual repair works to complete property transformations.",
  },
  {
    question: "3. Are your engineers, technicians, and workers licensed and certified in Singapore?",
    answer: "Yes, our team consists of BCA-certified professionals, EMA-licensed electricians, and trained Workplace Safety and Health (WSH) officers compliant with Singapore building safety standards and MOM regulations.",
  },
  {
    question: "4. How does the renovation and engineering process work?",
    answer: "Our process begins with a consultation and site assessment, followed by a detailed proposal and project planning. Once approved, our skilled team carries out the works under professional supervision and strict quality control. The project concludes with final inspection, handover, site cleaning, and after-sales support.",
  },
  {
    question: "5. Do you provide a detailed quotation before starting work?",
    answer: "Yes. We provide transparent, itemised quotations outlining the project scope, materials, pricing, and expected timeline. This helps clients understand all costs clearly with no hidden fees or unexpected charges.",
  },
  {
    question: "6. Do you offer free site inspections and non-obligatory quotations?",
    answer: "Yes! We offer free site assessments across all Singapore regions to evaluate your property's requirements, take accurate measurements, and provide clear, transparent upfront quotations.",
  },
  {
    question: "7. How quickly can UA Engineering start our project upon confirmation?",
    answer: "Once the project scope and quotations are approved, our project management team arranges site preparation, permit submissions, and material delivery to commence works promptly according to agreed timelines.",
  },
  {
    question: "8. Do you provide waterproofing, plumbing, electrical, and air-conditioning services?",
    answer: "Yes. We provide a wide range of essential M&E and building services, including roof and bathroom waterproofing, leak repairs, pipe replacement, electrical rewiring, switchboard upgrades, and air-conditioning installations.",
  },
  {
    question: "9. How does UA Engineering ensure quality, safety, and timely project completion?",
    answer: "We use structured project planning, experienced supervision, quality inspections, premium certified materials, and strict safety standards (WSH). Clear communication and efficient scheduling ensure every project is completed reliably and on time.",
  },
  {
    question: "10. Do you provide warranty and after-sales maintenance support?",
    answer: "Yes, we provide warranty coverage on our workmanship and materials, along with responsive after-sales maintenance support to give you complete confidence and peace of mind after project handover.",
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open the first item by default
  const { cmsData } = useCmsData();
  const homeContent = (cmsData as any)?.home?.content || {};
  const faqHeading = homeContent.faqHeading || "Frequently Asked Questions";
  const faqSubheading = homeContent.faqSubheading || "Get quick answers to common questions regarding our engineering, renovation, and maintenance services in Singapore.";

  let faqList: FAQItem[] = DEFAULT_HOME_FAQS;
  if (homeContent.faqsJson !== undefined) {
    try {
      const parsed = typeof homeContent.faqsJson === "string" ? JSON.parse(homeContent.faqsJson || "[]") : homeContent.faqsJson;
      if (Array.isArray(parsed) && parsed.length > 0) {
        faqList = parsed;
      }
    } catch (e) {
      console.error("Failed to parse dynamic Home FAQs:", e);
      faqList = DEFAULT_HOME_FAQS;
    }
  }

  // If user removed all FAQs or list is empty, remove the FAQ section completely
  if (!faqList || faqList.length === 0) {
    return null;
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 bg-slate-50/50 border-t border-slate-100">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-primary bg-primary/5 px-3.5 py-2 rounded-full">
            FAQ&apos;S
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-secondary sm:text-4xl">
            {faqHeading}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-primary" />
          <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-500 font-semibold max-w-2xl mx-auto">
            {faqSubheading}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mx-auto max-w-4xl">
          {faqList.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`mb-4 border rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${
                  isOpen ? "border-primary/20" : "border-slate-200/60"
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex justify-between items-center px-6 py-5 text-left font-bold transition-all duration-300 focus:outline-none select-none ${
                    isOpen
                      ? "text-primary bg-primary/[0.01] border-l-4 border-primary"
                      : "text-slate-850 hover:text-primary border-l-4 border-transparent"
                  }`}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base pr-4 font-bold">{faq.question}</span>
                  <span
                    className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 transition-all duration-300 ${
                      isOpen ? "rotate-180 bg-primary/10 text-primary" : ""
                    }`}
                  >
                    <ChevronDown className="h-4.5 w-4.5" />
                  </span>
                </button>

                {/* Accordion Smooth Height Transition */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-3 text-xs md:text-sm leading-relaxed text-slate-600 font-semibold border-t border-slate-100/65 bg-slate-50/30">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Hook */}
        <div className="mt-12 text-center">
          <p className="text-sm font-semibold text-slate-500">
            Have more questions? Reach out to our engineering team at{" "}
            <a
              href="/contact"
              className="font-bold text-primary hover:underline transition-all"
            >
              contact us directly
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
