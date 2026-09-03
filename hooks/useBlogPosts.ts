"use client";

import { useState, useEffect } from "react";
import { getApiBaseUrl } from "../lib/api";
import { blogPosts as fallbackPosts } from "../data/blogData";

export interface BlogPost {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  author: string;
  image: string;
  bgColor: string;
  readTime: string;
  popular?: boolean;
  content: string;
  views?: number;
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Read local storage cache if present
    let localSaved: BlogPost[] = [];
    try {
      const stored = localStorage.getItem("ua_blog_posts_cache");
      if (stored) {
        localSaved = JSON.parse(stored);
      }
    } catch {
      // ignore
    }

    fetch(`${getApiBaseUrl()}/api/blogs`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const apiPosts = (data.success && Array.isArray(data.data)) ? data.data : [];
        
        // Merge API posts and fallbackPosts (deduplicated)
        const combined = [...apiPosts];
        fallbackPosts.forEach((fb) => {
          const exists = combined.some(
            (p) =>
              (p.slug || "").toLowerCase() === (fb.slug || "").toLowerCase() ||
              (p.id || p._id || "").toString() === (fb.id || "").toString()
          );
          if (!exists) {
            combined.push(fb);
          }
        });

        // Deduplicate combined by slug/id
        const uniquePosts: BlogPost[] = [];
        const seen = new Set();
        combined.forEach((p) => {
          const key = (p.slug || p.id || p._id || p.title || "").toLowerCase();
          if (key && !seen.has(key)) {
            seen.add(key);
            uniquePosts.push(p);
          }
        });

        setPosts(uniquePosts);
        try {
          localStorage.setItem("ua_blog_posts_cache", JSON.stringify(uniquePosts));
        } catch {
          // ignore
        }
      })
      .catch(() => {
        setError("Using static catalog fallback");
        // Combine fallback and localSaved if API network fails
        const combined = [...localSaved, ...fallbackPosts];
        const uniquePosts: BlogPost[] = [];
        const seen = new Set();
        combined.forEach((p) => {
          const key = (p.slug || p.id || p._id || p.title || "").toLowerCase();
          if (key && !seen.has(key)) {
            seen.add(key);
            uniquePosts.push(p);
          }
        });
        setPosts(uniquePosts);
      })
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}
