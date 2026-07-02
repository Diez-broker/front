"use client";

import { useState } from "react";
import { FEATURED_PROPERTIES } from "@/data/properties";
import { PropertyCard } from "./PropertyCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeUp, RevealWords, Stagger, StaggerItem } from "./animations/Reveal";

const TABS = [
  { id: "all", label: "Todas" },
  { id: "casa", label: "Casas" },
  { id: "departamento", label: "Departamentos" },
  { id: "terreno", label: "Terrenos" },
  { id: "local", label: "Locales" },
];

export function FeaturedProperties() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProperties = FEATURED_PROPERTIES.filter((property) => {
    if (activeTab === "all") return true;
    
    const type = property.property_type.toLowerCase();
    if (activeTab === "casa") return type.includes("casa");
    if (activeTab === "departamento") return type.includes("departamento") || type.includes("depto");
    if (activeTab === "terreno") return type.includes("terreno");
    if (activeTab === "local") return type.includes("local") || type.includes("bodega") || type.includes("oficina");
    return true;
  });

  return (
    <section id="properties" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <FadeUp>
              <span className="section-label">Propiedades Destacadas</span>
            </FadeUp>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              <RevealWords text="Descubre las propiedades de" baseDelay={0.1} />
              <RevealWords text="Diez Brokers" baseDelay={0.4} className="italic text-primary" />
            </h2>
            <FadeUp delay={0.3}>
              <p className="text-neutral-dark text-base max-w-2xl font-sans">
                Una selección de nuestras mejores opciones residenciales, comerciales y terrenos listos para ti en las mejores zonas.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.4}>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-light transition-colors shrink-0 text-sm group"
            >
              Ver catálogo completo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeUp>
        </div>

        {/* Tab Pills */}
        <FadeUp delay={0.2} className="flex justify-start md:justify-center mb-8 md:mb-10 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          <div className="pill-tabs flex-nowrap w-max md:w-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pill-tab cursor-pointer ${activeTab === tab.id ? "active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <Stagger key={activeTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.slice(0, 6).map((property) => {
              const op = property.operations[0];
              return (
                <StaggerItem key={property.public_id}>
                  <PropertyCard
                    property={property}
                    operation={op?.type === "rental" ? "rental" : "sale"}
                  />
                </StaggerItem>
              );
            })}
          </Stagger>
        ) : (
          <div className="text-center py-16 bg-neutral-light/20 rounded-2xl border border-dashed border-neutral-light">
            <p className="text-neutral-dark font-medium mb-2">No se encontraron propiedades en esta categoría.</p>
            <Link href="/properties" className="text-sm font-semibold text-primary hover:underline">
              Ver todas las propiedades disponibles
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
