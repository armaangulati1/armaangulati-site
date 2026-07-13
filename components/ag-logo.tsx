export function AGLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        fontFamily="var(--font-mono), ui-monospace, monospace"
        fontSize="13"
        fontWeight="600"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        AG
      </text>
    </svg>
  );
}
