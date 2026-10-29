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
  ChevronRight,
  Undo2, 
  Gift,
  Smile,
  Heart,
  UserCheck,
  Award,
  Sparkles
} from 'lucide-react';

type SubEvento = {
  titulo: string;
  detalles: string;
  icono: typeof PartyPopper;
};

const subEventosFestejos: Record<string, SubEvento> = {
  reyes: {
    titulo: 'Día de Reyes',
    detalles: 'Entrega de obsequios, juguetes y rosca de reyes para las hijas e hijos de nuestros trabajadores sindicalizados. Se organiza una jornada de convivencia familiar con actividades infantiles.',
    icono: Gift,
  },
  ninio: {
    titulo: 'Día del Niño',
    detalles: 'Celebración dedicada a consentir a las pequeñas y pequeños de la familia sindical. Incluye shows infantiles, dulces, juegos mecánicos y sorpresas preparadas por el Sindicato.',
    icono: Smile,
  },
  madres: {
    titulo: 'Día de las Madres',
    detalles: 'Festejo conmemorativo para reconocer la invaluable labor de las madres trabajadoras sindicalizadas. Incluye convivio, música en vivo, rifas y detalles especiales.',
    icono: Heart,
  },
  padre: {
    titulo: 'Día del Padre',
    detalles: 'Evento especial en honor a los padres de familia de nuestra base trabajadora. Un espacio de integración y convivencia para compartir y reconocer su esfuerzo diario.',
    icono: UserCheck,
  },
  aniversario: {
    titulo: 'Aniversario del Sindicato',
    detalles: 'Conmemoración oficial de la fundación del STSMQ. Evento magno con entrega de reconocimientos a la trayectoria, mensaje sindical y convivio institucional.',
    icono: Award,
  },
  diciembre12: {
    titulo: 'Celebración del 12 de Diciembre',
    detalles: 'Tradicional festejo decembrino para toda la familia sindicalizada. Incluye cena, misa de acción de gracias, música, rifas y entrega de apoyos navideños.',
    icono: Sparkles,
  },
};

const eventos = [
  {
    id: 'festejos',
    titulo: 'Festejos Tradicionales',
    descripcion: 'Convivios y fechas especiales.',
    icono: PartyPopper,
    esSubdividido: true,
  },
  {
    id: 'peregrinaciones',
    titulo: 'Peregrinaciones',
    descripcion: 'Acompañamiento en las tradicionales peregrinaciones anuales de fe y tradición.',
    icono: Footprints,
    esSubdividido: false,
    detalles: 'Participación activa y organizada de los agremiados en las rutas tradicionales hacia la Congregación, Colón y El Pueblito. El sindicato apoya con logística, puntos de hidratación y organización general para los contingentes.'
  },
  {
    id: 'deportivos',
    titulo: 'Torneos Deportivos',
    descripcion: 'Fomento a la salud física, la convivencia y el compañerismo a través de disciplinas deportivas.',
    icono: Trophy,
    esSubdividido: false,
    detalles: 'Organización de ligas internas y participación en torneos de fútbol, básquetbol, atletismo y más. Abierto para todas las áreas operativas y administrativas interesadas en representar a su delegación.'
  },
];

export default function Eventos() {
  const [eventoSeleccionado, setEventoSeleccionado] = useState<typeof eventos[0] | null>(null);
  const [subEventoActivo, setSubEventoActivo] = useState<SubEvento | null>(null);

  const cerrarModal = () => {
    setEventoSeleccionado(null);
    setSubEventoActivo(null);
  };

  return (
    <section id="eventos" className="bg-white text-zinc-900 py-20 px-6 sm:px-12 lg:px-16 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Encabezado de la Sección */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
            Eventos
          </h2>
          <p className="text-zinc-600 text-base leading-relaxed">
            Haz clic en cualquier opción para consultar los detalles y fechas programadas.
          </p>
        </div>

        {/* Cuadrícula de Eventos en Fondo Blanco */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {eventos.map((item) => {
            const Icono = item.icono;
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!item.esSubdividido) {
                    setEventoSeleccionado(item);
                    setSubEventoActivo(null);
                  }
                }}
                className={`group p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm transition-all duration-300 flex flex-col justify-between ${
                  item.esSubdividido ? 'cursor-default' : 'hover:border-[#E07A2B] hover:shadow-md cursor-pointer'
                }`}
              >
                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors duration-300">
                    <Icono className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 group-hover:text-[#E07A2B] transition-colors">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>

                {/* Si es Festejos Tradicionales, mostramos la lista de botones de eventos */}
                {item.esSubdividido ? (
                  <div className="mt-6 pt-4 border-t border-zinc-100 space-y-2.5">
                    <span className="text-xs font-semibold text-zinc-500 block">
                      Selecciona la celebración:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSubEventoActivo(subEventosFestejos.reyes);
                        }}
                        className="py-2 px-2.5 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Gift className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">Día de Reyes</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSubEventoActivo(subEventosFestejos.ninio);
                        }}
                        className="py-2 px-2.5 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Smile className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">Día del Niño</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSubEventoActivo(subEventosFestejos.madres);
                        }}
                        className="py-2 px-2.5 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Heart className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">Día de las Madres</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSubEventoActivo(subEventosFestejos.padre);
                        }}
                        className="py-2 px-2.5 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <UserCheck className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">Día del Padre</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSubEventoActivo(subEventosFestejos.aniversario);
                        }}
                        className="py-2 px-2.5 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1"
                      >
                        <Award className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">Aniversario</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSubEventoActivo(subEventosFestejos.diciembre12);
                        }}
                        className="py-2 px-2.5 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1"
                      >
                        <Sparkles className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">12 de Diciembre</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-[#E07A2B]">
                    <span>Ver detalles</span>
                    <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal / Panel Desplegable (Soporta Evento Estándar o SubEvento Independiente) */}
      {(eventoSeleccionado || subEventoActivo) && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={cerrarModal}
        >
          <div 
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-zinc-200 p-6 sm:p-8 relative space-y-6 text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Botón de Cerrar */}
            <button
              onClick={cerrarModal}
              className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Encabezado del Modal */}
            <div className="space-y-3">
              <div className="p-3 w-fit rounded-xl bg-[#E07A2B]/10 text-[#E07A2B]">
                {subEventoActivo ? (
                  <subEventoActivo.icono className="h-7 w-7" />
                ) : (
                  eventoSeleccionado && <eventoSeleccionado.icono className="h-7 w-7" />
                )}
              </div>
              <h3 className="text-2xl font-black text-zinc-950">
                {subEventoActivo ? subEventoActivo.titulo : eventoSeleccionado?.titulo}
              </h3>
            </div>

            {/* Contenido / Detalles */}
            <div className="space-y-4 text-zinc-600 text-sm leading-relaxed">
              <p className="bg-zinc-50 p-4 rounded-xl border border-zinc-200/60">
                {subEventoActivo ? subEventoActivo.detalles : eventoSeleccionado?.detalles}
              </p>
              
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                <span className="font-bold block text-xs uppercase tracking-wider text-[#E07A2B]">
                  Inscripciones
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Acércate a nuestras oficinas o comunícate al <strong className="text-zinc-800">(442) 213 7119</strong>.
                </p>
              </div>
            </div>

            {/* Pie del Modal */}
            <div className="pt-4 border-t border-zinc-100 flex justify-end">
              <button
                onClick={cerrarModal}
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