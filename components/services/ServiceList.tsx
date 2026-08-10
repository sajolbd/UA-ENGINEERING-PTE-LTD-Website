"use client";
import React from "react";
import Container from "../shared/Container";
import ServiceCategoryCard from "./ServiceCategoryCard";
import { useCmsData } from "../../context/CmsContext";

export default function ServiceList() {
  const { servicesData } = useCmsData();
  return (
    <section className="bg-slate-50/50 py-8 lg:py-12">
      <Container>
        {/* Header Content */}
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary">
            Engineering Expertise
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            Our Core Service Categories
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-primary" />
          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
            We deliver tailored solutions across residential, commercial, and industrial structures.
            Choose a category below to explore individual services, structural specifications, and work details.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((category) => (
            <ServiceCategoryCard
              key={category.slug}
              title={category.title}
              description={category.shortDescription}
              slug={category.slug}
              image={category.featuredImage}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
