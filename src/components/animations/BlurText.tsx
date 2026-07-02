"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  once?: boolean;
}

export function BlurText({
  text,
  delay = 0.05,
  className = "",
  animateBy = "words",
  once = true,
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      filter: "blur(8px)",
      opacity: 0,
      y: 12,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block"
          style={{ marginRight: animateBy === "words" ? "0.25em" : "0px" }}
        >
          {element}
        </motion.span>
      ))}
    </motion.span>
  );
}
