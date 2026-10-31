import { Link } from "react-router-dom";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Believers Network home"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-ink-800 ring-1 ring-gold-400/30 transition-transform duration-300 group-hover:ring-gold-400/60">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M12 4v16M6 10h12"
            stroke="#d4a93f"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="7" r="1.4" fill="#f5e9c8" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-serif text-base font-medium tracking-tight text-cream-50">
          Believers Network
        </span>
        <span className="block text-[10px] uppercase tracking-[0.22em] text-gold-300/80">
          Manifesting the Sons of God
        </span>
      </span>
    </Link>
  );
}
