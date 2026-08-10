"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Container from "components/shared/Container";

// Categories definition
const CATEGORIES = [
  "All Works",
  "Painting & Waterproofing",
  "Renovation & Tiling",
  "Structural & Steel",
  "Electrical & Plumbing",
  "Solar Panel",
];

// Project list matching company capabilities and user request
import { useCmsData } from "../../context/CmsContext";

export default function ProjectsSection() {
  const { projectsData: PROJECTS } = useCmsData();
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[number] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter projects based on selected category
  const filteredProjects = activeCategory === "All Works"
    ? PROJECTS
    : PROJECTS.filter(project => project.category === activeCategory);

  // Keyboard navigation for the slider modal
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject, currentImageIndex]);

  const nextImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.gallery.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  return (
    <Container className="my-12">
      {/* Category Selector / Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 text-sm font-semibold rounded-full border transition-all duration-300 active:scale-95 shadow-sm ${activeCategory === category
              ? "bg-primary border-primary text-white hover:bg-primary/90"
              : "bg-white border-slate-200 text-slate-700 hover:border-primary hover:text-primary"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Responsive Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              onClick={() => {
                setSelectedProject(project);
                setCurrentImageIndex(0);
              }}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-md border border-slate-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-out aspect-[4/3] sm:aspect-[3/4] md:aspect-[4/5] cursor-pointer"
            >
              {/* Project Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={index < 3}
                />
              </div>

              {/* Dark Gradient Overlay for text readability (matches screenshot layout) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent z-10" />

              {/* Bottom Overlay Banner (Exact replica of the screenshot style) */}
              <div className="absolute bottom-6 left-6 right-6 z-20 py-3 px-5 text-center text-white font-bold tracking-wide text-sm md:text-base bg-primary rounded shadow-lg transition-colors duration-500 ease-out group-hover:bg-secondary">
                {project.title}
              </div>

              {/* Hover Details Panel (Sleek overlay with info & buttons) */}
              <div className="absolute inset-0 bg-secondary/90 flex flex-col justify-between p-6 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 z-30">
                <div className="space-y-3">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-primary bg-white px-3 py-1 rounded">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-200 leading-relaxed line-clamp-4">
                    {project.description}
                  </p>
                  <div className="flex items-center text-white text-xs gap-1.5 pt-1">
                    <svg
                      className="w-4 h-4 text-primary shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="font-medium">{project.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full">
                  <span className="inline-flex items-center justify-center w-full px-3 py-2.5 text-[10px] sm:text-xs font-bold text-slate-900 bg-white hover:bg-primary hover:text-white rounded-lg transition-all duration-300 active:scale-95 text-center uppercase tracking-wider shadow-sm">
                    View Gallery
                  </span>
                  <a
                    href={`/contact?project=${encodeURIComponent(project.title)}`}
                    onClick={(e) => e.stopPropagation()} // Prevent opening modal when clicking contact button
                    className="inline-flex items-center justify-center w-full px-3 py-2.5 text-[10px] sm:text-xs font-bold text-white bg-primary hover:bg-white hover:text-primary rounded-lg transition-all duration-300 active:scale-95 text-center uppercase tracking-wider shadow-md border border-transparent hover:border-primary"
                  >
                    Enquire Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-white rounded-2xl border border-slate-150 shadow-inner">
          <svg
            className="mx-auto h-12 w-12 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="mt-4 text-base font-semibold text-slate-900">No projects found</h3>
          <p className="mt-2 text-sm text-slate-500">
            There are no projects listed under the &ldquo;{activeCategory}&rdquo; category.
          </p>
        </div>
      )}

      {/* Bottom Call-to-Action Banner */}
      {/* <div className="mt-20 bg-secondary rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden text-center md:text-left md:flex md:items-center md:justify-between border-l-8 border-primary">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        
        <div className="mb-6 md:mb-0 md:max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">
            Have a Custom Project in Mind?
          </h3>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed">
            Whether it is high-rise painting, roof structural repairs, waterproofing, or custom glazing works, our team of certified engineers is ready to deliver. Get a free site inspection and non-obligatory estimation.
          </p>
        </div>

        <div className="shrink-0">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-primary hover:bg-white hover:text-secondary rounded-lg transition-all duration-300 active:scale-95 uppercase tracking-wider shadow-lg"
          >
            Get Free Estimate
          </a>
        </div>
      </div> */}

      {/* Slider Gallery Modal (Mobile Responsive + Keyboard Navigation) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md text-white select-none transition-all duration-300 ease-in-out p-4 md:p-6">

          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 w-full">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-primary text-white px-2 py-0.5 rounded">
                  {selectedProject.category}
                </span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedProject.location}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-bold mt-1 text-white truncate max-w-xs md:max-w-xl">
                {selectedProject.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="p-2 bg-white/10 hover:bg-primary text-white rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close Gallery"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Main Slider Frame */}
          <div className="relative flex-grow flex items-center justify-center my-4 w-full">

            {/* Left Control Arrow (Hidden on mobile overlay, click-friendly on desktop) */}
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-4 z-40 p-3 bg-white/5 hover:bg-primary/90 text-white rounded-full transition-all duration-300 focus:outline-none active:scale-95 hover:scale-110 shadow-lg border border-white/10"
              aria-label="Previous Image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main Image Container */}
            <div className="relative w-full max-w-4xl h-[45vh] md:h-[60vh] flex items-center justify-center">
              <Image
                src={selectedProject.gallery[currentImageIndex]}
                alt={`${selectedProject.title} detail ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain transition-all duration-500 ease-in-out"
                priority
              />
            </div>

            {/* Right Control Arrow */}
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 z-40 p-3 bg-white/5 hover:bg-primary/90 text-white rounded-full transition-all duration-300 focus:outline-none active:scale-95 hover:scale-110 shadow-lg border border-white/10"
              aria-label="Next Image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Modal Footer / Thumbnails & Info */}
          <div className="w-full flex flex-col items-center gap-4 border-t border-white/10 pt-4">

            {/* Image Slider Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto max-w-full py-1 px-2 no-scrollbar">
              {selectedProject.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`relative w-14 h-14 md:w-18 md:h-18 rounded-lg overflow-hidden border-2 transition-all duration-300 shrink-0 ${currentImageIndex === i
                    ? "border-primary scale-105 shadow-md shadow-primary/20"
                    : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Slide Index Counter & Description */}
            <div className="text-center max-w-2xl px-4">
              <span className="text-xs md:text-sm font-semibold tracking-wider text-slate-400 block mb-1">
                Image {currentImageIndex + 1} of {selectedProject.gallery.length}
              </span>
              <p className="text-xs md:text-sm text-slate-300 line-clamp-2 md:line-clamp-none">
                {selectedProject.description}
              </p>
            </div>

            {/* Contact Action Link inside Modal */}
            <div className="w-full max-w-xs pb-2">
              <a
                href={`/contact?project=${encodeURIComponent(selectedProject.title)}`}
                className="inline-flex items-center justify-center w-full px-6 py-3 text-xs md:text-sm font-bold text-white bg-primary hover:bg-white hover:text-primary rounded-lg transition-all duration-300 active:scale-95 text-center uppercase tracking-wider shadow-md"
              >
                Enquire for this service
              </a>
            </div>

          </div>
        </div>
      )}
    </Container>
  );
}
