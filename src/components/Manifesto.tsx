import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp, RevealWords } from "./animations/Reveal";

export function Manifesto() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <span className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw]">
        Diez
      </span>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <span className="section-label justify-center">Nuestra filosofía</span>
          </FadeUp>

          <h2 className="text-3xl md:text-4xl lg:text-[3.25rem] font-serif font-bold text-foreground mb-8 md:mb-10 leading-[1.15] mt-4">
            <RevealWords text="Un enfoque deliberado" baseDelay={0.1} />
            <br />
            <RevealWords
              text="en bienes raíces de alto valor"
              baseDelay={0.35}
              className="italic text-primary font-light"
            />
          </h2>

          <FadeUp delay={0.2}>
            <p className="text-neutral-dark text-base md:text-lg leading-relaxed font-sans max-w-3xl mx-auto mb-6">
              En Diez Brokers nos enfocamos en un número selecto de propiedades curadas,
              no en volumen. Cada operación recibe atención personalizada — desde la
              búsqueda hasta el cierre — con conocimiento profundo del mercado en
              Guadalajara, Zapopan y la Riviera de Jalisco.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="text-neutral-dark/80 text-sm md:text-base leading-relaxed font-sans max-w-2xl mx-auto mb-10">
              Mantenemos supervisión directa en cada etapa del proceso inmobiliario,
              alineados con las expectativas de quienes buscan calidad, funcionalidad
              y valor duradero en su inversión.
            </p>
          </FadeUp>

          <FadeUp delay={0.4}>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-widest hover:text-primary-light transition-colors group"
            >
              Conoce nuestra historia
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
