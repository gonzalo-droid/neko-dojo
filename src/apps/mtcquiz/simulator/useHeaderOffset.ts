"use client";

import { useEffect, useState } from "react";

/**
 * Height of the page's sticky header (AppChrome), so a second sticky bar sits right under it
 * instead of sliding beneath it. Follows the header when it changes size (font zoom, wrap).
 */
export function useHeaderOffset(fallback = 63): number {
  const [top, setTop] = useState(fallback);
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const ro = new ResizeObserver(() => setTop(header.offsetHeight));
    ro.observe(header);
    return () => ro.disconnect();
  }, []);
  return top;
}
