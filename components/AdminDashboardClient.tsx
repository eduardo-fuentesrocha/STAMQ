'use client';

import { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Loader2, 
  Clock, 
  GraduationCap, 
  Building2,
  Users,
  HeartHandshake,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { 
  actualizarEstatusSolicitud, 
  actualizarEstatusMateriales, 
  actualizarEstatusNacimiento,
  actualizarEstatusMatrimonio 
} from '@/app/actions/admin';
import { formatearFechaHoraMX } from '@/app/lib/fechas';

interface AuditoriaFields {
  motivoRechazo?: string | null;
  gestionadoPor?: string | null;
  fechaGestion?: Date | string | null;
}

interface SolicitudBecaAdmin extends AuditoriaFields {
  id: string;
  nombreHijo: string;
  nivelEducativo: string;
  estatus: string | null;
  numeroEmpleado: string;
  actaUrl: string;
  boletaUrl: string;
  createdAt: Date | string;
}

interface SolicitudMaterialAdmin extends AuditoriaFields {
  id: string;
  domicilioInmueble: string;
  cantidadTepetate: number;
  cantidadArena: number;
  cantidadGrava: number;
  cantidadPiedraNegra: number;
  cantidadCantera: number;
  numeroEmpleado: string;
  estatus: string | null;
  createdAt: Date | string;
}

interface SolicitudNacimientoAdmin extends AuditoriaFields {
  id: string;
  nombreHijo: string;
  numeroEmpleado: string;
  actaUrl: string;
  estatus: string | null;
  createdAt: Date | string;
}

interface SolicitudMatrimonioAdmin extends AuditoriaFields {
  id: string;
  nombreConyuge: string;
  tipoUnion: string;
  numeroEmpleado: string;
  actaUrl: string;
  estatus: string | null;
  createdAt: Date | string;
}

type TipoTramiteAdmin = 'becas' | 'materiales' | 'nacimiento' | 'matrimonio';

export default function AdminDashboardClient({ 
  initialBecas,
  initialMateriales,
  initialNacimientos = [],
  initialMatrimonios = [],
  adminNombre 
}: { 
  initialBecas: SolicitudBecaAdmin[];
  initialMateriales: SolicitudMaterialAdmin[];
  initialNacimientos?: SolicitudNacimientoAdmin[];
  initialMatrimonios?: SolicitudMatrimonioAdmin[];
  adminNombre: string;
}) {
  const [tabActiva, setTabActiva] = useState<TipoTramiteAdmin>('becas');
  const [becas, setBecas] = useState<SolicitudBecaAdmin[]>(initialBecas);
  const [materiales, setMateriales] = useState<SolicitudMaterialAdmin[]>(initialMateriales);
  const [nacimientos, setNacimientos] = useState<SolicitudNacimientoAdmin[]>(initialNacimientos);
  const [matrimonios, setMatrimonios] = useState<SolicitudMatrimonioAdmin[]>(initialMatrimonios);
  const [cargandoArchivoId, setCargandoArchivoId] = useState<string | null>(null);

  // Estados para el Modal de Rechazo y Gestión
  const [modalRechazo, setModalRechazo] = useState<{
    id: string;
    tipo: TipoTramiteAdmin;
    titulo: string;
  } | null>(null);
  const [motivoRechazoInput, setMotivoRechazoInput] = useState<string>('');
  const [procesandoGestion, setProcesandoGestion] = useState<boolean>(false);

  // Abrir modal de rechazo
  const abrirModalRechazo = (id: string, tipo: TipoTramiteAdmin, titulo: string) => {
    setMotivoRechazoInput('');
    setModalRechazo({ id, tipo, titulo });
  };

  // Procesar Aprobación o Rechazo unificado
  const ejecutarCambioEstatus = async (
    id: string,
    tipo: TipoTramiteAdmin,
    nuevoEstatus: 'Aprobada' | 'Rechazada',
    motivo?: string
  ) => {
    setProcesandoGestion(true);
    let res;

    if (tipo === 'becas') {
      res = await actualizarEstatusSolicitud(id, nuevoEstatus, motivo);
    } else if (tipo === 'materiales') {
      res = await actualizarEstatusMateriales(id, nuevoEstatus, motivo);
    } else if (tipo === 'nacimiento') {
      res = await actualizarEstatusNacimiento(id, nuevoEstatus, motivo);
    } else if (tipo === 'matrimonio') {
      res = await actualizarEstatusMatrimonio(id, nuevoEstatus, motivo);
    }

    setProcesandoGestion(false);

    if (res?.success) {
      const datosAuditoriaActualizados = {
        estatus: nuevoEstatus,
        motivoRechazo: nuevoEstatus === 'Rechazada' ? motivo?.trim() : null,
        gestionadoPor: adminNombre,
        fechaGestion: new Date().toISOString(),
      };

      if (tipo === 'becas') {
        setBecas(prev => prev.map(item => item.id === id ? { ...item, ...datosAuditoriaActualizados } : item));
      } else if (tipo === 'materiales') {
        setMateriales(prev => prev.map(item => item.id === id ? { ...item, ...datosAuditoriaActualizados } : item));
      } else if (tipo === 'nacimiento') {
        setNacimientos(prev => prev.map(item => item.id === id ? { ...item, ...datosAuditoriaActualizados } : item));
      } else if (tipo === 'matrimonio') {
        setMatrimonios(prev => prev.map(item => item.id === id ? { ...item, ...datosAuditoriaActualizados } : item));
      }

      if (nuevoEstatus === 'Rechazada') {
        setModalRechazo(null);
        setMotivoRechazoInput('');
      }
    } else {
      alert(res?.error || 'No se pudo actualizar el estatus.');
    }
  };

  // Ver archivos privados utilizando el endpoint proxy seguro
  const handleVerArchivo = async (urlOriginal: string, tipo: string, id: string) => {
    if (!urlOriginal) {
      alert('No se encontró la ruta del archivo.');
      return;
    }
    setCargandoArchivoId(`${id}-${tipo}`);
    try {
      const urlSegura = `/api/admin/ver-archivo?url=${encodeURIComponent(urlOriginal)}`;
      window.open(urlSegura, '_blank');
    } catch (err) {
      console.error(err);
      alert('Error de conexión al abrir el documento.');
    } finally {
      setCargandoArchivoId(null);
    }
  };

  // Subcomponente visual para mostrar quién gestionó y por qué se rechazó
  const renderInfoAuditoria = (item: AuditoriaFields) => {
    if (!item.gestionadoPor && !item.motivoRechazo) return null;

    return (
      <div className="mt-2.5 pt-2.5 border-t border-zinc-200/70 space-y-1.5 text-xs">
        {item.gestionadoPor && (
          <div className="flex items-center gap-1.5 text-zinc-500 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-[#E07A2B] shrink-0" />
            <span>Gestionado por: <strong className="text-zinc-700">{item.gestionadoPor}</strong></span>
          </div>
        )}
        {item.motivoRechazo && (
          <div className="flex items-start gap-1.5 bg-rose-50/80 border border-rose-200/80 text-rose-800 px-3 py-2 rounded-xl">
            <AlertCircle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Motivo de rechazo: </span>
              <span>{item.motivoRechazo}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-zinc-800 p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header Admin */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
        <div>
          <span className="text-xs font-bold text-[#E07A2B] uppercase tracking-wider">Panel de Control Sindical</span>
          <h1 className="text-2xl font-black text-zinc-900">Administración de Solicitudes</h1>
          <p className="text-xs text-zinc-500 font-medium">Sesión de Administrador: {adminNombre}</p>
        </div>
      </div>

      {/* Pestañas de Navegación Admin */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 border-b border-zinc-200 pb-4">
        <button
          onClick={() => setTabActiva('becas')}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
            tabActiva === 'becas'
              ? 'bg-[#E07A2B] text-white shadow-md shadow-[#E07A2B]/20'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-200'
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>Becas ({becas.length})</span>
        </button>

        <button
          onClick={() => setTabActiva('materiales')}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
            tabActiva === 'materiales'
              ? 'bg-[#E07A2B] text-white shadow-md shadow-[#E07A2B]/20'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-200'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Materiales ({materiales.length})</span>
        </button>

        <button
          onClick={() => setTabActiva('nacimiento')}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
            tabActiva === 'nacimiento'
              ? 'bg-[#E07A2B] text-white shadow-md shadow-[#E07A2B]/20'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-200'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Nacimientos ({nacimientos.length})</span>
        </button>

        <button
          onClick={() => setTabActiva('matrimonio')}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
            tabActiva === 'matrimonio'
              ? 'bg-[#E07A2B] text-white shadow-md shadow-[#E07A2B]/20'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 border border-zinc-200'
          }`}
        >
          <HeartHandshake className="h-4 w-4" />
          <span>Matrimonios ({matrimonios.length})</span>
        </button>
      </div>

      {/* 1. PESTAÑA BECAS */}
      {tabActiva === 'becas' && (
        <div className="bg-zinc-50/90 border border-zinc-200/80 rounded-3xl overflow-hidden shadow-sm animate-in fade-in duration-300">
          <div className="p-4 border-b border-zinc-200 font-bold text-sm text-zinc-900 bg-zinc-100/50 flex items-center justify-between">
            <span>Listado General de Trámites de Becas Escolares</span>
            <span className="text-xs px-3 py-1 rounded-full bg-zinc-200/80 text-zinc-700 font-bold shadow-sm">
              {becas.length} Registro(s)
            </span>
          </div>
          <div className="divide-y divide-zinc-200/80">
            {becas.length === 0 ? (
              <p className="p-8 text-center text-xs text-zinc-500 font-medium">No hay solicitudes de becas registradas.</p>
            ) : (
              becas.map((item) => {
                const fechaFormateada = formatearFechaHoraMX(item.createdAt);
                return (
                  <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white transition-colors">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[#E07A2B]">Emp. #{item.numeroEmpleado}</span>
                        <span className="text-zinc-400 font-medium">{fechaFormateada}</span>
                      </div>
                      <h4 className="text-sm font-bold text-zinc-900">Hijo(a): {item.nombreHijo}</h4>
                      <p className="text-xs text-zinc-500 font-medium">Nivel Educativo: {item.nivelEducativo}</p>
                      
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => handleVerArchivo(item.actaUrl, 'acta', item.id)}
                          disabled={cargandoArchivoId === `${item.id}-acta`}
                          className="inline-flex items-center gap-1.5 text-xs text-zinc-700 hover:text-[#E07A2B] bg-white px-3 py-1.5 rounded-xl border border-zinc-200 cursor-pointer shadow-sm font-medium"
                        >
                          {cargandoArchivoId === `${item.id}-acta` ? <Loader2 className="h-3.5 w-3.5 animate-spin text-[#E07A2B]" /> : <FileText className="h-3.5 w-3.5 text-[#E07A2B]" />}
                          <span>Ver Acta</span>
                        </button>
                        <button
                          onClick={() => handleVerArchivo(item.boletaUrl, 'boleta', item.id)}
                          disabled={cargandoArchivoId === `${item.id}-boleta`}
                          className="inline-flex items-center gap-1.5 text-xs text-zinc-700 hover:text-[#E07A2B] bg-white px-3 py-1.5 rounded-xl border border-zinc-200 cursor-pointer shadow-sm font-medium"
                        >
                          {cargandoArchivoId === `${item.id}-boleta` ? <Loader2 className="h-3.5 w-3.5 animate-spin text-[#E07A2B]" /> : <FileText className="h-3.5 w-3.5 text-[#E07A2B]" />}
                          <span>Ver Boleta</span>
                        </button>
                      </div>

                      {renderInfoAuditoria(item)}
                    </div>

                    <div className="flex items-center gap-3 self-start md:self-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm ${
                        item.estatus === 'Aprobada' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        item.estatus === 'Rechazada' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.estatus === 'Aprobada' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                        {item.estatus === 'Rechazada' && <XCircle className="h-3.5 w-3.5 text-rose-600" />}
                        {(!item.estatus || item.estatus === 'En Revisión') && <Clock className="h-3.5 w-3.5 text-amber-600" />}
                        <span>{item.estatus || 'En Revisión'}</span>
                      </span>

                      <div className="flex items-center gap-1.5 border-l border-zinc-200 pl-3">
                        <button
                          onClick={() => ejecutarCambioEstatus(item.id, 'becas', 'Aprobada')}
                          disabled={procesandoGestion}
                          className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer shadow-sm disabled:opacity-50"
                          title="Aprobar Solicitud"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => abrirModalRechazo(item.id, 'becas', `Beca - ${item.nombreHijo}`)}
                          disabled={procesandoGestion}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer shadow-sm disabled:opacity-50"
                          title="Rechazar Solicitud"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 2. PESTAÑA MATERIALES DE CONSTRUCCIÓN */}
      {tabActiva === 'materiales' && (
        <div className="bg-zinc-50/90 border border-zinc-200/80 rounded-3xl overflow-hidden shadow-sm animate-in fade-in duration-300">
          <div className="p-4 border-b border-zinc-200 font-bold text-sm text-zinc-900 bg-zinc-100/50 flex items-center justify-between">
            <span>Listado General de Trámites para Materiales de Construcción</span>
            <span className="text-xs px-3 py-1 rounded-full bg-zinc-200/80 text-zinc-700 font-bold shadow-sm">
              {materiales.length} Registro(s)
            </span>
          </div>
          <div className="divide-y divide-zinc-200/80">
            {materiales.length === 0 ? (
              <p className="p-8 text-center text-xs text-zinc-500 font-medium">No hay solicitudes de materiales registradas.</p>
            ) : (
              materiales.map((item) => {
                const fechaFormateada = formatearFechaHoraMX(item.createdAt);
                return (
                  <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white transition-colors">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[#E07A2B]">Emp. #{item.numeroEmpleado}</span>
                        <span className="text-zinc-400 font-medium">{fechaFormateada}</span>
                      </div>
                      <h4 className="text-sm font-bold text-zinc-900">Inmueble: {item.domicilioInmueble}</h4>
                      <p className="text-xs text-zinc-600 font-medium pt-1">
                        Tepetate: <strong>{item.cantidadTepetate}</strong> | Arena: <strong>{item.cantidadArena}</strong> | Grava: <strong>{item.cantidadGrava}</strong> | P. Negra: <strong>{item.cantidadPiedraNegra}</strong> | Cantera: <strong>{item.cantidadCantera}</strong>
                      </p>

                      {renderInfoAuditoria(item)}
                    </div>

                    <div className="flex items-center gap-3 self-start md:self-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm ${
                        item.estatus === 'Aprobada' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        item.estatus === 'Rechazada' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.estatus === 'Aprobada' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                        {item.estatus === 'Rechazada' && <XCircle className="h-3.5 w-3.5 text-rose-600" />}
                        {(!item.estatus || item.estatus === 'En Revisión') && <Clock className="h-3.5 w-3.5 text-amber-600" />}
                        <span>{item.estatus || 'En Revisión'}</span>
                      </span>

                      <div className="flex items-center gap-1.5 border-l border-zinc-200 pl-3">
                        <button
                          onClick={() => ejecutarCambioEstatus(item.id, 'materiales', 'Aprobada')}
                          disabled={procesandoGestion}
                          className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer shadow-sm disabled:opacity-50"
                          title="Aprobar Solicitud"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => abrirModalRechazo(item.id, 'materiales', `Materiales - Emp. #${item.numeroEmpleado}`)}
                          disabled={procesandoGestion}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer shadow-sm disabled:opacity-50"
                          title="Rechazar Solicitud"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 3. PESTAÑA REGISTRO DE NACIMIENTO DE HIJOS */}
      {tabActiva === 'nacimiento' && (
        <div className="bg-zinc-50/90 border border-zinc-200/80 rounded-3xl overflow-hidden shadow-sm animate-in fade-in duration-300">
          <div className="p-4 border-b border-zinc-200 font-bold text-sm text-zinc-900 bg-zinc-100/50 flex items-center justify-between">
            <span>Listado General de Registros de Nacimiento (Alta de Hijos)</span>
            <span className="text-xs px-3 py-1 rounded-full bg-zinc-200/80 text-zinc-700 font-bold shadow-sm">
              {nacimientos.length} Registro(s)
            </span>
          </div>
          <div className="divide-y divide-zinc-200/80">
            {nacimientos.length === 0 ? (
              <p className="p-8 text-center text-xs text-zinc-500 font-medium">No hay solicitudes de nacimiento registradas.</p>
            ) : (
              nacimientos.map((item) => {
                const fechaFormateada = formatearFechaHoraMX(item.createdAt);
                return (
                  <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white transition-colors">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[#E07A2B]">Emp. #{item.numeroEmpleado}</span>
                        <span className="text-zinc-400 font-medium">{fechaFormateada}</span>
                      </div>
                      <h4 className="text-sm font-bold text-zinc-900">Nombre del Hijo(a): {item.nombreHijo}</h4>
                      
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => handleVerArchivo(item.actaUrl, 'acta-nacimiento', item.id)}
                          disabled={cargandoArchivoId === `${item.id}-acta-nacimiento`}
                          className="inline-flex items-center gap-1.5 text-xs text-zinc-700 hover:text-[#E07A2B] bg-white px-3 py-1.5 rounded-xl border border-zinc-200 cursor-pointer shadow-sm font-medium"
                        >
                          {cargandoArchivoId === `${item.id}-acta-nacimiento` ? <Loader2 className="h-3.5 w-3.5 animate-spin text-[#E07A2B]" /> : <FileText className="h-3.5 w-3.5 text-[#E07A2B]" />}
                          <span>Ver Acta de Nacimiento</span>
                        </button>
                      </div>

                      {renderInfoAuditoria(item)}
                    </div>

                    <div className="flex items-center gap-3 self-start md:self-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm ${
                        item.estatus === 'Aprobada' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        item.estatus === 'Rechazada' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.estatus === 'Aprobada' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                        {item.estatus === 'Rechazada' && <XCircle className="h-3.5 w-3.5 text-rose-600" />}
                        {(!item.estatus || item.estatus === 'En Revisión') && <Clock className="h-3.5 w-3.5 text-amber-600" />}
                        <span>{item.estatus || 'En Revisión'}</span>
                      </span>

                      <div className="flex items-center gap-1.5 border-l border-zinc-200 pl-3">
                        <button
                          onClick={() => ejecutarCambioEstatus(item.id, 'nacimiento', 'Aprobada')}
                          disabled={procesandoGestion}
                          className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer shadow-sm disabled:opacity-50"
                          title="Aprobar y Registrar en Padrón"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => abrirModalRechazo(item.id, 'nacimiento', `Nacimiento - ${item.nombreHijo}`)}
                          disabled={procesandoGestion}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer shadow-sm disabled:opacity-50"
                          title="Rechazar Solicitud"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 4. PESTAÑA MATRIMONIO O CONCUBINATO */}
      {tabActiva === 'matrimonio' && (
        <div className="bg-zinc-50/90 border border-zinc-200/80 rounded-3xl overflow-hidden shadow-sm animate-in fade-in duration-300">
          <div className="p-4 border-b border-zinc-200 font-bold text-sm text-zinc-900 bg-zinc-100/50 flex items-center justify-between">
            <span>Listado General de Registros de Matrimonio / Concubinato (Alta de Cónyuge)</span>
            <span className="text-xs px-3 py-1 rounded-full bg-zinc-200/80 text-zinc-700 font-bold shadow-sm">
              {matrimonios.length} Registro(s)
            </span>
          </div>
          <div className="divide-y divide-zinc-200/80">
            {matrimonios.length === 0 ? (
              <p className="p-8 text-center text-xs text-zinc-500 font-medium">No hay solicitudes de matrimonio o concubinato registradas.</p>
            ) : (
              matrimonios.map((item) => {
                const fechaFormateada = formatearFechaHoraMX(item.createdAt);
                return (
                  <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white transition-colors">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[#E07A2B]">Emp. #{item.numeroEmpleado}</span>
                        <span className="text-zinc-400 font-medium">{fechaFormateada}</span>
                      </div>
                      <h4 className="text-sm font-bold text-zinc-900">Cónyuge: {item.nombreConyuge}</h4>
                      <p className="text-xs text-zinc-500 font-medium">Tipo de Unión: <strong className="text-zinc-700">{item.tipoUnion}</strong></p>
                      
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => handleVerArchivo(item.actaUrl, 'acta-matrimonio', item.id)}
                          disabled={cargandoArchivoId === `${item.id}-acta-matrimonio`}
                          className="inline-flex items-center gap-1.5 text-xs text-zinc-700 hover:text-[#E07A2B] bg-white px-3 py-1.5 rounded-xl border border-zinc-200 cursor-pointer shadow-sm font-medium"
                        >
                          {cargandoArchivoId === `${item.id}-acta-matrimonio` ? <Loader2 className="h-3.5 w-3.5 animate-spin text-[#E07A2B]" /> : <FileText className="h-3.5 w-3.5 text-[#E07A2B]" />}
                          <span>Ver Acta / Constancia</span>
                        </button>
                      </div>

                      {renderInfoAuditoria(item)}
                    </div>

                    <div className="flex items-center gap-3 self-start md:self-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm ${
                        item.estatus === 'Aprobada' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        item.estatus === 'Rechazada' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.estatus === 'Aprobada' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                        {item.estatus === 'Rechazada' && <XCircle className="h-3.5 w-3.5 text-rose-600" />}
                        {(!item.estatus || item.estatus === 'En Revisión') && <Clock className="h-3.5 w-3.5 text-amber-600" />}
                        <span>{item.estatus || 'En Revisión'}</span>
                      </span>

                      <div className="flex items-center gap-1.5 border-l border-zinc-200 pl-3">
                        <button
                          onClick={() => ejecutarCambioEstatus(item.id, 'matrimonio', 'Aprobada')}
                          disabled={procesandoGestion}
                          className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer shadow-sm disabled:opacity-50"
                          title="Aprobar y Registrar Cónyuge"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => abrirModalRechazo(item.id, 'matrimonio', `Matrimonio - ${item.nombreConyuge}`)}
                          disabled={procesandoGestion}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer shadow-sm disabled:opacity-50"
                          title="Rechazar Solicitud"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* MODAL PARA DESCRIBIR RAZÓN DE RECHAZO */}
      {modalRechazo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-zinc-200">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                Rechazo de Solicitud
              </span>
              <h3 className="text-lg font-black text-zinc-900">{modalRechazo.titulo}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Describe brevemente la razón por la cual se rechaza este trámite. Esta información quedará registrada en la base de datos bajo tu usuario (<strong className="text-zinc-700">{adminNombre}</strong>).
              </p>
            </div>

            <textarea
              rows={4}
              value={motivoRechazoInput}
              onChange={(e) => setMotivoRechazoInput(e.target.value)}
              placeholder="Ej. El acta de nacimiento adjunta está incompleta o ilegible. Favor de subir nuevamente..."
              className="w-full rounded-2xl border border-zinc-300 p-3 text-xs text-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500"
              autoFocus
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalRechazo(null)}
                disabled={procesandoGestion}
                className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => ejecutarCambioEstatus(modalRechazo.id, modalRechazo.tipo, 'Rechazada', motivoRechazoInput)}
                disabled={procesandoGestion || !motivoRechazoInput.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {procesandoGestion && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>Confirmar Rechazo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}