"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";
import { BlogPost } from "../../data/blogData";
import { getBlogImageUrl } from "../../lib/api";

interface BlogSidebarProps {
  mode: "popular" | "detail";
  posts: BlogPost[];
  currentPostUrl?: string;
  currentPostTitle?: string;
}

const companySocials = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/UA.Engineering.PTE.LTD",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/ua_engineering_pte_ltd",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/company/ua-engineering-pte-ltd/",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    href: "https://www.youtube.com/@ua_engineering_pte_ltd",
  },
  {
    name: "X (Twitter)",
    icon: FaXTwitter,
    href: "https://x.com/UAEngineering1",
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    href: "https://www.tiktok.com/@ua.engineering3",
  },
];

export default function BlogSidebar({
  mode,
  posts,
  currentPostUrl = "",
  currentPostTitle = "",
}: BlogSidebarProps) {
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(currentPostUrl || window.location.href);
    }
  }, [currentPostUrl]);

  // Filter posts
  const listTitle = mode === "popular" ? "Popular Blogs" : "Recent Articles";

  // Show popular posts (by popular flag and sorted by views, max 10)
  // Show recent posts (by date, max 10)
  const sortedPosts = [...posts]
    .filter((p) => {
      if (mode === "popular") return p.popular;
      return true; // for recent we just show all sorted by date or natural order
    })
    .slice(0, 10);

  const shareHover = "hover:text-primary hover:border-primary hover:bg-primary/5";

  const shareButtons = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "X (Twitter)",
      icon: FaXTwitter,
      link: `https://x.com/intent/post?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(currentPostTitle)}`,
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(currentPostTitle + ' ' + fullUrl)}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Social Share Card (only on Detail Page) — pinned at top */}
      {mode === "detail" && (
        <div className="bg-white border border-secondary/40 p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-center space-y-4">
          <div>
            <h4 className="text-xs font-black tracking-wider uppercase text-slate-800 mb-1">
              Share this Article
            </h4>
            <p className="text-[11px] text-slate-400 font-bold">
              Share this post with your network
            </p>
            <div className="flex flex-wrap justify-center gap-2.5 mt-3">
              {shareButtons.map((btn) => {
                const Icon = btn.icon;
                return (
                  <a
                    key={btn.name}
                    href={btn.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share on ${btn.name}`}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-200 ${shareHover}`}
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-black tracking-wider uppercase text-slate-800 mb-1">
              Follow Us
            </h4>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {companySocials.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow on ${item.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
                  >
                    <Icon size={13} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Blog list card */}
      <div className="bg-slate-50/60 border border-slate-100 p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
        <h4 className="text-xs font-black tracking-wider uppercase text-slate-800 mb-5 pb-2 border-b border-slate-200/50">
          {listTitle}
        </h4>

        <div className="space-y-4 pr-1">
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex gap-3.5 items-center"
            >
              {/* Thumbnail */}
              <div className={`h-12 w-12 rounded-lg shrink-0 overflow-hidden relative ${post.bgColor || 'bg-slate-100'} flex items-center justify-center p-1 border border-slate-100/80 bg-white`}>
                <div className="relative w-full h-full rounded-md overflow-hidden bg-white">
                  <Image
                    src={getBlogImageUrl(post.image)}
                    alt={post.title}
                    fill
                    sizes="48px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-slate-700 leading-snug group-hover:text-secondary transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h5>
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
