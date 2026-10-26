'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A1F3F] text-white border-t-4 border-[#E07A2B]">
      <div className="w-full px-6 sm:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          
          {/* Columna 1: Identidad con Logotipo Oficial */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 bg-white p-1 rounded-xl shadow-md border border-slate-200 flex items-center justify-center">
                <Image
                  src="/STSMQ.svg"
                  alt="Logotipo Oficial STSMQ"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight block leading-none">STSMQ</span>
                <span className="text-[10px] font-semibold text-slate-300 tracking-wider uppercase mt-1 block">
                  Sindicato Oficial
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Defendiendo los derechos laborales, la justicia y las prestaciones de nuestra base trabajadora.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#E07A2B] uppercase tracking-wider">Enlaces Institucionales</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#inicio" className="text-slate-300 hover:text-[#E07A2B] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#prestaciones" className="text-slate-300 hover:text-[#E07A2B] transition-colors">
                  Servicios y Prestaciones
                </Link>
              </li>
              <li>
                <Link href="#noticias" className="text-slate-300 hover:text-[#E07A2B] transition-colors">
                  Avisos y Noticias
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Ubicación y Contacto */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#E07A2B] uppercase tracking-wider">Oficinas y Contacto</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#E07A2B] shrink-0 mt-0.5" />
                <span>Calle Independencia No. 210, Colonia Centro, Querétaro, Qro.</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#E07A2B] shrink-0" />
                <span>Teléfono: (442) 213 71 19</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#E07A2B] shrink-0" />
                <span>sindicato.municipio.qro@gmail.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Sindicato de Trabajadores al Servicio del Municipio de Querétaro (STSMQ). Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#E07A2B] transition-colors">
              Aviso de Privacidad
            </Link>
            <Link href="#" className="hover:text-[#E07A2B] transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}