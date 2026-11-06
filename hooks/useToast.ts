'use client';

import { createContext, useContext, useRef, useState } from 'react';

export type ToastKind = 'copy' | 'retro';
export interface ToastState {
  message: string;
  kind: ToastKind | null;
  visible: boolean;
}

export interface ToastApi {
  /** Replaces whatever is showing (toasts never stack). `ms` = auto-hide delay; omit to keep it up. */
  show: (message: string, kind: ToastKind, ms?: number) => void;
  /** Hides the toast if it is of this kind (or any kind when omitted). */
  hide: (kind?: ToastKind) => void;
}

export const ToastContext = createContext<ToastApi | null>(null);

/** State + timers for the single toast slot. Owned by Providers. */
export function useToastController() {
  const [toast, setToast] = useState<ToastState>({ message: '', kind: null, visible: false });
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const api: ToastApi = {
    show(message, kind, ms) {
      clearTimeout(timer.current);
      setToast({ message, kind, visible: true });
      if (ms) timer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), ms);
    },
    hide(kind) {
      setToast((t) => (kind === undefined || t.kind === kind ? { ...t, visible: false } : t));
    },
  };
  return { toast, api };
}

export function useToast() {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast must be used inside <Providers>');
  return api;
}
