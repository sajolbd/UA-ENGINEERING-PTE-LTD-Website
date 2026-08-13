"use client";

import Image from "next/image";
import Container from "components/shared/Container";

import { useCmsData } from "../../context/CmsContext";
import { getImageUrl } from "../../lib/api";

export default function CompletedProjects() {
  const { projectsData } = useCmsData();
  const projects = projectsData.slice(0, 8);
  return (
    <section id="projects" className="bg-white py-8 lg:py-12">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            LATEST PROJECTS
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl">
            Our Completed Projects
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded bg-primary" />
          <p className="mt-6 text-base text-slate-600 lg:text-lg">
            A showcase of our successfully delivered projects in Singapore, reflecting our commitment to structural precision, safety, and architectural elegance.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Image Frame */}
              <div className="relative mb-4 h-[200px] w-full overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src={getImageUrl(project.image)}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Text Meta */}
              <div className="flex flex-grow flex-col">
                <span className="inline-self-start inline-block text-[10px] font-extrabold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-1 rounded-md mb-2 group-hover:bg-primary group-hover:text-white transition-all duration-300 w-fit">
                  {project.category}
                </span>
                <h3 className="text-base font-bold leading-snug tracking-tight text-secondary group-hover:text-primary transition-colors duration-300 flex-grow">
                  {project.title}
                </h3>
              </div>

              {/* Hover bottom border indicator */}
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
