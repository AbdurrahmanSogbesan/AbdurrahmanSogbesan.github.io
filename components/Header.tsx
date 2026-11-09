'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type KeyboardEvent } from 'react';
import { site } from '@/content';
import { useRetro, useSevenTaps } from '@/hooks/useRetroMode';
import { navState } from '@/lib/links';
import AppLink from './AppLink';
import { MenuButton, MenuPanel } from './MobileMenu';
import Monogram from './Monogram';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  // No retro context on the 404, so the taps do nothing there.
  const onMarkPointerDown = useSevenTaps(useRetro()?.start);
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
      }}
    >
      <Link className="brand" href="/" aria-label={site.ui.a11y.homeLink} onPointerDown={onMarkPointerDown}>
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
            const { on, ariaCurrent } = navState(pathname, item.href);
            return (
              <AppLink key={item.href} className={on ? 'nav on' : 'nav'} href={item.href} aria-current={ariaCurrent}>
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
