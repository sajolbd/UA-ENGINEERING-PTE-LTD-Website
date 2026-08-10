"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { API_BASE } from "../lib/api";
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

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [cms, setCms] = useState(initialCmsData);
  const [services, setServices] = useState<ServiceCategory[]>(initialServicesData);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjectsData);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch live CMS pages content from Express API / MongoDB
    fetch(`${API_BASE}/api/cms`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data && Object.keys(res.data).length > 0) {
          setCms((prev) => ({ ...prev, ...res.data }));
        }
      })
      .catch((err) => console.error("CMS API fetch notice:", err));

    // 2. Fetch live Services catalog from Express API / MongoDB
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data);
        }
      })
      .catch((err) => console.error("Services API fetch notice:", err));

    // 3. Fetch live Projects portfolio from Express API / MongoDB
    fetch(`${API_BASE}/api/projects`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setProjects(res.data);
        }
      })
      .catch((err) => console.error("Projects API fetch notice:", err));

    // 4. Fetch live Blog articles from Express API / MongoDB
    fetch(`${API_BASE}/api/blogs`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setBlogs(res.data);
        }
      })
      .catch((err) => console.error("Blogs API fetch notice:", err));

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
