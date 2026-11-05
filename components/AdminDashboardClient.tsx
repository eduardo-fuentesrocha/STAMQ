'use client';

import { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  FileText, 
  LogOut, 
  Loader2, 
  Clock, 
  GraduationCap, 
  Building2,
  Users,
  HeartHandshake
} from 'lucide-react';
import { 
  actualizarEstatusSolicitud, 
  actualizarEstatusMateriales, 
  actualizarEstatusNacimiento,
  actualizarEstatusMatrimonio 
} from '@/app/actions/admin';
import { cerrarSesion } from '@/app/actions/auth';

interface SolicitudBecaAdmin {
  id: string;
  nombreHijo: string;
  nivelEducativo: string;
  estatus: string | null;
  numeroEmpleado: string;
  actaUrl: string;
  boletaUrl: string;
  createdAt: Date;
}

interface SolicitudMaterialAdmin {
  id: string;
  domicilioInmueble: string;
  cantidadTepetate: number;
  cantidadArena: number;
  cantidadGrava: number;
  cantidadPiedraNegra: number;
  cantidadCantera: number;
  numeroEmpleado: string;
  estatus: string | null;
  createdAt: Date;
}

interface SolicitudNacimientoAdmin {
  id: string;
  nombreHijo: string;
  numeroEmpleado: string;
  actaUrl: string;
  estatus: string | null;
  createdAt: Date;
}

interface SolicitudMatrimonioAdmin {
  id: string;
  nombreConyuge: string;
  tipoUnion: string;
  numeroEmpleado: string;
  actaUrl: string;
  estatus: string | null;
  createdAt: Date;
}

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
  const [tabActiva, setTabActiva] = useState<'becas' | 'materiales' | 'nacimiento' | 'matrimonio'>('becas');
  const [becas, setBecas] = useState<SolicitudBecaAdmin[]>(initialBecas);
  const [materiales, setMateriales] = useState<SolicitudMaterialAdmin[]>(initialMateriales);
  const [nacimientos, setNacimientos] = useState<SolicitudNacimientoAdmin[]>(initialNacimientos);
  const [matrimonios, setMatrimonios] = useState<SolicitudMatrimonioAdmin[]>(initialMatrimonios);
  const [cargandoArchivoId, setCargandoArchivoId] = useState<string | null>(null);

  // Cambiar Estatus Becas
  const handleCambiarEstatusBeca = async (id: string, nuevoEstatus: string) => {
    const res = await actualizarEstatusSolicitud(id, nuevoEstatus);
    if (res.success) {
      setBecas(prev => prev.map(item => item.id === id ? { ...item, estatus: nuevoEstatus } : item));
    } else {
      alert(res.error || 'No se pudo actualizar el estatus.');
    }
  };

  // Cambiar Estatus Materiales
  const handleCambiarEstatusMaterial = async (id: string, nuevoEstatus: string) => {
    const res = await actualizarEstatusMateriales(id, nuevoEstatus);
    if (res.success) {
      setMateriales(prev => prev.map(item => item.id === id ? { ...item, estatus: nuevoEstatus } : item));
    } else {
      alert(res.error || 'No se pudo actualizar el estatus.');
    }
  };

  // Cambiar Estatus Nacimiento (+ Alta Automática en Familiar)
  const handleCambiarEstatusNacimiento = async (id: string, nuevoEstatus: string) => {
    const res = await actualizarEstatusNacimiento(id, nuevoEstatus);
    if (res.success) {
      setNacimientos(prev => prev.map(item => item.id === id ? { ...item, estatus: nuevoEstatus } : item));
    } else {
      alert(res.error || 'No se pudo actualizar el estatus.');
    }
  };

  // Cambiar Estatus Matrimonio (+ Alta Automática en Familiar)
  const handleCambiarEstatusMatrimonio = async (id: string, nuevoEstatus: string) => {
    const res = await actualizarEstatusMatrimonio(id, nuevoEstatus);
    if (res.success) {
      setMatrimonios(prev => prev.map(item => item.id === id ? { ...item, estatus: nuevoEstatus } : item));
    } else {
      alert(res.error || 'No se pudo actualizar el estatus.');
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

  return (
    <div className="min-h-screen bg-white text-zinc-800 p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header Admin */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
        <div>
          <span className="text-xs font-bold text-[#E07A2B] uppercase tracking-wider">Panel de Control Sindical</span>
          <h1 className="text-2xl font-black text-zinc-900">Administración de Solicitudes</h1>
          <p className="text-xs text-zinc-500 font-medium">Sesión de Administrador: {adminNombre}</p>
        </div>
        <button
          onClick={async () => { await cerrarSesion(); window.location.href = '/'; }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900 text-xs font-bold transition-all border border-zinc-200 cursor-pointer shadow-sm"
        >
          <LogOut className="h-4 w-4 text-[#E07A2B]" />
          <span>Cerrar Sesión</span>
        </button>
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
                const fechaFormateada = new Date(item.createdAt).toISOString().split('T')[0];
                return (
                  <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[#E07A2B]">Emp. #{item.numeroEmpleado}</span>
                        <span className="text-zinc-400 font-medium">• {fechaFormateada}</span>
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
                    </div>

                    <div className="flex items-center gap-3">
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
                        <button onClick={() => handleCambiarEstatusBeca(item.id, 'Aprobada')} className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer shadow-sm" title="Aprobar Solicitud">
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleCambiarEstatusBeca(item.id, 'Rechazada')} className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer shadow-sm" title="Rechazar Solicitud">
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
                const fechaFormateada = new Date(item.createdAt).toISOString().split('T')[0];
                return (
                  <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[#E07A2B]">Emp. #{item.numeroEmpleado}</span>
                        <span className="text-zinc-400 font-medium">• {fechaFormateada}</span>
                      </div>
                      <h4 className="text-sm font-bold text-zinc-900">Inmueble: {item.domicilioInmueble}</h4>
                      <p className="text-xs text-zinc-600 font-medium pt-1">
                        Tepetate: <strong>{item.cantidadTepetate}</strong> | Arena: <strong>{item.cantidadArena}</strong> | Grava: <strong>{item.cantidadGrava}</strong> | P. Negra: <strong>{item.cantidadPiedraNegra}</strong> | Cantera: <strong>{item.cantidadCantera}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
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
                        <button onClick={() => handleCambiarEstatusMaterial(item.id, 'Aprobada')} className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer shadow-sm" title="Aprobar Solicitud">
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleCambiarEstatusMaterial(item.id, 'Rechazada')} className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer shadow-sm" title="Rechazar Solicitud">
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
                const fechaFormateada = new Date(item.createdAt).toISOString().split('T')[0];
                return (
                  <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[#E07A2B]">Emp. #{item.numeroEmpleado}</span>
                        <span className="text-zinc-400 font-medium">• {fechaFormateada}</span>
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
                    </div>

                    <div className="flex items-center gap-3">
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
                        <button onClick={() => handleCambiarEstatusNacimiento(item.id, 'Aprobada')} className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer shadow-sm" title="Aprobar y Registrar en Padrón">
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleCambiarEstatusNacimiento(item.id, 'Rechazada')} className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer shadow-sm" title="Rechazar Solicitud">
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
                const fechaFormateada = new Date(item.createdAt).toISOString().split('T')[0];
                return (
                  <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[#E07A2B]">Emp. #{item.numeroEmpleado}</span>
                        <span className="text-zinc-400 font-medium">• {fechaFormateada}</span>
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
                    </div>

                    <div className="flex items-center gap-3">
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
                        <button onClick={() => handleCambiarEstatusMatrimonio(item.id, 'Aprobada')} className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer shadow-sm" title="Aprobar y Registrar Cónyuge">
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleCambiarEstatusMatrimonio(item.id, 'Rechazada')} className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer shadow-sm" title="Rechazar Solicitud">
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
    </div>
  );
}