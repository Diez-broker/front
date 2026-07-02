"use client";

import { useEffect, useMemo } from "react";
import { usePropertyStore } from "@/store/usePropertyStore";
import { PropertyCard } from "./PropertyCard";
import { PropertyFilters, SORT_OPTIONS } from "./PropertyFilters";
import {
  PropertyOperationType,
  PropertySearchParams,
  SortOption,
} from "@/types/easybroker";
import { ChevronDown } from "lucide-react";
import { FadeUp, RevealWords, Stagger, StaggerItem } from "@/components/animations/Reveal";

interface PropertyListPageProps {
  operation: PropertyOperationType;
  title: string;
  subtitle?: string;
  initialParams?: PropertySearchParams;
}

export function PropertyListPage({
  operation,
  title,
  subtitle,
  initialParams,
}: PropertyListPageProps) {
  const { filteredProperties, searchParams, setSearchParams, resetFilters } =
    usePropertyStore();

  useEffect(() => {
    setSearchParams({
      operation_type: operation,
      ...initialParams,
      sort: initialParams?.sort ?? "newest",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operation]);

  const operationFiltered = useMemo(() => {
    return filteredProperties.filter((p) =>
      p.operations.some((op) => op.type === operation)
    );
  }, [filteredProperties, operation]);

  const handleSortChange = (value: string) => {
    setSearchParams({ sort: value as SortOption });
  };

  const hasActiveFilters = useMemo(() => {
    const p = searchParams;
    return (
      !!p.location ||
      !!p.state ||
      !!p.municipality ||
      (p.property_types && p.property_types.length > 0) ||
      p.min_price !== undefined ||
      p.max_price !== undefined ||
      p.min_bedrooms !== undefined ||
      p.max_bedrooms !== undefined ||
      p.min_bathrooms !== undefined ||
      p.max_bathrooms !== undefined ||
      p.min_construction !== undefined ||
      p.min_lot !== undefined
    );
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      
      {/* 1. HERO BANNER */}
      <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 bg-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1440")` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary-dark"></div>
        
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="text-[14vw] font-serif font-black text-white/5 uppercase tracking-[0.2em] translate-y-[-5%]">
            CATALOGO
          </span>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl pt-8">
          <FadeUp delay={0.1}>
            <span className="text-secondary-light text-xs font-bold uppercase tracking-[0.3em] mb-4 bg-primary/40 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm inline-block">
              {operation === "sale" ? "Compra" : "Renta"}
            </span>
          </FadeUp>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white max-w-4xl leading-tight mb-4 tracking-tight">
            <RevealWords text={title} baseDelay={0.3} className="justify-center" />
          </h1>
          {subtitle && (
            <FadeUp delay={0.7}>
              <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
                {subtitle}
              </p>
            </FadeUp>
          )}
        </div>
      </section>

      {/* 2. FILTER & LIST CONTAINER */}
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10">
          
          {/* Filters column */}
          <div className="lg:sticky lg:top-24 self-start">
            <PropertyFilters
              operation={operation}
              params={searchParams}
              onChange={setSearchParams}
              onReset={resetFilters}
              resultCount={operationFiltered.length}
            />
          </div>

          {/* List column */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4 border-b border-neutral-light/50 pb-4">
              <p className="text-sm font-semibold text-neutral-dark hidden lg:block">
                {operationFiltered.length}{" "}
                {operationFiltered.length === 1
                  ? "propiedad encontrada"
                  : "propiedades encontradas"}
              </p>
              
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <label className="text-xs font-bold text-neutral-dark uppercase tracking-wider hidden sm:inline">
                  Ordenar por:
                </label>
                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-neutral-light/80 rounded-full pl-4 pr-10 py-2 text-xs font-bold text-foreground outline-none focus:border-primary cursor-pointer shadow-sm hover:border-neutral-dark/40 transition-colors"
                    value={searchParams.sort ?? "newest"}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-dark absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {operationFiltered.length > 0 ? (
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" stagger={0.06}>
                {operationFiltered.map((property) => (
                  <StaggerItem key={property.public_id}>
                    <PropertyCard
                      property={property}
                      operation={operation === "temporary_rental" ? "rental" : operation}
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <div className="py-24 text-center bg-white rounded-3xl border border-neutral-light/50 shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-2 font-sans">
                  No se encontraron propiedades
                </h3>
                <p className="text-neutral-dark text-sm mb-8 max-w-md mx-auto font-sans">
                  Ajusta tus filtros de búsqueda para encontrar lo que buscas.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-colors"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
