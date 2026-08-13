"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SiteAnimationsProps = {
  rootRef: RefObject<HTMLElement>;
};

function isReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isFillImage(image: HTMLImageElement) {
  return image.style.position === "absolute";
}

export default function SiteAnimations({ rootRef }: SiteAnimationsProps) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root || isReducedMotion()) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const cards = gsap.utils
        .toArray<HTMLElement>(
          "article, section .grid > div[class*='rounded'], section .grid > a[class*='rounded']",
          root
        )
        .filter(
          (card) =>
            !card.closest(".marquee-track") && !card.closest(".hero-slider")
        );

      cards.forEach((card, index) => {
        if (!card || !(card instanceof Element) || !document.body.contains(card)) return;
        try {
          gsap.from(card, {
            autoAlpha: 0,
            y: 36,
            filter: "blur(10px)",
            duration: 0.9,
            delay: Math.min((index % 4) * 0.07, 0.21),
            ease: "expo.out",
            clearProps: "filter,transform",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          });
        } catch {
          // Ignore animation init error gracefully if element unmounted
        }
      });

      const images = gsap.utils
        .toArray<HTMLImageElement>("section img", root)
        .filter(
          (image) =>
            !isFillImage(image) &&
            !image.closest(".marquee-track") &&
            !image.closest(".hero-slider") &&
            !image.closest("button")
        );

      images.forEach((image) => {
        if (!image || !(image instanceof Element) || !document.body.contains(image)) return;
        const frame = image.parentElement;

        if (frame) {
          frame.classList.add("site-image-reveal");
        }

        try {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: frame ?? image,
                start: "top 88%",
                once: true,
              },
            })
            .fromTo(
              frame ?? image,
              { clipPath: "inset(0 100% 0 0)" },
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.05,
                ease: "power4.out",
                clearProps: "clipPath",
              }
            )
            .from(
              image,
              {
                scale: 1.12,
                duration: 1.2,
                ease: "power4.out",
                clearProps: "transform",
              },
              0
            );
        } catch {
          // Ignore animation init error gracefully
        }
      });

      const contentBlocks = gsap.utils
        .toArray<HTMLElement>(
          "section h1, section h2, section h3, section p, section li, section a.btn-slide-primary",
          root
        )
        .filter(
          (block) =>
            !block.closest(".marquee-track") &&
            !block.closest(".hero-slider") &&
            !block.closest(".typing-title") &&
            !block.closest("article")
        );

      contentBlocks.forEach((block, index) => {
        if (!block || !(block instanceof Element) || !document.body.contains(block)) return;
        try {
          gsap.from(block, {
            autoAlpha: 0,
            y: 18,
            duration: 0.75,
            delay: Math.min((index % 5) * 0.035, 0.14),
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: block,
              start: "top 88%",
              once: true,
            },
          });
        } catch {
          // Ignore animation init error gracefully
        }
      });

      const splitBlocks = gsap.utils.toArray<HTMLElement>(
        "section .grid > div:not([class*='rounded'])",
        root
      );

      splitBlocks.forEach((block, index) => {
        if (
          !block ||
          !(block instanceof Element) ||
          !document.body.contains(block) ||
          block.closest(".marquee-track") ||
          block.closest(".hero-slider") ||
          block.querySelector("section")
        ) {
          return;
        }

        try {
          gsap.from(block, {
            autoAlpha: 0,
            x: index % 2 === 0 ? -22 : 22,
            filter: "blur(8px)",
            duration: 0.9,
            ease: "expo.out",
            clearProps: "filter,transform",
            scrollTrigger: {
              trigger: block,
              start: "top 88%",
              once: true,
            },
          });
        } catch {
          // Ignore animation init error gracefully
        }
      });
    }, root);

    return () => {
      try {
        context.revert();
      } catch {
        // Ignore cleanup error if already unmounted
      }
    };
  }, [rootRef]);

  return null;
}
