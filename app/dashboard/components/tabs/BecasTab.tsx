'use client';

import { useState, useTransition } from 'react';
import { GraduationCap, Upload, CheckCircle2, AlertCircle, Clock, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { registrarSolicitudBeca } from '@/app/actions/becas';

interface SolicitudBeca {
  id: string;
  folio: string;
  hijo: string;
  nivel: string;
  estatus: string;
  fecha: string;
}

interface FamiliarInfo {
  id: string;
  nombreCompleto: string;
  parentesco: string;
}

export default function BecasTab({ 
  initialSolicitudes = [],
  familiares = [],
  onIrANacimiento
}: { 
  initialSolicitudes?: SolicitudBeca[];
  familiares?: FamiliarInfo[];
  onIrANacimiento: () => void;
}) {
  const [solicitudesBecas, setSolicitudesBecas] = useState<SolicitudBeca[]>(initialSolicitudes);
  const [archivoActa, setArchivoActa] = useState<File | null>(null);
  const [archivoBoleta, setArchivoBoleta] = useState<File | null>(null);
  const [mensajeExitoBeca, setMensajeExitoBeca] = useState(false);
  const [errorBeca, setErrorBeca] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Filtrar únicamente a los hijos o hijas del padrón familiar
  const hijosRegistrados = familiares.filter(f => 
    f.parentesco.toLowerCase().includes('hijo') || f.parentesco.toLowerCase().includes('hija')
  );

  async function handleSubmitBeca(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const acta = formData.get('actaNacimiento') as File;
    const boleta = formData.get('boletaCalificaciones') as File;

    if ((acta && !acta.name.toLowerCase().endsWith('.pdf')) || (boleta && !boleta.name.toLowerCase().endsWith('.pdf'))) {
      setErrorBeca('Todos los documentos adjuntos deben estar estrictamente en formato .pdf');
      return;
    }

    setMensajeExitoBeca(false);
    setErrorBeca(null);

    startTransition(async () => {
      const result = await registrarSolicitudBeca(formData);
      
      if (result.success && result.data) {
        const nuevoFolio = `BEC-2026-${String(solicitudesBecas.length + 1).padStart(2, '0')}`;
        
        const nuevaUI: SolicitudBeca = {
          id: result.data.id,
          folio: nuevoFolio,
          hijo: result.data.nombreHijo,
          nivel: result.data.nivelEducativo,
          estatus: result.data.estatus || 'En Revisión',
          fecha: new Date().toISOString().split('T')[0],
        };

        setSolicitudesBecas([nuevaUI, ...solicitudesBecas]);
        setMensajeExitoBeca(true);
        setArchivoActa(null);
        setArchivoBoleta(null);
        form.reset();
        setTimeout(() => setMensajeExitoBeca(false), 5000);
      } else {
        setErrorBeca(result.error || 'Ocurrió un error al procesar la solicitud.');
      }
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in fade-in duration-300">
      
      {/* IZQUIERDA: Formulario de Solicitud */}
      <div className="p-6 rounded-3xl bg-zinc-50/90 border border-zinc-200/80 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="p-3 w-fit rounded-xl bg-[#E07A2B]/10 text-[#E07A2B]">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">Solicitar Nueva Beca</h3>
          <p className="text-xs text-zinc-500 leading-relaxed font-medium">
            Selecciona a tu hijo(a) registrado y adjunta el acta de nacimiento junto con la boleta de calificaciones en formato PDF (promedio mínimo de 8).
          </p>
        </div>

        <form onSubmit={handleSubmitBeca} className="space-y-4">
          
          {/* Selección de Hijo(a) registrado */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">Seleccionar Hijo(a)</label>
            {hijosRegistrados.length > 0 ? (
              <select
                name="nombreHijo"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] shadow-sm"
              >
                <option value="">Seleccione a su hijo(a)...</option>
                {hijosRegistrados.map((hijo) => (
                  <option key={hijo.id} value={hijo.nombreCompleto}>
                    {hijo.nombreCompleto}
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-medium space-y-2 shadow-sm">
                <p>No tienes hijos registrados en tu padrón familiar.</p>
                <button
                  type="button"
                  onClick={onIrANacimiento}
                  className="inline-flex items-center gap-1.5 font-bold text-[#E07A2B] hover:text-[#c46522] hover:underline cursor-pointer transition-colors"
                >
                  <span>Puedes darlo de alta primero realizando su Registro de Nacimiento</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">Nivel Educativo</label>
            <select
              name="nivelEducativo"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] shadow-sm"
            >
              <option value="">Seleccione nivel...</option>
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
              <option value="Preparatoria">Preparatoria</option>
            </select>
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
                    setErrorBeca('El archivo del acta debe ser estrictamente en formato .pdf');
                    return;
                  }
                  setErrorBeca(null);
                  setArchivoActa(file);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="space-y-1 flex flex-col items-center">
                <Upload className="h-5 w-5 text-zinc-400 group-hover:text-[#E07A2B]" />
                <span className="text-xs text-zinc-500 truncate max-w-[240px] font-medium">
                  {archivoActa ? <strong className="text-[#E07A2B]">{archivoActa.name}</strong> : 'Seleccionar Acta (.pdf)'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">Boleta de Calificaciones (Solo PDF)</label>
            <div className="border-2 border-dashed border-zinc-200 hover:border-[#E07A2B] bg-white rounded-xl p-3 text-center cursor-pointer transition-colors relative group shadow-sm">
              <input
                type="file"
                name="boletaCalificaciones"
                required
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file && !file.name.toLowerCase().endsWith('.pdf')) {
                    setErrorBeca('La boleta debe ser estrictamente en formato .pdf');
                    return;
                  }
                  setErrorBeca(null);
                  setArchivoBoleta(file);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="space-y-1 flex flex-col items-center">
                <Upload className="h-5 w-5 text-zinc-400 group-hover:text-[#E07A2B]" />
                <span className="text-xs text-zinc-500 truncate max-w-[240px] font-medium">
                  {archivoBoleta ? <strong className="text-[#E07A2B]">{archivoBoleta.name}</strong> : 'Seleccionar Boleta (.pdf)'}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending || hijosRegistrados.length === 0}
            className="w-full py-3.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-sm font-bold transition-all shadow-md shadow-[#E07A2B]/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enviar Solicitud de Beca'}
          </button>

          {mensajeExitoBeca && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>¡Trámite guardado y archivos subidos con éxito!</span>
            </div>
          )}

          {errorBeca && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorBeca}</span>
            </div>
          )}
        </form>
      </div>

      {/* DERECHA: Historial / Mis Solicitudes */}
      <div className="p-6 rounded-3xl bg-zinc-50/90 border border-zinc-200/80 shadow-sm space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Mis Solicitudes de Becas</h3>
              <p className="text-xs text-zinc-500 font-medium">Consulta en tiempo real el estatus de tus trámites escolares.</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-zinc-200/80 text-zinc-700 font-bold shadow-sm">
              {solicitudesBecas.length} Trámite(s)
            </span>
          </div>

          <div className="space-y-3">
            {solicitudesBecas.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-6 font-medium">No hay solicitudes de becas registradas.</p>
            ) : (
              solicitudesBecas.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-white border border-zinc-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#E07A2B]">{item.folio}</span>
                      <span className="text-xs text-zinc-400 font-medium">{item.fecha}</span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-900">Hijo(a): {item.hijo}</h4>
                    <p className="text-xs text-zinc-500 font-medium">Nivel: {item.nivel}</p>
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
          <span>Los documentos en PDF se almacenan de forma privada y cifrada.</span>
        </div>
      </div>

    </div>
  );
}