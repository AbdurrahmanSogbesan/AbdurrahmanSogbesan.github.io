/** The "AS" tile. Letters run off the edges on purpose; the clip keeps them inside the 10px-radius rect. */
export default function Monogram() {
  return (
    <svg className="mark" width="38" height="38" viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <clipPath id="mk-clip">
          <rect width="40" height="40" rx="10" />
        </clipPath>
      </defs>
      <rect width="40" height="40" rx="10" style={{ fill: 'var(--fg)' }} />
      <g clipPath="url(#mk-clip)">
        <text
          x="-4"
          y="37"
          style={{
            fill: 'var(--bg)',
            fontFamily: 'var(--font-unbounded), sans-serif',
            fontWeight: 800,
            fontSize: '30px',
            letterSpacing: '-2px',
          }}
        >
          AS
        </text>
      </g>
    </svg>
  );
}
