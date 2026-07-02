"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
}: ShinyTextProps) {
  const animationStyle = disabled
    ? {}
    : {
        animation: `shiny-text-shine ${speed}s linear infinite`,
      };

  return (
    <span
      className={`bg-clip-text text-transparent inline-block ${disabled ? "text-foreground" : ""} ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.3) 70%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        ...animationStyle,
      }}
    >
      {text}
    </span>
  );
}
