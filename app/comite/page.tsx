'use client';

import { Mail, Target, Eye, User } from 'lucide-react';

interface MiembroComite {
  puesto: string;
  nombre: string;
  correo: string;
}

export default function Committee() {
  const miembros: MiembroComite[] = [
    {
      puesto: 'Secretario General',
      nombre: 'Celestino Bermúdez Jiménez',
      correo: 'celestino.bermudez@stsmq.org',
    },
    {
      puesto: 'Secretario del Interior',
      nombre: 'Secretaría del Interior',
      correo: 'interior@stsmq.org',
    },
    {
      puesto: 'Secretario del Exterior',
      nombre: 'María Josefina Matehuala Ortiz',
      correo: 'josefina.matehuala@stsmq.org',
    },
    {
      puesto: 'Secretario de Trabajo y Conflictos',
      nombre: 'Víctor Hugo Servín López',
      correo: 'victor.servin@stsmq.org',
    },
    {
      puesto: 'Secretario de Hacienda',
      nombre: 'José Remedios Mendoza Espinoza',
      correo: 'remedios.mendoza@stsmq.org',
    },
    {
      puesto: 'Secretario de Organización',
      nombre: 'Juan Manuel Nava Arriaga',
      correo: 'juan.nava@stsmq.org',
    },
    {
      puesto: 'Secretario de Acción Deportiva',
      nombre: 'Francisco Rubén Espino Díaz',
      correo: 'francisco.espino@stsmq.org',
    },
    {
      puesto: 'Secretario de Actas',
      nombre: 'Claudia Sánchez Garnica',
      correo: 'claudia.sanchez@stsmq.org',
    },
    {
      puesto: 'Vigilancia',
      nombre: 'Roberto Salinas Martínez',
      correo: 'roberto.salinas@stsmq.org',
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Cabecera Institucional */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
          Comité Ejecutivo
        </h2>
        <div className="w-20 h-1 bg-[#E07A2B] mx-auto rounded-full" />
      </div>

      {/* Mini Misión y Visión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Misión */}
        <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80 shadow-sm space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E07A2B]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#E07A2B]/10 text-[#E07A2B]">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Nuestra Misión</h3>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed font-medium">
            Defender con firmeza los derechos laborales, económicos y sociales de los trabajadores sindicalizados, promoviendo la justicia, el respeto y el bienestar integral de cada agremiado y sus familias.
          </p>
        </div>

        {/* Visión */}
        <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80 shadow-sm space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E07A2B]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#E07A2B]/10 text-[#E07A2B]">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Nuestra Visión</h3>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed font-medium">
            Ser un sindicato transparente, moderno y sólido, consolidado mediante el diálogo constructivo y la unidad, garantizando estabilidad laboral y un desarrollo digno al servicio de Querétaro.
          </p>
        </div>

      </div>

      {/* Listado de Miembros del Comité */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {miembros.map((miembro, index) => (
            <div 
              key={index} 
              className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-4 group"
            >
              {/* Avatar por Defecto */}
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-zinc-100 border-2 border-zinc-200 group-hover:border-[#E07A2B] transition-colors shadow-inner flex items-center justify-center">
                <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-[#E07A2B]/5 transition-colors">
                  <User className="h-10 w-10 text-zinc-400 group-hover:text-[#E07A2B] transition-colors" />
                </div>
              </div>

              {/* Información del Miembro */}
              <div className="space-y-1 w-full">
                <span className="text-[11px] font-bold text-[#E07A2B] uppercase tracking-wider block">
                  {miembro.puesto}
                </span>
                <h4 className="text-sm font-bold text-zinc-900 leading-snug">
                  {miembro.nombre}
                </h4>
              </div>

              {/* Correo Electrónico */}
              <div className="w-full pt-3 border-t border-zinc-100 flex items-center justify-center gap-2 text-xs text-zinc-500 font-medium">
                <Mail className="h-3.5 w-3.5 text-[#E07A2B] shrink-0" />
                <a href={`mailto:${miembro.correo}`} className="hover:text-[#E07A2B] transition-colors truncate">
                  {miembro.correo}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}