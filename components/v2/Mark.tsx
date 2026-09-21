export function Mark({ className = "v2-mark" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 16"
      fill="none"
      aria-hidden="true"
    >
      <polyline
        points="1,13 8,12 14,9 18,8 25,4 34,3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="3" r="2" fill="var(--color-signal)" />
    </svg>
  );
}
