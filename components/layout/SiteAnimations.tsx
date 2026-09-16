"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SiteAnimationsProps = {
  rootRef: RefObject<HTMLElement>;
};

function isReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SiteAnimations({ rootRef }: SiteAnimationsProps) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root || isReducedMotion()) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let refreshTimer: NodeJS.Timeout;
    let safetyTimer: NodeJS.Timeout;

    const context = gsap.context(() => {
      // 1. Animate top-level cards in section grids
      const cards = gsap.utils
        .toArray<HTMLElement>(
          "section .grid > a, section .grid > div, article",
          root
        )
        .filter(
          (card) =>
            !card.closest(".marquee-track") &&
            !card.closest(".hero-slider") &&
            !card.parentElement?.closest(".grid")
        );

      cards.forEach((card, index) => {
        if (!card || !(card instanceof Element) || !document.body.contains(card)) return;
        try {
          gsap.from(card, {
            autoAlpha: 0,
            y: 28,
            duration: 0.75,
            delay: Math.min((index % 3) * 0.07, 0.21),
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              once: true,
            },
          });
        } catch {
          // Ignore animation error gracefully
        }
      });

      // 2. Animate Section Main Titles and Subtitles (ONLY top-level section headers outside cards)
      const sectionHeaders = gsap.utils
        .toArray<HTMLElement>(
          "section > div > h1, section > div > h2, section > div > p",
          root
        )
        .filter(
          (header) =>
            !header.closest(".marquee-track") &&
            !header.closest(".hero-slider") &&
            !header.closest(".typing-title") &&
            !header.closest("article") &&
            !header.closest(".grid")
        );

      sectionHeaders.forEach((header, index) => {
        if (!header || !(header instanceof Element) || !document.body.contains(header)) return;
        try {
          gsap.from(header, {
            autoAlpha: 0,
            y: 18,
            duration: 0.65,
            delay: Math.min((index % 4) * 0.04, 0.12),
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: header,
              start: "top 92%",
              once: true,
            },
          });
        } catch {
          // Ignore animation error gracefully
        }
      });
    }, root);

    // Refresh ScrollTrigger after DOM setup
    requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh();
      } catch {}
    });

    refreshTimer = setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch {}
    }, 250);

    // PERMANENT SAFETY FALLBACK: Force visibility for any element left hidden
    safetyTimer = setTimeout(() => {
      if (root) {
        const hiddenEls = root.querySelectorAll<HTMLElement>(
          "[style*='opacity'], [style*='visibility']"
        );
        hiddenEls.forEach((el) => {
          if (el.style.opacity === "0" || el.style.visibility === "hidden") {
            el.style.opacity = "1";
            el.style.visibility = "visible";
          }
        });
      }
    }, 600);

    return () => {
      clearTimeout(refreshTimer);
      clearTimeout(safetyTimer);
      try {
        context.revert();
      } catch {
        // Ignore cleanup error
      }
    };
  }, [rootRef]);

  return null;
}
