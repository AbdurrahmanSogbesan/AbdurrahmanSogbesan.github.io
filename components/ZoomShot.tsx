'use client';

import { useRef } from 'react';
import { site } from '@/content';
import { CloseIcon } from './icons';

/**
 * A project-page screenshot that opens full size in a native modal <dialog>: focus moves in and back,
 * the page behind is inert. Esc, clicking anywhere, or the close button closes it.
 *
 * Closing keeps the dialog open while it fades out (`data-closing`), then calls close() once those
 * transitions finish. Closing first would drop it out of the top layer mid-fade, which flashes in
 * browsers without `overlay` transitions (Safari, Firefox).
 */
export default function ZoomShot({ src, alt, loading }: { src: string; alt: string; loading: 'eager' | 'lazy' }) {
  const dialog = useRef<HTMLDialogElement>(null);

  const close = () => {
    const d = dialog.current;
    if (!d?.open || d.dataset.closing !== undefined) return;
    d.dataset.closing = '';
    d.getBoundingClientRect(); // flush styles so the exit transitions exist before we collect them
    const exits = d.getAnimations({ subtree: true }).map((a) => a.finished);
    Promise.allSettled(exits).then(() => {
      d.close();
      delete d.dataset.closing;
    });
  };

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
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={alt}
        onClick={close}
        onKeyDown={(e) => {
          // Esc: stop the browser's instant close (cancelling `cancel` isn't always honoured) and fade out instead.
          if (e.key === 'Escape') {
            e.preventDefault();
            close();
          }
        }}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
      >
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
