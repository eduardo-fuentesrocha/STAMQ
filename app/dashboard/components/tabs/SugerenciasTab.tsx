'use client';

import { useState } from 'react';
import { MessageSquarePlus, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { enviarSugerenciaAction } from '@/app/actions/sugerencias';

export default function SugerenciasTab({ usuario }: { usuario: { nombreCompleto: string; numeroEmpleado: string; email?: string } }) {
  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    formData.append('nombreTrabajador', usuario.nombreCompleto);
    formData.append('numeroEmpleado', usuario.numeroEmpleado);
    if (usuario.email) {
      formData.append('correoTrabajador', usuario.email);
    }

    try {
      const res = await enviarSugerenciaAction(formData);
      if (res.success) {
        setEnviado(true);
      } else {
        setError(res.error || 'Ocurrió un error al enviar.');
      }
    } catch (err) {
      setError('Error de conexión al enviar la sugerencia.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-zinc-50/80 border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-300">
      <div className="flex items-center gap-3 border-b border-zinc-200 pb-4">
        <div className="p-2.5 rounded-2xl bg-[#E07A2B]/10 text-[#E07A2B]">
          <MessageSquarePlus className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-black text-zinc-900">Buzón de Sugerencias</h3>
          <p className="text-xs text-zinc-500 font-medium">Tus opiniones son valiosas para mejorar nuestros servicios.</p>
        </div>
      </div>

      {enviado ? (
        <div className="p-8 text-center bg-white border border-emerald-200 rounded-2xl space-y-3">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
          <h4 className="text-sm font-bold text-zinc-900">¡Sugerencia enviada con éxito!</h4>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Tu mensaje ha sido enviado al comité. ¡Muchas gracias!
          </p>
          <button
            onClick={() => setEnviado(false)}
            className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Enviar otra sugerencia
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wide">Mensaje</label>
            <textarea
              name="mensaje"
              required
              rows={4}
              placeholder="Escribe con detalle tu sugerencia..."
              className="w-full p-4 rounded-xl border border-zinc-200 bg-white text-xs font-medium text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#E07A2B]/40 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E07A2B] hover:bg-[#c96821] text-white text-xs font-bold transition-all cursor-pointer shadow-sm shadow-[#E07A2B]/30 disabled:opacity-50"
          >
            {cargando ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Enviar Sugerencia</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}