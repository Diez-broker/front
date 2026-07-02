import { ContactForm } from "@/components/ContactForm";
import { Home, TrendingUp, Shield, DollarSign } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { FadeUp, RevealWords, Stagger, StaggerItem } from "@/components/animations/Reveal";

export const metadata = {
  title: "Propietarios | Diez Brokers",
  description:
    "¿Quieres vender o rentar tu propiedad? En Diez Brokers te ayudamos a publicar, tasar y encontrar el comprador o inquilino ideal.",
};

const BENEFITS = [
  {
    icon: DollarSign,
    title: "Tasación Profesional",
    description:
      "Realizamos una valuación de tu propiedad para establecer el precio correcto y atraer compradores serios.",
  },
  {
    icon: TrendingUp,
    title: "Mayor Alcance",
    description:
      "Publicamos tu propiedad en múltiples portales y redes sociales para maximizar su visibilidad.",
  },
  {
    icon: Shield,
    title: "Asesoría Legal & Fiscal",
    description:
      "Te acompañamos en cada etapa del proceso con revisión de contratos, impuestos y trámites notariales.",
  },
  {
    icon: Home,
    title: "Filtrado de Prospectos",
    description:
      "Calificamos a los interesados para que solo recibas visitas de clientes serios con capacidad de compra.",
  },
];

export default function OwnersPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15" style={{ backgroundImage: `url("https://assets.easybroker.com/property_images/4952292/84493625/EB-SA2292.jpg?height=400&version=1736550553&width=600")` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary-dark"></div>
        
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="text-[14vw] font-serif font-black text-white/5 uppercase tracking-[0.2em] translate-y-[-5%]">
            DUEÑOS
          </span>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl pt-8">
          <FadeUp delay={0.1}>
            <span className="text-secondary-light text-xs font-bold uppercase tracking-[0.3em] mb-4 bg-primary/40 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm inline-block">
              Propietarios
            </span>
          </FadeUp>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white max-w-4xl leading-tight mb-6 tracking-tight">
            <RevealWords text="Vente o renta tu propiedad con" baseDelay={0.3} className="justify-center" />
            <br />
            <RevealWords text="seguridad y eficiencia" baseDelay={0.65} className="italic text-secondary-light justify-center" />
          </h1>
          <FadeUp delay={0.9}>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              En Diez Brokers nos encargamos de todo el proceso para que vendas o rentes rápido, seguro y al mejor valor comercial de Jalisco.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 2. BENEFITS SECTION (Why choose us to sell) */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeUp>
              <span className="section-label mx-auto justify-center">Nuestra Propuesta</span>
            </FadeUp>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              <RevealWords text="¿Por qué promover con nosotros?" baseDelay={0.1} className="justify-center" />
            </h2>
            <FadeUp delay={0.3}>
              <p className="text-neutral-dark text-base font-sans">
                Maximizamos el valor de tu patrimonio con un servicio enfocado a resultados rápidos y seguros.
              </p>
            </FadeUp>
          </div>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {BENEFITS.map((b, i) => (
              <StaggerItem
                key={i}
                className="bg-background rounded-3xl p-8 border border-neutral-light/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center mb-6 text-white shadow-md">
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 font-sans">
                  {b.title}
                </h3>
                <p className="text-neutral-dark text-xs leading-relaxed font-sans">{b.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 3. STEP BY STEP PROCESS & CONTACT FORM */}
      <section className="py-16 md:py-24 bg-background border-t border-b border-neutral-light/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left side process list */}
            <div className="lg:col-span-7 space-y-8 order-last lg:order-first">
              <div>
                <FadeUp>
                  <span className="section-label">Paso a paso</span>
                </FadeUp>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                  <RevealWords text="Nuestro proceso de" baseDelay={0.1} />
                  <br />
                  <RevealWords text="Promoción Exclusiva" baseDelay={0.3} className="text-primary italic" />
                </h2>
                <FadeUp delay={0.3}>
                  <p className="text-neutral-dark text-base font-sans">
                    Hacemos que comercializar tu casa, departamento o terreno sea una experiencia fluida y transparente, minimizando tus preocupaciones.
                  </p>
                </FadeUp>
              </div>

              {/* Interactive steps */}
              <Stagger className="space-y-6 pt-4" stagger={0.12}>
                {[
                  {
                    step: "1",
                    title: "Envío de Información",
                    desc: "Registras los datos básicos de tu propiedad y programamos una llamada inicial."
                  },
                  {
                    step: "2",
                    title: "Visita y Tasación Comercial",
                    desc: "Conocemos el inmueble en persona y realizamos un Análisis Comparativo de Mercado sin costo."
                  },
                  {
                    step: "3",
                    title: "Estrategia de Promoción",
                    desc: "Tomamos fotografía profesional y publicamos en portales inmobiliarios líderes."
                  },
                  {
                    step: "4",
                    title: "Filtración e Intermediación",
                    desc: "Filtramos compradores de verdad, nos encargamos de las citas y te acompañamos hasta la firma notarial."
                  }
                ].map((item, idx) => (
                  <StaggerItem key={idx} className="flex gap-4 items-start bg-white p-6 rounded-2xl border border-neutral-light/40">
                    <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-bold text-foreground font-sans text-base mb-1">{item.title}</h4>
                      <p className="text-neutral-dark text-xs font-sans leading-relaxed">{item.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Right side contact form */}
            <aside className="lg:col-span-5 lg:sticky lg:top-28 order-first lg:order-last">
              <FadeUp delay={0.2} className="bg-white rounded-3xl p-2 shadow-xl border border-neutral-light/40">
                <ContactForm
                  propertyTitle="Solicitud de propietario"
                  propertyId="OWNERS"
                />
              </FadeUp>
            </aside>

          </div>
        </div>
      </section>

      {/* 4. FAQS */}
      <FAQ />

      {/* 5. CTA */}
      <CTASection />

    </div>
  );
}
