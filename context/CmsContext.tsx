"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getApiBaseUrl } from "../lib/api";
import initialCmsData from "../data/cmsData.json";
import { servicesData as initialServicesData, ServiceCategory } from "../data/servicesData";
import { projectsData as initialProjectsData, ProjectItem } from "../data/projectsData";
import { blogPosts as initialBlogPosts, BlogPost } from "../data/blogData";

const CMS_CACHE_KEY = "ua_cms_data_cache_v2";
const SERVICES_CACHE_KEY = "ua_services_categories_cache_v2";
const PROJECTS_CACHE_KEY = "ua_projects_data_cache_v2";

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

function isNonEmptyString(val: any): boolean {
  return typeof val === "string" && val.trim().length > 0;
}

function mergeCmsData(base: any, override: any): any {
  if (!override || typeof override !== "object") return base;
  if (!base || typeof base !== "object") return override;

  const result: any = Array.isArray(base) ? [...base] : { ...base };

  Object.keys(base).forEach((key) => {
    const baseVal = base[key];
    const overrideVal = override[key];

    if (overrideVal === undefined) {
      result[key] = baseVal;
    } else if (
      typeof baseVal === "object" &&
      baseVal !== null &&
      !Array.isArray(baseVal) &&
      typeof overrideVal === "object" &&
      overrideVal !== null &&
      !Array.isArray(overrideVal)
    ) {
      result[key] = mergeCmsData(baseVal, overrideVal);
    } else {
      result[key] = overrideVal;
    }
  });

  Object.keys(override).forEach((key) => {
    if (result[key] === undefined) {
      result[key] = override[key];
    }
  });

  return result;
}

import { sanitizeServices } from "../lib/servicesUtils";

export { sanitizeServices };

export function CmsProvider({ children, initialData }: CmsProviderProps) {
  const [cms, setCms] = useState(() =>
    initialData?.cmsData ? mergeCmsData(initialCmsData, initialData.cmsData) : mergeCmsData(initialCmsData, {})
  );
  const [services, setServices] = useState<ServiceCategory[]>(() =>
    sanitizeServices(initialServicesData, initialData?.servicesData)
  );
  const [projects, setProjects] = useState<ProjectItem[]>(() => initialData?.projectsData || initialProjectsData);
  const [blogs, setBlogs] = useState<BlogPost[]>(() => initialData?.blogPosts || initialBlogPosts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiBase = getApiBaseUrl();

    // Clean legacy broken caches
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("ua_cms_data_cache");
        localStorage.removeItem("ua_services_categories_cache");
        localStorage.removeItem("ua_projects_data_cache");
      }
    } catch (e) {
      console.warn("Failed to clean website localStorage cache:", e);
    }

    const safeFetchJson = async (url: string, timeoutMs: number = 10000) => {
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

    // Parallel fetch for live data update
    Promise.all([
      safeFetchJson(`${apiBase}/api/cms`),
      safeFetchJson(`${apiBase}/api/services`),
      safeFetchJson(`${apiBase}/api/projects`),
      safeFetchJson(`${apiBase}/api/blogs`),
    ]).then(([cmsRes, servicesRes, projectsRes, blogsRes]) => {
      if (cmsRes && cmsRes.success && cmsRes.data && Object.keys(cmsRes.data).length > 0) {
        const merged = mergeCmsData(initialCmsData, cmsRes.data);
        setCms(merged);
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem(CMS_CACHE_KEY, JSON.stringify(merged));
          }
        } catch (e) {}
      }

      if (servicesRes && servicesRes.success && Array.isArray(servicesRes.data) && servicesRes.data.length > 0) {
        const validServices = sanitizeServices(initialServicesData, servicesRes.data);
        setServices(validServices);
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem(SERVICES_CACHE_KEY, JSON.stringify(validServices));
          }
        } catch (e) {}
      }

      if (projectsRes && projectsRes.success && Array.isArray(projectsRes.data) && projectsRes.data.length > 0) {
        setProjects(projectsRes.data);
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify(projectsRes.data));
          }
        } catch (e) {}
      }

      if (blogsRes && blogsRes.success && Array.isArray(blogsRes.data)) {
        setBlogs(blogsRes.data);
      }
    }).finally(() => {
      setLoading(false);
    });
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
