'use client';

import { useEffect, useEffectEvent } from 'react';
import { isTypingTarget } from '@/lib/dom';

const CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/** ↑ ↑ ↓ ↓ ← → ← → B A, listened for on window. */
export function useKonami(onUnlock: () => void) {
  const unlock = useEffectEvent(onUnlock);
  useEffect(() => {
    let keys: string[] = [];
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keys = [...keys, key].slice(-CODE.length);
      if (keys.join() === CODE.join()) {
        keys = [];
        unlock();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
