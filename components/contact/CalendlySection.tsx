"use client";

import React from "react";
import { InlineWidget } from "react-calendly";
import { Clock, CheckCircle2, Sparkles, Building2 } from "lucide-react";
import Container from "../shared/Container";
import Image from "next/image";

interface CalendlySectionProps {
  calendlyUrl?: string;
}

export default function CalendlySection({
  calendlyUrl = "https://calendly.com/social-uaengineering/30min",
}: CalendlySectionProps) {
  return (
    <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorator Gradients */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary-300 text-xs font-extrabold uppercase tracking-widest">
            <Sparkles size={14} className="text-primary-400" />
            <span>Instant Online Scheduling</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Book a Free Site Survey & Consultation
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Select a convenient date and time slot below for an on-site inspection or technical consultation with our engineering team in Singapore.
          </p>
        </div>

        {/* Embedded Calendly Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Header Bar inside Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white p-1 shadow-sm shrink-0">
                <Image
                  src="/images/logo.webp"
                  alt="UA Engineering Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg">
                  UA ENGINEERING PTE. LTD.
                </h3>
                <p className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Building2 size={13} className="text-primary-400" />
                  <span>BCA Certified Contractor • Singapore</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Clock size={14} className="text-primary-400" />
                <span>30 Mins Duration</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-950/60 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-800/50 font-bold">
                <CheckCircle2 size={14} />
                <span>100% Free Booking</span>
              </div>
            </div>
          </div>

          {/* Calendly Inline Widget */}
          <div className="min-h-[650px] w-full rounded-2xl overflow-hidden bg-white">
            <InlineWidget
              url={calendlyUrl}
              styles={{
                height: "680px",
                width: "100%",
              }}
              pageSettings={{
                backgroundColor: "ffffff",
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: "641215",
                textColor: "1e293b",
              }}
              prefill={{
                email: "",
                name: "",
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
