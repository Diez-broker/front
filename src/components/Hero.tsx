"use client";

import { useRouter } from "next/navigation";
import { Search, MapPin, Home, DollarSign, Bed, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { PROPERTY_TYPES, COMPANY } from "@/data/properties";

const easeLuxury = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: easeLuxury },
  }),
};

function RevealWords({
  text,
  className = "",
  baseDelay = 0,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
}) {
  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="overflow-hidden inline-block pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className="inline-block mr-[0.28em]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: baseDelay + i * 0.08,
              ease: easeLuxury,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("ubicacion", location);
    if (propertyType) params.set("tipo", propertyType);
    if (bedrooms) params.set("recamaras", bedrooms);
    if (budget) params.set("presupuesto", budget);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden bg-primary-dark">
      {/* Background image with slow cinematic zoom (Ken Burns) */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: easeLuxury }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${COMPANY.heroImage}")` }}
          animate={{ scale: [1, 1.08] }}
          transition={{ duration: 24, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />

        {/* Cinematic vignette: darker edges, lighter center */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-primary-dark/80"></div>
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]"></div>
        {/* Subtle film grain feel via noise-less soft overlay */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary-dark to-transparent"></div>
      </motion.div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
        {/* Label with line accents */}
        <motion.div
          className="flex items-center gap-2 sm:gap-4 mb-6 md:mb-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          <span className="hidden sm:block h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-secondary-light/70"></span>
          <span className="text-secondary-light text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.4em]">
            {COMPANY.tagline}
          </span>
          <span className="hidden sm:block h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-secondary-light/70"></span>
        </motion.div>

        {/* Editorial headline with per-word reveal */}
        <h1 className="text-[1.75rem] sm:text-4xl md:text-6xl lg:text-[5.25rem] font-serif text-white max-w-5xl leading-[1.1] sm:leading-[1.05] mb-4 md:mb-6 tracking-tight px-1">
          <RevealWords text="Encuentra tu propiedad ideal" baseDelay={0.35} className="font-bold" />
          <br className="hidden md:block" />
          <RevealWords
            text="con un servicio"
            baseDelay={0.75}
            className="font-light text-white/90"
          />{" "}
          <span className="overflow-hidden inline-block pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block italic text-secondary-light font-light"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease: easeLuxury }}
            >
              excepcional
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mb-8 md:mb-12 font-sans tracking-wide font-light px-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.2}
        >
          Bienes raíces exclusivos y asesoría a tu medida en Guadalajara, Zapopan
          y toda la Riviera de Jalisco.
        </motion.p>

        {/* Glassmorphism search bar */}
        <motion.div
          className="w-full max-w-5xl rounded-2xl md:rounded-full p-2 md:p-3 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0 border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.4}
        >
          {/* Ubicación */}
          <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
            <MapPin className="w-4 h-4 text-secondary-light mr-3 shrink-0" />
            <div className="flex flex-col w-full text-left">
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
                Ubicación
              </span>
              <input
                type="text"
                placeholder="Ciudad, zona, colonia..."
                className="w-full bg-transparent text-xs font-medium text-white outline-none placeholder:text-white/40"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>

          {/* Tipo de Propiedad */}
          <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
            <Home className="w-4 h-4 text-secondary-light mr-3 shrink-0" />
            <div className="flex flex-col w-full text-left">
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
                Propiedad
              </span>
              <select
                className="w-full bg-transparent text-xs font-medium text-white outline-none appearance-none cursor-pointer [&>option]:text-foreground"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Cualquier tipo</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Recámaras */}
          <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
            <Bed className="w-4 h-4 text-secondary-light mr-3 shrink-0" />
            <div className="flex flex-col w-full text-left">
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
                Recámaras
              </span>
              <select
                className="w-full bg-transparent text-xs font-medium text-white outline-none appearance-none cursor-pointer [&>option]:text-foreground"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              >
                <option value="">Cualquiera</option>
                <option value="1">1+ Recámara</option>
                <option value="2">2+ Recámaras</option>
                <option value="3">3+ Recámaras</option>
                <option value="4">4+ Recámaras</option>
              </select>
            </div>
          </div>

          {/* Presupuesto */}
          <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
            <DollarSign className="w-4 h-4 text-secondary-light mr-3 shrink-0" />
            <div className="flex flex-col w-full text-left">
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
                Presupuesto
              </span>
              <select
                className="w-full bg-transparent text-xs font-medium text-white outline-none appearance-none cursor-pointer [&>option]:text-foreground"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="">Sin límite</option>
                <option value="1500000">Hasta $1.5M MXN</option>
                <option value="3000000">Hasta $3.0M MXN</option>
                <option value="5000000">Hasta $5.0M MXN</option>
                <option value="10000000">Hasta $10.0M MXN</option>
                <option value="20000000">Hasta $20.0M MXN</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="px-2 py-2 md:py-0 w-full md:w-auto">
            <button
              onClick={handleSearch}
              className="bg-secondary hover:bg-secondary-light text-primary-dark rounded-full w-full md:w-12 md:h-12 lg:w-14 lg:h-14 h-11 flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-secondary/40 hover:scale-[1.02] md:hover:scale-105 mx-auto text-sm md:text-base font-semibold md:font-normal"
              aria-label="Buscar propiedades"
            >
              <Search className="w-5 h-5" />
              <span className="md:hidden">Buscar</span>
            </button>
          </div>
        </motion.div>

        {/* Popular Tags */}
        <motion.div
          className="mt-6 md:mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-white/60 text-xs font-medium px-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.6}
        >
          <span>Sugerencias:</span>
          {["Casas", "Departamentos", "Terrenos", "Locales"].map((label) => (
            <button
              key={label}
              onClick={() => {
                setPropertyType(
                  label
                    .replace("Casas", "Casa")
                    .replace("Departamentos", "Departamento")
                    .replace("Terrenos", "Terreno")
                    .replace("Locales", "Local")
                );
                handleSearch();
              }}
              className="hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all cursor-pointer"
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-8 md:mt-14 w-full max-w-sm sm:max-w-none grid grid-cols-3 gap-2 sm:gap-8 md:flex md:items-center md:justify-center md:gap-14 px-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.8}
        >
          {[
            { value: "150+", label: "Propiedades" },
            { value: "10+", label: "Años de exp." },
            { value: "500+", label: "Clientes" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white">
                {stat.value}
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/50 mt-1 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Descubre</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </div>
  );
}
