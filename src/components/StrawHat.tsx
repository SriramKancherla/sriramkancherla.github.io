type StrawHatProps = {
  className?: string;
  style?: React.CSSProperties;
  landed?: boolean;
};

/** Straw hat SVG for the name intro animation. */
export const StrawHat = ({ className = "", style, landed = false }: StrawHatProps) => (
  <svg
    viewBox="0 0 48 36"
    className={className}
    style={{
      imageRendering: "pixelated",
      filter: landed ? "drop-shadow(0 8px 16px rgba(0,0,0,0.45))" : "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
      ...style,
    }}
    aria-hidden
  >
    {/* brim */}
    <ellipse cx="24" cy="28" rx="22" ry="6" fill="#c9a227" />
    <ellipse cx="24" cy="27" rx="20" ry="4" fill="#e8c547" />
    {/* crown */}
    <path d="M10 27 Q10 10 24 8 Q38 10 38 27 Z" fill="#d4ad3a" />
    <path d="M14 27 Q14 14 24 12 Q34 14 34 27 Z" fill="#f0d060" />
    {/* red ribbon */}
    <rect x="10" y="22" width="28" height="4" fill="#9b1c1c" />
    <rect x="10" y="23" width="28" height="2" fill="#c62828" />
    {/* highlight */}
    <ellipse cx="30" cy="16" rx="4" ry="6" fill="#fff8c0" opacity="0.35" />
  </svg>
);
