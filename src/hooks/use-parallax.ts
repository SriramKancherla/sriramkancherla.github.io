import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

/** Scroll-driven vertical offset for parallax layers. */
export function useParallax(speed = 0.12) {
  const reduced = usePrefersReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduced) {
      setOffset(0);
      return;
    }

    const onScroll = () => setOffset(window.scrollY * speed);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed, reduced]);

  return reduced ? 0 : offset;
}
