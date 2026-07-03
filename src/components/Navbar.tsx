"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { COMPANY } from "@/data/properties";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const transparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobile = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isMobileMenuOpen
          ? "bg-white/95 backdrop-blur-md border-b border-neutral-light/40 py-3"
          : transparent
            ? "bg-transparent py-3 md:py-5"
            : "bg-white/90 backdrop-blur-md border-b border-neutral-light/40 py-3"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center shrink-0 min-w-0">
          <Logo
            variant="full"
            inverted={transparent && !isMobileMenuOpen}
          />
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium tracking-wide hover:opacity-75 transition-opacity relative py-1",
              transparent ? "text-white" : "text-foreground",
              pathname === "/" && "font-semibold border-b-2 border-primary"
            )}
          >
            Inicio
          </Link>
          
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium tracking-wide hover:opacity-75 transition-opacity relative py-1",
              transparent ? "text-white" : "text-foreground",
              pathname === "/about" && "font-semibold border-b-2 border-primary"
            )}
          >
            Nosotros
          </Link>

          {/* Propiedades Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 text-sm font-medium tracking-wide hover:opacity-75 transition-opacity relative py-1 cursor-pointer",
                transparent ? "text-white" : "text-foreground",
                (pathname.startsWith("/properties") || pathname.startsWith("/rentals")) && "font-semibold border-b-2 border-primary"
              )}
            >
              Propiedades
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                <div className="w-48 bg-white border border-neutral-light/50 rounded-lg shadow-lg py-2 animate-fade-in">
                  <Link
                    href="/properties"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-neutral-light/30 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    En Venta
                  </Link>
                  <Link
                    href="/rentals"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-neutral-light/30 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    En Renta
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/owners"
            className={cn(
              "text-sm font-medium tracking-wide hover:opacity-75 transition-opacity relative py-1",
              transparent ? "text-white" : "text-foreground",
              pathname === "/owners" && "font-semibold border-b-2 border-primary"
            )}
          >
            Propietarios
          </Link>

          <Link
            href="/simulador"
            className={cn(
              "text-sm font-medium tracking-wide hover:opacity-75 transition-opacity relative py-1",
              transparent ? "text-white" : "text-foreground",
              pathname === "/simulador" && "font-semibold border-b-2 border-primary"
            )}
          >
            Simulador
          </Link>

          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium tracking-wide hover:opacity-75 transition-opacity relative py-1",
              transparent ? "text-white" : "text-foreground",
              pathname === "/contact" && "font-semibold border-b-2 border-primary"
            )}
          >
            Contacto
          </Link>
        </div>

        {/* Right: CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact?tab=register"
            className={cn(
              "text-sm font-medium tracking-wide hover:opacity-75 transition-opacity px-4 py-2.5 rounded-full border",
              transparent
                ? "border-white text-white hover:bg-white/10"
                : "border-primary text-primary hover:bg-primary/5"
            )}
          >
            Registrarse
          </Link>
          <Link
            href="/contact?tab=login"
            className={cn(
              "text-sm font-medium tracking-wide transition-all px-4 py-2.5 rounded-full",
              transparent
                ? "bg-white text-primary hover:bg-white/90"
                : "bg-primary text-white hover:bg-primary-light"
            )}
          >
            Iniciar Sesión
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menú"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu
              className={cn(
                "w-6 h-6",
                transparent && !isScrolled ? "text-white" : "text-foreground"
              )}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-neutral-light shadow-xl py-6 px-6 flex flex-col gap-4 animate-fade-in max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain">
          <Link
            href="/"
            className={cn(
              "text-foreground font-medium text-lg border-b border-neutral-light pb-2",
              pathname === "/" && "text-primary font-bold"
            )}
            onClick={closeMobile}
          >
            Inicio
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-foreground font-medium text-lg border-b border-neutral-light pb-2",
              pathname === "/about" && "text-primary font-bold"
            )}
            onClick={closeMobile}
          >
            Nosotros
          </Link>
          
          <div className="flex flex-col gap-2 border-b border-neutral-light pb-2">
            <span className="text-neutral-dark font-medium text-sm uppercase tracking-wider">Propiedades</span>
            <Link
              href="/properties"
              className={cn(
                "text-foreground font-medium text-lg pl-3",
                pathname === "/properties" && "text-primary"
              )}
              onClick={closeMobile}
            >
              En Venta
            </Link>
            <Link
              href="/rentals"
              className={cn(
                "text-foreground font-medium text-lg pl-3",
                pathname === "/rentals" && "text-primary"
              )}
              onClick={closeMobile}
            >
              En Renta
            </Link>
          </div>

          <Link
            href="/owners"
            className={cn(
              "text-foreground font-medium text-lg border-b border-neutral-light pb-2",
              pathname === "/owners" && "text-primary font-bold"
            )}
            onClick={closeMobile}
          >
            Propietarios
          </Link>
          <Link
            href="/simulador"
            className={cn(
              "text-foreground font-medium text-lg border-b border-neutral-light pb-2",
              pathname === "/simulador" && "text-primary font-bold"
            )}
            onClick={closeMobile}
          >
            Simulador
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-foreground font-medium text-lg border-b border-neutral-light pb-2",
              pathname === "/contact" && "text-primary font-bold"
            )}
            onClick={closeMobile}
          >
            Contacto
          </Link>

          <div className="flex flex-col gap-3 mt-4">
            <Link
              href="/contact?tab=register"
              className="text-center font-medium text-primary py-2.5 border border-primary rounded-full hover:bg-primary/5 transition-colors"
              onClick={closeMobile}
            >
              Registrarse
            </Link>
            <Link
              href="/contact?tab=login"
              className="bg-primary text-white text-center font-medium py-2.5 rounded-full hover:bg-primary-light transition-colors"
              onClick={closeMobile}
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
