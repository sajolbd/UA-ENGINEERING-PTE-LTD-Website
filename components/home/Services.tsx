"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "components/shared/Container";
import { useCmsData } from "../../context/CmsContext";
import { getImageUrl } from "../../lib/api";

const staticFallbackIcons: Record<string, string> = {
  "renovation-upgrading": "/images/home/service-card/Renovation Upgrading - UA Engineering.png",
  "structural-exterior-works": "/images/home/service-card/Structural Exterior Works - UA Engineering.png",
  "painting-waterproofing": "/images/home/service-card/Painting Waterproofing - UA Engineering.png",
  "aluminium-glazing-works": "/images/home/service-card/Aluminium Glazing Works - UA Engineering.png",
  "electrical-plumbing-aircon": "/images/home/service-card/Electrical Plumbing Aircon - UA Engineering.png",
  "solar-panel-installation": "/images/home/service-card/Solar Panel Installation - UA Engineering.png",
};

export default function Services() {
  const { servicesData } = useCmsData();

  return (
    <section id="services" className="bg-white py-8 lg:py-12">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
          {servicesData.map((cat) => {
            const iconUrl = getImageUrl(cat.icon || staticFallbackIcons[cat.slug] || "/images/home/service-card/Renovation Upgrading - UA Engineering.png");
            return (
              <Link
                key={cat.slug}
                href={`/services/${cat.slug}`}
                className="group flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white px-5 py-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:bg-primary hover:shadow-[0_12px_30px_rgba(100,18,21,0.15)] sm:min-h-[200px]"
              >
                <div className="relative mb-4 flex h-20 w-20 items-center justify-center">
                  <Image
                    src={iconUrl}
                    alt={cat.title}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-contain transition-all duration-300 group-hover:scale-110"
                    unoptimized={iconUrl.startsWith("data:")}
                  />
                </div>

                <h3 className="mt-2 text-base font-bold leading-snug text-slate-950 transition-colors duration-300 group-hover:text-white">
                  {cat.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}