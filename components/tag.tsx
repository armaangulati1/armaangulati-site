export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-accent/40 px-2.5 py-0.5 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-metric text-xs uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  );
}
