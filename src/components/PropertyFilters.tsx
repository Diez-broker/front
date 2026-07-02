"use client";

import { useState, useMemo } from "react";
import {
  MapPin,
  Home,
  DollarSign,
  Bed,
  Bath,
  Square,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PROPERTY_TYPES, STATES, MUNICIPALITIES } from "@/data/properties";
import {
  PropertySearchParams,
  PropertyOperationType,
  SortOption,
} from "@/types/easybroker";

interface PropertyFiltersProps {
  operation: PropertyOperationType;
  params: PropertySearchParams;
  onChange: (params: Partial<PropertySearchParams>) => void;
  onReset: () => void;
  resultCount: number;
}

const PRICE_SALE_RANGES = [
  { label: "Cualquier precio", value: "" },
  { label: "Hasta $5,000,000", value: "0-5000000" },
  { label: "$5,000,000 - $10,000,000", value: "5000000-10000000" },
  { label: "$10,000,000 - $20,000,000", value: "10000000-20000000" },
  { label: "$20,000,000 - $50,000,000", value: "20000000-50000000" },
  { label: "Más de $50,000,000", value: "50000000-" },
];

const PRICE_RENT_RANGES = [
  { label: "Cualquier precio", value: "" },
  { label: "Hasta $20,000", value: "0-20000" },
  { label: "$20,000 - $40,000", value: "20000-40000" },
  { label: "$40,000 - $80,000", value: "40000-80000" },
  { label: "Más de $80,000", value: "80000-" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Últimos publicados" },
  { value: "price_asc", label: "Precio (menor a mayor)" },
  { value: "price_desc", label: "Precio (mayor a menor)" },
];

function CollapsibleSection({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-light py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="flex items-center gap-2 font-heading font-semibold text-foreground">
          <Icon className="w-4 h-4 text-primary" />
          {title}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-neutral-dark transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

export function PropertyFilters({
  operation,
  params,
  onChange,
  onReset,
  resultCount,
}: PropertyFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const priceRanges =
    operation === "rental" ? PRICE_RENT_RANGES : PRICE_SALE_RANGES;

  const currentPriceRange = useMemo(() => {
    if (params.min_price === undefined && params.max_price === undefined)
      return "";
    const min = params.min_price ?? "";
    const max = params.max_price ?? "";
    return `${min}-${max}`;
  }, [params.min_price, params.max_price]);

  const handlePriceChange = (value: string) => {
    if (!value) {
      onChange({ min_price: undefined, max_price: undefined });
      return;
    }
    const [min, max] = value.split("-");
    onChange({
      min_price: min ? Number(min) : undefined,
      max_price: max ? Number(max) : undefined,
    });
  };

  const togglePropertyType = (type: string) => {
    const current = params.property_types ?? [];
    const next = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    onChange({ property_types: next });
  };

  const filterContent = (
    <div>
      <CollapsibleSection title="Ubicación" icon={MapPin}>
        <input
          type="text"
          placeholder="Ciudad, colonia, municipio..."
          className="w-full bg-neutral-light/50 border border-neutral-light rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          value={params.location ?? ""}
          onChange={(e) => onChange({ location: e.target.value || undefined })}
        />
        <select
          className="w-full mt-2 bg-neutral-light/50 border border-neutral-light rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          value={params.state ?? ""}
          onChange={(e) =>
            onChange({ state: e.target.value || undefined })
          }
        >
          <option value="">Todos los estados</option>
          {STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className="w-full mt-2 bg-neutral-light/50 border border-neutral-light rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          value={params.municipality ?? ""}
          onChange={(e) =>
            onChange({ municipality: e.target.value || undefined })
          }
        >
          <option value="">Todos los municipios</option>
          {MUNICIPALITIES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </CollapsibleSection>

      <CollapsibleSection title="Tipo de propiedad" icon={Home}>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {PROPERTY_TYPES.map((type) => {
            const checked = params.property_types?.includes(type) ?? false;
            return (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer text-sm text-foreground hover:text-primary"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => togglePropertyType(type)}
                  className="w-4 h-4 accent-primary"
                />
                {type}
              </label>
            );
          })}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title={operation === "rental" ? "Renta" : "Precio"} icon={DollarSign}>
        <select
          className="w-full bg-neutral-light/50 border border-neutral-light rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          value={currentPriceRange}
          onChange={(e) => handlePriceChange(e.target.value)}
        >
          {priceRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </CollapsibleSection>

      <CollapsibleSection title="Recámaras" icon={Bed} defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-neutral-dark font-medium uppercase tracking-wider">
              Mínimo
            </label>
            <select
              className="w-full mt-1 bg-neutral-light/50 border border-neutral-light rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              value={params.min_bedrooms ?? ""}
              onChange={(e) =>
                onChange({
                  min_bedrooms: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            >
              <option value="">Cualquiera</option>
              {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? "Estudio" : `${n}+`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-neutral-dark font-medium uppercase tracking-wider">
              Máximo
            </label>
            <select
              className="w-full mt-1 bg-neutral-light/50 border border-neutral-light rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              value={params.max_bedrooms ?? ""}
              onChange={(e) =>
                onChange({
                  max_bedrooms: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            >
              <option value="">Cualquiera</option>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Baños" icon={Bath} defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-neutral-dark font-medium uppercase tracking-wider">
              Mínimo
            </label>
            <select
              className="w-full mt-1 bg-neutral-light/50 border border-neutral-light rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              value={params.min_bathrooms ?? ""}
              onChange={(e) =>
                onChange({
                  min_bathrooms: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            >
              <option value="">Cualquiera</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-neutral-dark font-medium uppercase tracking-wider">
              Máximo
            </label>
            <select
              className="w-full mt-1 bg-neutral-light/50 border border-neutral-light rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              value={params.max_bathrooms ?? ""}
              onChange={(e) =>
                onChange({
                  max_bathrooms: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            >
              <option value="">Cualquiera</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Construcción (m²)" icon={Square} defaultOpen={false}>
        <input
          type="number"
          min={0}
          placeholder="Mínimo de m² construidos"
          className="w-full bg-neutral-light/50 border border-neutral-light rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          value={params.min_construction ?? ""}
          onChange={(e) =>
            onChange({
              min_construction: e.target.value
                ? Number(e.target.value)
                : undefined,
            })
          }
        />
      </CollapsibleSection>

      <div className="pt-4">
        <button
          onClick={onReset}
          className="w-full text-sm font-medium text-primary hover:text-primary-dark border border-primary/30 hover:border-primary rounded-lg py-2 transition-colors"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden flex items-center justify-between mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
        </button>
        <span className="text-sm text-neutral-dark">
          {resultCount} {resultCount === 1 ? "propiedad" : "propiedades"}
        </span>
      </div>

      <aside className="hidden lg:block bg-white rounded-2xl border border-neutral-light p-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-lg text-foreground">
            Filtros
          </h3>
          <span className="text-xs text-neutral-dark bg-neutral-light px-2 py-1 rounded-full">
            {resultCount} {resultCount === 1 ? "resultado" : "resultados"}
          </span>
        </div>
        {filterContent}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-black/50 flex">
          <div className="bg-white w-full max-w-sm h-full overflow-y-auto p-6 ml-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-xl text-foreground">
                Filtros
              </h3>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>
            {filterContent}
            <button
              onClick={() => setMobileOpen(false)}
              className="w-full mt-6 bg-primary text-white font-medium py-3 rounded-full"
            >
              Ver {resultCount} resultados
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export { SORT_OPTIONS };
