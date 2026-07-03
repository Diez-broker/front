"use client";

import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { FadeUp, RevealWords } from "@/components/animations/Reveal";

export function MortgagePromo() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-neutral-light/40">
      <div className="container mx-auto px-4 md:px-8">
        <FadeUp className="bg-background rounded-3xl border border-neutral-light/60 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="section-label">Crédito hipotecario</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 mb-4">
              <RevealWords text="Calcula tu mensualidad" baseDelay={0.1} />
              <br />
              <RevealWords
                text="antes de comprar"
                baseDelay={0.3}
                className="text-primary italic"
              />
            </h2>
            <p className="text-neutral-dark text-sm md:text-base max-w-xl leading-relaxed">
              Usa nuestro simulador para estimar enganche, monto del crédito y
              mensualidad. Compara escenarios del 10% y 30% como en los bancos
              principales.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href="/simulador"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-medium px-8 py-4 rounded-full transition-colors text-sm"
            >
              <Calculator className="w-4 h-4" />
              Ir al simulador
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary/5 font-medium px-8 py-4 rounded-full transition-colors text-sm"
            >
              Asesoría personalizada
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
