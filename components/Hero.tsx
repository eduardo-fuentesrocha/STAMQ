'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, Megaphone, Calendar, Bell } from 'lucide-react';

const heroImages = [
  {
    src: '/hero.jpg',
    alt: 'Personal operativo de recolección y limpieza del Municipio de Querétaro',
  },
  {
    src: '/hero2.jpg',
    alt: 'Trabajadores del Municipio de Querétaro',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="inicio" className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-slate-950 text-white px-6 sm:px-12 lg:px-16 py-6 sm:py-8">
      
      {/* Fotografías de Fondo */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-75' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-center"
              priority={index === 0}
              quality={90}
            />
          </div>
        ))}

        {/* Fondo oscuro graduado para máxima legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10"></div>
      </div>

      {/* Header Institucional Superior (Logotipo y Texto Alineados) */}
      <div className="relative z-30 w-full flex items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 w-full">
          {/* Logo oficial en blanco y ligeramente desplazado a la izquierda */}
          <div className="relative h-12 w-12 sm:h-16 sm:w-16 lg:h-18 lg:w-18 shrink-0 flex items-center justify-center -ml-2 sm:-ml-3">
            <Image
              src="/STSMQ.svg"
              alt="Logotipo Oficial STSMQ"
              fill
              className="object-contain brightness-0 invert drop-shadow-md"
            />
          </div>

          {/* Texto Arial Mayúsculas adaptable y responsivo */}
          <span className="font-sans text-xs sm:text-base md:text-xl lg:text-2xl font-black tracking-tight text-white uppercase leading-tight drop-shadow-md">
            SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO
          </span>
        </div>
      </div>

      {/* Contenido Principal Centrado Verticalmente */}
      <div className="relative z-20 w-full max-w-7xl mx-auto my-auto flex flex-col justify-center">
        <div className="max-w-2xl space-y-6 text-left">
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            Portal para los <br />
            <span className="text-[#E07A2B]">Trabajadores Sindicalizados del Municipio de Querétaro</span>
          </h1>

          {/* 4 Accesos rápidos uniformes */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl">
            {/* Prestaciones */}
            <Link
              href="#prestaciones"
              className="group flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-sm border border-slate-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <span>Prestaciones</span>
            </Link>

            {/* Servicios */}
            <Link
              href="#servicios"
              className="group flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-sm border border-slate-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <Megaphone className="h-5 w-5" />
              </div>
              <span>Servicios</span>
            </Link>
            
            {/* Eventos */}
            <Link
              href="#eventos"
              className="group flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-sm border border-slate-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <span>Eventos</span>
            </Link>

            {/* Circulares */}
            <Link
              href="#circulares"
              className="group flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-sm border border-slate-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <Bell className="h-5 w-5" />
              </div>
              <span>Circulares</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Espaciador inferior invisible para equilibrar el flexbox */}
      <div className="hidden sm:block h-6"></div>

    </section>
  );
}