'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type KeyboardEvent } from 'react';
import { site } from '@/content';
import { isCurrentPath } from '@/lib/links';
import AppLink from './AppLink';
import { MenuButton, MenuPanel } from './MobileMenu';
import Monogram from './Monogram';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape' && menuOpen) {
      e.stopPropagation();
      closeMenu();
    }
  };

  return (
    <header
      className={menuOpen ? 'hdr menu-open' : 'hdr'}
      onKeyDown={onKeyDown}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '36px 0 0',
      }}
    >
      <Link className="brand" href="/" aria-label={site.ui.a11y.homeLink}>
        <Monogram />
        <span className="brandtext">
          <span style={{ fontSize: '14.5px', fontWeight: 500, color: 'var(--fg)' }}>{site.name}</span>
          <span className="mono" style={{ color: 'var(--muted)' }}>
            {site.title}
          </span>
        </span>
      </Link>
      <nav aria-label={site.ui.a11y.mainNav} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        <span className="navlinks">
          {site.nav.map((item) => {
            const on = isCurrentPath(pathname, item.href);
            return (
              <AppLink
                key={item.href}
                className={on ? 'nav on' : 'nav'}
                href={item.href}
                aria-current={on ? 'page' : undefined}
              >
                {item.label}
              </AppLink>
            );
          })}
        </span>
        <ThemeToggle />
        <MenuButton open={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
      </nav>
      <MenuPanel pathname={pathname} onClose={closeMenu} />
    </header>
  );
}
