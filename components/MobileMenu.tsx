'use client';

import { site } from '@/content';
import { isCurrentPath } from '@/lib/links';
import AppLink from './AppLink';

export const MOBILE_MENU_ID = 'mobile-menu';

/** The "Menu"/"Close" button; shown ≤640px. The open state (and `.menu-open`) lives on the header. */
export function MenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button className="menubtn" type="button" onClick={onToggle} aria-expanded={open} aria-controls={MOBILE_MENU_ID}>
      <span className="menutext">{open ? site.ui.menuClose : site.ui.menuOpen}</span>
      <span className="burger" aria-hidden="true">
        <i />
        <i />
      </span>
    </button>
  );
}

/** The panel below the header. Picking a link closes it. */
export function MenuPanel({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  return (
    <nav id={MOBILE_MENU_ID} className="mmenu" aria-label={site.ui.a11y.mobileNav}>
      {site.nav.map((item) => {
        const on = isCurrentPath(pathname, item.href);
        return (
          <AppLink
            key={item.href}
            className={on ? 'mlink on' : 'mlink'}
            href={item.href}
            aria-current={on ? 'page' : undefined}
            onClick={onClose}
          >
            {item.label}
          </AppLink>
        );
      })}
    </nav>
  );
}
