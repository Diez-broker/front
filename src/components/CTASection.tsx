import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { COMPANY } from "@/data/properties";
import { FadeUp, RevealWords, ZoomReveal } from "@/components/animations/Reveal";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Rounded Banner Card like reference */}
        <FadeUp y={60} className="bg-primary-dark rounded-3xl text-white relative overflow-hidden shadow-2xl border border-white/5">
          {/* Decorative gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(120,156,74,0.12),transparent)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,89,0.25),transparent)] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 px-5 py-10 sm:px-8 sm:py-16 md:p-20">
            
            {/* Left Column: Text & Buttons (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-secondary-light text-xs font-bold uppercase tracking-[0.25em] block">
                Trabajemos Juntos
              </span>
              
              <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
                <RevealWords text="¿Listo para encontrar tu hogar ideal con" baseDelay={0.2} className="!justify-start" />
                <RevealWords text="Diez Brokers?" baseDelay={0.7} className="italic text-secondary-light !justify-start" />
              </h2>
              
              <p className="text-white/80 text-sm md:text-base max-w-xl font-sans leading-relaxed">
                Ya sea que busques comprar, vender o rentar, nuestro equipo te garantiza un proceso ágil, seguro y profesional.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-light text-white font-bold px-8 py-4 rounded-full transition-colors text-xs uppercase tracking-wider shadow-lg hover:shadow-secondary/20"
                >
                  Contáctanos Hoy
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/10 hover:border-white text-white font-bold px-8 py-4 rounded-full transition-colors text-xs uppercase tracking-wider"
                >
                  WhatsApp
                </a>
              </div>

              {/* Contact details */}
              <div className="flex flex-col sm:flex-row gap-6 md:gap-8 border-t border-white/10 pt-8 mt-8 text-xs font-medium text-white/60">
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4.5 h-4.5 text-secondary-light" />
                  <span>Llámanos: {COMPANY.phoneDisplay}</span>
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4.5 h-4.5 text-secondary-light" />
                  <span>Escríbenos: {COMPANY.email}</span>
                </a>
              </div>
            </div>

            {/* Right Column: House Model Image (5 cols) */}
            <div className="lg:col-span-5 relative w-full h-[300px] md:h-[400px] flex items-center justify-center">
              <ZoomReveal delay={0.3} className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-white/10">
                <Image
                  src="/cta-house-model.png"
                  alt="Modelo de Casa Diez Brokers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </ZoomReveal>
            </div>

          </div>
        </FadeUp>

      </div>
    </section>
  );
}
