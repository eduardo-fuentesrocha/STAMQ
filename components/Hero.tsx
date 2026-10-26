'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, FileText, Megaphone } from 'lucide-react';

const heroImages = [
  {
    src: '/hero-trabajadores-qro-3.png',
    alt: 'Personal operativo de recolección y limpieza del Municipio de Querétaro',
  },
  {
    src: '/TRABAJADORES-MUNICIPIO.jpeg',
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section id="inicio" className="relative w-full min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-slate-950 text-white">
      
      {/* Fotografías de Fondo */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-40' : 'opacity-0 pointer-events-none'
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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-10"></div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12">
        <div className="max-w-xl space-y-5 text-left">
          
          <span className="inline-block text-xs font-extrabold text-[#E07A2B] uppercase tracking-wider bg-[#E07A2B]/10 px-3 py-1 rounded-md border border-[#E07A2B]/30">
            Sindicato STSMQ
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            El portal para los <br />
            <span className="text-[#E07A2B]">trabajadores del Municipio</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Revisa de forma clara tus derechos, trámites para apoyo escolar, préstamos y los últimos avisos importantes del sindicato.
          </p>

          {/* Accesos rápidos */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="#prestaciones"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white font-bold text-sm shadow-md transition-colors"
            >
              <FileText className="h-5 w-5 shrink-0" />
              <span>Ver Prestaciones y Apoyos</span>
            </Link>

            <Link
              href="#noticias"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 backdrop-blur-md transition-colors"
            >
              <Megaphone className="h-5 w-5 text-[#E07A2B] shrink-0" />
              <span>Avisos Urgentes</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Controles del carrusel */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-30 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-800">
        <button
          onClick={prevSlide}
          className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Fotografía anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-6 bg-[#E07A2B]' : 'w-2.5 bg-slate-600'
              }`}
              aria-label={`Fotografía ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Siguiente fotografía"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

    </section>
  );
}