import Image from "next/image";
import { EDITORIAL_IMAGES } from "@/data/editorial-images";
import { FadeUp, RevealWords } from "./animations/Reveal";

const GALLERY = [
  {
    src: EDITORIAL_IMAGES.fachadaAmanecer,
    alt: "Fachada al amanecer",
    className: "col-span-2 row-span-2 min-h-[280px] md:min-h-[420px]",
  },
  {
    src: EDITORIAL_IMAGES.tresEspacios,
    alt: "Espacios interiores amplios",
    className: "min-h-[180px] md:min-h-[200px]",
  },
  {
    src: EDITORIAL_IMAGES.cocina,
    alt: "Cocina con acabados de calidad",
    className: "min-h-[180px] md:min-h-[200px]",
  },
  {
    src: EDITORIAL_IMAGES.fachadaAtardecer,
    alt: "Fachada al atardecer",
    className: "min-h-[200px] md:min-h-[220px]",
  },
  {
    src: EDITORIAL_IMAGES.fachadaNocturna,
    alt: "Fachada nocturna",
    className: "min-h-[200px] md:min-h-[220px]",
  },
] as const;

export function LifestyleGallery() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <FadeUp>
            <span className="section-label">Estilo de vida</span>
          </FadeUp>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-4 leading-tight">
            <RevealWords text="Un hogar pensado" baseDelay={0.1} />
            <br />
            <RevealWords
              text="para cómo vives"
              baseDelay={0.35}
              className="italic text-primary"
            />
          </h2>
          <FadeUp delay={0.25}>
            <p className="text-neutral-dark text-base mt-4 font-sans leading-relaxed">
              Zonas residenciales, amenidades, vistas y espacios que definen el
              estilo de vida en Jalisco.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-fr">
          {GALLERY.map((item, i) => (
            <FadeUp
              key={item.src}
              delay={0.1 + i * 0.08}
              className={`relative overflow-hidden rounded-xl md:rounded-2xl group ${item.className}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
