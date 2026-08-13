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
    fetch(`${getApiBaseUrl()}/api/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPosts(data.data);
        } else {
          setError("Using static catalog fallback");
          setPosts(fallbackPosts);
        }
      })
      .catch(() => {
        setError("Network error — using static catalog fallback");
        setPosts(fallbackPosts);
      })
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}
