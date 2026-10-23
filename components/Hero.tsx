import Link from 'next/link';
import { ShieldCheck, ArrowRight, Download, Users, Briefcase } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="inicio" className="relative w-full min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-slate-950 text-white py-12 lg:py-16">
      {/* Imagen de fondo de alta definición (con superposición oscura para contraste) */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Image
          src="/hero-trabajadores-qro.png" // <-- Ruta a tu imagen pública
          alt="Trabajadores municipales de Querétaro en acción"
          fill
          className="object-cover object-center"
          priority // Carga prioritaria para el Hero
          quality={100} // Máxima calidad
        />
        {/* Degradado oscuro para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/30"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Contenido Principal */}
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Titular Simplificado y Más Pequeño */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Unidad, Justicia y <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              Seguridad Laboral
            </span>
          </h1>

          {/* Descripción Corta */}
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Representamos a la fuerza operativa y administrativa del Municipio de Querétaro. Garantizamos certidumbre jurídica, prestaciones y transparencia.
          </p>


            {/* Métrica / Stats (Estilo AFSCME, ahora con fondo) */}
            
          </div>

          {/* Tarjeta Destacada de Acción (Estilo DC 37 / AFSCME, diseño actualizado) */}
          

        </div>
      </div>
    </section>
  );
}