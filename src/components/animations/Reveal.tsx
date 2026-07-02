"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

export const easeLuxury = [0.22, 1, 0.36, 1] as const;

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

/** Fade + slide up when the element scrolls into view (MotionSites luxury feel). */
export function FadeUp({
  children,
  delay = 0,
  y = 40,
  duration = 1,
  className,
  once = true,
}: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8%" }}
      transition={{ duration, delay, ease: easeLuxury }}
    >
      {children}
    </motion.div>
  );
}

interface RevealWordsProps {
  text: string;
  className?: string;
  baseDelay?: number;
  once?: boolean;
}

/** Per-word masked reveal, triggered on scroll into view. */
export function RevealWords({
  text,
  className = "",
  baseDelay = 0,
  once = true,
}: RevealWordsProps) {
  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-8%" }}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="overflow-hidden inline-block pb-[0.1em] -mb-[0.1em]"
        >
          <motion.span
            className="inline-block mr-[0.28em]"
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: 0,
                transition: {
                  duration: 0.9,
                  delay: baseDelay + i * 0.08,
                  ease: easeLuxury,
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger },
  }),
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeLuxury },
  },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}

/** Container that staggers its <StaggerItem> children as they enter the viewport. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  once = true,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-8%" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/** Image / media block that scales down into place (cinematic zoom-out). */
export function ZoomReveal({
  children,
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 1.08 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, margin: "-8%" }}
      transition={{ duration: 1.4, delay, ease: easeLuxury }}
    >
      {children}
    </motion.div>
  );
}
