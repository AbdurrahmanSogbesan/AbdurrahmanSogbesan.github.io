'use client';

import { useLinkStatus } from 'next/link';

/**
 * Put inside a next/link. Always rendered and display:none, so it never shifts layout; while that link's
 * navigation is pending (prefetch not finished yet), it flags the link and CSS dims it slightly
 * (`a:has(> .lp[data-pending])`). Prefetched links resolve instantly and never show it.
 */
export default function LinkPending() {
  const { pending } = useLinkStatus();
  return <span className="lp" aria-hidden="true" data-pending={pending || undefined} />;
}
