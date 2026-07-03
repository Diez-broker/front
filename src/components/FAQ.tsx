"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FadeUp, RevealWords } from "@/components/animations/Reveal";

const FAQS: { question: string; answer: ReactNode }[] = [
  {
    question: "¿Cómo inicio la búsqueda de una propiedad con Diez Brokers?",
    answer: "Es muy sencillo. Puedes explorar nuestro catálogo online filtrando por ubicación y presupuesto, o bien hacer una solicitud directa a través de nuestro formulario de contacto o WhatsApp. Te asignaremos un asesor experto que te acompañará de inicio a fin.",
  },
  {
    question: "¿Qué servicios ofrece Diez Brokers para compradores primerizos?",
    answer: "Ofrecemos asesoría completa paso a paso: desde el análisis de tu presupuesto, pre-calificación para créditos hipotecarios bancarios o Infonavit, búsqueda de opciones ideales, visitas guiadas, negociación de precios y todo el trámite notarial.",
  },
  {
    question: "¿Puedo simular mi crédito hipotecario antes de comprar?",
    answer: (
      <>
        Sí. En nuestro{" "}
        <Link href="/simulador" className="text-primary font-semibold hover:underline">
          simulador hipotecario
        </Link>{" "}
        puedes estimar enganche, monto del crédito y mensualidad comparando
        escenarios del 10% y 30%. También puedes simular desde la ficha de
        cualquier propiedad en venta.
      </>
    ),
  },
  {
    question: "¿Puede Diez Brokers ayudarme a vender mi propiedad?",
    answer: "Sí, claro. Realizamos una valuación comercial profesional, diseñamos un plan de marketing digital enfocado, tomamos fotografía profesional y promovemos tu propiedad en los portales más importantes de México y con nuestra red exclusiva de inversionistas.",
  },
  {
    question: "¿En qué tipos de propiedades se especializa Diez Brokers?",
    answer: "Nos especializamos en propiedades de nivel medio y residencial premium en Jalisco (Guadalajara, Zapopan, Tlajomulco, Puerto Vallarta), abarcando casas de lujo, departamentos exclusivos, terrenos residenciales/industriales y locales comerciales.",
  },
  {
    question: "¿Las visitas a las propiedades tienen algún costo?",
    answer: "No, las visitas y la asesoría de búsqueda son completamente gratuitas para el comprador. Nuestros honorarios se gestionan directamente con la parte vendedora o desarrolladora del inmueble.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left / Info column (lg: 5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <FadeUp>
              <span className="section-label">Preguntas Frecuentes</span>
            </FadeUp>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              <RevealWords text="Resolvemos tus" baseDelay={0.1} />
              <br />
              <RevealWords text="Dudas Inmobiliarias" baseDelay={0.3} className="text-primary italic" />
            </h2>
            <FadeUp delay={0.3}>
              <p className="text-neutral-dark text-base font-sans mb-8">
                Encuentra respuestas rápidas a las preguntas más habituales sobre la compra, venta y arrendamiento de bienes raíces con nosotros.
              </p>
            </FadeUp>
            <FadeUp delay={0.4} className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <p className="text-sm font-semibold text-primary mb-2">¿Tienes otra pregunta?</p>
              <p className="text-xs text-neutral-dark mb-4 font-sans">Escríbenos directamente y un asesor experto resolverá tu caso de inmediato.</p>
              <a
                href="/contact"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-light"
              >
                Enviar mensaje &rarr;
              </a>
            </FadeUp>
          </div>

          {/* Right / Accordions column (lg: 7 cols) */}
          <FadeUp delay={0.2} className="lg:col-span-7 divide-y divide-neutral-light/60 border-t border-b border-neutral-light/60">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="py-5">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full text-left font-serif font-bold text-lg text-foreground hover:text-primary transition-colors cursor-pointer group"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <div className="w-8 h-8 rounded-full bg-neutral-light/30 group-hover:bg-primary/10 flex items-center justify-center transition-colors shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-primary" />
                      ) : (
                        <Plus className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-neutral-dark text-sm leading-relaxed pt-3 font-sans max-w-xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
