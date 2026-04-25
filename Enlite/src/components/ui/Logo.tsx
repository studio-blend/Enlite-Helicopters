export function EnliteLogo({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size * 3.5}
      height={size}
      viewBox="0 0 280 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Enlite Helicopters logo"
    >
      {/* Rotor icon */}
      <g transform="translate(8, 8)">
        {/* Main rotor disc */}
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.15" />
        {/* Rotor blades */}
        <path d="M32 4 C32 4 38 20 32 32 C26 20 32 4 32 4Z" fill="var(--color-red, #C41E3A)" opacity="0.9" />
        <path d="M60 32 C60 32 44 38 32 32 C44 26 60 32 60 32Z" fill="var(--color-red, #C41E3A)" opacity="0.9" />
        <path d="M32 60 C32 60 26 44 32 32 C38 44 32 60 32 60Z" fill="var(--color-red, #C41E3A)" opacity="0.7" />
        <path d="M4 32 C4 32 20 26 32 32 C20 38 4 32 4 32Z" fill="var(--color-red, #C41E3A)" opacity="0.7" />
        {/* Hub */}
        <circle cx="32" cy="32" r="5" fill="currentColor" />
        <circle cx="32" cy="32" r="2.5" fill="var(--color-red, #C41E3A)" />
      </g>
      {/* Text: Enlite */}
      <text
        x="78"
        y="42"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="32"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        Enlite
      </text>
      {/* Text: Helicopters */}
      <text
        x="78"
        y="64"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="600"
        fontSize="16"
        fill="var(--color-red, #C41E3A)"
        letterSpacing="2"
      >
        HELICOPTERS
      </text>
    </svg>
  );
}
