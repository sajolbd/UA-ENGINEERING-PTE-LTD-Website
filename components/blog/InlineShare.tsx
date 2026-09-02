"use client";

import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
  FaTiktok,
} from "react-icons/fa6";

interface InlineShareProps {
  postTitle: string;
  postUrl?: string;
}

const companySocials = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/UA.Engineering.PTE.LTD",
    color: "hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/ua_engineering_pte_ltd",
    color: "hover:text-[#E4405F] hover:border-[#E4405F] hover:bg-[#E4405F]/10",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/company/ua-engineering-pte-ltd/",
    color: "hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    href: "https://www.youtube.com/@ua_engineering_pte_ltd",
    color: "hover:text-[#FF0000] hover:border-[#FF0000] hover:bg-[#FF0000]/10",
  },
  {
    name: "X (Twitter)",
    icon: FaXTwitter,
    href: "https://x.com/UAEngineering1",
    color: "hover:text-black hover:border-black hover:bg-black/10",
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    href: "https://www.tiktok.com/@ua.engineering3",
    color: "hover:text-black hover:border-black hover:bg-black/10",
  },
];

export default function InlineShare({ postTitle, postUrl }: InlineShareProps) {
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(postUrl || window.location.href);
    }
  }, [postUrl]);

  const shareButtons = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      hoverStyles: "hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/5",
    },
    {
      name: "X (Twitter)",
      icon: FaXTwitter,
      link: `https://x.com/intent/post?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(postTitle)}`,
      hoverStyles: "hover:text-black hover:border-black hover:bg-black/5",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
      hoverStyles: "hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/5",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + ' ' + fullUrl)}`,
      hoverStyles: "hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/5",
    },
  ];

  return (
    <div className="mt-8 pt-6 border-t border-slate-100 space-y-5">
      {/* Share Post Row */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-xs font-black tracking-wider uppercase text-slate-400">Share Post:</span>
        <div className="flex flex-wrap items-center gap-2">
          {shareButtons.map((btn) => {
            const Icon = btn.icon;
            return (
              <a
                key={btn.name}
                href={btn.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${btn.name}`}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:scale-105 ${btn.hoverStyles}`}
              >
                <Icon size={14} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Follow Us Row */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-xs font-black tracking-wider uppercase text-slate-400">Follow Us:</span>
        <div className="flex flex-wrap items-center gap-2">
          {companySocials.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow UA Engineering on ${item.name}`}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:scale-105 ${item.color}`}
              >
                <Icon size={14} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
