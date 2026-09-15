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

    if (overrideVal === undefined || overrideVal === null) {
      result[key] = baseVal;
    } else if (typeof baseVal === "string") {
      result[key] = isNonEmptyString(overrideVal) ? overrideVal.trim() : baseVal;
    } else if (Array.isArray(baseVal)) {
      result[key] = Array.isArray(overrideVal) && overrideVal.length > 0 ? overrideVal : baseVal;
    } else if (typeof baseVal === "object" && baseVal !== null) {
      result[key] = mergeCmsData(baseVal, overrideVal);
    } else {
      result[key] = overrideVal;
    }
  });

  Object.keys(override).forEach((key) => {
    if (result[key] === undefined) {
      const val = override[key];
      if (typeof val === "string") {
        if (isNonEmptyString(val)) result[key] = val.trim();
      } else {
        result[key] = val;
      }
    }
  });

  return result;
}

function sanitizeServices(initialList: ServiceCategory[], overrideList: any): ServiceCategory[] {
  if (!Array.isArray(overrideList) || overrideList.length === 0) return initialList;

  return initialList.map((initialItem) => {
    const match = overrideList.find((p: any) => p && p.slug === initialItem.slug);
    if (!match) return initialItem;

    return {
      ...initialItem,
      ...match,
      title: isNonEmptyString(match.title) ? match.title.trim() : initialItem.title,
      shortDescription: isNonEmptyString(match.shortDescription) ? match.shortDescription.trim() : initialItem.shortDescription,
      description: isNonEmptyString(match.description) ? match.description.trim() : initialItem.description,
      longDescription: isNonEmptyString(match.longDescription) ? match.longDescription.trim() : initialItem.longDescription,
      icon: isNonEmptyString(match.icon) ? match.icon : initialItem.icon,
      image: isNonEmptyString(match.image) ? match.image : initialItem.image,
      services: Array.isArray(match.services) && match.services.length > 0 ? match.services : initialItem.services,
    };
  });
}

export function CmsProvider({ children, initialData }: CmsProviderProps) {
  const [cms, setCms] = useState(
    initialData?.cmsData ? mergeCmsData(initialCmsData, initialData.cmsData) : mergeCmsData(initialCmsData, {})
  );
  const [services, setServices] = useState<ServiceCategory[]>(
    sanitizeServices(initialServicesData, initialData?.servicesData)
  );
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
            setServices(sanitizeServices(initialServicesData, parsed));
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

    const safeFetchJson = async (url: string, timeoutMs: number = 1500) => {
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

    // Parallel fetch for ultra-fast loading without blocking page render
    Promise.all([
      safeFetchJson(`${apiBase}/api/cms`),
      safeFetchJson(`${apiBase}/api/services`),
      safeFetchJson(`${apiBase}/api/projects`),
      safeFetchJson(`${apiBase}/api/blogs`),
    ]).then(([cmsRes, servicesRes, projectsRes, blogsRes]) => {
      if (cmsRes && cmsRes.success && cmsRes.data && Object.keys(cmsRes.data).length > 0) {
        setCms((prev: any) => {
          const merged = mergeCmsData(prev, cmsRes.data);
          try {
            if (typeof window !== "undefined") {
              localStorage.setItem("ua_cms_data_cache", JSON.stringify(merged));
            }
          } catch (e) {}
          return merged;
        });
      }

      if (servicesRes && servicesRes.success && Array.isArray(servicesRes.data) && servicesRes.data.length > 0) {
        const validServices = sanitizeServices(initialServicesData, servicesRes.data);
        setServices(validServices);
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem("ua_services_categories_cache", JSON.stringify(validServices));
          }
        } catch (e) {}
      }

      if (projectsRes && projectsRes.success && Array.isArray(projectsRes.data) && projectsRes.data.length > 0) {
        setProjects(projectsRes.data);
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem("ua_projects_data_cache", JSON.stringify(projectsRes.data));
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
