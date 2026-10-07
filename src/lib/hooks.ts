"use client";

import type { RefObject } from 'react';
import { useEffect, useMemo, useState } from 'react';

export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reducedMotion;
}

export function useInView<T extends Element>(options: IntersectionObserverInit = {}) {
  const [inView, setInView] = useState(false);
  const [node, setNode] = useState<T | null>(null);

  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, options]);

  return useMemo(
    () => ({ ref: setNode, inView }),
    [inView],
  );
}

export function useScrollProgress<T extends Element>(ref: RefObject<T | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const update = () => {
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height + viewport;
      const offset = Math.min(Math.max(viewport - rect.top, 0), total);
      setProgress(Math.min(Math.max(offset / total, 0), 1));
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref]);

  return progress;
}