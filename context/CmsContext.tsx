"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getApiBaseUrl } from "../lib/api";
import initialCmsData from "../data/cmsData.json";
import { servicesData as initialServicesData, ServiceCategory } from "../data/servicesData";
import { projectsData as initialProjectsData, ProjectItem } from "../data/projectsData";
import { blogPosts as initialBlogPosts, BlogPost } from "../data/blogData";

interface CmsContextType {
  cmsData: typeof initialCmsData;
  servicesData: ServiceCategory[];
  projectsData: ProjectItem[];
  blogPosts: BlogPost[];
  loading: boolean;
}

const CmsContext = createContext<CmsContextType>({
  cmsData: initialCmsData,
  servicesData: initialServicesData,
  projectsData: initialProjectsData,
  blogPosts: initialBlogPosts,
  loading: false,
});

interface CmsProviderProps {
  children: React.ReactNode;
  initialData?: {
    cmsData: typeof initialCmsData;
    servicesData: ServiceCategory[];
    projectsData: ProjectItem[];
    blogPosts: BlogPost[];
  };
}

function mergeCmsData(base: any, override: any) {
  if (!override || typeof override !== "object") return base;
  const result = { ...base };
  Object.keys(base).forEach((pageKey) => {
    const basePage = base[pageKey] || {};
    const overridePage = override[pageKey] || {};
    const baseContent = basePage.content || {};
    const overrideContent = overridePage.content || {};

    const mergedContent = { ...baseContent };
    Object.keys(overrideContent).forEach((k) => {
      const val = overrideContent[k];
      if (val !== undefined && val !== null && val !== "") {
        mergedContent[k] = val;
      }
    });

    const baseSeo = basePage.seo || {};
    const overrideSeo = overridePage.seo || {};
    const mergedSeo = { ...baseSeo };
    Object.keys(overrideSeo).forEach((k) => {
      const val = overrideSeo[k];
      if (val !== undefined && val !== null && val !== "") {
        mergedSeo[k] = val;
      }
    });

    result[pageKey] = {
      ...basePage,
      content: mergedContent,
      seo: mergedSeo,
    };
  });
  Object.keys(override).forEach((pageKey) => {
    if (!result[pageKey]) {
      result[pageKey] = override[pageKey];
    }
  });
  return result;
}

export function CmsProvider({ children, initialData }: CmsProviderProps) {
  const [cms, setCms] = useState(initialData?.cmsData ? mergeCmsData(initialCmsData, initialData.cmsData) : initialCmsData);
  const [services, setServices] = useState<ServiceCategory[]>(initialData?.servicesData || initialServicesData);
  const [projects, setProjects] = useState<ProjectItem[]>(initialData?.projectsData || initialProjectsData);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialData?.blogPosts || initialBlogPosts);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    const apiBase = getApiBaseUrl();

    // 0. Load cached updates from localStorage for instant client rendering
    try {
      if (typeof window !== "undefined") {
        const cachedServices = localStorage.getItem("ua_services_categories_cache");
        if (cachedServices) {
          const parsed = JSON.parse(cachedServices);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setServices(parsed);
          }
        }
        const cachedCms = localStorage.getItem("ua_cms_data_cache");
        if (cachedCms) {
          const parsedCms = JSON.parse(cachedCms);
          if (parsedCms && Object.keys(parsedCms).length > 0) {
            setCms((prev: any) => mergeCmsData(prev, parsedCms));
          }
        }
        const cachedProjects = localStorage.getItem("ua_projects_data_cache");
        if (cachedProjects) {
          const parsedProj = JSON.parse(cachedProjects);
          if (Array.isArray(parsedProj) && parsedProj.length > 0) {
            setProjects(parsedProj);
          }
        }
      }
    } catch (e) {
      console.warn("Failed to parse website localStorage cache:", e);
    }

    const safeFetchJson = async (url: string, timeoutMs: number = 6000) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await fetch(url, { cache: "no-store", signal: controller.signal });
        if (!res.ok) return null;
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) return null;
        return await res.json();
      } catch {
        return null;
      } finally {
        clearTimeout(timer);
      }
    };

    // 1. Fetch live CMS pages content from Express API / MongoDB
    safeFetchJson(`${apiBase}/api/cms`).then((res) => {
      if (res && res.success && res.data && Object.keys(res.data).length > 0) {
        setCms((prev: any) => {
          const merged = mergeCmsData(prev, res.data);
          try {
            if (typeof window !== "undefined") {
              localStorage.setItem("ua_cms_data_cache", JSON.stringify(merged));
            }
          } catch (e) {}
          return merged;
        });
      }
    });

    // 2. Fetch live Services catalog from Express API / MongoDB
    safeFetchJson(`${apiBase}/api/services`).then((res) => {
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        setServices(res.data);
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem("ua_services_categories_cache", JSON.stringify(res.data));
          }
        } catch (e) {}
      }
    });

    // 3. Fetch live Projects portfolio from Express API / MongoDB
    safeFetchJson(`${apiBase}/api/projects`).then((res) => {
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        setProjects(res.data);
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem("ua_projects_data_cache", JSON.stringify(res.data));
          }
        } catch (e) {}
      }
    });

    // 4. Fetch live Blog articles from Express API / MongoDB
    safeFetchJson(`${apiBase}/api/blogs`).then((res) => {
      if (res && res.success && Array.isArray(res.data)) {
        setBlogs(res.data);
      }
    });

    setLoading(false);
  }, []);

  return (
    <CmsContext.Provider
      value={{
        cmsData: cms,
        servicesData: services,
        projectsData: projects,
        blogPosts: blogs,
        loading,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCmsData() {
  return useContext(CmsContext);
}
