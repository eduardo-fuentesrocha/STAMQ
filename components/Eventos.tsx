'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CalendarDays, 
  PartyPopper, 
  Footprints, 
  Trophy, 
  Phone, 
  Mail, 
  X, 
  ChevronRight 
} from 'lucide-react';

const eventos = [
  {
    id: 'festejos',
    titulo: 'Festejos Tradicionales',
    descripcion: 'Celebraciones y convivios organizados especialmente para honrar y consentir a nuestra base trabajadora en fechas especiales.',
    icono: PartyPopper,
    detalles: 'Incluye conmemoraciones de gran tradición para el sindicato: Día de Reyes, Día del Niño (para los hijos de los agremiados), Día de las Madres, Día del Padre, Aniversario del Sindicato y la tradicional celebración del 12 de Diciembre. Consulta fechas y sedes con anticipación.'
  },
  {
    id: 'peregrinaciones',
    titulo: 'Peregrinaciones',
    descripcion: 'Acompañamiento en las tradicionales peregrinaciones anuales de fe y tradición.',
    icono: Footprints,
    detalles: 'Participación activa y organizada de los agremiados en las rutas tradicionales hacia la Congregación, Colón y El Pueblito. El sindicato apoya con logística, puntos de hidratación y organización general para los contingentes.'
  },
  {
    id: 'deportivos',
    titulo: 'Torneos Deportivos',
    descripcion: 'Fomento a la salud física, la convivencia y el compañerismo a través de disciplinas deportivas.',
    icono: Trophy,
    detalles: 'Organización de ligas internas y participación en torneos de fútbol, básquetbol, atletismo y más. Abierto para todas las áreas operativas y administrativas interesadas en representar a su delegación.'
  },
];

export default function Eventos() {
  const [eventoSeleccionado, setEventoSeleccionado] = useState<typeof eventos[0] | null>(null);

  return (
    <section id="eventos" className="bg-white text-slate-900 py-20 px-6 sm:px-12 lg:px-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Encabezado de la Sección */}
        <div className="max-w-3xl space-y-4">
          <span className="text-[#E07A2B] text-xs font-black uppercase tracking-widest">
            Vida Sindical
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Eventos
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Haz clic en cualquier opción para consultar.
          </p>
        </div>

        {/* Cuadrícula de Eventos en Fondo Blanco */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventos.map((item) => {
            const Icono = item.icono;
            return (
              <div
                key={item.id}
                onClick={() => setEventoSeleccionado(item)}
                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#E07A2B] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors duration-300">
                    <Icono className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#E07A2B] transition-colors">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#E07A2B]">
                  <span>Ver detalles y fechas</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal / Panel Desplegable para el Evento Seleccionado */}
      {eventoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 relative space-y-6">
            
            {/* Botón de Cerrar */}
            <button
              onClick={() => setEventoSeleccionado(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Encabezado del Modal */}
            <div className="space-y-3">
              <div className="p-3 w-fit rounded-xl bg-[#E07A2B]/10 text-[#E07A2B]">
                <eventoSeleccionado.icono className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-950">
                {eventoSeleccionado.titulo}
              </h3>
            </div>

            {/* Contenido / Detalles */}
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                {eventoSeleccionado.detalles}
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-[#E07A2B]">
                  Informes e Inscripciones
                </span>
                <p className="text-xs text-slate-600">
                  Para registros en torneos o detalles de convocatorias, acércate a nuestras oficinas en Calle Independencia No. 210, Col. Centro, o comunícate al (442) 213 7119.
                </p>
              </div>
            </div>

            {/* Pie del Modal */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setEventoSeleccionado(null)}
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