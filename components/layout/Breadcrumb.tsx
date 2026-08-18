import React from "react";
import Image from "next/image";
import Container from "components/shared/Container";
import { getImageUrl } from "../../lib/api";

interface BreadcrumbProps {
  title: string;
  description?: string;
  bgImage?: string;
}

export default function Breadcrumb({
  title,
  description,
  bgImage = "/images/layout/breadcrumb-bg.png",
}: BreadcrumbProps) {
  return (
    <section className="relative w-full h-[220px] sm:h-[280px] lg:h-[320px] flex items-center overflow-hidden bg-slate-900">
      {/* Background Image */}
      <img
        src={getImageUrl(bgImage)}
        alt={`${title} banner`}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      {/* Dark overlay gradients */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />

      <Container className="relative z-10 w-full flex flex-col items-center justify-center">
        {/* Border container box */}
        <div className="border border-white/40 bg-black/45 backdrop-blur-sm px-8 py-4 sm:px-12 sm:py-6 max-w-2xl text-center rounded-sm shadow-lg">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none uppercase">
            {title}
          </h1>
          {description && (
            <p className="mt-3 text-xs sm:text-sm text-slate-200 font-medium tracking-wide leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
