'use client';

import Link from 'next/link';
import { Shield, Menu, X, Phone, FileText } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Barra superior institucional estilo Municipio de Querétaro */}
      <div className="bg-[#0F2D59] text-white text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Sindicato Registrado ante el Tribunal de Conciliación y Arbitraje del Estado de Querétaro
          </div>
          <div className="flex items-center gap-4 text-slate-200">
            <Link href="#transparencia" className="hover:text-white transition-colors">Transparencia</Link>
            <span>|</span>
            <Link href="#contacto" className="hover:text-white transition-colors">Atención y Contacto</Link>
          </div>
        </div>
      </div>

      {/* Menú de navegación principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logotipo / Identidad */}
        <Link href="#inicio" className="flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2D59] text-white shadow-md group-hover:bg-blue-900 transition-colors">
            <Shield className="h-7 w-7" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-[#0F2D59] block leading-none">STSMQ</span>
            <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase mt-1 block">
              Municipio de Querétaro
            </span>
          </div>
        </Link>

        {/* Enlaces de navegación de Escritorio */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm text-slate-700">
          <Link href="#inicio" className="hover:text-[#0F2D59] transition-colors">Inicio</Link>
          <Link href="#prestaciones" className="hover:text-[#0F2D59] transition-colors">Prestaciones</Link>
          <Link href="#noticias" className="hover:text-[#0F2D59] transition-colors">Noticias</Link>
          <Link href="#transparencia" className="hover:text-[#0F2D59] transition-colors">Convenio Colectivo</Link>
          <Link href="#contacto" className="hover:text-[#0F2D59] transition-colors">Comité</Link>
        </nav>

        {/* Botón de Portal del Agremiado */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F2D59] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-950 transition-all"
          >
            <FileText className="h-4 w-4" />
            Portal del Agremiado
          </Link>
        </div>

        {/* Botón de Menú Móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Abrir menú"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

      </div>

      {/* Menú Desplegable para Móviles */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <Link
            href="#inicio"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0F2D59]"
          >
            Inicio
          </Link>
          <Link
            href="#prestaciones"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0F2D59]"
          >
            Prestaciones
          </Link>
          <Link
            href="#noticias"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0F2D59]"
          >
            Noticias y Avisos
          </Link>
          <Link
            href="#transparencia"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0F2D59]"
          >
            Convenio Colectivo
          </Link>
          <Link
            href="#contacto"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-[#0F2D59]"
          >
            Comité Directivo
          </Link>
          <div className="pt-2">
            <Link
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#0F2D59] py-3 text-sm font-bold text-white shadow-md"
            >
              <FileText className="h-4 w-4" />
              Portal del Agremiado
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}