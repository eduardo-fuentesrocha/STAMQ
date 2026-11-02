'use client';

import { useState, useTransition } from 'react';
import { Building2, CheckCircle2, AlertCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import { registrarSolicitudMateriales, SolicitudMaterial } from '../../../actions/materials';

export default function MaterialesTab({ 
  initialMateriales 
}: { 
  initialMateriales: SolicitudMaterial[] 
}) {
  const [solicitudesMateriales, setSolicitudesMateriales] = useState<SolicitudMaterial[]>(initialMateriales);
  const [mensajeExitoMat, setMensajeExitoMat] = useState(false);
  const [errorMat, setErrorMat] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmitMateriales(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setMensajeExitoMat(false);
    setErrorMat(null);

    startTransition(async () => {
      const result = await registrarSolicitudMateriales(formData);
      
      if (result.success && result.data) {
        setSolicitudesMateriales([result.data, ...solicitudesMateriales]);
        setMensajeExitoMat(true);
        form.reset();
        setTimeout(() => setMensajeExitoMat(false), 5000);
      } else {
        setErrorMat(result.error || 'Ocurrió un error al procesar la solicitud.');
      }
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in fade-in duration-300">
      
      {/* IZQUIERDA: Formulario de Solicitud de Materiales */}
      <div className="p-6 rounded-3xl bg-zinc-50/90 border border-zinc-200/80 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="p-3 w-fit rounded-xl bg-[#E07A2B]/10 text-[#E07A2B]">
            <Building2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">Solicitar Materiales de Construcción</h3>
          <p className="text-xs text-zinc-500 leading-relaxed font-medium">
            Indica tu dirección y asigna las cantidades numéricas requeridas de cada material.
          </p>
        </div>

        <form onSubmit={handleSubmitMateriales} className="space-y-4">
          
          {/* Autocompletado Dirección */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">Dirección del Inmueble (Autocompletado)</label>
            <input
              type="text"
              name="domicilioInmueble"
              id="autocomplete-direccion"
              required
              placeholder="Empieza a escribir tu dirección..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] shadow-sm"
            />
            <span className="text-[10px] text-zinc-400">Selecciona una sugerencia de la lista estándar.</span>
          </div>

          {/* Selector de Cantidades Numéricas */}
          <div className="space-y-3 p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
              <label className="text-xs font-bold text-zinc-700">Material y Costo Unitario</label>
              <span className="text-xs font-bold text-zinc-700">Cantidad</span>
            </div>
            
            <div className="space-y-3 pt-1 text-xs">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="font-bold text-zinc-800">Tepetate</span>
                  <span className="text-[10px] text-zinc-500">$500 c/u</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input 
                    type="number" 
                    name="cantidadTepetate" 
                    min="0" 
                    defaultValue="0"
                    className="w-16 px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs text-center font-bold text-zinc-900 focus:outline-none focus:border-[#E07A2B]"
                  />
                  <span className="text-zinc-500 text-[11px] w-10">m³</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1.5 border-t border-zinc-100">
                <div className="flex flex-col">
                  <span className="font-bold text-zinc-800">Arena</span>
                  <span className="text-[10px] text-zinc-500">$1,150 c/u</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input 
                    type="number" 
                    name="cantidadArena" 
                    min="0" 
                    defaultValue="0"
                    className="w-16 px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs text-center font-bold text-zinc-900 focus:outline-none focus:border-[#E07A2B]"
                  />
                  <span className="text-zinc-500 text-[11px] w-10">m³</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1.5 border-t border-zinc-100">
                <div className="flex flex-col">
                  <span className="font-bold text-zinc-800">Grava</span>
                  <span className="text-[10px] text-zinc-500">$2,085 c/u</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input 
                    type="number" 
                    name="cantidadGrava" 
                    min="0" 
                    defaultValue="0"
                    className="w-16 px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs text-center font-bold text-zinc-900 focus:outline-none focus:border-[#E07A2B]"
                  />
                  <span className="text-zinc-500 text-[11px] w-10">m³</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1.5 border-t border-zinc-100">
                <div className="flex flex-col">
                  <span className="font-bold text-zinc-800">Piedra Negra</span>
                  <span className="text-[10px] text-zinc-500">Cotización</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input 
                    type="number" 
                    name="cantidadPiedraNegra" 
                    min="0" 
                    defaultValue="0"
                    className="w-16 px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs text-center font-bold text-zinc-900 focus:outline-none focus:border-[#E07A2B]"
                  />
                  <span className="text-zinc-500 text-[11px] w-10">viajes</span>
                </div>
              </div>

              {/* CANTERA ACTUALIZADA A VIAJES */}
              <div className="flex items-center justify-between gap-3 pt-1.5 border-t border-zinc-100">
                <div className="flex flex-col">
                  <span className="font-bold text-zinc-800">Cantera</span>
                  <span className="text-[10px] text-zinc-500">$1,500 c/u</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input 
                    type="number" 
                    name="cantidadCantera" 
                    min="0" 
                    defaultValue="0"
                    className="w-16 px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs text-center font-bold text-zinc-900 focus:outline-none focus:border-[#E07A2B]"
                  />
                  <span className="text-zinc-500 text-[11px] w-10">viajes</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-sm font-bold transition-all shadow-md shadow-[#E07A2B]/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enviar Solicitud de Materiales'}
          </button>

          {mensajeExitoMat && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>¡Solicitud de materiales enviada con éxito!</span>
            </div>
          )}

          {errorMat && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMat}</span>
            </div>
          )}
        </form>
      </div>

      {/* DERECHA: Historial de Solicitudes de Materiales */}
      <div className="p-6 rounded-3xl bg-zinc-50/90 border border-zinc-200/80 shadow-sm space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Mis Solicitudes de Materiales</h3>
              <p className="text-xs text-zinc-500 font-medium">Estatus de tus solicitudes de mejoramiento patrimonial.</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-zinc-200/80 text-zinc-700 font-bold shadow-sm">
              {solicitudesMateriales.length} Trámite(s)
            </span>
          </div>

          <div className="space-y-3">
            {solicitudesMateriales.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-6 font-medium">No hay solicitudes de materiales registradas.</p>
            ) : (
              solicitudesMateriales.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-white border border-zinc-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#E07A2B]">{item.folio}</span>
                      <span className="text-xs text-zinc-400 font-medium">{item.fecha}</span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-900">Inmueble: {item.domicilio}</h4>
                    <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-zinc-600 font-medium">
                      {item.cantidadTepetate > 0 && <span className="bg-zinc-100 px-2 py-0.5 rounded">Tepetate: {item.cantidadTepetate} m³</span>}
                      {item.cantidadArena > 0 && <span className="bg-zinc-100 px-2 py-0.5 rounded">Arena: {item.cantidadArena} m³</span>}
                      {item.cantidadGrava > 0 && <span className="bg-zinc-100 px-2 py-0.5 rounded">Grava: {item.cantidadGrava} m³</span>}
                      {item.cantidadPiedraNegra > 0 && <span className="bg-zinc-100 px-2 py-0.5 rounded">Piedra N.: {item.cantidadPiedraNegra} viajes</span>}
                      {item.cantidadCantera > 0 && <span className="bg-zinc-100 px-2 py-0.5 rounded">Cantera: {item.cantidadCantera} viajes</span>}
                    </div>
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
          <span>Las solicitudes son procesadas por la secretaría correspondiente.</span>
        </div>
      </div>

    </div>
  );
}