"use client";

import { RefObject, useEffect } from "react";

type SiteAnimationsProps = {
  rootRef: RefObject<HTMLElement>;
};

export default function SiteAnimations({ rootRef }: SiteAnimationsProps) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Guarantee that no JS animation or style ever leaves any element hidden
    const clearHiddenStyles = () => {
      const hiddenEls = root.querySelectorAll<HTMLElement>(
        "[style*='opacity'], [style*='visibility']"
      );
      hiddenEls.forEach((el) => {
        if (el.style.opacity === "0" || el.style.visibility === "hidden") {
          el.style.opacity = "1";
          el.style.visibility = "visible";
        }
      });
    };

    clearHiddenStyles();
    const timer = setTimeout(clearHiddenStyles, 100);
    return () => clearTimeout(timer);
  }, [rootRef]);

  return null;
}
