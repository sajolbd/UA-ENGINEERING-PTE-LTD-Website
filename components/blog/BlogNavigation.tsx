"use client";

import React from "react";

interface BlogNavigationProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function BlogNavigation({
  categories,
  activeCategory,
  onSelectCategory,
}: BlogNavigationProps) {
  return (
    <div className="w-full border-b border-slate-100 bg-white sticky top-[64px] z-30 shadow-sm">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-4 thin-scrollbar whitespace-nowrap">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-secondary"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
