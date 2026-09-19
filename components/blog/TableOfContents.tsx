"use client";

import React, { useState, useEffect, useRef } from "react";
import { List, ChevronDown, Hash } from "lucide-react";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
  isMobile?: boolean;
}

export default function TableOfContents({
  headings,
  isMobile = false,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isClickingRef = useRef(false);

  // Active scroll-spy implementation
  useEffect(() => {
    if (!headings.length) return;

    const handleScroll = () => {
      if (isClickingRef.current) return;

      const scrollPosition = window.scrollY + 140; // Offset for sticky navbar
      let currentActive = headings[0].id;

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            currentActive = headings[i].id;
          } else {
            break;
          }
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  // Keep active item in view inside scrollable TOC sidebar
  useEffect(() => {
    if (!activeId || isMobile || !containerRef.current) return;
    const activeElem = containerRef.current.querySelector<HTMLElement>(
      `[data-toc-id="${activeId}"]`
    );
    if (activeElem && containerRef.current) {
      const container = containerRef.current;
      const elemTop = activeElem.offsetTop;
      const elemBottom = elemTop + activeElem.offsetHeight;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;

      if (elemTop < containerTop + 20) {
        container.scrollTo({ top: Math.max(0, elemTop - 30), behavior: "smooth" });
      } else if (elemBottom > containerBottom - 20) {
        container.scrollTo({
          top: elemBottom - container.clientHeight + 40,
          behavior: "smooth",
        });
      }
    }
  }, [activeId, isMobile]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    isClickingRef.current = true;
    setActiveId(id);

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110; // Navbar offset
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
    }

    if (isMobile) {
      setIsOpen(false);
    }

    setTimeout(() => {
      isClickingRef.current = false;
    }, 600);
  };

  if (!headings || headings.length === 0) return null;

  // Mobile Collapsible Drawer / Accordion
  if (isMobile) {
    return (
      <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm transition-all duration-200">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-100/70 transition-colors"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-6 h-6 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
              <List className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 truncate">
              Table of Contents
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-600 shrink-0">
              {headings.length}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-500 transition-transform duration-300 shrink-0 ${
              isOpen ? "rotate-180 text-secondary" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="px-4 pb-4 pt-2 border-t border-slate-200/60 max-h-80 overflow-y-auto thin-scrollbar space-y-1">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              const isSub = heading.level >= 3;

              return (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  onClick={(e) => handleLinkClick(e, heading.id)}
                  className={`block py-1.5 transition-colors duration-150 leading-snug rounded-lg ${
                    isSub
                      ? "pl-6 text-[11px] font-medium"
                      : "pl-2.5 text-xs font-bold"
                  } ${
                    isActive
                      ? "text-secondary font-black bg-secondary/10"
                      : "text-slate-600 hover:text-secondary hover:bg-slate-100/80"
                  }`}
                >
                  <span className="line-clamp-2">{heading.text}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Desktop Sticky Sidebar Card
  return (
    <div className="bg-slate-50/70 border border-slate-200/70 p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200/60">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-6 h-6 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
            <List className="w-3.5 h-3.5" />
          </span>
          <h4 className="text-[11px] font-black tracking-wider uppercase text-slate-800 truncate">
            Table of Contents
          </h4>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-600 shrink-0">
          {headings.length}
        </span>
      </div>

      {/* Scrollable list of headings */}
      <div
        ref={containerRef}
        className="max-h-[calc(100vh-170px)] overflow-y-auto thin-scrollbar pr-1 space-y-1"
      >
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const isSub = heading.level >= 3;

          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              data-toc-id={heading.id}
              onClick={(e) => handleLinkClick(e, heading.id)}
              className={`group flex items-start gap-1.5 py-1.5 pr-2 rounded-lg transition-all duration-200 ${
                isSub
                  ? "ml-2.5 pl-2.5 border-l border-slate-200/70 text-[11px] leading-snug"
                  : "pl-2 border-l-2 text-xs leading-snug font-bold"
              } ${
                isActive
                  ? isSub
                    ? "border-secondary text-secondary font-bold bg-secondary/5"
                    : "border-secondary text-secondary font-black bg-secondary/10"
                  : isSub
                  ? "hover:border-slate-400 text-slate-500 hover:text-slate-900"
                  : "border-transparent hover:border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
              title={heading.text}
            >
              <span className="line-clamp-2">{heading.text}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
