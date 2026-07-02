import Link from "next/link";
import { Handshake, Search, Award, PhoneCall, FileText } from "lucide-react";
import { RevealWords, Stagger, StaggerItem } from "./animations/Reveal";

const VALUES = [
  {
    icon: Handshake,
    title: "Servicio Personalizado",
    description:
      "Atención dedicada y a medida para cada cliente. Acompañamiento en cada etapa del proceso inmobiliario.",
    highlight: true,
  },
  {
    icon: Search,
    title: "Búsqueda Inmobiliaria",
    description:
      "Te ayudamos a encontrar la propiedad ideal según tus necesidades, presupuesto y estilo de vida.",
    highlight: false,
  },
  {
    icon: Award,
    title: "Experiencia Comprobada",
    description:
      "Años de experiencia en compra, venta, alquiler y tasaciones de casas, departamentos y más.",
    highlight: false,
  },
  {
    icon: FileText,
    title: "Tasaciones Profesionales",
    description:
      "Realizamos valuaciones confiables para que tomes decisiones informadas sobre tu propiedad.",
    highlight: false,
  },
  {
    icon: PhoneCall,
    title: "Atención Inmediata",
    description:
      "Estamos disponibles para resolver tus dudas y agendar visitas cuando lo necesites.",
    highlight: false,
  },
];

export function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* 3x2 Editorial Grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" stagger={0.1}>
          
          {/* Cell 1: Header Text & Button */}
          <StaggerItem className="flex flex-col justify-center p-6 space-y-6 text-left">
            <span className="text-primary text-xs font-bold uppercase tracking-widest block">
              ● Nuestros Valores
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight">
              <RevealWords text="Lo que" baseDelay={0.1} />
              <br />
              <RevealWords text="representamos" baseDelay={0.25} className="italic text-primary" />
            </h2>
            <p className="text-neutral-dark text-base leading-relaxed font-sans max-w-sm">
              Somos especialistas en el negocio inmobiliario con un equipo de profesionales dispuestos a ayudarte en Jalisco.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="bg-accent hover:bg-accent/90 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl inline-block shadow-md hover:shadow-lg transition-all"
              >
                HABLEMOS HOY
              </Link>
            </div>
          </StaggerItem>

          {/* Render the 5 Value Cards */}
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            
            if (value.highlight) {
              // Highlighted Dark Card (Tilted)
              return (
                <StaggerItem
                  key={i}
                  className="bg-primary-dark text-white rounded-3xl p-8 md:p-10 shadow-xl flex flex-col gap-5 border border-white/5 transform lg:rotate-[-2deg] hover:rotate-0 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <Icon className="w-8 h-8 text-secondary-light shrink-0" />
                    <h3 className="text-xl font-bold font-sans tracking-wide">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-white/90 text-base leading-relaxed font-sans">
                    {value.description}
                  </p>
                </StaggerItem>
              );
            }

            // Standard White Cards
            return (
              <StaggerItem
                key={i}
                className="bg-white text-foreground rounded-3xl p-8 md:p-10 border border-neutral-light/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5"
              >
                <div className="flex items-center gap-4">
                  <Icon className="w-8 h-8 text-primary shrink-0" />
                  <h3 className="text-xl font-bold font-sans tracking-wide">
                    {value.title}
                  </h3>
                </div>
                <p className="text-neutral-dark text-base leading-relaxed font-sans">
                  {value.description}
                </p>
              </StaggerItem>
            );
          })}

        </Stagger>
      </div>
    </section>
  );
}
