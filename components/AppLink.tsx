import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import { isInternalRoute, opensInNewTab } from '@/lib/links';
import LinkPending from './LinkPending';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** next/link for internal routes (dims while a slow navigation is pending); a plain anchor otherwise. */
export default function AppLink({ href, children, ...rest }: Props) {
  if (isInternalRoute(href))
    return (
      <Link href={href} {...rest}>
        {children}
        <LinkPending />
      </Link>
    );
  const tab = opensInNewTab(href) ? { target: '_blank', rel: 'noopener' } : {};
  return (
    <a href={href} {...tab} {...rest}>
      {children}
    </a>
  );
}
