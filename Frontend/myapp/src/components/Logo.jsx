// MockAPI brand mark.
// The "braces" icon below is from Lucide (https://lucide.dev/icons/braces) — MIT licensed.
// We render it inside a small "ink stamp" square to match the Engineer's Notebook aesthetic.

export default function Logo({ size = 28, className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-sm bg-ink text-paper shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-label="MockAPI logo"
    >
      <svg
        width={Math.round(size * 0.55)}
        height={Math.round(size * 0.55)}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1" />
        <path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
      </svg>
    </span>
  );
}
