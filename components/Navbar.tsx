'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur support-[backdrop-filter]:bg-white/80">
      {/* Top Banner Informativo (Estilo CTM) */}
      <div className="bg-slate-900 px-4 py-1.5 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Sindicato Registrado ante el Tribunal de Conciliación y Arbitraje de Querétaro
          </span>
          <div className="hidden sm:flex items-center gap-4">
            <Link href="#transparencia" className="hover:text-white transition-colors">Transparencia</Link>
            <span>|</span>
            <Link href="#contacto" className="hover:text-white transition-colors">Contacto</Link>
          </div>
        </div>
      </div>

      {/* Navegación Principal */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-800 text-white font-black text-xl shadow-md">
            ST
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-base leading-tight">STAMQ</span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
              Municipio de Querétaro
            </span>
          </div>
        </Link>

        {/* Menú Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <Link href="#inicio" className="hover:text-red-800 transition-colors">Inicio</Link>
          <Link href="#prestaciones" className="hover:text-red-800 transition-colors">Prestaciones</Link>
          <Link href="#noticias" className="hover:text-red-800 transition-colors">Noticias y Avisos</Link>
          <Link href="#transparencia" className="hover:text-red-800 transition-colors">Convenio Colectivo</Link>
          <Link href="#contacto" className="hover:text-red-800 transition-colors">Comité Directivo</Link>
        </nav>

        {/* CTA Portal del Agremiado (Estilo DC 37) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#portal"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            <User className="h-4 w-4" />
            Portal del Agremiado
          </Link>
        </div>

        {/* Botón Menú Móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            href="#inicio"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-red-800"
          >
            Inicio
          </Link>
          <Link
            href="#prestaciones"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-red-800"
          >
            Prestaciones
          </Link>
          <Link
            href="#noticias"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-red-800"
          >
            Noticias y Avisos
          </Link>
          <Link
            href="#transparencia"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-red-800"
          >
            Convenio Colectivo
          </Link>
          <div className="pt-2">
            <Link
              href="#portal"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-800 px-4 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-red-900"
            >
              <User className="h-5 w-5" />
              Portal del Agremiado
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
