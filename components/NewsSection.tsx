'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Megaphone, 
  Calendar, 
  Phone, 
  Mail, 
  X, 
  ChevronRight,
  FileText 
} from 'lucide-react';

const circulares = [
  {
    id: '12-diciembre',
    date: '25 Octubre, 2026',
    category: 'Prestaciones y Eventos',
    titulo: 'Registro para el Evento del 12 de Diciembre',
    descripcion: 'Si aún no has registrado a tus hijas e hijos para este tradicional festejo, por favor infórmanos a través de nuestro correo oficial.',
    detalles: 'Invitamos a toda la base trabajadora a realizar el registro de sus hijas e hijos para el tradicional festejo del 12 de Diciembre. Es indispensable enviar el nombre completo del trabajador, número de empleado y datos de los menores al correo sindicato.municipio.qro@gmail.com antes de la fecha límite para asegurar sus obsequios e insumos.',
    icono: FileText,
  },
  {
    id: 'torneos-deportivos',
    date: '22 Octubre, 2026',
    category: 'Acción Deportiva',
    titulo: 'Próximos Torneos Deportivos Inter-dependencias',
    descripcion: 'Prepárate para participar en las disciplinas de fútbol, básquetbol y atletismo. Consulta las convocatorias con tu delegado.',
    detalles: 'Se abren las inscripciones para el Torneo Deportivo Anual Inter-dependencias. Invitamos a las áreas operativas y administrativas a conformar sus equipos en las disciplinas de fútbol 7, básquetbol varonil/femenil y carreras de atletismo. Acércate con tu delegado sindical para revisar la convocatoria completa.',
    icono: FileText,
  },
  {
    id: 'incremento-salarial',
    date: '20 Octubre, 2026',
    category: 'Comunicado Oficial',
    titulo: 'Acuerdo de incremento salarial para el personal operativo del Municipio',
    descripcion: 'Se concluyó exitosamente la revisión salarial con la administración municipal, logrando un ajuste beneficioso para el tabulador general.',
    detalles: 'Tras una serie de mesas de trabajo y negociación con la administración municipal de Querétaro, se firmó el acuerdo de revisión salarial que contempla un ajuste directo al tabulador general, retroactivo al mes en curso, beneficiando la economía de los trabajadores sindicalizados de base y sus familias.',
    icono: FileText,
  },
];

export default function Circulares() {
  const [circularSeleccionada, setCircularSeleccionada] = useState<typeof circulares[0] | null>(null);

  return (
    <section id="circulares" className="bg-white text-slate-900 py-20 px-6 sm:px-12 lg:px-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Encabezado de la Sección */}
        <div className="max-w-3xl space-y-4">
          <span className="text-[#E07A2B] text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            Acción y Transparencia
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Circulares
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Mantente informado sobre los avisos oficiales. 
          </p>
        </div>

        {/* Cuadrícula de Circulares en Fondo Blanco */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {circulares.map((item) => (
            <div
              key={item.id}
              onClick={() => setCircularSeleccionada(item)}
              className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#E07A2B] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-[#E07A2B] uppercase tracking-wider">{item.category}</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    {item.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#E07A2B] transition-colors leading-snug">
                  {item.titulo}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.descripcion}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#E07A2B]">
                <span>Leer comunicado completo</span>
                <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal / Panel Desplegable para la Circular Seleccionada */}
      {circularSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 relative space-y-6">
            
            {/* Botón de Cerrar */}
            <button
              onClick={() => setCircularSeleccionada(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Encabezado del Modal */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pr-8">
                <span className="text-xs font-bold text-[#E07A2B] uppercase tracking-wider">
                  {circularSeleccionada.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {circularSeleccionada.date}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-950">
                {circularSeleccionada.titulo}
              </h3>
            </div>

            {/* Contenido / Detalles */}
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                {circularSeleccionada.detalles}
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-[#E07A2B]">
                  Dudas o Aclaraciones
                </span>
                <p className="text-xs text-slate-600">
                  Para mayor aclaración respecto a esta circular, acude a nuestras oficinas en Calle Independencia No. 210, Col. Centro, o contáctanos vía telefónica al (442) 213 7119.
                </p>
              </div>
            </div>

            {/* Pie del Modal */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setCircularSeleccionada(null)}
                className="px-6 py-2.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white font-bold text-sm shadow-md transition-colors"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}