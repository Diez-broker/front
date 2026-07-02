import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { COMPANY, SALE_PROPERTIES, RENTAL_PROPERTIES } from "@/data/properties";
import { FadeUp, RevealWords, Stagger, StaggerItem, ZoomReveal } from "./animations/Reveal";

export function Expertise() {
  const totalProperties = SALE_PROPERTIES.length + RENTAL_PROPERTIES.length;

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeUp>
              <span className="section-label">Sobre Diez Brokers</span>
            </FadeUp>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              <RevealWords text="Tu Hogar Ideal," baseDelay={0.1} />
              <br />
              <RevealWords text="Nuestra Experiencia." baseDelay={0.3} className="text-primary italic" />
            </h2>
            <FadeUp delay={0.3}>
              <p className="text-neutral-dark text-lg mb-8 leading-relaxed font-sans">
                {COMPANY.about}
              </p>
            </FadeUp>

            <Stagger className="space-y-4 mb-10" stagger={0.12}>
              {[
                "Servicio personalizado y de calidad",
                "Experiencia en compra, venta, alquiler y tasaciones",
                "Atención profesional en cada etapa del proceso",
              ].map((feature, i) => (
                <StaggerItem key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-foreground font-medium text-sm">{feature}</span>
                </StaggerItem>
              ))}
            </Stagger>

            <FadeUp delay={0.2}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-full font-medium transition-colors group text-sm"
              >
                Conócenos más
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>
          </div>

          <ZoomReveal className="relative" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="https://assets.easybroker.com/property_images/4952292/84493625/EB-SA2292.jpg?height=400&version=1736550553&width=600"
                    alt="Casa en Rinconada Santa Rita"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="https://assets.easybroker.com/property_images/5250917/90395435/EB-TE0917.jpg?height=300&version=1763763220&width=600"
                    alt="Casa en El Cielo Country Club"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="https://assets.easybroker.com/property_images/6059514/107160110/EB-WG9514.jpg?height=300&version=1781645255&width=600"
                    alt="Departamento en Jardines del Bosque"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="https://assets.easybroker.com/property_images/6012370/106159446/EB-WC2370.jpeg?height=400&version=1779472953&width=600"
                    alt="Departamento en Virreyes Residencial"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </ZoomReveal>
        </div>

        {/* Horizontal Stats Bar at the bottom */}
        <FadeUp className="bg-primary-dark rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 mt-12 md:mt-20 text-white shadow-xl relative overflow-hidden border border-white/5" y={60}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,156,74,0.15),transparent)] pointer-events-none"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 relative z-10 text-center">
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-secondary-light mb-1 sm:mb-2">
                {SALE_PROPERTIES.length}
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-white/70 uppercase tracking-wider">
                En Venta
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-secondary-light mb-1 sm:mb-2">
                {RENTAL_PROPERTIES.length}
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-white/70 uppercase tracking-wider">
                En Renta
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-secondary-light mb-1 sm:mb-2">
                5+
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-white/70 uppercase tracking-wider">
                Agentes
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-secondary-light mb-1 sm:mb-2">
                4+
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-white/70 uppercase tracking-wider">
                Ciudades
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 col-span-2 sm:col-span-1">
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-secondary-light mb-1 sm:mb-2">
                {totalProperties}
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-white/70 uppercase tracking-wider">
                Propiedades Totales
              </span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
