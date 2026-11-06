'use client';

import { site } from '@/content';
import type { ToastState } from '@/hooks/useToast';

/** One fixed slot at the bottom centre. The element always exists so enter/exit are CSS transitions. */
export default function Toaster({ toast, onClose }: { toast: ToastState; onClose: () => void }) {
  const closable = toast.kind === 'retro';
  const cls = ['toast', toast.visible && 'show', closable && 'closable'].filter(Boolean).join(' ');
  return (
    <div className="toaster" role="status" aria-live="polite">
      <div className={cls}>
        <span>{toast.message}</span>
        {closable && (
          <button type="button" className="tclose" aria-label={site.ui.retroClose} onClick={onClose}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
