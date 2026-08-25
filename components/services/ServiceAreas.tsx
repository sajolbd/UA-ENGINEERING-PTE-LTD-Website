"use client";

import React from "react";
import Container from "../shared/Container";
import { MapPin, ArrowRight } from "lucide-react";
import { useCmsData } from "../../context/CmsContext";

const defaultRegions = [
  {
    name: "Central",
    areas: [
      "Orchard Road",
      "Marina Bay",
      "Bugis",
      "Raffles Place",
      "Tanjong Pagar",
      "Clarke Quay",
    ],
  },
  {
    name: "East",
    areas: [
      "Bedok",
      "Tampines",
      "Pasir Ris",
      "Changi",
      "Marine Parade",
    ],
  },
  {
    name: "West",
    areas: [
      "Jurong East",
      "Jurong West",
      "Bukit Batok",
      "Clementi",
      "Boon Lay",
    ],
  },
  {
    name: "North",
    areas: [
      "Woodlands",
      "Yishun",
      "Sembawang",
      "Admiralty",
    ],
  },
  {
    name: "North-East",
    areas: [
      "Hougang",
      "Punggol",
      "Sengkang",
      "Serangoon",
    ],
  },
];

interface ServiceAreasProps {
  category?: any;
}

export default function ServiceAreas({ category }: ServiceAreasProps = {}) {
  const { cmsData } = useCmsData();
  const homeContent = (cmsData as any)?.home?.content || {};

  const areaBadge = category?.serviceAreasBadge || homeContent.areaBadge || "Service Areas";
  const areaHeading = category?.serviceAreasHeading || (
    category?.title
      ? `Reliable ${category.title} Solutions Near You!`
      : homeContent.areaHeading || "Reliable Engineering & Renovation Solutions Near You!"
  );
  const areaSubheading = category?.serviceAreasSubheading || (
    category?.title
      ? `UA ENGINEERING proudly provides ${category.title.toLowerCase()} services across Singapore, covering all major residential and commercial areas.`
      : homeContent.areaSubheading || "At UA Engineering PTE. LTD, we proudly provide expert renovation, construction, and engineering services throughout Singapore with fast response times and professional support."
  );

  const regions = Array.isArray(homeContent.regions) && homeContent.regions.length > 0
    ? homeContent.regions.map((r: any) => ({
        name: r.name || "Region",
        areas: Array.isArray(r.areas) ? r.areas : typeof r.areas === "string" ? r.areas.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
      }))
    : defaultRegions;

  return (
    <section className="bg-slate-50/50 py-8 lg:py-12 border-t border-slate-100">
      <Container>
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary">
            {areaBadge}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-secondary sm:text-4xl lg:text-5xl leading-tight">
            {areaHeading}
          </h2>
          {/* Dual-color divider line */}
          <div className="mx-auto mt-5 flex h-1 w-24 overflow-hidden rounded-full">
            <div className="w-1/2 bg-primary" />
            <div className="w-1/2 bg-secondary" />
          </div>
          <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-600">
            {areaSubheading}
          </p>
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {regions.map((region: any, idx: number) => (
            <div
              key={region.name || idx}
              className="flex flex-col bg-[#FDFDFD] rounded-2xl border-t-4 border-t-primary border-x border-b border-slate-100/80 p-6 shadow-[0_10px_25px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(100,18,21,0.1)]"
            >
              {/* Region Header */}
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
                <MapPin size={18} className="text-primary shrink-0" />
                <h3 className="text-lg font-extrabold text-secondary">
                  {region.name}
                </h3>
              </div>

              {/* Area List */}
              <ul className="flex flex-col gap-3">
                {region.areas.map((area: string, i: number) => (
                  <li
                    key={area + i}
                    className="group/item flex items-center gap-2 text-sm font-semibold text-slate-600 transition-all duration-300 hover:translate-x-1 hover:text-primary cursor-pointer"
                  >
                    <ArrowRight
                      size={14}
                      className="text-primary shrink-0 transition-transform duration-300 group-hover/item:translate-x-0.5"
                    />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
