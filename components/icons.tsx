// Stroke icons copied from the design files. All decorative (aria-hidden); size and stroke width per use site.

interface IconProps {
  size: number;
  strokeWidth: number;
}

function Stroke({ size, strokeWidth, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </Stroke>
);

export const CopyIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </Stroke>
);

/** Link-pill icons, keyed by `site.links[].icon`. */
export const pillIcons = {
  code: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
    </Stroke>
  ),
  briefcase: (p: IconProps) => (
    <Stroke {...p}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </Stroke>
  ),
  mail: (p: IconProps) => (
    <Stroke {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </Stroke>
  ),
  file: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </Stroke>
  ),
};
