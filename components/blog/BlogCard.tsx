"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "../../data/blogData";
import { getBlogImageUrl } from "../../lib/api";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const postLink = post.slug || post.id || post._id || post.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <Link
      href={`/blog/${postLink}`}
      className="group flex flex-row rounded-2xl border border-slate-100 bg-white p-3 sm:p-4 lg:p-3 xl:p-4 gap-3 sm:gap-4 lg:gap-3 xl:gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] transition-all duration-300 min-h-[120px] sm:min-h-[140px]"
    >
      {/* Left Side: Thumbnail with Pastel Background */}
      <div className={`w-24 sm:w-28 md:w-32 lg:w-24 xl:w-28 2xl:w-32 shrink-0 aspect-[4/3] ${post.bgColor || 'bg-slate-100'} flex items-center justify-center p-1.5 rounded-xl transition-all duration-300 group-hover:opacity-95`}>
        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-sm bg-white border border-white/60">
          <Image
            src={getBlogImageUrl(post.image)}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 96px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Right Side: Text details */}
      <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
        {/* Title */}
        <h3 className="text-xs sm:text-sm font-bold tracking-tight text-slate-800 leading-snug transition-colors duration-200 group-hover:text-primary">
          {post.title}
        </h3>

        {/* Bottom Metadata Row */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-slate-50">
          {/* Category Label */}
          <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-slate-400 uppercase truncate max-w-[100px] sm:max-w-none">
            {post.category}
          </span>
          
          {/* Date */}
          <span className="text-[9px] sm:text-xs text-slate-400 font-semibold shrink-0">
            {post.date}
          </span>
        </div>
      </div>
    </Link>
  );
}
