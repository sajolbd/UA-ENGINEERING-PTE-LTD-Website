"use client";

import React, { useState } from "react";
import Container from "components/shared/Container";
import BlogCard from "components/blog/BlogCard";
import BigBlogCard from "components/blog/BigBlogCard";
import BlogSidebar from "components/blog/BlogSidebar";
import { useBlogPosts } from "hooks/useBlogPosts";

const DEFAULT_CATEGORIES = [
  "Renovation & Upgrading",
  "Structural & Construction",
  "Structural & Exterior Works",
  "Painting & Waterproofing",
  "Aluminium & Glazing Works",
  "Electrical, Plumbing & Aircon",
  "Solar Panel Installation",
  "Industrial Engineering",
  "Commercial Fit-out",
];

export default function BlogGrid() {
  const { posts: blogPosts, loading } = useBlogPosts();
  const [activeCategory, setActiveCategory] = useState("All");

  const normalize = (str: string) => (str ? str.trim().toLowerCase() : "");

  // Dynamically extract all unique categories from active blog posts
  const postCategories = Array.from(
    new Set(blogPosts.map((p) => p.category?.trim()).filter(Boolean))
  ) as string[];

  // Combine default categories with any dynamic post categories
  const categoriesToDisplay = Array.from(
    new Set([...DEFAULT_CATEGORIES, ...postCategories])
  );

  const categories = ["All", ...categoriesToDisplay];

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => {
          if (!post.category) return false;
          const pCat = normalize(post.category);
          const aCat = normalize(activeCategory);
          const aSlug = activeCategory.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          return pCat === aCat || post.categorySlug === aSlug;
        });

  if (loading) {
    return (
      <section className="py-10">
        <Container>
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-10">
      <Container>
        {/* Category Tabs Filter Bar */}
        <div className="mb-10 pb-4 border-b border-slate-200/60 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-secondary text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-secondary"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Blog Cards Feed */}
          <div className="flex-1 min-w-0 w-full">
            {filteredPosts.length > 0 ? (
              <div className="space-y-8">
                {/* Featured Top Post */}
                <div className="w-full">
                  <BigBlogCard post={filteredPosts[0]} />
                </div>

                {/* Grid of Remaining Posts */}
                {filteredPosts.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.slice(1).map((post) => (
                      <BlogCard key={post.slug || post.id || post._id} post={post} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                <p className="text-slate-500 font-bold text-sm">
                  No blog articles found in "{activeCategory}".
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar: Popular Articles (Desktop only) */}
          <div className="lg:w-[300px] w-full shrink-0 sticky top-24 self-start">
            <BlogSidebar mode="popular" posts={blogPosts} />
          </div>
        </div>
      </Container>
    </section>
  );
}
