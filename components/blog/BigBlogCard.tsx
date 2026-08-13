"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "../../data/blogData";
import { getBlogImageUrl } from "../../lib/api";

interface BigBlogCardProps {
  post: BlogPost;
}

export default function BigBlogCard({ post }: BigBlogCardProps) {
  const postLink = post.slug || post.id || post._id || post.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Generate a clean text excerpt from content
  const excerpt = post.content
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .trim();

  return (
    <Link
      href={`/blog/${postLink}`}
      className="group flex flex-col bg-white rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow duration-300 overflow-hidden h-full"
    >
      {/* Top: Large Feature Image */}
      <div className="relative aspect-[16/11] w-full bg-slate-50 border-b border-slate-50 overflow-hidden shrink-0">
        <Image
          src={getBlogImageUrl(post.image)}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-102"
        />
      </div>

      {/* Bottom: Text Content */}
      <div className="p-5 flex-1 flex flex-col min-w-0">
        {/* Category Tag */}
        <span className="text-[9px] font-black tracking-widest text-secondary uppercase mb-2">
          {post.category}
        </span>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug tracking-tight transition-colors duration-200 group-hover:text-primary line-clamp-2 mb-2">
          {post.title}
        </h3>

        {/* Excerpt Description */}
        <p className="text-xs text-slate-400 font-bold leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* Read More Link */}
        <span className="text-secondary hover:text-primary text-[10px] font-black tracking-wider uppercase inline-flex items-center gap-1 mt-auto">
          Read More <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}
