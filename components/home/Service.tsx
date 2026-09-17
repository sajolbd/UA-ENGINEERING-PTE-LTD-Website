"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "components/shared/Container";
import { useCmsData } from "../../context/CmsContext";
import { getImageUrl } from "../../lib/api";

const staticFallbackImages: Record<string, string> = {
  "renovation-upgrading": "/images/services/renovation.png",
  "structural-exterior-works": "/images/services/structural.png",
  "painting-waterproofing": "/images/services/painting.png",
  "aluminium-glazing-works": "/images/services/aluminium.png",
  "electrical-plumbing-aircon": "/images/services/mep.png",
  "solar-panel-installation": "/images/services/solar.png",
};

const staticFallbackTitles: Record<string, string> = {
  "renovation-upgrading": "Renovation & Upgrading",
  "structural-exterior-works": "Structural & Exterior Works",
  "painting-waterproofing": "Painting & Waterproofing",
  "aluminium-glazing-works": "Aluminium & Glazing Works",
  "electrical-plumbing-aircon": "Electrical, Plumbing & Aircon",
  "solar-panel-installation": "Solar Panel Installation",
};

const staticFallbackDescriptions: Record<string, string> = {
  "renovation-upgrading": "Transform homes, offices, and commercial spaces with tailored renovations, interior upgrades, quality finishes, and expert project execution.",
  "structural-exterior-works": "Strengthen and protect your property with structural repairs, roofing, steel works, gate, grill, masonry, and durable exterior improvement solutions.",
  "painting-waterproofing": "Long-lasting internal and external painting and high-grade waterproofing solutions for residential, commercial, and industrial buildings across Singapore.",
  "aluminium-glazing-works": "Custom aluminium frames, glass windows, doors, and architectural glazing solutions crafted for modern Singapore properties.",
  "electrical-plumbing-aircon": "Complete mechanical & electrical engineering services including power installation, pipe repairs, sanitary works, and aircon maintenance.",
  "solar-panel-installation": "Clean energy solar panel systems designed to cut electricity costs and increase building energy efficiency across Singapore properties.",
};

export default function Service() {
  const { servicesData } = useCmsData();

  return (
    <section id="services-list" className="bg-[#f8fafc] py-16 lg:py-24">
      <Container>
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary bg-primary/5 px-3 py-1.5 rounded-full">
            OUR CORE SERVICES
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl">
            Our Services
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-16 rounded bg-primary" />
          <p className="mt-6 text-sm md:text-base text-slate-600 lg:text-lg max-w-2xl mx-auto font-medium">
            Get professional renovation, painting, waterproofing, structural works, M&E services, and solar panel installation-all under one roof.
          </p>
        </div>

        {/* Services Grid (symmetric cards) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((cat) => {
            const cardImage = getImageUrl(cat.featuredImage || staticFallbackImages[cat.slug] || "/images/services/renovation.png");
            const title = (cat.title && cat.title.trim().length > 0)
              ? cat.title.trim()
              : (staticFallbackTitles[cat.slug] || "Engineering Service");

            const description = (cat.shortDescription && cat.shortDescription.trim().length > 0)
              ? cat.shortDescription.trim()
              : (cat.description && cat.description.trim().length > 0)
              ? cat.description.trim()
              : (staticFallbackDescriptions[cat.slug] || "Professional engineering and renovation solutions across Singapore.");

            return (
              <Link
                key={cat.slug || title}
                href={`/services/${cat.slug || "renovation-upgrading"}`}
                className="group relative flex flex-col transition-all duration-500 ease-in-out hover:-translate-y-2 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:drop-shadow-[0_25px_50px_rgba(100,18,21,0.2)]"
              >
                <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden">
                  <div
                    className="w-full h-full flex flex-col bg-[#FDFDFD] group-hover:bg-primary transition-all duration-500 ease-in-out"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)" }}
                  >
                    {/* Card Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 border-b border-slate-100/50">
                      <Image
                        src={cardImage}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        unoptimized={cardImage.startsWith("data:")}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-350" />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold tracking-tight text-secondary transition-colors duration-500 group-hover:text-white">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-500 transition-colors duration-500 group-hover:text-white/80 flex-grow mb-6">
                        {description}
                      </p>

                      {/* Read More Link */}
                      <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-500 group-hover:text-white">
                        <span>Learn More</span>
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-500 group-hover:translate-x-1.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
