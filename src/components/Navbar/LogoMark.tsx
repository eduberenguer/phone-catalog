export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 70 40"
      fill="none"
    >
      <mask id="logoBite">
        <rect x="0" y="0" width="70" height="40" fill="white" />
        <circle cx="50" cy="20" r="24" fill="black" />
      </mask>
      <circle
        cx="18"
        cy="20"
        r="18"
        fill="currentColor"
        mask="url(#logoBite)"
      />
      <g fill="currentColor">
        <rect x="44" y="2" width="10" height="36" rx="1.5" />
        <rect
          x="44"
          y="2"
          width="10"
          height="36"
          rx="1.5"
          transform="rotate(60 49 20)"
        />
        <rect
          x="44"
          y="2"
          width="10"
          height="36"
          rx="1.5"
          transform="rotate(120 49 20)"
        />
      </g>
    </svg>
  );
}
