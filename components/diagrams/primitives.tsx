"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type MotionProps,
} from "framer-motion";

// Shared building blocks for the architecture diagrams (spec §7/§9):
// - palette from CSS vars / currentColor so both themes work
// - 1.5px strokes, rounded nodes, Geist labels >= 12px
// - pathLength draw-on-scroll (600ms) + one looping request-pulse dot (4s)
// - prefers-reduced-motion: final state, no animation, pulse paused
//
// Every diagram wraps content in <DiagramFrame>, which renders the <svg> with a
// <title>/<desc> pair; the adjacent MDX prose walks through the same flow, so
// the diagram never carries information the text does not.

export const DIAGRAM_STROKE = 1.5;

type Pt = { x: number; y: number };

export function DiagramFrame({
  title,
  desc,
  viewBox,
  minWidth = 640,
  children,
}: {
  title: string;
  desc: string;
  viewBox: string;
  minWidth?: number;
  children: React.ReactNode;
}) {
  const titleId = React.useId();
  const descId = React.useId();
  return (
    <figure className="not-prose my-8">
      <div className="overflow-x-auto rounded-xl border border-border bg-card p-4 sm:p-6">
        <svg
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          viewBox={viewBox}
          style={{ minWidth, width: "100%", height: "auto" }}
          className="text-foreground"
        >
          <title id={titleId}>{title}</title>
          <desc id={descId}>{desc}</desc>
          {children}
        </svg>
      </div>
    </figure>
  );
}

// A node: rounded rect + one or two lines of label. `tone` picks the accent.
export function Node({
  x,
  y,
  w,
  h,
  lines,
  tone = "default",
  sub,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  lines: string[];
  tone?: "default" | "brand" | "gate" | "excluded" | "success";
  sub?: string;
}) {
  const fill =
    tone === "brand"
      ? "var(--brand-soft)"
      : tone === "gate"
        ? "color-mix(in srgb, var(--success) 12%, var(--card))"
        : tone === "excluded"
          ? "transparent"
          : "var(--card)";
  const stroke =
    tone === "brand"
      ? "var(--brand)"
      : tone === "gate"
        ? "var(--success)"
        : tone === "excluded"
          ? "var(--muted-foreground)"
          : "var(--border)";
  const textColor =
    tone === "excluded" ? "var(--muted-foreground)" : "var(--foreground)";
  const dashed = tone === "excluded";
  const cx = x + w / 2;
  const startY = y + h / 2 - ((lines.length - 1) * 15) / 2 - (sub ? 5 : 0);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        ry={10}
        fill={fill}
        stroke={stroke}
        strokeWidth={DIAGRAM_STROKE}
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      {lines.map((line, i) => (
        <text
          key={i}
          x={cx}
          y={startY + i * 15}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12.5}
          fontWeight={i === 0 ? 600 : 400}
          fill={textColor}
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          {line}
        </text>
      ))}
      {sub ? (
        <text
          x={cx}
          y={startY + lines.length * 15 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={10.5}
          fill="var(--muted-foreground)"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

// A drawn edge: animates pathLength 0 -> 1 on scroll (600ms, ease-out, once).
// Reduced motion renders the final path. `variant` toggles the excluded look.
export function Edge({
  d,
  delay = 0,
  variant = "solid",
  arrow = true,
}: {
  d: string;
  delay?: number;
  variant?: "solid" | "excluded";
  arrow?: boolean;
}) {
  const reduce = useReducedMotion();
  const excluded = variant === "excluded";
  const stroke = excluded ? "var(--muted-foreground)" : "var(--border)";
  const common = {
    d,
    fill: "none",
    stroke,
    strokeWidth: DIAGRAM_STROKE,
    strokeDasharray: excluded ? "4 3" : undefined,
    markerEnd: arrow
      ? excluded
        ? "url(#arrow-muted)"
        : "url(#arrow)"
      : undefined,
  } as const;

  if (reduce) return <path {...common} />;

  const motionProps: MotionProps = {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 0.6, ease: "easeOut", delay },
  };
  return <motion.path {...common} {...motionProps} />;
}

// The single looping request-flow pulse: a dot traversing `points` over 4s.
// Paused (rendered static at the origin) under prefers-reduced-motion.
export function PulseDot({ points }: { points: Pt[] }) {
  const reduce = useReducedMotion();
  if (points.length < 2) return null;
  if (reduce) {
    return (
      <circle cx={points[0].x} cy={points[0].y} r={4} fill="var(--brand)" />
    );
  }
  const times = points.map((_, i) => i / (points.length - 1));
  return (
    <motion.circle
      r={4}
      fill="var(--brand)"
      initial={false}
      animate={{ cx: points.map((p) => p.x), cy: points.map((p) => p.y) }}
      transition={{
        duration: 4,
        times,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.4,
      }}
    />
  );
}

// Shared arrowhead marker defs. Include once per svg.
export function ArrowDefs() {
  return (
    <defs>
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)" />
      </marker>
      <marker
        id="arrow-muted"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path
          d="M 0 0 L 10 5 L 0 10 z"
          fill="var(--muted-foreground)"
          opacity={0.6}
        />
      </marker>
    </defs>
  );
}

// Small caption pinned under a node/lane.
export function Caption({
  x,
  y,
  children,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={10.5}
      fill="var(--muted-foreground)"
      style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
    >
      {children}
    </text>
  );
}
