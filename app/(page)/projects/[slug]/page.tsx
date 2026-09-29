import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaTag, FaCalendarAlt, FaUser, FaArrowLeft } from "react-icons/fa";
import Breadcrumb from "components/layout/Breadcrumb";
import CallBackSection from "components/home/CallBackSection";
import Container from "components/shared/Container";
import { projectsData as initialProjects, ProjectItem } from "../../../../data/projectsData";
import { getApiBaseUrl, getImageUrl } from "../../../../lib/api";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uaengineering.com.sg";

async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const apiBase = getApiBaseUrl();
  try {
    const res = await fetch(`${apiBase}/api/projects`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json && json.success && Array.isArray(json.data)) {
        const found = json.data.find((p: ProjectItem) => p.slug === slug || String(p.id) === slug || String(p._id) === slug);
        if (found) return found;
      }
    }
  } catch {
    // API offline fallback
  }

  const foundLocal = initialProjects.find(
    (p) => p.slug === slug || String(p.id) === slug || String(p._id) === slug
  );
  return foundLocal || null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };

  const canonicalUrl = `${SITE_URL}/projects/${project.slug || params.slug}`;
  const title = `${project.title} | UA Engineering Projects`;
  const description = project.description || `${project.title} completed in Singapore by UA Engineering PTE. LTD.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: getImageUrl(project.image),
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const gallery = (project.gallery && project.gallery.length > 0)
    ? project.gallery
    : [project.image];

  const dateFormatted = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString("en-SG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently Completed";

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <Breadcrumb
        title={project.title}
        description={project.subtitle || project.category || "Project Showcase"}
        bgImage={getImageUrl(project.image)}
      />

      <Container className="py-12">
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline transition-all"
          >
            <FaArrowLeft /> Back to All Projects
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Main Featured Image */}
            <div className="lg:col-span-2 relative h-[350px] md:h-[480px] rounded-xl overflow-hidden shadow-inner bg-slate-100">
              <Image
                src={getImageUrl(project.image)}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Project Overview Card */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary mb-4">
                  {project.category || "Engineering & Renovation"}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                  {project.title}
                </h1>

                <div className="space-y-4 text-sm text-slate-600">
                  {project.location && (
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong className="block text-slate-800">Location</strong>
                        <span>{project.location}</span>
                      </div>
                    </div>
                  )}

                  {project.client && (
                    <div className="flex items-start gap-3">
                      <FaUser className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong className="block text-slate-800">Client / Property</strong>
                        <span>{project.client}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <FaTag className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong className="block text-slate-800">Category</strong>
                      <span>{project.category}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaCalendarAlt className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong className="block text-slate-800">Completion Date</strong>
                      <span>{dateFormatted}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <Link
                  href="/contact"
                  className="w-full block text-center bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
                >
                  Request a Similar Project Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="prose max-w-none text-slate-700 mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">
              Project Description & Scope of Work
            </h2>
            <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Gallery Section */}
          {gallery.length > 1 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative h-64 rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow bg-slate-100"
                  >
                    <Image
                      src={getImageUrl(imgUrl)}
                      alt={`${project.title} - photo ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>

      <CallBackSection />
    </div>
  );
}
