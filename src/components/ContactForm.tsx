"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/data/properties";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  propertyTitle?: string;
  propertyId?: string;
  compact?: boolean;
  initialMessage?: string;
  initialSubject?: string;
}

function buildDefaultMessage(
  propertyTitle?: string,
  propertyId?: string
): string {
  if (!propertyTitle) return "";
  return `Estoy interesado en la propiedad "${propertyTitle}" (${propertyId}). Me gustaría más información.`;
}

export function ContactForm({
  propertyTitle,
  propertyId,
  compact = false,
  initialMessage,
  initialSubject,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message:
      initialMessage ?? buildDefaultMessage(propertyTitle, propertyId),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject =
      initialSubject ??
      (propertyTitle
        ? `Interés en propiedad: ${propertyTitle} (${propertyId})`
        : "Contacto desde el sitio web");
    const body = `Nombre: ${form.name}
Email: ${form.email}
Teléfono: ${form.phone}

Mensaje:
${form.message}`;
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "bg-white rounded-2xl border border-neutral-light p-8 text-center",
          !compact && "shadow-sm"
        )}
      >
        <CheckCircle2 className="w-12 h-12 text-secondary mx-auto mb-4" />
        <h3 className="text-xl font-heading font-bold text-foreground mb-2">
          ¡Gracias por contactarnos!
        </h3>
        <p className="text-neutral-dark mb-6">
          Hemos abierto tu cliente de correo. Te responderemos a la brevedad. Si
          prefieres, escríbenos directo por WhatsApp.
        </p>
        <a
          href={`https://wa.me/${COMPANY.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary hover:bg-primary-light text-white font-medium px-6 py-3 rounded-full transition-colors"
        >
          Escribir por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "bg-white rounded-2xl border border-neutral-light p-6 md:p-8",
        !compact && "shadow-sm"
      )}
    >
      <h3 className="text-xl font-heading font-bold text-foreground mb-1">
        {propertyTitle ? "Solicita información" : "Contáctanos"}
      </h3>
      <p className="text-sm text-neutral-dark mb-6">
        Llena este formulario y un miembro de nuestro equipo te contactará a la
        brevedad.
      </p>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-neutral-dark uppercase tracking-wider">
            Nombre completo
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full mt-1 bg-neutral-light/50 border border-neutral-light rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            placeholder="Tu nombre"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-neutral-dark uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-1 bg-neutral-light/50 border border-neutral-light rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-dark uppercase tracking-wider">
              Teléfono
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full mt-1 bg-neutral-light/50 border border-neutral-light rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              placeholder="Tu teléfono"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-neutral-dark uppercase tracking-wider">
            Mensaje
          </label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full mt-1 bg-neutral-light/50 border border-neutral-light rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary resize-none"
            placeholder="Cuéntanos qué necesitas..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-light text-white font-medium py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors"
        >
          <Send className="w-4 h-4" />
          Enviar mensaje
        </button>

        <p className="text-xs text-neutral-dark text-center">
          También puedes escribirnos directo a{" "}
          <a
            href={`mailto:${COMPANY.email}`}
            className="text-primary hover:underline"
          >
            {COMPANY.email}
          </a>
        </p>
      </div>
    </form>
  );
}
