import { COMPANY } from "@/data/properties";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { FadeUp, RevealWords, Stagger, StaggerItem, ZoomReveal } from "@/components/animations/Reveal";

export const metadata = {
  title: "Contáctanos | Diez Brokers",
  description:
    "Contáctanos para encontrar tu nueva casa o resolver cualquier duda inmobiliaria. Te brindamos un servicio personalizado y de calidad.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1440")` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary-dark"></div>
        
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="text-[11vw] font-serif font-black text-white/5 uppercase tracking-[0.2em] translate-y-[-5%]">
            CONTACTO
          </span>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl pt-8">
          <FadeUp delay={0.1}>
            <span className="text-secondary-light text-xs font-bold uppercase tracking-[0.3em] mb-4 bg-primary/40 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm inline-block">
              Contáctanos
            </span>
          </FadeUp>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white max-w-4xl leading-tight mb-6 tracking-tight">
            <RevealWords text="Pongámonos en" baseDelay={0.3} className="justify-center" />
            <br />
            <RevealWords text="contacto hoy mismo" baseDelay={0.55} className="italic text-secondary-light justify-center" />
          </h1>
          <FadeUp delay={0.8}>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              ¿Tienes dudas, quieres tasar tu propiedad o agendar una cita? Escríbenos o llámanos directamente.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 2. FORM & INFO SECTION */}
      <section className="py-16 md:py-24 bg-white relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left side: Information Cards */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <FadeUp>
                  <span className="section-label">Información de contacto</span>
                </FadeUp>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                  <RevealWords text="Canales de Comunicación" baseDelay={0.1} />
                </h2>
                <FadeUp delay={0.3}>
                  <p className="text-neutral-dark text-sm leading-relaxed font-sans mb-8">
                    Estamos a tu total disposición en nuestros diferentes canales. Elige el de tu preferencia y recibe respuesta inmediata.
                  </p>
                </FadeUp>
              </div>

              <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
                
                {/* Dirección */}
                <StaggerItem className="bg-background rounded-2xl p-6 border border-neutral-light/50 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm font-sans mb-1">Dirección</h4>
                    <p className="text-neutral-dark text-xs font-sans leading-relaxed">
                      {COMPANY.address}
                      <br />
                      {COMPANY.addressLine2}
                    </p>
                  </div>
                </StaggerItem>

                {/* Teléfono */}
                <StaggerItem className="bg-background rounded-2xl p-6 border border-neutral-light/50 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center text-white shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm font-sans mb-1">Teléfono</h4>
                    <a href={`tel:${COMPANY.phone}`} className="text-neutral-dark text-xs font-sans hover:text-primary leading-relaxed">
                      {COMPANY.phoneDisplay}
                    </a>
                  </div>
                </StaggerItem>

                {/* Email */}
                <StaggerItem className="bg-background rounded-2xl p-6 border border-neutral-light/50 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center text-white shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm font-sans mb-1">Email</h4>
                    <a href={`mailto:${COMPANY.email}`} className="text-neutral-dark text-xs font-sans hover:text-primary leading-relaxed break-all">
                      {COMPANY.email}
                    </a>
                  </div>
                </StaggerItem>

                {/* WhatsApp */}
                <StaggerItem className="bg-background rounded-2xl p-6 border border-neutral-light/50 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center shrink-0">
                    <svg
                      fill="#fff"
                      height="16px"
                      width="16px"
                      viewBox="0 0 308.00 308.00"
                      xmlSpace="preserve"
                      stroke="#fff"
                    >
                      <path d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z" />
                      <path d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm font-sans mb-1">WhatsApp</h4>
                    <a href={`https://wa.me/523315128570`} target="_blank" rel="noopener noreferrer" className="text-neutral-dark text-xs font-sans hover:text-primary leading-relaxed">
                      {COMPANY.phoneDisplay}
                    </a>
                  </div>
                </StaggerItem>

                {/* Horario */}
                <StaggerItem className="bg-background rounded-2xl p-6 border border-neutral-light/50 flex gap-4 items-start md:col-span-2">
                  <div className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center text-white shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm font-sans mb-1">Horario de Atención</h4>
                    <p className="text-neutral-dark text-xs font-sans leading-relaxed">
                      Lunes a Viernes: 9:00 AM - 7:00 PM | Sábados: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </StaggerItem>

              </Stagger>

              {/* Map embed */}
              <ZoomReveal className="rounded-3xl overflow-hidden h-[300px] border border-neutral-light shadow-md mt-8">
                <iframe
                  title="Ubicación Diez Brokers"
                  src="https://maps.google.com/maps?q=Zapopan,%20Jalisco,%20Mexico&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </ZoomReveal>
            </div>

            {/* Right side: Contact Form */}
            <aside className="lg:col-span-5 lg:sticky lg:top-28">
              <FadeUp delay={0.2} className="bg-white rounded-3xl p-2 shadow-xl border border-neutral-light/40">
                <ContactForm />
              </FadeUp>
            </aside>

          </div>
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <FAQ />

      {/* 4. ADDITIONAL CTA SECTION */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          
          <FadeUp y={60} className="bg-primary-dark rounded-3xl text-white relative overflow-hidden shadow-2xl border border-white/5">
            {/* Decorative gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(120,156,74,0.12),transparent)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,89,0.25),transparent)] pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 px-8 py-16 md:p-20">
              
              {/* Left Column: Text & Buttons (7 cols) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <span className="text-secondary-light text-xs font-bold uppercase tracking-[0.25em] block">
                  Propiedades en Jalisco
                </span>
                
                <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
                  <RevealWords text="¿Eres propietario y buscas" baseDelay={0.2} className="!justify-start" />
                  <RevealWords text="vender o rentar" baseDelay={0.55} className="italic text-secondary-light !justify-start" />
                  <RevealWords text="tu propiedad?" baseDelay={0.75} className="!justify-start" />
                </h2>
                
                <p className="text-white/80 text-sm md:text-base max-w-xl font-sans leading-relaxed">
                  Tasación profesional y promoción exclusiva con el equipo inmobiliario líder en Jalisco. Te ayudamos a conectar con los clientes adecuados.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="https://wa.me/523315128570?text=Hola%20Anawim%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20c%C3%B3mo%20vender%20o%20rentar%20mi%20propiedad%20%F0%9F%90%99"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold px-8 py-4 rounded-full transition-colors text-xs uppercase tracking-wider shadow-lg hover:shadow-accent/20 cursor-pointer"
                  >
                    Hablar con un asesor
                  </a>
                </div>
              </div>

              {/* Right Column: House image (5 cols) */}
              <div className="lg:col-span-5 relative w-full h-[300px] md:h-[400px] flex items-center justify-center">
                <ZoomReveal delay={0.3} className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
                    alt="Propiedad Exclusiva Diez Brokers"
                    className="w-full h-full object-cover"
                  />
                </ZoomReveal>
              </div>

            </div>
          </FadeUp>

        </div>
      </section>

    </div>
  );
}
