"use client";

import Lenis from 'lenis';
import { useEffect } from 'react';
import { usePrefersReducedMotion } from './hooks';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function LenisProvider() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('no-smooth');
      return;
    }

    document.documentElement.classList.remove('no-smooth');
    const lenis = new Lenis({
      lerp: 0.12,
      duration: 1.1,
      smoothWheel: true,
      syncTouch: true,
    });
    window.__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [reducedMotion]);

  return null;
}

export function scrollToTarget(target: string) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const element = document.querySelector<HTMLElement>(target);
  if (!element) return;

  if (window.__lenis && !reducedMotion) {
    window.__lenis.scrollTo(element, { offset: 0 });
    return;
  }

  element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}