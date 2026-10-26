'use client';

import Link from 'next/link';
import { Shield, Menu, X, FileText } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Barra superior institucional con el tono naranja del logo */}
      <div className="bg-[#E07A2B] text-white text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Sindicato Registrado ante el Tribunal de Conciliación y Arbitraje del Estado de Querétaro
          </div>
        </div>
      </div>

      {/* Menú de navegación principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logotipo / Identidad */}
        <Link href="#inicio" className="flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E07A2B] text-white shadow-md group-hover:bg-[#c46522] transition-colors">
            <Shield className="h-7 w-7" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-[#0F2D59] block leading-none">STSMQ</span>
            <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase mt-1 block">
              Sindicato de Trabajadores al Servicio del Municipio de Querétaro
            </span>
          </div>
        </Link>

        {/* Enlaces de navegación de Escritorio */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm text-slate-700">
          <Link href="#prestaciones" className="hover:text-[#E07A2B] transition-colors">Servicios</Link>
          <Link href="#noticias" className="hover:text-[#E07A2B] transition-colors">Avisos y Noticias</Link>
        </nav>

        {/* Botón de Menú Móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-[#E07A2B] transition-colors"
          aria-label="Abrir menú"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

      </div>

      {/* Menú Desplegable para Móviles */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <Link
            href="#prestaciones"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#E07A2B] transition-colors"
          >
            Servicios
          </Link>
          <Link
            href="#noticias"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#E07A2B] transition-colors"
          >
            Avisos y Noticias
          </Link>
        </div>
      )}
    </header>
  );
}