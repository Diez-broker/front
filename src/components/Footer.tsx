"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { COMPANY } from "@/data/properties";
import { Logo } from "./Logo";
import { motion } from "framer-motion";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const QUICK_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/properties", label: "Ventas" },
  { href: "/rentals", label: "Rentas" },
  { href: "/contact", label: "Contáctanos" },
  { href: "/owners", label: "Propietarios" },
  { href: "/about", label: "¿Quiénes somos?" },
];

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16 md:pt-20 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Logo
              variant="full"
              inverted
              className="h-12 mb-6"
            />
            <p className="text-white/70 mb-8 leading-relaxed max-w-sm">
              {COMPANY.welcome}
            </p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/523315128570`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white"
              >
                <svg
                  fill="#fff"
                  height="18px"
                  width="18px"
                  viewBox="0 0 308.00 308.00"
                  xmlSpace="preserve"
                  stroke="#fff"
                >
                  <path d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z" />
                  <path d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z" />
                </svg>
              </a>
              <a
                href={COMPANY.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <FacebookIcon className="w-5 h-5 text-white" />
              </a>
              <a
                href={COMPANY.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <InstagramIcon className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading font-bold mb-6 text-white">
              Menú
            </h3>
            <ul className="space-y-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading font-bold mb-6 text-white">
              Tipos de propiedad
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/properties?tipo=Casa", label: "Casas" },
                { href: "/properties?tipo=Departamento", label: "Departamentos" },
                { href: "/properties?tipo=Terreno", label: "Terrenos" },
                { href: "/properties?tipo=Oficina", label: "Oficinas" },
                {
                  href: "/properties?tipo=Local%20comercial",
                  label: "Locales comerciales",
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-heading font-bold mb-6 text-white">
              Contáctanos
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 shrink-0 text-secondary mt-0.5" />
                <span>
                  {COMPANY.address}
                  <br />
                  {COMPANY.addressLine2}
                </span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 shrink-0 text-secondary" />
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 shrink-0 text-secondary" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-xs font-medium relative z-10">
          <p>© {new Date().getFullYear()} Diez Brokers. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Términos de Uso</Link>
            <span>|</span>
            <Link href="/legal" className="hover:text-white transition-colors">Aviso Legal</Link>
          </div>
        </div>

        {/* Huge Watermark decorative text with scroll reveal animation */}
        <div className="mt-16 text-center select-none pointer-events-none overflow-hidden">
          <motion.div
            initial={{ y: 100, opacity: 0, letterSpacing: "0.05em" }}
            whileInView={{ y: 0, opacity: 0.05, letterSpacing: "0.2em" }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center"
          >
            <span className="text-[10vw] font-serif font-black uppercase leading-none block whitespace-nowrap">
              DIEZ BROKERS
            </span>
            <span className="text-[2.5vw] font-serif font-black uppercase leading-none block whitespace-nowrap mt-2">
              REAL ESTATE
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
