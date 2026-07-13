export function TldrBox({ points }: { points: string[] }) {
  if (!points?.length) return null;
  return (
    <aside
      aria-label="TL;DR"
      className="mt-8 rounded-xl border border-brand/40 bg-brand-soft/60 p-5 sm:p-6"
    >
      <p className="text-metric text-xs font-semibold uppercase tracking-widest text-brand">
        TL;DR
      </p>
      <ul className="mt-3 space-y-2.5">
        {points.map((point, i) => (
          <li key={i} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
            />
            <span className="text-[15px] leading-[1.6] text-foreground">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
