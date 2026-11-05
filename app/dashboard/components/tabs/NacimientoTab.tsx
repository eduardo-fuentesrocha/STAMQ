'use client';

import { useState, useTransition } from 'react';
import { Users, Upload, CheckCircle2, AlertCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import { registrarSolicitudNacimiento } from '@/app/actions/nacimiento';

export interface SolicitudNacimiento {
  id: string;
  folio: string;
  nombreHijo: string;
  estatus: string;
  fecha: string;
}

// Asegúrate de que tenga "export default"
export default function NacimientoTab({ 
  initialSolicitudes 
}: { 
  initialSolicitudes: SolicitudNacimiento[] 
}) {
  const [solicitudesNacimiento, setSolicitudesNacimiento] = useState<SolicitudNacimiento[]>(initialSolicitudes);
  const [archivoActa, setArchivoActa] = useState<File | null>(null);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [errorTramite, setErrorTramite] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmitNacimiento(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const acta = formData.get('actaNacimiento') as File;

    if (acta && !acta.name.toLowerCase().endsWith('.pdf')) {
      setErrorTramite('El acta de nacimiento debe estar estrictamente en formato .pdf');
      return;
    }

    setMensajeExito(false);
    setErrorTramite(null);

    startTransition(async () => {
      const result = await registrarSolicitudNacimiento(formData);
      
      if (result.success && result.data) {
        const nuevoFolio = `NAC-2026-${String(solicitudesNacimiento.length + 1).padStart(2, '0')}`;
        
        const nuevaUI: SolicitudNacimiento = {
          id: result.data.id,
          folio: nuevoFolio,
          nombreHijo: result.data.nombreHijo,
          estatus: result.data.estatus || 'En Revisión',
          fecha: new Date().toISOString().split('T')[0],
        };

        setSolicitudesNacimiento([nuevaUI, ...solicitudesNacimiento]);
        setMensajeExito(true);
        setArchivoActa(null);
        form.reset();
        setTimeout(() => setMensajeExito(false), 5000);
      } else {
        setErrorTramite(result.error || 'Ocurrió un error al procesar la solicitud.');
      }
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in fade-in duration-300">
      
      {/* IZQUIERDA: Formulario de Registro de Nacimiento */}
      <div className="p-6 rounded-3xl bg-zinc-50/90 border border-zinc-200/80 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="p-3 w-fit rounded-xl bg-[#E07A2B]/10 text-[#E07A2B]">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">Registrar Nacimiento de Hijos</h3>
          <p className="text-xs text-zinc-500 leading-relaxed font-medium">
            Ingresa el nombre completo del hijo(a) y adjunta su acta de nacimiento en formato PDF para iniciar el trámite de alta en el padrón familiar.
          </p>
        </div>

        <form onSubmit={handleSubmitNacimiento} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">Nombre Completo del Hijo(a)</label>
            <input
              type="text"
              name="nombreHijo"
              required
              placeholder="Nombre, Apellido Paterno y Materno"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">Acta de Nacimiento (Solo PDF)</label>
            <div className="border-2 border-dashed border-zinc-200 hover:border-[#E07A2B] bg-white rounded-xl p-3 text-center cursor-pointer transition-colors relative group shadow-sm">
              <input
                type="file"
                name="actaNacimiento"
                required
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file && !file.name.toLowerCase().endsWith('.pdf')) {
                    setErrorTramite('El archivo debe ser estrictamente en formato .pdf');
                    return;
                  }
                  setErrorTramite(null);
                  setArchivoActa(file);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="space-y-1 flex flex-col items-center">
                <Upload className="h-5 w-5 text-zinc-400 group-hover:text-[#E07A2B]" />
                <span className="text-xs text-zinc-500 truncate max-w-[240px] font-medium">
                  {archivoActa ? <strong className="text-[#E07A2B]">{archivoActa.name}</strong> : 'Seleccionar Acta de Nacimiento (.pdf)'}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-sm font-bold transition-all shadow-md shadow-[#E07A2B]/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enviar Solicitud de Registro'}
          </button>

          {mensajeExito && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>¡Trámite de nacimiento enviado con éxito!</span>
            </div>
          )}

          {errorTramite && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorTramite}</span>
            </div>
          )}
        </form>
      </div>

      {/* DERECHA: Historial de Solicitudes de Nacimiento */}
      <div className="p-6 rounded-3xl bg-zinc-50/90 border border-zinc-200/80 shadow-sm space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Mis Solicitudes de Nacimiento</h3>
              <p className="text-xs text-zinc-500 font-medium">Una vez aprobadas, se reflejarán automáticamente en tus Datos Familiares.</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-zinc-200/80 text-zinc-700 font-bold shadow-sm">
              {solicitudesNacimiento.length} Trámite(s)
            </span>
          </div>

          <div className="space-y-3">
            {solicitudesNacimiento.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-6 font-medium">No hay registros de nacimiento solicitados.</p>
            ) : (
              solicitudesNacimiento.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-white border border-zinc-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#E07A2B]">{item.folio}</span>
                      <span className="text-xs text-zinc-400 font-medium">{item.fecha}</span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-900">Hijo(a): {item.nombreHijo}</h4>
                  </div>

                  <span className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm ${
                    item.estatus === 'Aprobada' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    item.estatus === 'Rechazada' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                    'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {item.estatus === 'Aprobada' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                    {item.estatus === 'Rechazada' && <XCircle className="h-3.5 w-3.5 text-rose-600" />}
                    {(!item.estatus || item.estatus === 'En Revisión') && <Clock className="h-3.5 w-3.5 text-amber-600" />}
                    <span>{item.estatus || 'En Revisión'}</span>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 flex items-center gap-3 text-xs text-zinc-500 shadow-sm font-medium">
          <AlertCircle className="h-5 w-5 text-[#E07A2B] shrink-0" />
          <span>El área administrativa validará el acta de nacimiento antes de otorgar el alta oficial.</span>
        </div>
      </div>

    </div>
  );
}