"use client";

import React, { useState } from "react";
import Container from "../shared/Container";
import { ChevronDown, MessageSquare } from "lucide-react";
import { useCmsData } from "../../context/CmsContext";

interface FAQItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQ_DATA: FAQItem[] = [
  {
    question: "How long has UA Engineering PTE. LTD. been serving Singapore?",
    answer: "UA Engineering PTE. LTD. has been a trusted contractor in Singapore's renovation and engineering industry for over 15 years. Over the years, we've built a strong reputation for delivering high-quality renovation, partition, waterproofing, and structural upgrades for residential, commercial, and industrial properties.",
  },
  {
    question: "What sets UA Engineering apart from other contractors in Singapore?",
    answer: "What sets us apart is our professional specialization, certified engineering teams (such as EMA-certified electricians), transparency in quoting, and adherence to Singapore building safety guidelines (HDB/BCA). We provide turnkey project execution from minor handyman repairs to full landed house addition & alteration (A&A).",
  },
  {
    question: "Do you offer free site inspections and consultations?",
    answer: "Yes, we believe in empowering our clients with the information they need to make informed decisions. We offer free, no-obligation site assessments and detailed consultations. This allows us to inspect your property (e.g., for roof leakages or renovation layout plans) and provide a transparent, upfront quotation.",
  },
  {
    question: "How do you ensure safety and quality control on site?",
    answer: "Safety is our absolute priority and is non-negotiable. We strictly follow Workplace Safety and Health (WSH) guidelines on all project sites. Our teams are equipped with certified personal protective equipment (PPE) and undergo regular risk assessments. For quality control, we utilize premium, Singapore-certified materials and conduct strict supervision at every project phase.",
  },
];

export default function AboutFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open the first item by default
  const { cmsData } = useCmsData();
  const aboutContent = (cmsData as any)?.about?.content || {};
  const faqHeading = aboutContent.faqHeading || "FAQ's: Looking for Answers?";
  const faqSubheading = aboutContent.faqSubheading || "Find expert answers to common questions about our renovation, construction, and handyman services in Singapore.";

  let faqList = DEFAULT_FAQ_DATA;
  if (aboutContent.faqsJson) {
    try {
      const parsed = JSON.parse(aboutContent.faqsJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        faqList = parsed;
      }
    } catch (e) {
      console.error("Failed to parse dynamic FAQs:", e);
    }
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 bg-white border-t border-slate-100">
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
            If you have a question that is not answered here, please feel free to{" "}
            <a
              href="/contact"
              className="font-bold text-primary hover:underline transition-all"
            >
              contact us directly
            </a>
            . Our team is happy to help.
          </p>
        </div>
      </Container>
    </section>
  );
}
