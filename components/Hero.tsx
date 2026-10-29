'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, Megaphone, Calendar, Bell, ExternalLink, X, Undo2 } from 'lucide-react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const relevantCircular = {
    title: 'Celebración del 12 de Diciembre 2026',
    date: '12 de Diciembre, 2026',
    description: 'Aviso importante sobre las disposiciones oficiales, acuerdos sindicales y actividades programadas con motivo de las festividades del 12 de Diciembre.',
    content: 'Se comunica a todo el personal sindicalizado que con motivo de las festividades del 12 de Diciembre, se establecen las guardias operativas correspondientes y los lineamientos para el goce de los días de descanso conforme a las condiciones generales de trabajo vigentes.',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="inicio" className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-zinc-950 text-white px-5 sm:px-12 lg:px-16 pt-5 pb-6 sm:py-8">
      
      {/* Fotografías de Fondo */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-70' : 'opacity-0 pointer-events-none'
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

        {/* Fondo oscuro graduado en negro puro (zinc-950) */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/40 z-10"></div>
      </div>

      {/* Header Institucional Superior */}
      <div className="relative z-30 w-full flex items-center max-w-7xl mx-auto shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 w-full">
          
          {/* Logo oficial a color prominente */}
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 shrink-0 flex items-center justify-center -ml-2 sm:-ml-4">
            <Image
              src="/STSMQ2.svg"
              alt="Logotipo Oficial STSMQ"
              fill
              className="object-contain drop-shadow-md"
              priority
            />
          </div>

          {/* Texto institucional completo */}
          <div className="w-full">
            <span 
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 500 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-normal text-[#E07A2B] uppercase leading-tight drop-shadow-md block"
            >
              SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO
            </span>
          </div>
        </div>
      </div>

      {/* Contenido Principal con escala equilibrada */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center gap-3 sm:gap-4 my-auto">
        
        {/* Título principal con mayor presencia */}
        <div className="max-w-3xl text-left w-full">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            Portal para los <br />
            <span className="text-[#E07A2B]">Trabajadores Sindicalizados del Municipio de Querétaro</span>
          </h1>
        </div>

        {/* Bloque de Accesos Rápidos y Aviso Destacado */}
        <div className="max-w-2xl space-y-3 w-full">
          
          {/* 4 Accesos rápidos uniformes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-xl w-full">
            {/* Prestaciones */}
            <Link
              href="#prestaciones"
              className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-900/85 hover:bg-zinc-900 text-white font-bold text-xs sm:text-sm border border-zinc-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span>Prestaciones</span>
            </Link>

            {/* Servicios */}
            <Link
              href="#servicios"
              className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-900/85 hover:bg-zinc-900 text-white font-bold text-xs sm:text-sm border border-zinc-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <Megaphone className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span>Trámites y Servicios</span>
            </Link>
            
            {/* Eventos */}
            <Link
              href="#eventos"
              className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-900/85 hover:bg-zinc-900 text-white font-bold text-xs sm:text-sm border border-zinc-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span>Eventos</span>
            </Link>

            {/* Circulares */}
            <Link
              href="#circulares"
              className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-900/85 hover:bg-zinc-900 text-white font-bold text-xs sm:text-sm border border-zinc-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span>Circulares, Boletines y Convocatorias</span>
            </Link>
          </div>

          {/* 🌟 Banner Flotante Dinámico: Aviso Destacado */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="group cursor-pointer relative overflow-hidden flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-900/90 border-2 border-[#E07A2B] hover:border-orange-400 backdrop-blur-md shadow-2xl transition-all transform hover:-translate-y-0.5 max-w-xl w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#E07A2B]/15 via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#E07A2B] text-white shadow-md shrink-0">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#E07A2B] block">
                  LO MÁS NUEVO
                </span>
                {/* Título tabulado e indexado con una bolita */}
                <div className="flex items-center gap-2 pl-2 sm:pl-3 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#E07A2B] shrink-0 animate-pulse" />
                  <h3 className="text-xs sm:text-base font-bold text-white group-hover:text-[#E07A2B] transition-colors leading-tight">
                    {relevantCircular.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="relative z-10 shrink-0 text-slate-300 group-hover:text-white transition-colors p-1.5 bg-zinc-800/80 rounded-lg">
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>

        </div>

      </div>

      {/* 📋 Modal de Detalle del Aviso Destacado */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-zinc-900 border border-[#E07A2B] rounded-2xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 text-slate-300 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#E07A2B]/20 text-[#E07A2B]">
                <Bell className="h-6 w-6" />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-white">
              {relevantCircular.title}
            </h2>

            <p className="text-slate-300 text-base leading-relaxed mb-6">
              {relevantCircular.content}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E07A2B] hover:bg-orange-600 text-white text-sm font-semibold transition-all shrink-0 shadow-md flex items-center justify-center gap-2 group"
              >
                <Undo2 className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Regresar</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}