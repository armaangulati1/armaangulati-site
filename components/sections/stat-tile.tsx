import { cn } from "@/lib/utils";
import type { Metric } from "@/lib/content";

// Metric values render in Geist Mono (numbers) or display sans (statements);
// qualifiers always render in muted text (spec §10).
export function StatTile({
  metric,
  className,
}: {
  metric: Metric;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl border border-border bg-card p-5",
        className,
      )}
    >
      <p
        className={cn(
          "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl",
          metric.mono !== false && "text-metric",
        )}
      >
        {metric.value}
      </p>
      <p className="mt-1 text-sm font-medium text-foreground">{metric.label}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {metric.qualifier}
      </p>
    </div>
  );
}
