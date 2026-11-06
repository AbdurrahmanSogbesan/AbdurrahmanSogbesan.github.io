'use client';

import { site } from '@/content';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      className="iconbtn themebtn"
      type="button"
      onClick={(e) => toggle(e.currentTarget)}
      aria-label={dark ? site.ui.themeToLight : site.ui.themeToDark}
      style={{ marginLeft: '8px' }}
    >
      <svg className="themeglyph" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 4.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
