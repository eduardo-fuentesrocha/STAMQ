'use client';

import { useState, useTransition } from 'react';
import { 
  GraduationCap, 
  Building2, 
  FileText, 
  HeartHandshake, 
  Users, 
  Calendar, 
  Award, 
  BookOpen,
  ChevronDown,
  ChevronUp,
  UserCheck,
  MousePointerClick,
  MessageSquarePlus,
  AlertCircle,
  X
} from 'lucide-react';
import { SolicitudMaterial } from '@/app/actions/materials';
import { marcarNotificacionRechazoVista } from '@/app/actions/notificaciones';
import MaterialesTab from '@/app/dashboard/components/tabs/MaterialesTab';
import BecasTab from '@/app/dashboard/components/tabs/BecasTab';
import NacimientoTab, { SolicitudNacimiento } from '@/app/dashboard/components/tabs/NacimientoTab';
import MatrimonioTab, { SolicitudMatrimonioInfo } from '@/app/dashboard/components/tabs/MatrimonioTab';
import UtilesTab, { SolicitudUtilesInfo } from '@/app/dashboard/components/tabs/UtilesTab';
import TramiteGenericoTab from '@/app/dashboard/components/tabs/TramiteGenericoTab';
import SugerenciasTab from '@/app/dashboard/components/tabs/SugerenciasTab';

export interface FamiliarInfo {
  id: string;
  nombreCompleto: string;
  parentesco: string;
  estatus: string;
}

interface SolicitudBaseNotificacion {
  motivoRechazo?: string | null;
  notificacionVista?: boolean;
  fechaGestion?: string | null;
}

interface SolicitudBeca extends SolicitudBaseNotificacion {
  id: string;
  folio: string;
  hijo: string;
  nivel: string;
  estatus: string;
  fecha: string;
}

interface UsuarioInfo {
  nombreCompleto: string;
  numeroEmpleado: string;
  email?: string | null;
  familiares?: FamiliarInfo[];
  puesto?: string;
  departamento?: string;
  fechaIngreso?: string;
  curp?: string;
  nss?: string;
  tipoSangre?: string;
  contactoEmergenciaNombre?: string;
  contactoEmergenciaTelefono?: string;
}

type TipoTramiteNotificacion = 'becas' | 'materiales' | 'nacimiento' | 'matrimonio' | 'utiles';

const UNA_SEMANA_MS = 7 * 24 * 60 * 60 * 1000;

function esDentroDeUnaSemana(fechaGestion?: string | null, fechaFallback?: string): boolean {
  const fechaRef = fechaGestion || fechaFallback;
  if (!fechaRef) return true;
  const timestamp = new Date(fechaRef).getTime();
  if (Number.isNaN(timestamp)) return true;
  return Date.now() - timestamp <= UNA_SEMANA_MS;
}

export default function DashboardClient({ 
  initialSolicitudes, 
  initialMateriales,
  initialNacimientos = [],
  initialMatrimonios = [],
  initialUtiles = [],
  usuario 
}: { 
  initialSolicitudes: SolicitudBeca[];
  initialMateriales: (SolicitudMaterial & SolicitudBaseNotificacion)[];
  initialNacimientos?: (SolicitudNacimiento & SolicitudBaseNotificacion)[];
  initialMatrimonios?: (SolicitudMatrimonioInfo & SolicitudBaseNotificacion)[];
  initialUtiles?: (SolicitudUtilesInfo & SolicitudBaseNotificacion)[];
  usuario: UsuarioInfo;
}) {
  const [tabActiva, setTabActiva] = useState<string | null>(null);
  const [mostrarFamiliares, setMostrarFamiliares] = useState<boolean>(false);
  const [familiares] = useState<FamiliarInfo[]>(usuario.familiares || []);
  const [avisosDescartados, setAvisosDescartados] = useState<string[]>([]);
  const [, startTransition] = useTransition();

  const handleSeleccionarTab = (id: string) => {
    setTabActiva(id);
    setTimeout(() => {
      const el = document.getElementById('contenido-tramite');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleDescartarAviso = (
    e: React.MouseEvent,
    id: string,
    tipo: TipoTramiteNotificacion
  ) => {
    e.stopPropagation();
    setAvisosDescartados((prev) => [...prev, id]);

    startTransition(async () => {
      await marcarNotificacionRechazoVista(id, tipo);
    });
  };

  const esAlertaVisible = (item: {
    id: string;
    estatus?: string;
    motivoRechazo?: string | null;
    notificacionVista?: boolean;
    fechaGestion?: string | null;
    fecha?: string;
  }) =>
    item.estatus === 'Rechazada' &&
    Boolean(item.motivoRechazo) &&
    !item.notificacionVista &&
    !avisosDescartados.includes(item.id) &&
    esDentroDeUnaSemana(item.fechaGestion, item.fecha);

  // Recopilar trámites rechazados vigentes (última semana y no vistos)
  const tramitesRechazados: {
    id: string;
    tab: TipoTramiteNotificacion;
    titulo: string;
    motivo: string;
  }[] = [
    ...initialSolicitudes
      .filter(esAlertaVisible)
      .map((s) => ({ id: s.id, tab: 'becas' as const, titulo: `Beca (${s.hijo})`, motivo: s.motivoRechazo! })),
    ...initialMateriales
      .filter(esAlertaVisible)
      .map((s) => ({ id: s.id, tab: 'materiales' as const, titulo: 'Ayuda de Materiales', motivo: s.motivoRechazo! })),
    ...initialNacimientos
      .filter(esAlertaVisible)
      .map((s) => ({ id: s.id, tab: 'nacimiento' as const, titulo: `Nacimiento (${s.nombreHijo})`, motivo: s.motivoRechazo! })),
    ...initialMatrimonios
      .filter(esAlertaVisible)
      .map((s) => ({ id: s.id, tab: 'matrimonio' as const, titulo: `Matrimonio (${s.nombreConyuge})`, motivo: s.motivoRechazo! })),
    ...initialUtiles
      .filter(esAlertaVisible)
      .map((s) => ({ id: s.id, tab: 'utiles' as const, titulo: `Útiles Escolares (${s.hijo})`, motivo: s.motivoRechazo! })),
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-800 flex flex-col">

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-8 lg:p-12 space-y-8">
        
        {/* Banner de Bienvenida y Desplegable de Datos Familiares */}
        <div className="rounded-3xl bg-zinc-50/90 border border-zinc-200/80 shadow-sm overflow-hidden transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E07A2B]">Bienvenido(a)</span>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">{usuario.nombreCompleto}</h2>
              <p className="text-sm text-zinc-500 font-medium">
                Número de Empleado: <strong className="text-zinc-800">{usuario.numeroEmpleado}</strong>
                <br/> Puesto: <strong className="text-zinc-800">{usuario.puesto}</strong>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Botón Datos Familiares */}
              <button
                onClick={() => setMostrarFamiliares(!mostrarFamiliares)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                  mostrarFamiliares 
                    ? 'bg-[#E07A2B] text-white shadow-md shadow-[#E07A2B]/20 border border-transparent' 
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200'
                }`}
              >
                <UserCheck className={`h-4 w-4 ${mostrarFamiliares ? 'text-white' : 'text-[#E07A2B]'}`} />
                <span>Consulta aquí tus Datos Familiares ({familiares.length})</span>
                {mostrarFamiliares ? <ChevronUp className="h-4 w-4 text-white/80" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
              </button>
            </div>
          </div>

          {/* Sección Desplegable de Datos Familiares */}
          {mostrarFamiliares && (
            <div className="border-t border-zinc-200 bg-white p-6 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900">Familiares Registrados (Cónyuge e Hijos)</h3>
              </div>

              {familiares.length === 0 ? (
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-center text-xs text-black font-medium leading-relaxed">
                  No hay familiares registrados actualmente. Da clic en el trámite de <strong className="text-zinc-800">Nacimiento de Hijos</strong> o <strong className="text-zinc-800">Matrimonio o Concubinato</strong> en el menú de abajo para dar de alta a tus familiares.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {familiares.map((item) => (
                    <div key={item.id} className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-3 shadow-sm">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-[#E07A2B] uppercase tracking-wider block">
                          {item.parentesco}
                        </span>
                        <h4 className="text-xs font-bold text-zinc-900 leading-snug">
                          {item.nombreCompleto}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold shrink-0">
                        {item.estatus}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Alerta de Trámites Rechazados con Motivo (Vigencia 7 días / descartable) */}
        {tramitesRechazados.length > 0 && (
          <div className="rounded-3xl bg-rose-50/90 border border-rose-200 p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between gap-2 text-rose-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
                <h3 className="text-sm font-black">
                  Tienes {tramitesRechazados.length} solicitud(es) rechazada(s) con observaciones
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-rose-600/80 hidden sm:inline">
                Visibles por 7 días o hasta marcar como leídas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {tramitesRechazados.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSeleccionarTab(item.tab)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleSeleccionarTab(item.tab);
                  }}
                  className="text-left p-3.5 rounded-2xl bg-white border border-rose-200/80 hover:border-rose-400 transition-colors cursor-pointer space-y-1.5 shadow-xs relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-rose-700">{item.titulo}</span>
                    <button
                      type="button"
                      onClick={(e) => handleDescartarAviso(e, item.id, item.tab)}
                      title="Marcar como visto y ocultar aviso"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/70 transition-colors cursor-pointer shrink-0"
                    >
                      <span>Entendido</span>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-600 leading-snug pr-2">
                    <strong className="text-zinc-800">Motivo:</strong> {item.motivo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menú Superior en Cuadrícula Responsiva */}
        <div className="space-y-4 border-b border-zinc-200 pb-8">
          <span className="text-sm font-bold text-black uppercase tracking-wider block">
            Selecciona la opción que deseas dar trámite:
          </span>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { id: 'jubilaciones', label: 'Jubilaciones', icon: Award },
              { id: 'pensiones', label: 'Pensiones', icon: FileText },
              { id: 'fallecimiento', label: 'Apoyos por Fallecimiento', icon: HeartHandshake },
              { id: 'becas', label: 'Becas', icon: GraduationCap },
              { id: 'utiles', label: 'Útiles Escolares', icon: BookOpen },
              { id: 'nacimiento', label: 'Nacimiento de Hijos', icon: Users },
              { id: 'matrimonio', label: 'Matrimonio o Concubinato', icon: Users },
              { id: 'salon', label: 'Renta del Salón del Sindicato', icon: Calendar },
              { id: 'materiales', label: 'Ayuda de Materiales para Construcción', icon: Building2 },
              { id: 'sugerencias', label: 'Buzón de Sugerencias', icon: MessageSquarePlus },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleSeleccionarTab(id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm text-left ${
                  tabActiva === id 
                    ? 'bg-[#E07A2B] text-white shadow-md shadow-[#E07A2B]/30 ring-2 ring-[#E07A2B]/40 scale-[1.02]' 
                    : 'bg-zinc-50 text-zinc-700 hover:bg-[#E07A2B]/10 hover:text-[#E07A2B] border border-zinc-200 hover:border-[#E07A2B]/30'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${tabActiva === id ? 'bg-white/20 text-white' : 'bg-[#E07A2B]/10 text-[#E07A2B]'}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sección del Formulario Seleccionado */}
        <div id="contenido-tramite" className="pt-2">
          {!tabActiva && (
            <div className="p-12 text-center bg-zinc-50/60 border border-dashed border-zinc-300 rounded-3xl space-y-3 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#E07A2B]/10 text-[#E07A2B] flex items-center justify-center mx-auto">
                <MousePointerClick className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-zinc-900">Ningún trámite seleccionado</h3>
                <p className="text-xs text-zinc-500">Selecciona una de las opciones del menú superior para comenzar a gestionar tu solicitud o enviar una sugerencia.</p>
              </div>
            </div>
          )}

          {tabActiva === 'becas' && (
            <BecasTab 
              initialSolicitudes={initialSolicitudes} 
              familiares={usuario.familiares || []} 
              onIrANacimiento={() => handleSeleccionarTab('nacimiento')}
            />
          )}
          {tabActiva === 'materiales' && <MaterialesTab initialMateriales={initialMateriales} />}
          {tabActiva === 'nacimiento' && <NacimientoTab initialSolicitudes={initialNacimientos} />}
          {tabActiva === 'matrimonio' && <MatrimonioTab initialSolicitudes={initialMatrimonios} />}
          {tabActiva === 'utiles' && (
            <UtilesTab 
              initialSolicitudes={initialUtiles} 
              familiares={usuario.familiares || []} 
              onIrANacimiento={() => handleSeleccionarTab('nacimiento')}
            />
          )}
          {tabActiva === 'sugerencias' && (
            <SugerenciasTab usuario={{ nombreCompleto: usuario.nombreCompleto, numeroEmpleado: usuario.numeroEmpleado, email: usuario.email ?? '' }} />
          )}
          {['jubilaciones', 'pensiones', 'fallecimiento', 'salon'].includes(tabActiva || '') && (
            <TramiteGenericoTab tipo={tabActiva!} />
          )}
        </div>

      </main>

    </div>
  );
}