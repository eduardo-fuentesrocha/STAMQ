'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">

      {/* Menú de navegación principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logotipo / Identidad */}
        <Link href="#inicio" className="flex items-center gap-3 group">
          <div className="relative h-12 w-12 shrink-0">
            <Image
              src="/STSMQ.svg"
              alt="Logotipo Oficial STSMQ"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase mt-1 block">
              Sindicato de Trabajadores al Servicio del Municipio de Querétaro
            </span>
          </div>
        </Link>

        {/* Enlaces de navegación de Escritorio */}

        {/* Botón de Menú Móvil */}

      </div>

      {/* Menú Desplegable para Móviles */}
    </header>
  );
}