'use client';

import { useState } from 'react';
import { 
  LogOut, 
  GraduationCap, 
  Building2, 
  FileText, 
  HeartHandshake, 
  Users, 
  Calendar, 
  Award, 
  Briefcase, 
  Clock, 
  BookOpen,
  ChevronDown,
  ChevronUp,
  UserCheck,
  CreditCard,
  MousePointerClick
} from 'lucide-react';
import { SolicitudMaterial } from '@/app/actions/materials';
import { cerrarSesion } from '@/app/actions/auth';
import MaterialesTab from '@/app/dashboard/components/tabs/MaterialesTab';
import BecasTab from '@/app/dashboard/components/tabs/BecasTab';
import NacimientoTab, { SolicitudNacimiento } from '@/app/dashboard/components/tabs/NacimientoTab';
import MatrimonioTab, { SolicitudMatrimonioInfo } from '@/app/dashboard/components/tabs/MatrimonioTab';
import UtilesTab, { SolicitudUtilesInfo } from '@/app/dashboard/components/tabs/UtilesTab';
import TramiteGenericoTab from '@/app/dashboard/components/tabs/TramiteGenericoTab';
import CredencialModal from '@/app/dashboard/components/CredencialModal';

export interface FamiliarInfo {
  id: string;
  nombreCompleto: string;
  parentesco: string;
  estatus: string;
}

interface SolicitudBeca {
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
  familiares?: FamiliarInfo[];
  puesto?: string;
  departamento?: string;
  fechaIngreso?: string;
  curp?: string;
  nss?: string;
  tipoSangre?: string;
  contactoEmergenciaNombre?: string;
  contactoEmergenciaTelefono?: string;
  fotoUrl?: string;
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
  initialMateriales: SolicitudMaterial[];
  initialNacimientos?: SolicitudNacimiento[];
  initialMatrimonios?: SolicitudMatrimonioInfo[];
  initialUtiles?: SolicitudUtilesInfo[];
  usuario: UsuarioInfo;
}) {
  const [tabActiva, setTabActiva] = useState<string | null>(null);
  const [mostrarFamiliares, setMostrarFamiliares] = useState<boolean>(false);
  const [mostrarCredencial, setMostrarCredencial] = useState<boolean>(false);
  const [familiares, setFamiliares] = useState<FamiliarInfo[]>(usuario.familiares || []);

  const handleCerrarSesion = async () => {
    await cerrarSesion();
    window.location.href = '/login';
  };

  const handleSeleccionarTab = (id: string) => {
    setTabActiva(id);
    setTimeout(() => {
      const el = document.getElementById('contenido-tramite');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-800 flex flex-col">
      {/* Header del Portal */}
      <header className="border-b border-zinc-200 bg-zinc-50/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3.5">
          <img src="/STSMQ2.svg" alt="Logo STSMQ" className="h-12 w-auto object-contain" />
          <div>
            {/* Texto del Sindicato estandarizado con tipografía Arial y peso 500 */}
            <span 
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 500 }}
              className="text-xs sm:text-sm tracking-normal text-[#E07A2B] uppercase leading-tight block"
            >
              SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO
            </span>
            <p className="text-sm text-black font-medium">Portal del Trabajador Sindicalizado</p>
          </div>
        </div>

        <button
          onClick={handleCerrarSesion}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900 text-xs font-bold transition-all border border-zinc-200 cursor-pointer shadow-sm"
        >
          <LogOut className="h-4 w-4 text-[#E07A2B]" />
          <span>Cerrar Sesión</span>
        </button>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-8 lg:p-12 space-y-8">
        
        {/* Banner de Bienvenida y Desplegable de Datos Familiares */}
        <div className="rounded-3xl bg-zinc-50/90 border border-zinc-200/80 shadow-sm overflow-hidden transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E07A2B]">Bienvenido(a)</span>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">{usuario.nombreCompleto}</h2>
              <p className="text-sm text-zinc-500 font-medium">
                Número de Empleado: <strong className="text-zinc-800">{usuario.numeroEmpleado}</strong> | Puesto: Base Operativa
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Botón Credencial Digital */}
              <button
                onClick={() => setMostrarCredencial(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                  mostrarCredencial 
                    ? 'bg-[#E07A2B] text-white shadow-md shadow-[#E07A2B]/20 border border-transparent' 
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200'
                }`}
              >
                <CreditCard className={`h-4 w-4 ${mostrarCredencial ? 'text-white' : 'text-[#E07A2B]'}`} />
                <span>Consulta aquí tu Credencial Digital</span>
              </button>

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

              <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Trabajador Sindicalizado Activo
              </div>
            </div>
          </div>

          {/* Sección Desplegable de Datos Familiares */}
          {mostrarFamiliares && (
            <div className="border-t border-zinc-200 bg-white p-6 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900">Familiares Registrados (Cónyuge e Hijos)</h3>
                <span className="text-[11px] text-zinc-500 font-medium">
                  Los datos se actualizan automáticamente al aprobar trámites de Nacimiento o Matrimonio.
                </span>
              </div>

              {familiares.length === 0 ? (
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-center text-xs text-zinc-500 font-medium">
                  No hay familiares registrados actualmente. Inicia un trámite de Nacimiento o Matrimonio para darlos de alta.
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
              { id: 'nacimiento', label: 'Registro de Nacimiento', icon: Users },
              { id: 'matrimonio', label: 'Matrimonio o Concubinato', icon: Users },
              { id: 'salon', label: 'Renta del Salón', icon: Calendar },
              { id: 'materiales', label: 'Materiales para Construcción', icon: Building2 },
              { id: 'albanil', label: 'Apoyo día del Albañil', icon: Briefcase },
              { id: 'guardias', label: 'Guardias 12 de Diciembre', icon: Clock },
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
                <p className="text-xs text-zinc-500">Selecciona una de las opciones del menú superior para comenzar a gestionar tu solicitud.</p>
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
          {['jubilaciones', 'pensiones', 'fallecimiento', 'salon', 'albanil', 'guardias'].includes(tabActiva || '') && (
            <TramiteGenericoTab tipo={tabActiva!} />
          )}
        </div>

      </main>

      {/* Modal de la Credencial Digital */}
      {mostrarCredencial && (
        <CredencialModal 
          usuario={usuario} 
          onClose={() => setMostrarCredencial(false)} 
        />
      )}
    </div>
  );
}