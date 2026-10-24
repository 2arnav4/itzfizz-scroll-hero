/**
 * Top-down sports car, drawn by hand as an inline SVG and facing right.
 * Inline SVG means no network request, no layout shift and crisp scaling.
 */
export function Car({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 112"
      className={className}
      role="img"
      aria-label="Sports car seen from above"
    >
      {/* soft ground shadow */}
      <ellipse cx="122" cy="58" rx="116" ry="50" fill="#000" opacity="0.35" />

      {/* tyres */}
      <g fill="#0b0b0b">
        <rect x="40" y="2" width="38" height="16" rx="5" />
        <rect x="160" y="4" width="36" height="15" rx="5" />
        <rect x="40" y="94" width="38" height="16" rx="5" />
        <rect x="160" y="93" width="36" height="15" rx="5" />
      </g>

      {/* body */}
      <path
        d="M30 14C60 8 150 8 190 16C220 22 234 40 234 56C234 72 220 90 190 96C150 104 60 104 30 98C14 94 8 76 8 56C8 36 14 18 30 14Z"
        fill="#ff5a1f"
      />
      <path
        d="M30 14C60 8 150 8 190 16C204 19 215 25 223 33L30 33C18 33 11 28 14 24C17 19 23 15 30 14Z"
        fill="#fff"
        opacity="0.12"
      />

      {/* mirrors */}
      <ellipse cx="148" cy="13" rx="7" ry="4" fill="#d94612" />
      <ellipse cx="148" cy="99" rx="7" ry="4" fill="#d94612" />

      {/* glass cabin and roof */}
      <path
        d="M92 26C120 22 150 24 168 32C176 44 176 68 168 80C150 88 120 90 92 86C84 72 84 40 92 26Z"
        fill="#10161d"
      />
      <rect x="104" y="34" width="46" height="44" rx="10" fill="#e44c16" />

      {/* hood lines */}
      <g stroke="#000" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round">
        <path d="M182 46L222 50" />
        <path d="M182 66L222 62" />
      </g>

      {/* headlights and tail lights */}
      <g fill="#fff6cf">
        <ellipse cx="226" cy="34" rx="5" ry="7" />
        <ellipse cx="226" cy="78" rx="5" ry="7" />
      </g>
      <g fill="#c1121f">
        <rect x="9" y="26" width="5" height="14" rx="2" />
        <rect x="9" y="72" width="5" height="14" rx="2" />
      </g>
    </svg>
  );
}
