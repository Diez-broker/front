import { Suspense } from "react";
import Link from "next/link";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { MortgageWhatsAppCta } from "@/components/MortgageWhatsAppCta";
import { FAQ } from "@/components/FAQ";
import { FadeUp, RevealWords } from "@/components/animations/Reveal";

export const metadata = {
  title: "Simulador de crédito hipotecario | Diez Brokers",
  description:
    "Calcula tu mensualidad hipotecaria, compara escenarios de enganche y recibe asesoría personalizada con Diez Brokers.",
};

function CalculatorFallback() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-light/60 p-8 animate-pulse">
      <div className="h-6 bg-neutral-light/60 rounded w-1/3 mb-6" />
      <div className="space-y-4">
        <div className="h-12 bg-neutral-light/40 rounded" />
        <div className="h-12 bg-neutral-light/40 rounded" />
        <div className="h-12 bg-neutral-light/40 rounded" />
      </div>
    </div>
  );
}

export default function SimuladorPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-primary-dark text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1440")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary-dark" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="text-[10vw] font-serif font-black text-white/5 uppercase tracking-[0.2em] translate-y-[-5%]">
            SIMULADOR
          </span>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl pt-8">
          <FadeUp delay={0.1}>
            <span className="text-secondary-light text-xs font-bold uppercase tracking-[0.3em] mb-4 bg-primary/40 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm inline-block">
              Crédito hipotecario
            </span>
          </FadeUp>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white max-w-4xl leading-tight mb-6 tracking-tight">
            <RevealWords text="Simulador de crédito" baseDelay={0.3} className="justify-center" />
            <br />
            <RevealWords
              text="hipotecario"
              baseDelay={0.55}
              className="italic text-secondary-light justify-center"
            />
          </h1>
          <FadeUp delay={0.8}>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              Calcula tu mensualidad, compara enganches del 10% y 30%, y recibe
              asesoría para tu crédito bancario o Infonavit.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-12 md:py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <Suspense fallback={<CalculatorFallback />}>
            <MortgageCalculator showCta={false} />
          </Suspense>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white border-t border-neutral-light/40">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <FadeUp>
            <div className="text-center mb-8">
              <span className="section-label">Asesoría personalizada</span>
              <h2 className="text-3xl font-serif font-bold text-foreground mt-2">
                ¿Listo para dar el siguiente paso?
              </h2>
              <p className="text-neutral-dark text-sm mt-3">
                Comparte tu simulación por WhatsApp y un asesor de Diez Brokers
                te ayudará a precalificar tu crédito.
              </p>
            </div>
            <MortgageWhatsAppCta />
            <p className="text-center text-xs text-neutral-dark mt-4">
              También puedes explorar propiedades en{" "}
              <Link href="/properties" className="text-primary hover:underline">
                venta
              </Link>{" "}
              y simular el crédito desde cada ficha.
            </p>
          </FadeUp>
        </div>
      </section>

      <FAQ />
    </div>
  );
}
