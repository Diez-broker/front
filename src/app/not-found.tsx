import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background flex items-center">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <p className="text-7xl md:text-9xl font-heading font-bold text-primary mb-4">
          404
        </p>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
          Página no encontrada
        </h1>
        <p className="text-neutral-dark mb-8 max-w-md mx-auto">
          La página que buscas no existe o fue movida. Verifica el enlace o
          regresa al inicio.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-medium px-6 py-3 rounded-full transition-colors"
          >
            <Home className="w-5 h-5" />
            Volver al inicio
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 bg-white border border-neutral-light hover:border-primary text-foreground font-medium px-6 py-3 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
            Ver propiedades
          </Link>
        </div>
      </div>
    </div>
  );
}
