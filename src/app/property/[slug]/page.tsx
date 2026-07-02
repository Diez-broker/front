import { notFound } from "next/navigation";
import { getPropertyBySlug, PROPERTIES } from "@/data/properties";
import { PropertyDetail } from "@/components/PropertyDetail";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) {
    return { title: "Propiedad no encontrada | Diez Brokers" };
  }
  const op = property.operations[0];
  return {
    title: `${property.title} | Diez Brokers`,
    description: `${op?.formatted_amount} - ${property.location}. ${property.description ?? ""}`.slice(0, 160),
  };
}

export default async function PropertyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) {
    notFound();
  }
  return <PropertyDetail property={property} />;
}
