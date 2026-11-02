'use client';

import { useState } from 'react';
import { 
  Calendar, 
  X, 
  ChevronRight,
  FileText,
  Undo2
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

  return (
    <section id="circulares" className="bg-zinc-100/80 text-zinc-900 py-20 px-6 sm:px-12 lg:px-16 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Encabezado de la Sección */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
            Circulares, Boletines y Convocatorias
          </h2>
          <p className="text-zinc-600 text-base leading-relaxed">
            Mantente informado sobre los avisos oficiales y comunicados emitidos por el Sindicato.
          </p>
        </div>

        {/* Rejilla de Circulares con Diseño de Header Naranja (Opción 2 Definitiva) */}
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
            {/* Botón de Cerrar */}
            <button
              onClick={() => setCircularSeleccionada(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#E07A2B] hover:text-white hover:bg-[#c46522] transition-colors z-10 cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Cabecera del Modal con Estilo Naranja Coherente */}
            <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 bg-[#E07A2B] text-white p-6 sm:p-8 mb-4">
              <span className="text-xs flex items-center gap-1.5 font-medium text-orange-100 mb-2">
                <Calendar className="h-3.5 w-3.5" />
                {circularSeleccionada.date}
              </span>
              <h3 className="text-xl sm:text-2xl font-black leading-tight pr-8">
                {circularSeleccionada.titulo}
              </h3>
            </div>

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
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-sm font-semibold transition-all shrink-0 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
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