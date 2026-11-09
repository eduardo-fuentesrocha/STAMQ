'use client';

import { useState } from 'react';
import { 
  CalendarDays, 
  PartyPopper, 
  Footprints, 
  Trophy, 
  X, 
  ChevronRight,
  Undo2, 
  Gift,
  Smile,
  Heart,
  UserCheck,
  Award,
  Sparkles,
  MapPin,
  Calendar,
  FileText
} from 'lucide-react';

// ==========================================
// TIPOS Y DATOS DE EVENTOS
// ==========================================

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

const subEventosPeregrinaciones: Record<string, SubEvento> = {
  congregacion: {
    titulo: 'Peregrinación a la Congregación',
    detalles: 'Acompañamiento tradicional de los agremiados en la ruta hacia la Iglesia de la Congregación en el Centro Histórico de Querétaro. Demostración de fe, unión y devoción organizada por el sindicato.',
    icono: MapPin,
  },
  colon: {
    titulo: 'Peregrinación a Colón',
    detalles: 'Participación en el recorrido histórico hacia el municipio de Colón. El Sindicato coordina los puntos de hidratación, transporte de apoyo y logística para garantizar la seguridad de los contingentes.',
    icono: MapPin,
  },
  pueblito: {
    titulo: 'Peregrinación a El Pueblito',
    detalles: 'Tradicional peregrinación hacia el Santuario de Nuestra Señora del Pueblito, en nuestro municipio de Corregidora. Una muestra de arraigo, tradición y hermandad entre los trabajadores sindicalizados.',
    icono: MapPin,
  },
};

const eventos = [
  {
    id: 'festejos',
    titulo: 'Festejos Tradicionales',
    descripcion: '',
    icono: PartyPopper,
    esSubdividido: true,
  },
  {
    id: 'peregrinaciones',
    titulo: 'Peregrinaciones',
    descripcion: '',
    icono: Footprints,
    esSubdividido: true,
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

// ==========================================
// DATOS DE CIRCULARES
// ==========================================

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

// ==========================================
// COMPONENTE PRINCIPAL (EXPORT DEFAULT)
// ==========================================

export default function BeneficiosPage() {
  const [eventoSeleccionado, setEventoSeleccionado] = useState<typeof eventos[0] | null>(null);
  const [subEventoActivo, setSubEventoActivo] = useState<SubEvento | null>(null);
  const [circularSeleccionada, setCircularSeleccionada] = useState<typeof circulares[0] | null>(null);

  const cerrarModalEvento = () => {
    setEventoSeleccionado(null);
    setSubEventoActivo(null);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* SECCIÓN 1: EVENTOS Y FESTEJOS */}
      <section id="eventos" className="bg-white text-zinc-900 py-16 px-6 sm:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Encabezado */}
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              Eventos y Beneficios Sociales
            </h2>
            <p className="text-zinc-600 text-base leading-relaxed">
              Haz clic en cualquier opción para consultar los detalles y convocatorias activas.
            </p>
          </div>

          {/* Grid de Eventos */}
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
                    {item.descripcion && (
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {item.descripcion}
                      </p>
                    )}
                  </div>

                  {/* Festejos Tradicionales */}
                  {item.id === 'festejos' ? (
                    <div className="mt-4 pt-4 border-t border-zinc-100 space-y-2.5">
                      <span className="text-xs font-semibold text-zinc-500 block">
                        Selecciona el festejo:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSubEventoActivo(subEventosFestejos.reyes);
                          }}
                          className="py-2 px-2.5 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Gift className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">Día de Reyes</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSubEventoActivo(subEventosFestejos.ninio);
                          }}
                          className="py-2 px-2.5 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Smile className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">Día del Niño</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSubEventoActivo(subEventosFestejos.madres);
                          }}
                          className="py-2 px-2.5 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Heart className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">Día de las Madres</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSubEventoActivo(subEventosFestejos.padre);
                          }}
                          className="py-2 px-2.5 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <UserCheck className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">Día del Padre</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSubEventoActivo(subEventosFestejos.aniversario);
                          }}
                          className="py-2 px-2.5 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1 cursor-pointer"
                        >
                          <Award className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">Aniversario Sindicato</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSubEventoActivo(subEventosFestejos.diciembre12);
                          }}
                          className="py-2 px-2.5 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1 cursor-pointer"
                        >
                          <Sparkles className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">12 de Diciembre</span>
                        </button>
                      </div>
                    </div>
                  ) : item.id === 'peregrinaciones' ? (
                    /* Peregrinaciones */
                    <div className="mt-4 pt-4 border-t border-zinc-100 space-y-2.5">
                      <span className="text-xs font-semibold text-zinc-500 block">
                        Selecciona la peregrinación:
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSubEventoActivo(subEventosPeregrinaciones.congregacion);
                          }}
                          className="py-2 px-3 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate">Congregación</span>
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSubEventoActivo(subEventosPeregrinaciones.colon);
                          }}
                          className="py-2 px-3 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate">Colón</span>
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSubEventoActivo(subEventosPeregrinaciones.pueblito);
                          }}
                          className="py-2 px-3 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate">El Pueblito</span>
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
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
      </section>

      {/* SECCIÓN 2: CIRCULARES Y COMUNICADOS */}
      <section id="circulares" className="bg-zinc-50/80 text-zinc-900 py-16 px-6 sm:px-12 lg:px-16 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              Circulares, Boletines y Convocatorias
            </h2>
            <p className="text-zinc-600 text-base leading-relaxed">
              Mantente informado sobre los avisos oficiales y comunicados emitidos por el Sindicato.
            </p>
          </div>

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
      </section>

      {/* MODAL 1: EVENTOS Y SUBEVENTOS */}
      {(eventoSeleccionado || subEventoActivo) && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={cerrarModalEvento}
        >
          <div 
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-zinc-200 p-6 sm:p-8 relative space-y-6 text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={cerrarModalEvento}
              className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5" />
            </button>

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

            <div className="space-y-4 text-zinc-600 text-sm leading-relaxed">
              <p className="bg-zinc-50 p-4 rounded-xl border border-zinc-200/60">
                {subEventoActivo ? subEventoActivo.detalles : eventoSeleccionado?.detalles}
              </p>
              
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                <span className="font-bold block text-xs uppercase tracking-wider text-[#E07A2B]">
                  Inscripciones e Informes
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Acércate a nuestras oficinas o comunícate al <strong className="text-zinc-800">(442) 213 7119</strong>.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 flex justify-end">
              <button
                onClick={cerrarModalEvento}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-sm font-semibold transition-all shrink-0 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Undo2 className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Regresar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CIRCULARES */}
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
              className="absolute top-5 right-5 p-2 rounded-xl text-white/90 hover:text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 bg-[#E07A2B] text-white p-6 sm:p-8 mb-4">
              <span className="text-xs flex items-center gap-1.5 font-medium text-orange-100 mb-2">
                <Calendar className="h-3.5 w-3.5" />
                {circularSeleccionada.date}
              </span>
              <h3 className="text-xl sm:text-2xl font-black leading-tight pr-8">
                {circularSeleccionada.titulo}
              </h3>
            </div>

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

    </div>
  );
}