import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Diez Brokers | Bienes Raíces en Jalisco",
  description:
    "Encuentra tu nueva casa con Diez Brokers. Compra, venta y renta de propiedades en Zapopan, Guadalajara, Puerto Vallarta y Tlajomulco. Servicio personalizado y de calidad.",
  keywords: [
    "bienes raíces Jalisco",
    "casas en venta Zapopan",
    "departamentos en renta Guadalajara",
    "propiedades Puerto Vallarta",
    "Diez Brokers",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
