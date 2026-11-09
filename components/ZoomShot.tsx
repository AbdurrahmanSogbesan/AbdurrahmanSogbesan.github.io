'use client';

import { useRef } from 'react';
import { site } from '@/content';
import { CloseIcon } from './icons';

/**
 * A project-page screenshot that opens full size in a native modal <dialog>: focus moves in and back,
 * Esc closes, the page behind is inert. Clicking anywhere in the view closes it too.
 */
export default function ZoomShot({ src, alt, loading }: { src: string; alt: string; loading: 'eager' | 'lazy' }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        className="pd-zoom"
        aria-label={`${site.ui.a11y.viewFullSize}: ${alt}`}
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, images.unoptimized */}
        <img src={src} alt="" loading={loading} decoding="async" />
      </button>
      <dialog ref={dialog} className="lightbox" aria-label={alt} onClick={close}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, images.unoptimized */}
        <img src={src} alt={alt} loading="lazy" decoding="async" />
        <button
          type="button"
          className="iconbtn lightbox-close"
          aria-label={site.ui.a11y.closeFullSize}
          onClick={close}
        >
          <CloseIcon size={18} strokeWidth={1.8} />
        </button>
      </dialog>
    </>
  );
}
