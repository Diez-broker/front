"use client";

import { useState } from "react";
import { Star, Phone, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import { COMPANY } from "@/data/properties";
import { FadeUp, RevealWords, Stagger, StaggerItem } from "@/components/animations/Reveal";

const AGENTS = [
  {
    name: "Alejandro Diez",
    role: "Director General & Broker Fundador",
    rating: "5.0",
    reviews: "38 reseñas",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256",
    specialty: "Propiedades Residenciales & Comerciales Premium",
  },
  {
    name: "Sofía Martínez",
    role: "Asesora de Ventas Residenciales",
    rating: "4.9",
    reviews: "27 reseñas",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
    specialty: "Casas de Lujo & Condominios en Zapopan",
  },
  {
    name: "Carlos Mendoza",
    role: "Especialista en Inversiones & Terrenos",
    rating: "4.8",
    reviews: "42 reseñas",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256&h=256",
    specialty: "Terrenos Comerciales, Bodegas & Fideicomisos",
  },
  {
    name: "Fernanda Garza",
    role: "Asesora Inmobiliaria Riviera de Chapala",
    rating: "4.9",
    reviews: "19 reseñas",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256&h=256",
    specialty: "Rentas Temporales, Casas de Retiro & Ventas en Riviera",
  },
];

export function Agents() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp>
            <span className="section-label mx-auto justify-center">Agentes Destacados</span>
          </FadeUp>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            <RevealWords text="Conoce a Nuestros" baseDelay={0.1} className="justify-center" />
            <RevealWords text="Agentes" baseDelay={0.35} className="italic text-primary justify-center" />
          </h2>
          <FadeUp delay={0.3}>
            <p className="text-neutral-dark text-base font-sans">
              Profesionales altamente capacitados con la misión de brindarte un servicio personalizado, ético y de máxima calidad.
            </p>
          </FadeUp>
        </div>

        {/* Carousel Grid layout (mobile single card, desktop grid slider or multiple visible cards) */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
          {AGENTS.map((agent, index) => (
            <StaggerItem
              key={index}
              className="bg-white rounded-2xl p-6 border border-neutral-light/50 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 group"
            >
              {/* Profile Image with outline dot style */}
              <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden border-2 border-primary/20 p-1 bg-white">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Title & Info */}
              <h3 className="text-lg font-bold text-foreground font-sans">
                {agent.name}
              </h3>
              <p className="text-xs text-primary font-semibold tracking-wider uppercase mb-3 mt-1">
                {agent.role}
              </p>

              <span className="text-xs text-neutral-dark font-medium italic mb-4 block min-h-[32px] px-2">
                &ldquo;{agent.specialty}&rdquo;
              </span>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-6 text-yellow-500 bg-yellow-50 px-3 py-1 rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{agent.rating}</span>
                <span className="text-neutral-dark/60 font-medium font-sans">({agent.reviews})</span>
              </div>

              {/* Contact Button */}
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=Hola,%20me%20gustaria%20contactar%20al%20agente%20${encodeURIComponent(agent.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center inline-flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Contactar Agente
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
