"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }, // 60ms stagger (spec §9)
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 }, // fade + 12px rise (spec §9)
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }, // <=300ms, ease-out
  },
};

export function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    // prefers-reduced-motion: render final state, no animation (spec §9/§14).
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
