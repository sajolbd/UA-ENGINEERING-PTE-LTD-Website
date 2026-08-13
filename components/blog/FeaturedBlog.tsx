"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";
import { useBlogPosts } from "../../hooks/useBlogPosts";
import { getBlogImageUrl } from "../../lib/api";

export default function FeaturedBlog() {
  const { posts: blogPosts } = useBlogPosts();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Slide through all blog posts in the array
  const sliderPosts = blogPosts;
  const slideCount = sliderPosts.length;

  if (slideCount === 0) return null;

  // Auto-play interval: switch slide every 3 seconds (3000ms), pause on hover
  useEffect(() => {
    if (isHovered || slideCount <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, slideCount]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  return (
    <section className="py-6 lg:py-8 bg-white">
      <Container>
        {/* Dynamic Featured Blog Slider (Full Width) */}
        <div
          className="relative rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] shadow-md border border-slate-100/50 group w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slider track container */}
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${slideCount * 100}%`,
              transform: `translateX(-${(currentSlide * 100) / slideCount}%)`,
            }}
          >
            {sliderPosts.map((post) => (
              <div key={post.slug} style={{ width: `${100 / slideCount}%` }} className="relative h-full shrink-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative w-full h-full block group/slide"
                >
                  <Image
                    src={getBlogImageUrl(post.image)}
                    alt={post.title}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover transition-transform duration-700 group-hover/slide:scale-[1.02]"
                  />

                  {/* Dark Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

                  {/* Blog Metadata & Title */}
                  <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-8 md:left-8 md:right-8 z-10">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight max-w-3xl font-serif group-hover/slide:text-red-200 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-slate-300 font-semibold tracking-wider font-serif">
                      {post.date}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {slideCount > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/45 hover:bg-primary text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg flex items-center justify-center w-10 h-10 border border-white/10 hover:scale-105 active:scale-95"
                aria-label="Previous Slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/45 hover:bg-primary text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg flex items-center justify-center w-10 h-10 border border-white/10 hover:scale-105 active:scale-95"
                aria-label="Next Slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

