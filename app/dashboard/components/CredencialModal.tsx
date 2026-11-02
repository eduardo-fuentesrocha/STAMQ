'use client';

import { X, ShieldCheck, CreditCard } from 'lucide-react';

interface UsuarioCredential {
  nombreCompleto: string;
  numeroEmpleado: string;
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

export default function CredencialModal({ 
  usuario, 
  onClose 
}: { 
  usuario: UsuarioCredential; 
  onClose: () => void; 
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-zinc-200 w-full max-w-xl overflow-hidden relative">
        
        {/* Header del Modal */}
        <div className="bg-[#E07A2B] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <span className="text-sm font-bold tracking-wide uppercase">Credencial Digital</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cuerpo de la Credencial (Diseño exacto al tarjetón) */}
        <div className="p-6 sm:p-8 bg-zinc-50/50 space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-md p-6 relative overflow-hidden">
            

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
              
              {/* Foto y Nombre Principal */}
              <div className="sm:col-span-3 flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b border-zinc-100 pb-5">
                <div className="w-28 h-32 rounded-xl bg-zinc-200 border-2 border-[#E07A2B] overflow-hidden shrink-0 shadow-inner flex items-center justify-center">
                  {usuario.fotoUrl ? (
                    <img src={usuario.fotoUrl} alt="Foto de empleado" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-zinc-400 text-center px-2">Sin Fotografía</span>
                  )}
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-xs font-extrabold text-[#E07A2B] uppercase tracking-wider">Sindicato de Trabajadores al Servicio del Municipio de Querétaro</span>
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-900 leading-tight uppercase">
                    {usuario.nombreCompleto}
                  </h2>
                  <p className="text-xs font-bold text-zinc-500 pt-1">
                    NO. EMPLEADO: <span className="text-zinc-900 text-sm font-black">{usuario.numeroEmpleado}</span>
                  </p>
                </div>
              </div>

              {/* Datos Laborales e Identificación */}
              <div className="sm:col-span-2 space-y-3 text-xs">
                <div>
                  <span className="font-bold text-zinc-400 uppercase tracking-wide block">Puesto:</span>
                  <strong className="text-zinc-800 text-sm">{usuario.puesto || 'Operador / Sindicalizado'}</strong>
                </div>
                <div>
                  <span className="font-bold text-zinc-400 uppercase tracking-wide block">Departamento:</span>
                  <strong className="text-zinc-800 font-bold">{usuario.departamento || 'Servicios Municipales'}</strong>
                </div>
                <div>
                  <span className="font-bold text-zinc-400 uppercase tracking-wide block">Fecha de Ingreso:</span>
                  <strong className="text-zinc-800">{usuario.fechaIngreso || '01/01/2020'}</strong>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="font-bold text-zinc-400 uppercase tracking-wide block text-[10px]">CURP:</span>
                    <span className="font-mono font-bold text-zinc-700 text-[11px]">{usuario.curp || 'XXXXXXXXXXXXXXXXXX'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-zinc-400 uppercase tracking-wide block text-[10px]">NSS:</span>
                    <span className="font-mono font-bold text-zinc-700 text-[11px]">{usuario.nss || 'XXXXXXXXXXX'}</span>
                  </div>
                </div>
              </div>

              {/* Tipo de Sangre y Contacto de Emergencia */}
              <div className="space-y-3 text-xs bg-zinc-50 p-4 rounded-xl border border-zinc-200/60 flex flex-col justify-between">
                <div>
                  <span className="font-bold text-[#E07A2B] uppercase tracking-wide block">Tipo de Sangre:</span>
                  <span className="text-base font-black text-zinc-900">{usuario.tipoSangre || 'O+'}</span>
                </div>

                <div className="border-t border-zinc-200/80 pt-2 space-y-1">
                  <span className="font-bold text-zinc-500 uppercase tracking-wide block text-[11px]">Contacto de Emergencia:</span>
                  <p className="text-zinc-800 font-semibold">• Nombre: {usuario.contactoEmergenciaNombre || 'Familiar Registrado'}</p>
                  <p className="text-zinc-800 font-semibold">• Teléfono: {usuario.contactoEmergenciaTelefono || '442 000 0000'}</p>
                </div>
              </div>

            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Cerrar Credencial
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}