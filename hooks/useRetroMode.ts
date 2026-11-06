'use client';

import { createContext, useContext, useEffect, useEffectEvent, useRef, useState } from 'react';
import { site } from '@/content';
import { isTypingTarget } from '@/lib/dom';
import type { ToastApi } from './useToast';

const RETRO_MS = 10_000;
const FONT_ID = 'retro-font';
const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';

/** Press Start 2P is only fetched the first time retro mode triggers. */
function loadRetroFont() {
  if (document.getElementById(FONT_ID)) return;
  const link = document.createElement('link');
  link.id = FONT_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

export interface RetroApi {
  active: boolean;
  start: () => void;
  end: () => void;
}

/** Null outside Providers (the 404), where the easter eggs are off. */
export const RetroContext = createContext<RetroApi | null>(null);
export const useRetro = () => useContext(RetroContext);

/**
 * Retro mode: `retro` on <html> (Press Start 2P), scanlines and a closable toast for 10s,
 * or until Escape / the toast's close button. Triggering again restarts the timer.
 */
export function useRetroController(toast: ToastApi): RetroApi {
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const end = () => {
    clearTimeout(timer.current);
    document.documentElement.classList.remove('retro');
    setActive(false);
    toast.hide('retro');
  };

  const start = () => {
    clearTimeout(timer.current);
    loadRetroFont();
    document.documentElement.classList.add('retro');
    setActive(true);
    toast.show(site.ui.retroToast, 'retro');
    timer.current = setTimeout(end, RETRO_MS);
  };

  const onEscape = useEffectEvent(end);
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isTypingTarget(e.target)) onEscape();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  // Leaving Home/About for the 404 unmounts Providers: don't strand the class or the timer.
  useEffect(() => {
    const t = timer;
    return () => {
      clearTimeout(t.current);
      document.documentElement.classList.remove('retro');
    };
  }, []);

  return { active, start, end };
}

/** Seven touch taps within 3 seconds. Mouse/pen presses are ignored; the tap still navigates. */
export function useSevenTaps(onUnlock: (() => void) | undefined) {
  const taps = useRef<number[]>([]);
  return (e: React.PointerEvent) => {
    if (!onUnlock || e.pointerType !== 'touch') return;
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 3000), now];
    if (taps.current.length >= 7) {
      taps.current = [];
      onUnlock();
    }
  };
}
