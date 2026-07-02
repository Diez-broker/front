import { PropertyForList } from "@/types/easybroker";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: PropertyForList;
  operation?: "sale" | "rental";
  className?: string;
}

export function PropertyCard({
  property,
  operation,
  className,
}: PropertyCardProps) {
  const op =
    property.operations.find((o) => o.type === operation) ??
    property.operations[0];
  const price = op?.formatted_amount ?? "Precio a consultar";
  const isRental = op?.type === "rental";

  return (
    <Link
      href={`/property/${property.slug}`}
      className={cn(
        "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-light/50 group cursor-pointer block hover:-translate-y-1",
        className
      )}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.title_image_thumb || property.title_image_full}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
          {isRental ? "En Renta" : "En Venta"}
        </div>
        {property.featured && (
          <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
            Destacada
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-2xl font-serif font-black text-primary line-clamp-1 flex-1">
            {price}
            {isRental && <span className="text-xs font-normal text-neutral-dark font-sans"> /mes</span>}
          </h3>
          {property.property_type && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/15 px-2.5 py-1 rounded-full shrink-0">
              {property.property_type}
            </span>
          )}
        </div>

        <h4 className="text-base font-semibold text-foreground mb-1 line-clamp-1 font-sans">
          {property.title}
        </h4>

        <div className="flex items-center text-neutral-dark mb-4 text-xs font-medium">
          <MapPin className="w-3.5 h-3.5 mr-1 shrink-0 text-primary" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-dark border-t border-neutral-light/50 pt-4 mt-2">
          {property.bedrooms !== undefined && (
            <span>
              {property.bedrooms} {property.bedrooms === 1 ? "Rec." : "Recs."}
            </span>
          )}
          {property.bedrooms !== undefined && property.bathrooms !== undefined && (
            <span className="text-neutral-light font-bold">•</span>
          )}
          {property.bathrooms !== undefined && (
            <span>
              {property.bathrooms} {property.bathrooms === 1 ? "Baño" : "Baños"}
            </span>
          )}
          {property.bathrooms !== undefined && property.construction_size !== undefined && (
            <span className="text-neutral-light font-bold">•</span>
          )}
          {property.construction_size !== undefined && (
            <span>{property.construction_size} m²</span>
          )}
        </div>
      </div>
    </Link>
  );
}
