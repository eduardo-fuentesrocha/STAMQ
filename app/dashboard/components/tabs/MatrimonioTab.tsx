'use client';

import { useState, useTransition } from 'react';
import { HeartHandshake, Upload, CheckCircle2, AlertCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import { registrarSolicitudMatrimonio } from '@/app/actions/matrimonio';

export interface SolicitudMatrimonioInfo {
  id: string;
  folio: string;
  nombreConyuge: string;
  tipoUnion: string;
  estatus: string;
  fecha: string;
}

export default function MatrimonioTab({ 
  initialSolicitudes 
}: { 
  initialSolicitudes: SolicitudMatrimonioInfo[] 
}) {
  const [solicitudesMatrimonio, setSolicitudesMatrimonio] = useState<SolicitudMatrimonioInfo[]>(initialSolicitudes);
  const [archivoActa, setArchivoActa] = useState<File | null>(null);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [errorTramite, setErrorTramite] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmitMatrimonio(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const acta = formData.get('actaMatrimonio') as File;

    if (acta && !acta.name.toLowerCase().endsWith('.pdf')) {
      setErrorTramite('El documento debe estar estrictamente en formato .pdf');
      return;
    }

    setMensajeExito(false);
    setErrorTramite(null);

    startTransition(async () => {
      const result = await registrarSolicitudMatrimonio(formData);
      
      if (result.success && result.data) {
        const nuevoFolio = `MATR-2026-${String(solicitudesMatrimonio.length + 1).padStart(2, '0')}`;
        
        const nuevaUI: SolicitudMatrimonioInfo = {
          id: result.data.id,
          folio: nuevoFolio,
          nombreConyuge: result.data.nombreConyuge,
          tipoUnion: result.data.tipoUnion,
          estatus: result.data.estatus || 'En Revisión',
          fecha: new Date().toISOString().split('T')[0],
        };

        setSolicitudesMatrimonio([nuevaUI, ...solicitudesMatrimonio]);
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
      
      {/* IZQUIERDA: Formulario de Registro de Matrimonio o Concubinato */}
      <div className="p-6 rounded-3xl bg-zinc-50/90 border border-zinc-200/80 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="p-3 w-fit rounded-xl bg-[#E07A2B]/10 text-[#E07A2B]">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">Registrar Matrimonio o Concubinato</h3>
          <p className="text-xs text-zinc-500 leading-relaxed font-medium">
            Ingresa el nombre completo de tu cónyuge o pareja, selecciona el tipo de unión y adjunta el acta o constancia oficial en formato PDF.
          </p>
        </div>

        <form onSubmit={handleSubmitMatrimonio} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">Nombre Completo del Cónyuge / Pareja</label>
            <input
              type="text"
              name="nombreConyuge"
              required
              placeholder="Nombre, Apellido Paterno y Materno"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">Tipo de Unión</label>
            <select
              name="tipoUnion"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] shadow-sm"
            >
              <option value="">Seleccione tipo de unión...</option>
              <option value="Matrimonio">Matrimonio</option>
              <option value="Concubinato">Concubinato</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">Subir Acta de Matrimonio o Constancia de Concubinato (Solo PDF)</label>
            <div className="border-2 border-dashed border-zinc-200 hover:border-[#E07A2B] bg-white rounded-xl p-3 text-center cursor-pointer transition-colors relative group shadow-sm">
              <input
                type="file"
                name="actaMatrimonio"
                required
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file && !file.name.toLowerCase().endsWith('.pdf')) {
                    setErrorTramite('El documento debe ser estrictamente en formato .pdf');
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
                  {archivoActa ? <strong className="text-[#E07A2B]">{archivoActa.name}</strong> : 'Seleccionar Documento (.pdf)'}
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
              <span>¡Trámite de matrimonio enviado con éxito!</span>
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

      {/* DERECHA: Historial de Solicitudes */}
      <div className="p-6 rounded-3xl bg-zinc-50/90 border border-zinc-200/80 shadow-sm space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Mis Solicitudes de Matrimonio / Concubinato</h3>
              <p className="text-xs text-zinc-500 font-medium">Una vez aprobadas, el cónyuge aparecerá en tus Datos Familiares.</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-zinc-200/80 text-zinc-700 font-bold shadow-sm">
              {solicitudesMatrimonio.length} Trámite(s)
            </span>
          </div>

          <div className="space-y-3">
            {solicitudesMatrimonio.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-6 font-medium">No hay registros de matrimonio solicitados.</p>
            ) : (
              solicitudesMatrimonio.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-white border border-zinc-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#E07A2B]">{item.folio}</span>
                      <span className="text-xs text-zinc-400 font-medium">{item.fecha}</span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-900">Cónyuge: {item.nombreConyuge}</h4>
                    <span className="text-[11px] text-zinc-500 font-medium block">Tipo: {item.tipoUnion}</span>
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
          <span>La validación de los documentos se realiza en las oficinas del Sindicato.</span>
        </div>
      </div>

    </div>
  );
}