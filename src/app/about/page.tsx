import { COMPANY, SALE_PROPERTIES, RENTAL_PROPERTIES } from "@/data/properties";
import { CheckCircle2, Award, Heart, Shield, Eye, Target, Compass } from "lucide-react";
import Image from "next/image";
import { Agents } from "@/components/Agents";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { FadeUp, RevealWords, Stagger, StaggerItem, ZoomReveal } from "@/components/animations/Reveal";

export const metadata = {
  title: "Nosotros | Diez Brokers",
  description:
    "Conoce la historia, misión, visión y los valores de Diez Brokers. Somos un equipo apasionado por brindarte el mejor servicio inmobiliario en Jalisco.",
};

const VALUES = [
  {
    icon: Target,
    title: "Nuestra Misión",
    description:
      "Brindar un servicio inmobiliario personalizado de excelencia, superando las expectativas de nuestros clientes con honestidad, profesionalismo y el uso de tecnologías de vanguardia.",
  },
  {
    icon: Eye,
    title: "Nuestra Visión",
    description:
      "Ser la consultora de bienes raíces líder y de mayor confianza en Jalisco y la Riviera, reconocida por la calidad humana y profesional de nuestro equipo y la exclusividad de nuestro portafolio.",
  },
  {
    icon: Compass,
    title: "Nuestra Filosofía",
    description:
      "Creemos que cada cliente busca más que una propiedad: busca un proyecto de vida. Orientamos cada decisión para asegurar inversiones sólidas y hogares felices.",
  },
];

const PHILOSOPHIES = [
  {
    icon: Award,
    title: "Excelencia Profesional",
    description: "Nos capacitamos constantemente para entender las tendencias del mercado inmobiliario local.",
  },
  {
    icon: Shield,
    title: "Confianza & Seguridad",
    description: "Cada contrato, revisión legal e intermediación se realiza con absoluta transparencia y apego a la ley.",
  },
  {
    icon: Heart,
    title: "Empatía & Pasión",
    description: "Nos ponemos en tus zapatos para entender lo que realmente necesitas y darte soluciones reales.",
  },
];

export default function AboutPage() {
  const totalProperties = SALE_PROPERTIES.length + RENTAL_PROPERTIES.length;

  return (
    <div className="min-h-screen bg-background">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: `url("${COMPANY.aboutImage}")` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/90 to-primary-dark"></div>
        
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="text-[11vw] font-serif font-black text-white/5 uppercase tracking-[0.2em] translate-y-[-5%]">
            NOSOTROS
          </span>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl pt-8">
          <FadeUp delay={0.1}>
            <span className="text-secondary-light text-xs font-bold uppercase tracking-[0.3em] mb-4 bg-primary/40 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm inline-block">
              ¿Quiénes somos?
            </span>
          </FadeUp>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white max-w-4xl leading-tight mb-6 tracking-tight">
            <RevealWords text="Llevando la experiencia inmobiliaria" baseDelay={0.3} className="justify-center" />
            <br />
            <RevealWords text="al siguiente nivel" baseDelay={0.65} className="italic text-secondary-light justify-center" />
          </h1>
          <FadeUp delay={0.9}>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              En Diez Brokers, combinamos trayectoria, valores sólidos y atención premium para ayudarte a concretar tus metas residenciales y comerciales en Jalisco.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 2. STATS BAR (Aesthetic & premium block) */}
      <section className="relative z-20 -mt-10 max-w-5xl mx-auto px-4">
        <FadeUp delay={0.3} y={50} className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-light/50 grid grid-cols-2 gap-4 sm:gap-6 text-center">
          <div className="p-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary mb-1">
              {SALE_PROPERTIES.length}
            </p>
            <p className="text-[10px] md:text-xs font-semibold text-neutral-dark uppercase tracking-wider">
              En Venta
            </p>
          </div>
          <div className="p-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary mb-1">
              {RENTAL_PROPERTIES.length}
            </p>
            <p className="text-[10px] md:text-xs font-semibold text-neutral-dark uppercase tracking-wider">
              En Renta
            </p>
          </div>
          <div className="p-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary mb-1">
              4+
            </p>
            <p className="text-[10px] md:text-xs font-semibold text-neutral-dark uppercase tracking-wider">
              Ciudades
            </p>
          </div>
          <div className="p-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary mb-1">
              100%
            </p>
            <p className="text-[10px] md:text-xs font-semibold text-neutral-dark uppercase tracking-wider">
              Atención Personalizada
            </p>
          </div>
        </FadeUp>
      </section>

      {/* 3. HISTORIA & VALORES (Two Column Layout) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Story text */}
            <div>
              <FadeUp>
                <span className="section-label">Trayectoria</span>
              </FadeUp>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                <RevealWords text="Nuestra Historia &" baseDelay={0.1} />
                <br />
                <RevealWords text="Compromiso Inmobiliario" baseDelay={0.3} className="text-primary italic" />
              </h2>
              <FadeUp delay={0.3}>
                <p className="text-neutral-dark text-base mb-8 leading-relaxed font-sans">
                  {COMPANY.about}
                </p>
              </FadeUp>

              <Stagger className="space-y-4 mb-8" stagger={0.12}>
                {[
                  "Asesoría legal, fiscal e inmobiliaria integrada",
                  "Promoción masiva en los principales portales de México",
                  "Reportes periódicos y transparencia total en la negociación",
                ].map((feature, i) => (
                  <StaggerItem key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span className="text-foreground text-sm font-medium">{feature}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Asymmetric imagery block */}
            <ZoomReveal className="relative" delay={0.2}>
              <div className="relative h-[350px] md:h-[480px] rounded-3xl overflow-hidden shadow-xl border border-neutral-light/30">
                <Image
                  src={COMPANY.aboutImage}
                  alt="Equipo Diez Brokers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover transition-transform duration-500 hover:scale-102"
                  priority
                />
              </div>
            </ZoomReveal>

          </div>
        </div>
      </section>

      {/* 4. MISIÓN, VISIÓN & ENFOQUE (Values layout with circular icons) */}
      <section className="py-24 bg-background border-t border-b border-neutral-light/30 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeUp>
              <span className="section-label mx-auto justify-center">Nuestra Filosofía</span>
            </FadeUp>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              <RevealWords text="Misión, Visión & Enfoque" baseDelay={0.1} className="justify-center" />
            </h2>
            <FadeUp delay={0.3}>
              <p className="text-neutral-dark text-base font-sans">
                Guiados por principios firmes para ofrecer la mejor experiencia en la compra, venta o renta de tu hogar.
              </p>
            </FadeUp>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.12}>
            {VALUES.map((val, idx) => (
              <StaggerItem key={idx} className="bg-white rounded-3xl p-8 border border-neutral-light/50">
                <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center mb-6 text-white shadow-md">
                  <val.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 font-sans">
                  {val.title}
                </h3>
                <p className="text-neutral-dark text-sm leading-relaxed font-sans">
                  {val.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

        </div>
      </section>

      {/* 5. DIFERENCIADORES CLAVE */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4">
              <FadeUp>
                <span className="section-label">¿Por qué nosotros?</span>
              </FadeUp>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 leading-tight">
                <RevealWords text="Nuestros Valores" baseDelay={0.1} />
                <br />
                <RevealWords text="Diferenciales" baseDelay={0.25} className="text-primary italic" />
              </h2>
              <FadeUp delay={0.3}>
                <p className="text-neutral-dark text-sm leading-relaxed font-sans">
                  No solo cerramos tratos: forjamos relaciones duraderas fundamentadas en los más altos estándares éticos.
                </p>
              </FadeUp>
            </div>

            <Stagger className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6" stagger={0.12}>
              {PHILOSOPHIES.map((phi, i) => (
                <StaggerItem key={i} className="bg-background rounded-2xl p-6 border border-neutral-light/40">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <phi.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2 font-sans">{phi.title}</h3>
                  <p className="text-neutral-dark text-xs leading-relaxed font-sans">{phi.description}</p>
                </StaggerItem>
              ))}
            </Stagger>

          </div>
        </div>
      </section>

      {/* 6. TEAM / EQUIPO */}
      <Agents />

      {/* 7. PREGUNTAS FRECUENTES */}
      <FAQ />

      {/* 8. CTA FINAL */}
      <CTASection />

    </div>
  );
}
