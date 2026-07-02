"use client";

import { useState } from "react";
import { PropertyForList } from "@/types/easybroker";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Home,
  Phone,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  Tag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/data/properties";
import { ContactForm } from "./ContactForm";
import { cn } from "@/lib/utils";
import { FadeUp, ZoomReveal } from "@/components/animations/Reveal";

interface PropertyDetailProps {
  property: PropertyForList;
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  const [openCarousel, setOpenCarousel] = useState(false);
  const [activeOp, setActiveOp] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  const images = [property.title_image_full, property.title_image_thumb].filter(
    Boolean
  ) as string[];
  const operation = property.operations[activeOp] ?? property.operations[0];
  const isRental = operation?.type === "rental";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Mira esta propiedad: ${property.title}`,
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="pt-20 md:pt-24 pb-12 md:pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-dark mb-4 md:mb-6 overflow-x-auto">
          <Link href="/" className="hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <Link
            href={isRental ? "/rentals" : "/properties"}
            className="hover:text-primary"
          >
            {isRental ? "Rentas" : "Ventas"}
          </Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{property.title}</span>
        </div>

        {/* Full-width premium photo grid with independent rounded cards */}
        <ZoomReveal className="relative w-full mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 h-[240px] sm:h-[320px] md:h-[480px] w-full">
            {/* Main large image (Left side, takes 2 cols and spans height) */}
            <div className="md:col-span-2 relative h-full rounded-3xl overflow-hidden bg-neutral-light border border-neutral-light/50 group shadow-sm hover:shadow-md transition-shadow">
              <Image
                src={images[0] || "/placeholder-house.jpg"}
                alt={property.title}
                fill
                priority
                className="object-cover group-hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
                onClick={() => {
                  setActiveImage(0);
                  setOpenCarousel(true);
                }}
              />
            </div>

            {/* Grid of smaller images on the right (2 columns of 2 rows) */}
            <div className="hidden md:grid md:col-span-2 grid-cols-2 grid-rows-2 gap-4 h-full">
              {/* Image 2 */}
              <div className="relative h-full rounded-3xl overflow-hidden bg-neutral-light border border-neutral-light/50 group shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={images[1] || images[0] || "/placeholder-house.jpg"}
                  alt={`${property.title} 2`}
                  fill
                  className="object-cover group-hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
                  onClick={() => {
                    setActiveImage(1 % images.length);
                    setOpenCarousel(true);
                  }}
                />
              </div>
              {/* Image 3 */}
              <div className="relative h-full rounded-3xl overflow-hidden bg-neutral-light border border-neutral-light/50 group shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={images[2] || images[0] || "/placeholder-house.jpg"}
                  alt={`${property.title} 3`}
                  fill
                  className="object-cover group-hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
                  onClick={() => {
                    setActiveImage(2 % images.length);
                    setOpenCarousel(true);
                  }}
                />
              </div>
              {/* Image 4 */}
              <div className="relative h-full rounded-3xl overflow-hidden bg-neutral-light border border-neutral-light/50 group shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={images[3] || images[1] || images[0] || "/placeholder-house.jpg"}
                  alt={`${property.title} 4`}
                  fill
                  className="object-cover group-hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
                  onClick={() => {
                    setActiveImage(3 % images.length);
                    setOpenCarousel(true);
                  }}
                />
              </div>
              {/* Image 5 (Last image with overlay) */}
              <div className="relative h-full rounded-3xl overflow-hidden bg-neutral-light border border-neutral-light/50 group shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={images[4] || images[0] || "/placeholder-house.jpg"}
                  alt={`${property.title} 5`}
                  fill
                  className="object-cover group-hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
                  onClick={() => {
                    setActiveImage(4 % images.length);
                    setOpenCarousel(true);
                  }}
                />
                <div 
                  onClick={() => setOpenCarousel(true)}
                  className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center cursor-pointer hover:bg-black/50 transition-colors"
                >
                  <span className="text-white text-sm font-bold uppercase tracking-widest px-4 py-2 border border-white/30 rounded-full bg-primary-dark/40 backdrop-blur-sm shadow-md">
                    Ver más fotos ({images.length > 2 ? images.length : 5})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Labels */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <span className="bg-primary text-white text-[10px] font-bold px-3.5 py-2 rounded-full uppercase tracking-widest shadow-md">
              {isRental ? "En Renta" : "En Venta"}
            </span>
            {property.featured && (
              <span className="bg-accent text-white text-[10px] font-bold px-3.5 py-2 rounded-full shadow-md uppercase tracking-wider">
                Destacada
              </span>
            )}
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-colors z-10 cursor-pointer"
            aria-label="Compartir"
          >
            <Share2 className="w-4 h-4 text-foreground" />
          </button>
        </ZoomReveal>

        {/* Page content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 md:gap-8">
          <div className="min-w-0">

            <FadeUp delay={0.15} className="bg-white rounded-2xl border border-neutral-light p-6 md:p-8 mb-6">
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-neutral-dark">
                    <MapPin className="w-4 h-4 mr-1 shrink-0" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-md">
                  {property.property_type}
                </span>
              </div>

              {property.operations.length > 1 ? (
                <div className="flex gap-2 mb-4">
                  {property.operations.map((op, i) => (
                    <button
                      key={op.type}
                      onClick={() => setActiveOp(i)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                        i === activeOp
                          ? "bg-primary text-white"
                          : "bg-neutral-light text-foreground hover:bg-neutral"
                      )}
                    >
                      {op.type === "sale"
                        ? "En Venta"
                        : op.type === "rental"
                        ? "En Renta"
                        : "Renta Temporal"}
                    </button>
                  ))}
                </div>
              ) : null}

              <p className="text-3xl md:text-4xl font-heading font-bold text-primary">
                {operation?.formatted_amount}
                {isRental && (
                  <span className="text-base font-normal text-neutral-dark">
                    {" "}
                    / mes
                  </span>
                )}
              </p>
            </FadeUp>

            <FadeUp className="bg-white rounded-2xl border border-neutral-light p-6 md:p-8 mb-6">
              <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                Características
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.bedrooms !== undefined && (
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-neutral-light/50">
                    <Bed className="w-6 h-6 text-primary mb-2" />
                    <span className="text-xl font-bold text-foreground">
                      {property.bedrooms}
                    </span>
                    <span className="text-xs text-neutral-dark uppercase tracking-wider">
                      {property.bedrooms === 1 ? "Recámara" : "Recámaras"}
                    </span>
                  </div>
                )}
                {property.bathrooms !== undefined && (
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-neutral-light/50">
                    <Bath className="w-6 h-6 text-primary mb-2" />
                    <span className="text-xl font-bold text-foreground">
                      {property.bathrooms}
                    </span>
                    <span className="text-xs text-neutral-dark uppercase tracking-wider">
                      {property.bathrooms === 1 ? "Baño" : "Baños"}
                    </span>
                  </div>
                )}
                {property.construction_size !== undefined && (
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-neutral-light/50">
                    <Square className="w-6 h-6 text-primary mb-2" />
                    <span className="text-xl font-bold text-foreground">
                      {property.construction_size}
                    </span>
                    <span className="text-xs text-neutral-dark uppercase tracking-wider">
                      m² Construcción
                    </span>
                  </div>
                )}
                {property.lot_size !== undefined && (
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-neutral-light/50">
                    <Home className="w-6 h-6 text-primary mb-2" />
                    <span className="text-xl font-bold text-foreground">
                      {property.lot_size}
                    </span>
                    <span className="text-xs text-neutral-dark uppercase tracking-wider">
                      m² Terreno
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-sm">
                <div className="flex items-center gap-2 text-neutral-dark">
                  <Tag className="w-4 h-4" />
                  <span>ID: {property.public_id}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-dark">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Actualizado:{" "}
                    {new Date(property.updated_at).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {property.agent && (
                  <div className="flex items-center gap-2 text-neutral-dark">
                    <Home className="w-4 h-4" />
                    <span>Asesor: {property.agent}</span>
                  </div>
                )}
              </div>
            </FadeUp>

            {property.description && (
              <FadeUp className="bg-white rounded-2xl border border-neutral-light p-6 md:p-8 mb-6">
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                  Descripción
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </FadeUp>
            )}

            <FadeUp className="bg-primary-dark rounded-2xl p-6 md:p-8 text-white">
              <h2 className="text-xl font-heading font-bold mb-2">
                ¿Interesado en esta propiedad?
              </h2>
              <p className="text-white/80 mb-6">
                Contáctanos para agendar una visita o resolver tus dudas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                 <a
                  href={`https://wa.me/523315128570?text=${encodeURIComponent(
                    `Hola Anawim, me gustaría saber más sobre la propiedad: ${property.title} (ID: ${property.public_id}) 🚀`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#1faa50] text-white font-medium py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
                >
                  <svg
                    fill="#fff"
                    height="18px"
                    width="18px"
                    viewBox="0 0 308.00 308.00"
                    xmlSpace="preserve"
                    stroke="#fff"
                    className="shrink-0"
                  >
                    <path d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z" />
                    <path d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex-1 bg-white text-primary-dark font-medium py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {COMPANY.phoneDisplay}
                </a>
              </div>
            </FadeUp>
          </div>

          <aside className="lg:sticky lg:top-24 self-start">
            <FadeUp delay={0.25}>
              <ContactForm
                propertyTitle={property.title}
                propertyId={property.public_id}
              />
            </FadeUp>
          </aside>
        </div>
      </div>

      {/* Full-screen Carousel Overlay Modal */}
      <AnimatePresence>
        {openCarousel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[999] flex flex-col justify-between p-6"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white z-10">
              <span className="text-sm font-semibold tracking-wider font-sans">
                {activeImage + 1} / {images.length}
              </span>
              <button
                onClick={() => setOpenCarousel(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer text-xl"
                aria-label="Cerrar galería"
              >
                ✕
              </button>
            </div>

            {/* Main Image Slider View */}
            <div className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full my-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-[60vh] md:h-[75vh]"
                >
                  <Image
                    src={images[activeImage]}
                    alt={`${property.title} view ${activeImage + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage(
                        (activeImage - 1 + images.length) % images.length
                      )
                    }
                    className="absolute left-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg border border-white/10"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage((activeImage + 1) % images.length)
                    }
                    className="absolute right-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg border border-white/10"
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex justify-center gap-3 overflow-x-auto py-4 max-w-3xl mx-auto w-full z-10">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "w-16 h-16 rounded-xl overflow-hidden border-2 transition-all relative shrink-0 cursor-pointer",
                      i === activeImage
                        ? "border-secondary-light scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`Miniatura ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
