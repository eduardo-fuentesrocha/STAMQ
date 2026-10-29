'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  X, 
  ChevronRight,
  FileText,
  Undo2,
  LayoutGrid
} from 'lucide-react';

const circulares = [
  {
    id: '12-diciembre',
    date: '25 Octubre, 2026',
    titulo: 'Registro para la Celebración del 12 de Diciembre 2026',
    detalles: 'Invitamos a toda la base trabajadora a realizar el registro de sus hijas e hijos para el tradicional festejo del 12 de Diciembre 2026. Es indispensable enviar el nombre completo del trabajador, número de empleado y datos de los menores al correo sindicato.municipio.qro@gmail.com antes de la fecha límite para asegurar sus obsequios e insumos.',
    icono: FileText,
  },
  {
    id: 'paquetes-escolares',
    date: '22 Octubre, 2026',
    titulo: 'Entrega de Paquetes Escolares',
    detalles: 'Se informa a todos los agremiados que iniciará la entrega anual de paquetes de útiles y mochilas escolares para los hijos inscritos en educación básica y media superior. Favor de acudir con copia de su recibo de nómina reciente y credencial del sindicato a la oficina central.',
    icono: FileText,
  },
  {
    id: 'torneo-futbol',
    date: '20 Octubre, 2026',
    titulo: 'Próximo Torneo de Futbol',
    detalles: 'Quedan abiertas las inscripciones para el Próximo Torneo de Futbol Inter-dependencias. Invitamos a los delegados de cada área a registrar a sus equipos operativos y administrativos. Acércate a la Secretaría de Deportes para consultar el reglamento y las fechas de la junta previa.',
    icono: FileText,
  },
];

export default function Circulares() {
  const [circularSeleccionada, setCircularSeleccionada] = useState<typeof circulares[0] | null>(null);
  
  // Estado para alternar entre las 3 alternativas (1, 2 o 3)
  const [alternativaActiva, setAlternativaActiva] = useState<1 | 2 | 3>(2);

  return (
    <section id="circulares" className="bg-zinc-100/80 text-zinc-900 py-20 px-6 sm:px-12 lg:px-16 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Selector de Alternativas (Panel de Prueba Visual) */}
        <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 uppercase tracking-wider">
            <LayoutGrid className="h-4 w-4 text-[#E07A2B]" />
            <span>Diseño:</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setAlternativaActiva(1)}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                alternativaActiva === 1 
                  ? 'bg-[#E07A2B] text-white shadow-md' 
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Alt 1: Bloque Naranja
            </button>
            <button
              onClick={() => setAlternativaActiva(2)}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                alternativaActiva === 2 
                  ? 'bg-[#E07A2B] text-white shadow-md' 
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Alt 2: Header Naranja
            </button>
            <button
              onClick={() => setAlternativaActiva(3)}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                alternativaActiva === 3 
                  ? 'bg-[#E07A2B] text-white shadow-md' 
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Alt 3: Línea Lateral
            </button>
          </div>
        </div>

        {/* Encabezado de la Sección */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
            Circulares, Boletines y Convocatorias
          </h2>
          <p className="text-zinc-600 text-base leading-relaxed">
            Mantente informado sobre los avisos oficiales y comunicados emitidos por el Sindicato.
          </p>
        </div>

        {/* --- RENDER CONDICIONAL DE LAS 3 ALTERNATIVAS --- */}

        {/* ALTERNATIVA 1: Tarjetas Bloque Naranja Sólido */}
        {alternativaActiva === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {circulares.map((item) => (
              <div
                key={item.id}
                onClick={() => setCircularSeleccionada(item)}
                className="group p-6 rounded-2xl bg-[#E07A2B] text-white hover:bg-[#c46522] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer border border-[#E07A2B]"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 text-xs text-orange-100 font-semibold uppercase tracking-wider">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-lg font-black leading-snug">
                    {item.titulo}
                  </h3>
                </div>

                <div className="mt-8 pt-4 border-t border-orange-400/40 flex items-center justify-between text-xs font-bold text-white">
                  <span>Leer comunicado completo</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ALTERNATIVA 2: Header Naranja Superior + Cuerpo Blanco */}
        {alternativaActiva === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {circulares.map((item) => (
              <div
                key={item.id}
                onClick={() => setCircularSeleccionada(item)}
                className="group rounded-2xl bg-white border border-zinc-200 hover:border-[#E07A2B] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div>
                  <div className="bg-[#E07A2B] px-5 py-3 flex items-center justify-between text-white text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.date}
                    </span>
                    <FileText className="h-4 w-4 opacity-80" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-base font-bold text-zinc-900 group-hover:text-[#E07A2B] transition-colors leading-snug">
                      {item.titulo}
                    </h3>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-[#E07A2B]">
                  <span>Leer comunicado completo</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ALTERNATIVA 3: Línea Lateral Naranja Estilo Corporativo */}
        {alternativaActiva === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {circulares.map((item) => (
              <div
                key={item.id}
                onClick={() => setCircularSeleccionada(item)}
                className="group p-6 rounded-2xl bg-white border-l-4 border-l-[#E07A2B] border-y border-r border-zinc-200 hover:border-r-[#E07A2B] hover:border-y-[#E07A2B] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-[#E07A2B]" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-[#E07A2B] transition-colors leading-snug">
                    {item.titulo}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-[#E07A2B]">
                  <span>Leer comunicado completo</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal / Panel Desplegable */}
      {circularSeleccionada && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setCircularSeleccionada(null)}
        >
          <div 
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-zinc-200 p-6 sm:p-8 relative space-y-6 text-zinc-900 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCircularSeleccionada(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors z-10"
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Cabecera Adaptable del Modal */}
            {alternativaActiva === 1 || alternativaActiva === 2 ? (
              <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 bg-[#E07A2B] text-white p-6 sm:p-8 mb-4">
                <span className="text-xs flex items-center gap-1.5 font-medium text-orange-100 mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {circularSeleccionada.date}
                </span>
                <h3 className="text-xl sm:text-2xl font-black leading-tight pr-8">
                  {circularSeleccionada.titulo}
                </h3>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <span className="text-xs text-zinc-500 flex items-center gap-1.5 font-medium bg-zinc-100 px-2.5 py-1 rounded-md w-fit">
                  <Calendar className="h-3.5 w-3.5 text-[#E07A2B]" />
                  {circularSeleccionada.date}
                </span>
                
                <h3 className="text-2xl font-black text-zinc-950 leading-tight">
                  {circularSeleccionada.titulo}
                </h3>
              </div>
            )}

            {/* Contenido / Detalles */}
            <div className="space-y-4 text-zinc-600 text-sm leading-relaxed">
              <p className="bg-zinc-50 p-4 rounded-xl border border-zinc-200/60">
                {circularSeleccionada.detalles}
              </p>
              
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                <span className="font-bold block text-xs uppercase tracking-wider text-[#E07A2B]">
                  Dudas o Aclaraciones
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Para mayor aclaración respecto a esta circular, acude a nuestras oficinas o contáctanos vía telefónica al <strong className="text-zinc-800">(442) 213 7119</strong>.
                </p>
              </div>
            </div>

            {/* Pie del Modal */}
            <div className="pt-4 border-t border-zinc-100 flex justify-end">
              <button
                onClick={() => setCircularSeleccionada(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-sm font-semibold transition-all shrink-0 shadow-md flex items-center justify-center gap-2 group"
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