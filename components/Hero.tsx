'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, Megaphone, Calendar, Bell, ExternalLink, X, Undo2, UserCheck } from 'lucide-react';

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
    <section id="inicio" className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between overflow-hidden bg-zinc-950 text-white px-5 sm:px-12 lg:px-16 pt-36 sm:pt-40 lg:pt-44 pb-8">
      
      {/* Fotografías de Fondo con Transición */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-95' : 'opacity-0 pointer-events-none'
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

        {/* Fondo oscuro graduado fundido con el Navbar (zinc-950) */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/40 z-10"></div>
      </div>

      {/* Contenido Principal Alineado con espacio para el Navbar */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-start gap-5 sm:gap-6">
        
        {/* Título principal elevado */}
        <div className="max-w-3xl text-left w-full space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            Portal del <br />
            <span className="text-[#E07A2B]">Trabajador Sindicalizado </span>
          </h1>
        </div>

        {/* Bloque de Accesos Rápidos y Aviso Destacado */}
        <div className="max-w-2xl space-y-3 w-full">
          
          {/* 4 Accesos rápidos uniformes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-xl w-full">
            <Link
              href="/dashboard"
              className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-900/85 hover:bg-zinc-900 text-white font-bold text-xs sm:text-sm border border-zinc-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span>Trámites en Línea</span>
            </Link>

            <Link
              href="/credencial"
              className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-900/85 hover:bg-zinc-900 text-white font-bold text-xs sm:text-sm border border-zinc-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <Megaphone className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span>Credencial Digital</span>
            </Link>
            
            <Link
              href="/comite"
              className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-900/85 hover:bg-zinc-900 text-white font-bold text-xs sm:text-sm border border-zinc-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span>Comité Ejecutivo</span>
            </Link>

            <Link
              href="/beneficios"
              className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-900/85 hover:bg-zinc-900 text-white font-bold text-xs sm:text-sm border border-zinc-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span>Beneficios Exclusivos</span>
            </Link>
          </div>

          {/* Banner Flotante Dinámico: Aviso Destacado con Texto Deslizante */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="group cursor-pointer relative overflow-hidden flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl bg-zinc-900/90 border-2 border-[#E07A2B] hover:border-orange-400 backdrop-blur-md shadow-2xl transition-all transform hover:-translate-y-0.5 max-w-xl w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#E07A2B]/15 via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>

            <div className="relative z-10 flex items-center gap-3 min-w-0 flex-1">
              <div className="p-2 rounded-xl bg-[#E07A2B] text-white shadow-md shrink-0">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce" />
              </div>
              
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#E07A2B] block">
                  LO MÁS NUEVO
                </span>

                {/* Marquesina Continua */}
                <div className="relative w-full overflow-hidden whitespace-nowrap mt-0.5">
                  <div className="inline-flex animate-[marqueeContinuous_10s_linear_infinite] hover:[animation-play-state:paused]">
                    
                    <div className="inline-flex items-center gap-2 pl-2 sm:pl-3 pr-8 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#E07A2B] shrink-0 animate-pulse" />
                      <h3 className="text-xs sm:text-base font-bold text-white group-hover:text-[#E07A2B] transition-colors leading-tight">
                        {relevantCircular.title}
                      </h3>
                    </div>

                    <div className="inline-flex items-center gap-2 pl-2 sm:pl-3 pr-8 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#E07A2B] shrink-0 animate-pulse" />
                      <h3 className="text-xs sm:text-base font-bold text-white group-hover:text-[#E07A2B] transition-colors leading-tight">
                        {relevantCircular.title}
                      </h3>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 shrink-0 text-slate-300 group-hover:text-white transition-colors p-1.5 bg-zinc-800/80 rounded-lg">
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>

        </div>

      </div>

      {/* Modal de Detalle */}
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
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E07A2B] hover:bg-orange-600 text-white text-sm font-semibold transition-all shrink-0 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Undo2 className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Regresar</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes marqueeContinuous {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

    </section>
  );
}