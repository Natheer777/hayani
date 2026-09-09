import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal — lightweight, zero-dependency scroll-triggered reveal hook.
 *
 * Attach the returned `ref` to the element you want to animate on scroll.
 * Initially `isVisible` is `false`. When the element enters the viewport
 * (per IntersectionObserver), `isVisible` becomes `true` (one-shot by default).
 *
 * Combine with CSS rules like `.card{opacity:0;transform:...}`
 * + `.card.revealed{opacity:1;transform:none;transition:...}`.
 */
export function useScrollReveal<T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    once = true,
    delay = 0,
  } = options ?? {};

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const shouldShow = entry.isIntersecting;
          if (!shouldShow) {
            if (!once) {
              if (timeoutId) clearTimeout(timeoutId);
              rafId = requestAnimationFrame(() => setIsVisible(false));
            }
            continue;
          }
          // showing
          const apply = () => {
            if (delay > 0) {
              timeoutId = setTimeout(() => setIsVisible(true), delay);
            } else {
              setIsVisible(true);
            }
          };
          rafId = requestAnimationFrame(apply);
          if (once) observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, delay]);

  return { ref, isVisible } as const;
}
