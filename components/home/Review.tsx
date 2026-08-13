"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Container from "components/shared/Container";

// Google colored G logo SVG
const GoogleIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

import { useCmsData } from "../../context/CmsContext";
import { getImageUrl } from "../../lib/api";

const initialGoogleReviews = [
  {
    name: "Majidul Islam Majidul",
    time: "1 year ago",
    stars: 5,
    avatar: "/images/home/reviews/google-majidul.png",
    text: "UA Engineering workmanship and investigation of existing building leaking very good. They have done waterproofing leaking rectification work for The American Club Singapore so far no leaking last few weeks I monitoring. Thanks, UA Engineering team members and workers.",
  },
  {
    name: "Cyril Wood",
    time: "1 year ago",
    stars: 5,
    avatar: "/images/home/reviews/google-cyril.png",
    text: "The team at UA Engineering were very efficient. They worked well to do the job in an awkward place. Even repainted an area affected by water damage at no extra cost. I would recommend this service.",
  },
  {
    name: "James Lim",
    time: "2 years ago",
    stars: 5,
    avatar: "/images/home/reviews/google-james.png",
    text: "Very good! Solved my problem which others cannot solve. Thank you! Highly recommended.",
  },
  {
    name: "Eugene T",
    time: "2 years ago",
    stars: 5,
    avatar: "/images/home/reviews/google-eugene.png",
    text: "Engaged UA Engineering for my roof and RC waterproofing. The workers handled the works relatively well and were receptive to our inputs. They are responsive and returned on a few times when we noticed areas that the paint was not even. Overall, happy to recommend to ask for a quote if you are looking for good works at competitive rates.",
  },
  {
    name: "Atik Tamim",
    time: "2 years ago",
    stars: 5,
    avatar: "/images/home/reviews/google-atik.png",
    text: "You saved my structure. Thanks for your quality work.",
  },
  {
    name: "Yong Huat Ng",
    time: "2 years ago",
    stars: 5,
    avatar: "/images/home/reviews/google-yonghuat.png",
    text: "Willingness to listen, give no excuses, and very committed to doing a complete job is the key characteristics and strength of this vendor. As waterproofing can be a progressive trial process. This vendor response fast to feedback and comeback quickly to complete the coverage of the fixes. I am particularly impressed with the positive attitude of the lead worker. He is friendly, attentive, welcome feedback and committed to delivering a quality work (which he did). A vendor that I am very happy with and will recommend to anyone that need to have the waterproofing services.",
  },
  {
    name: "Joo Goh",
    time: "3 years ago",
    stars: 5,
    avatar: "/images/home/reviews/google-joogoh.png",
    text: "Am very pleased with the work done by UA Engineering Pte Ltd few months back and no further leakage or mould were detected to date. The previous contractor (Flux Solutions Pte Ltd) was very unresponsive and rude to after sales service and I decided to terminate them in favour for UA Engineering. I hope UA Engineering will continue with its responsive after sales service that I've experienced and recommend this company after the bad experience I had with Flux Solutions.",
  },
];


export default function Review() {
  const { cmsData } = useCmsData();
  const homeContent = (cmsData as any)?.home?.content || {};

  const reviewBadge = homeContent.reviewBadge || "REVIEWS & FEEDBACK";
  const reviewHeading = homeContent.reviewHeading || "5-Star Happy Customer Reviews";

  const googleReviews = Array.isArray(homeContent.googleReviews) && homeContent.googleReviews.length > 0
    ? homeContent.googleReviews.map((item: any, idx: number) => ({
        id: item.id || idx + 1,
        name: item.name || "Happy Client",
        time: item.time || "Recently",
        stars: Number(item.stars) || 5,
        avatar: getImageUrl(item.avatar || "/images/home/reviews/google-majidul.png"),
        text: item.text || "Great engineering service!",
      }))
    : initialGoogleReviews.map((item, idx) => ({ ...item, avatar: getImageUrl(item.avatar) }));

  const [activeDot, setActiveDot] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 300;
      const scrollAmount = direction === "left" ? -cardWidth - 24 : cardWidth + 24;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft } = sliderRef.current;
      const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 300;
      const index = Math.round(scrollLeft / (cardWidth + 24));
      setActiveDot(index);
    }
  };

  // Auto-scroll loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const maxScroll = scrollWidth - clientWidth;

        // If reached end, scroll back to start, else scroll right
        if (scrollLeft >= maxScroll - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("right");
        }
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reviews" className="bg-slate-50 py-8 lg:py-12">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            {reviewBadge}
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl text-secondary">
            {reviewHeading}
          </h2>
          {/* Elementor dual color double underline */}
          <div className="flex flex-col items-center mt-4">
            <div className="h-[2px] w-28 bg-primary rounded-full" />

          </div>
        </div>

        {/* Google Reviews Carousel */}
        <div className="relative group/carousel max-w-[1400px] mx-auto px-4 md:px-12">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white text-secondary shadow-md border border-slate-100 hover:bg-primary hover:text-white transition-all duration-300 transform -translate-x-2 group-hover/carousel:translate-x-0"
            aria-label="Previous reviews"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white text-secondary shadow-md border border-slate-100 hover:bg-primary hover:text-white transition-all duration-300 transform translate-x-2 group-hover/carousel:translate-x-0"
            aria-label="Next reviews"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider Container */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-6"
          >
            {googleReviews.map((review: any, i: number) => (
              <div
                key={i}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top info row */}
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar Image */}
                      <img
                        src={review.avatar}
                        alt={`${review.name} profile`}
                        className="h-10 w-10 shrink-0 rounded-full object-cover border border-slate-100 bg-slate-50"
                      />
                      <div>
                        <h4 className="text-sm font-extrabold text-secondary leading-tight line-clamp-1">
                          {review.name}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {review.time}
                        </span>
                      </div>
                    </div>
                    {/* Google Icon */}
                    <div className="bg-slate-50 p-2 rounded-full border border-slate-100">
                      <GoogleIcon />
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="mb-4 flex gap-0.5">
                    {[...Array(review.stars)].map((_, idx) => (
                      <Star key={idx} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-6 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-4 pb-12 border-b border-slate-200">
            {googleReviews.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => {
                  if (sliderRef.current) {
                    const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 300;
                    sliderRef.current.scrollTo({ left: i * (cardWidth + 24), behavior: "smooth" });
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${activeDot === i ? "w-6 bg-primary" : "w-2 bg-slate-300"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
