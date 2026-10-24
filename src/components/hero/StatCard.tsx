import type { Stat } from "./content";

const TONES: Record<Stat["tone"], string> = {
  lime: "bg-lime text-ink",
  sky: "bg-sky text-ink",
  ink: "bg-white/8 text-white ring-1 ring-white/10",
  orange: "bg-orange text-ink",
};

export function StatCard({ value, label, tone }: Stat) {
  return (
    <article
      data-stat
      className={`intro-hidden relative overflow-hidden rounded-2xl p-4 sm:p-6 ${TONES[tone]}`}
    >
      <p className="text-3xl font-semibold tabular-nums sm:text-5xl">
        <span data-count={value}>{value}</span>%
      </p>
      <p className="mt-1 text-xs leading-snug opacity-80 sm:mt-2 sm:text-sm">
        {label}
      </p>
      {/* Fills left to right while the car drives; scaleX keeps it on the compositor. */}
      <span
        data-stat-bar
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 origin-left bg-current opacity-30"
      />
    </article>
  );
}
