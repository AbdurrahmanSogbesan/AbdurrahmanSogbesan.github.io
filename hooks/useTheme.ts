'use client';

import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { THEME_STORAGE_KEY } from '@/lib/theme';

// The theme is the `dark` class on <html>, set before first paint by the bootstrap script.
// After that this module is its only writer; components read it through useSyncExternalStore.
const listeners = new Set<() => void>();
let transitioning = false;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => document.documentElement.classList.contains('dark');
const getServerSnapshot = () => false;

function apply(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark);
  listeners.forEach((listener) => listener());
}

function switchTheme(origin: HTMLElement | null) {
  if (transitioning) return;
  const next = !getSnapshot();
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light');
  } catch {
    // Storage unavailable (private mode, blocked): the switch still applies for this page.
  }

  if (typeof document.startViewTransition !== 'function') {
    apply(next);
    return;
  }

  let reduce = false;
  try {
    reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    reduce = false;
  }

  const r = origin?.getBoundingClientRect();
  const x = r ? r.left + r.width / 2 : innerWidth / 2;
  const y = r ? r.top + r.height / 2 : 0;
  const R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const html = document.documentElement;
  html.setAttribute('data-vt', reduce ? 'fade' : 'circle');

  transitioning = true;
  // flushSync: React has committed (aria-label etc.) before the new snapshot is captured.
  const vt = document.startViewTransition(() => flushSync(() => apply(next)));
  if (!reduce) {
    vt.ready
      .then(() => {
        html.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${R}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      })
      .catch(() => {});
  }
  vt.finished
    .catch(() => {})
    .then(() => {
      transitioning = false;
      html.removeAttribute('data-vt');
    });
}

export function useTheme() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { dark, toggle: switchTheme };
}
