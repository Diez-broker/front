"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  className?: string;
}

export default function TiltedCard({
  imageSrc,
  altText = "Tilted Card Image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "100%",
  imageWidth = "100%",
  scaleOnHover = 1.05,
  rotateAmplitude = 14,
  showTooltip = false,
  overlayContent = null,
  displayOverlayContent = false,
  className = "",
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(0);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalized values: from -0.5 to 0.5
    const rX = (mouseY / height - 0.5) * rotateAmplitude;
    const rY = (mouseX / width - 0.5) * -rotateAmplitude;

    setRotateX(rX);
    setRotateY(rY);
    setScale(scaleOnHover);
    setOpacity(1);

    // Relative mouse coordinates in percentage for tooltip positioning
    setTooltipPos({
      x: mouseX,
      y: mouseY,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
    setOpacity(0);
  };

  return (
    <div
      ref={ref}
      className={`relative cursor-pointer select-none [perspective:1000px] ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl border border-neutral-light/50"
        animate={{
          rotateX,
          rotateY,
          scale,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        style={{
          height: imageHeight,
          width: imageWidth,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Background Image */}
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Overlay Content */}
        {displayOverlayContent && overlayContent && (
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/20 to-transparent flex flex-col justify-end p-6 z-10 [transform:translateZ(30px)]">
            {overlayContent}
          </div>
        )}
      </motion.div>

      {/* Floating Tooltip/Caption */}
      {showTooltip && captionText && (
        <motion.div
          className="absolute bg-primary-dark/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full pointer-events-none z-30 shadow-md font-semibold font-sans tracking-wide"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: "translate(-50%, -130%)",
          }}
          animate={{ opacity }}
          transition={{ duration: 0.15 }}
        >
          {captionText}
        </motion.div>
      )}
    </div>
  );
}
