import { PropertyListPage } from "@/components/PropertyListPage";
import { PropertySearchParams } from "@/types/easybroker";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function parseSearchParams(
  sp: { [key: string]: string | string[] | undefined }
): PropertySearchParams {
  const get = (key: string) => {
    const v = sp[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const tipo = get("tipo");
  const ubicacion = get("ubicacion");
  const estado = get("estado");
  const municipio = get("municipio");
  const minPrice = get("min_precio");
  const maxPrice = get("max_precio");
  const minRec = get("min_recamaras");
  const maxRec = get("max_recamaras");
  const minBanos = get("min_banos");
  const maxBanos = get("max_banos");
  const minConstruccion = get("min_construccion");
  const sort = get("orden");

  return {
    operation_type: "sale",
    property_types: tipo ? [tipo] : undefined,
    location: ubicacion,
    state: estado,
    municipality: municipio,
    min_price: minPrice ? Number(minPrice) : undefined,
    max_price: maxPrice ? Number(maxPrice) : undefined,
    min_bedrooms: minRec ? Number(minRec) : undefined,
    max_bedrooms: maxRec ? Number(maxRec) : undefined,
    min_bathrooms: minBanos ? Number(minBanos) : undefined,
    max_bathrooms: maxBanos ? Number(maxBanos) : undefined,
    min_construction: minConstruccion ? Number(minConstruccion) : undefined,
    sort:
      sort === "price_asc" || sort === "price_desc" || sort === "newest"
        ? sort
        : "newest",
  };
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const initialParams = parseSearchParams(sp);

  return (
    <PropertyListPage
      operation="sale"
      title="Propiedades en Venta"
      subtitle="Explora nuestra selección de propiedades en venta en Jalisco, Puerto Vallarta y más."
      initialParams={initialParams}
    />
  );
}
