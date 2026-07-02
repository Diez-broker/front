"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_PROPERTIES } from "@/data/properties";
import TiltedCard from "@/components/animations/TiltedCard";
import { FadeUp, RevealWords } from "@/components/animations/Reveal";

export function PopularProperties() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Take the top 5 featured properties for the carousel
  const properties = FEATURED_PROPERTIES.slice(0, 5);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);
  };

  const currentProperty = properties[currentIndex];
  if (!currentProperty) return null;

  const op = currentProperty.operations[0];
  const price = op?.formatted_amount ?? "Precio a consultar";
  const isRental = op?.type === "rental";

  return (
    <section className="py-16 md:py-24 bg-primary-dark text-white relative overflow-hidden">
      {/* Decorative Watermark background */}
      <div className="absolute top-10 right-[-10%] select-none pointer-events-none opacity-5 z-0">
        <span className="text-[18vw] font-serif font-black tracking-widest uppercase block">
          DIEZ B
        </span>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-16 max-w-3xl">
          <FadeUp>
            <span className="section-label !text-secondary-light before:!bg-secondary-light">
              Propiedades Populares
            </span>
          </FadeUp>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            <RevealWords text="Nuestras Propiedades Más" baseDelay={0.1} />
            <RevealWords text="Populares" baseDelay={0.4} className="italic text-secondary-light" />
          </h2>
          <FadeUp delay={0.3}>
            <p className="text-white/75 text-base font-sans">
              Explora las opciones preferidas por nuestros clientes, distinguidas por su ubicación premium y diseño excepcional.
            </p>
          </FadeUp>
        </div>

        {/* Carousel Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image column — first on mobile */}
          <div className="lg:col-span-7 flex justify-center items-center order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <TiltedCard
                  imageSrc={currentProperty.title_image_full || currentProperty.title_image_thumb}
                  altText={currentProperty.title}
                  captionText={currentProperty.title}
                  containerHeight="clamp(260px, 50vw, 450px)"
                  scaleOnHover={1.03}
                  rotateAmplitude={8}
                  showTooltip={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Info column */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest bg-secondary text-white px-3 py-1 rounded-full">
                    {isRental ? "En Renta" : "En Venta"}
                  </span>
                  <span className="ml-3 text-xs font-bold uppercase tracking-widest text-white/50">
                    {currentProperty.property_type}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                  {currentProperty.title}
                </h3>

                <p className="text-white/70 text-sm font-sans line-clamp-3 leading-relaxed">
                  {currentProperty.description || "Preciosa propiedad con acabados de lujo y excelente ubicación en Jalisco. Contáctanos para más detalles e información de visitas."}
                </p>

                <div className="flex items-center text-secondary-light text-sm">
                  <MapPin className="w-4 h-4 mr-2 shrink-0" />
                  <span>{currentProperty.location}</span>
                </div>

                <div className="text-2xl sm:text-3xl font-serif font-black text-white">
                  {price}
                  {isRental && <span className="text-sm font-normal text-white/60 font-sans"> /mes</span>}
                </div>

                <div className="pt-4">
                  <Link
                    href={`/property/${currentProperty.slug}`}
                    className="inline-flex items-center gap-2 bg-white text-primary-dark hover:bg-neutral-light transition-colors px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 mt-8 lg:mt-10">
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all cursor-pointer"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all cursor-pointer"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dots indicator */}
              <div className="flex gap-2">
                {properties.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? "bg-white w-6" : "bg-white/40"
                    }`}
                    aria-label={`Ir al slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
