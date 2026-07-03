"use client";

import { COMPANY } from "@/data/properties";
import { WhatsAppIcon } from "./WhatsAppIcon";

const DEFAULT_MESSAGE =
  "Hola, acabo de usar el simulador hipotecario de Diez Brokers y me gustaría recibir asesoría para precalificar mi crédito.";

interface MortgageWhatsAppCtaProps {
  message?: string;
  variant?: "section" | "inline";
}

export function MortgageWhatsAppCta({
  message = DEFAULT_MESSAGE,
  variant = "section",
}: MortgageWhatsAppCtaProps) {
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;

  if (variant === "inline") {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1faa50] text-white font-medium px-6 py-3.5 rounded-full transition-colors text-sm w-full sm:w-auto"
      >
        <WhatsAppIcon className="w-5 h-5 shrink-0" />
        Continuar por WhatsApp con tu simulación
      </a>
    );
  }

  return (
    <div className="bg-background rounded-2xl border border-neutral-light/60 p-8 md:p-10 text-center">
      <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center mx-auto mb-5 shadow-md shadow-[#25D366]/25">
        <WhatsAppIcon className="w-9 h-9 text-white" />
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
        Asesoría personalizada
      </p>
      <p className="text-neutral-dark text-sm max-w-md mx-auto mb-6 leading-relaxed">
        Escríbenos por WhatsApp y un asesor de Diez Brokers te ayudará a
        revisar tu simulación, resolver dudas y dar el siguiente paso hacia tu
        crédito.
      </p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1faa50] text-white font-medium px-8 py-4 rounded-full transition-colors text-sm shadow-lg shadow-[#25D366]/20"
      >
        <WhatsAppIcon className="w-5 h-5 shrink-0" />
        Escribir por WhatsApp
      </a>
    </div>
  );
}
