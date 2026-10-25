'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Rutas de las 3 imágenes para la rotación
const heroImages = [
  {
    src: '/hero-trabajadores-qro.png',
    alt: 'Trabajadores del Municipio de Querétaro',
  },
  {
    src: '/hero-trabajadores-qro-2.jpeg', // Reemplaza con el nombre de tu 2da foto
    alt: 'Personal operativo del STSMQ',
  },
  {
    src: '/hero-trabajadores-qro-3.png', // Reemplaza con el nombre de tu 3ra foto
    alt: 'Servidores públicos del Municipio de Querétaro',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cambia de imagen automáticamente cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
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
      
      {/* Carrusel de Imágenes de Fondo */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-50' : 'opacity-0 pointer-events-none'
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

        {/* Viñeta / Sombra para legibilidad impecable del texto a la izquierda */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-10"></div>
      </div>

      {/* Contenido Principal Simplificado */}
      <div className="relative z-20 w-full px-6 sm:px-12 lg:px-16">
        <div className="max-w-xl space-y-4 text-left">
          
          {/* Titular Principal */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
            Unidad, Justicia y <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              Seguridad Laboral
            </span>
          </h1>

          {/* Descripción Concisa */}
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Representamos a la fuerza operativa y administrativa del Municipio de Querétaro. Garantizamos certidumbre jurídica, prestaciones y transparencia.
          </p>

        </div>
      </div>

      {/* Controles discretos del carrusel en la esquina inferior derecha */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-30 flex items-center gap-3 bg-slate-900/60 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-800/80">
        <button
          onClick={prevSlide}
          className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
          aria-label="Fotografía anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Puntos Indicadores */}
        <div className="flex items-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-6 bg-[#0F2D59]' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Ir a la foto ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
          aria-label="Siguiente fotografía"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

    </section>
  );
}