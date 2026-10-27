'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, Megaphone, Calendar, Bell, ExternalLink, X } from 'lucide-react';

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
    title: 'Celebración del 12 de Diciembre',
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

      {/* Header Institucional Superior */}
      <div className="relative z-30 w-full flex items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 w-full">
          {/* Logo oficial en blanco */}
          <div className="relative h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 shrink-0 flex items-center justify-center -ml-2 sm:-ml-3">
            <Image
              src="/STSMQ.svg"
              alt="Logotipo Oficial STSMQ"
              fill
              className="object-contain brightness-0 invert drop-shadow-md"
            />
          </div>

          {/* Texto institucional */}
          <div className="w-full">
            <span 
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 600 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl tracking-normal text-white uppercase leading-snug drop-shadow-md block"
            >
              SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO
            </span>
          </div>
        </div>
      </div>

      {/* Contenido Principal Centrado Verticalmente con margen superior adaptado para móvil */}
      <div className="relative z-20 w-full max-w-7xl mx-auto my-auto flex flex-col justify-center pt-6 sm:pt-0">
        <div className="max-w-2xl space-y-4 sm:space-y-5 text-left">
          
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            Portal para los <br />
            <span className="text-[#E07A2B]">Trabajadores Sindicalizados del Municipio de Querétaro</span>
          </h1>

          {/* 4 Accesos rápidos uniformes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            {/* Prestaciones */}
            <Link
              href="#prestaciones"
              className="group flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-sm border border-slate-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <span>Prestaciones</span>
            </Link>

            {/* Servicios */}
            <Link
              href="#servicios"
              className="group flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-sm border border-slate-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <Megaphone className="h-5 w-5" />
              </div>
              <span>Servicios</span>
            </Link>
            
            {/* Eventos */}
            <Link
              href="#eventos"
              className="group flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-sm border border-slate-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <span>Eventos</span>
            </Link>

            {/* Circulares */}
            <Link
              href="#circulares"
              className="group flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-sm border border-slate-700/80 hover:border-[#E07A2B] backdrop-blur-md shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <div className="p-2 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                <Bell className="h-5 w-5" />
              </div>
              <span>Circulares</span>
            </Link>
          </div>

          {/* 🌟 Banner Flotante Dinámico: Aviso Destacado */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="group cursor-pointer relative overflow-hidden flex items-center justify-between gap-4 p-3.5 rounded-xl bg-slate-900/85 border-2 border-[#E07A2B] hover:border-orange-400 backdrop-blur-md shadow-2xl transition-all transform hover:-translate-y-0.5 max-w-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#E07A2B]/15 via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#E07A2B] text-white shadow-md shrink-0">
                <Bell className="h-5 w-5 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#E07A2B] block">
                  AVISO DESTACADO
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#E07A2B] transition-colors leading-tight">
                  {relevantCircular.title}
                </h3>
              </div>
            </div>

            <div className="relative z-10 shrink-0 text-slate-300 group-hover:text-white transition-colors p-2 bg-slate-800/80 rounded-lg">
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>

        </div>
      </div>

      {/* Espaciador inferior */}
      <div className="hidden sm:block h-4"></div>

      {/* 📋 Modal de Detalle del Aviso Destacado */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-[#E07A2B] rounded-2xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#E07A2B]/20 text-[#E07A2B]">
                <Bell className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#E07A2B] uppercase tracking-wider">Aviso Oficial Destacado</span>
                <p className="text-sm text-slate-400">{relevantCircular.date}</p>
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
                className="px-5 py-2.5 rounded-xl bg-[#E07A2B] hover:bg-orange-600 text-white font-bold text-sm transition-colors shadow-lg"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}