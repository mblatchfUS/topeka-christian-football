// Topeka Christian Saints — team emblem.
// Team colors: red #ba1821 / red-dark #8f1018, ink #191919, cream #f7f5f2,
// with a gold halo (#f0c14b) as the Saints signature accent.
type SaintsLogoProps = {
  size?: number;
  className?: string;
  title?: string;
};

function SaintsLogo({
  size = 48,
  className,
  title = "Topeka Christian Saints",
}: SaintsLogoProps) {
  return (
    <svg
      className={className}
      width={size}
      height={(size * 128) / 120}
      viewBox="0 0 120 128"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="saints-field" x1="60" y1="4" x2="60" y2="126"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ba1821" />
          <stop offset="1" stopColor="#8f1018" />
        </linearGradient>
      </defs>

      {/* Shield */}
      <path
        d="M60 4 L108 18 C110 19 111 20 111 24 V66 C111 96 90 118 60 126 C30 118 9 96 9 66 V24 C9 20 10 19 12 18 Z"
        fill="url(#saints-field)"
        stroke="#191919"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Inner keyline */}
      <path
        d="M60 15 L100 26 V65 C100 90 82 108 60 115 C38 108 20 90 20 65 V26 Z"
        fill="none"
        stroke="#f7f5f2"
        strokeWidth="2"
        strokeOpacity="0.65"
        strokeLinejoin="round"
      />

      {/* Halo */}
      <ellipse
        cx="60" cy="39" rx="27" ry="8.5"
        fill="none"
        stroke="#f0c14b"
        strokeWidth="5"
      />
      <ellipse
        cx="60" cy="39" rx="27" ry="8.5"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />

      {/* Saints "S" */}
      <text
        x="60" y="99"
        textAnchor="middle"
        fontFamily="'Barlow Condensed', sans-serif"
        fontWeight={900}
        fontSize="70"
        fill="#f7f5f2"
        stroke="#191919"
        strokeWidth="1.5"
        paintOrder="stroke"
      >
        S
      </text>

      {/* Est. banner */}
      <text
        x="60" y="118"
        textAnchor="middle"
        fontFamily="'Barlow Condensed', sans-serif"
        fontWeight={700}
        fontSize="9"
        letterSpacing="1.5"
        fill="#f0c14b"
      >
        EST. 2026
      </text>
    </svg>
  );
}

export default SaintsLogo;
