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
    const t1 = setTimeout(clearHiddenStyles, 100);
    const t2 = setTimeout(clearHiddenStyles, 300);
    const t3 = setTimeout(clearHiddenStyles, 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [rootRef]);

  return null;
}
