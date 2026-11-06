import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import { isInternalRoute, opensInNewTab } from '@/lib/links';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** next/link for internal routes; a plain anchor (new tab for external sites and files) otherwise. */
export default function AppLink({ href, ...rest }: Props) {
  if (isInternalRoute(href)) return <Link href={href} {...rest} />;
  const tab = opensInNewTab(href) ? { target: '_blank', rel: 'noopener' } : {};
  return <a href={href} {...tab} {...rest} />;
}
