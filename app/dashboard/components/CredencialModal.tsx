'use client';

import { X, CreditCard } from 'lucide-react';
import Image from 'next/image';

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
  vigencia?: string;
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
            <span className="text-sm font-bold tracking-wide uppercase">Credencial Digital Oficial</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cuerpo de la Credencial */}
        <div className="p-5 sm:p-6 bg-zinc-50/50 space-y-4">
          <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-md p-4 sm:p-5 relative overflow-hidden">
            
            {/* Membrete Superior Institucional */}
            <div className="border-b border-zinc-200 pb-3 mb-4 flex items-center gap-3.5">
              <div className="relative h-12 w-12 shrink-0 flex items-center justify-center">
                <Image
                  src="/STSMQ2.svg"
                  alt="Logotipo Oficial STSMQ"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span 
                  style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 500 }}
                  className="text-xs sm:text-sm uppercase tracking-tight text-[#E07A2B] leading-tight block"
                >
                  SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO
                </span>
              </div>
            </div>

            {/* Grid Principal Simétrico y Proporcionado */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
              
              {/* Columna Izquierda: Fotografía (Posición Original) + Datos Laborales */}
              <div className="sm:col-span-5 flex flex-col space-y-3.5">
                
                {/* Fotografía en proporción pasaporte alineada a la izquierda */}
                <div className="w-28 h-36 rounded-xl bg-zinc-200 border-2 border-[#E07A2B] overflow-hidden shadow-inner flex items-center justify-center">
                  {usuario.fotoUrl ? (
                    <img src={usuario.fotoUrl} alt="Foto de empleado" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] font-bold text-zinc-400 text-center px-2">Sin Fotografía</span>
                  )}
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-zinc-400 uppercase tracking-wide block text-[9px]">FECHA DE INGRESO:</span>
                    <strong className="text-zinc-900 text-xs font-bold">{usuario.fechaIngreso || '14/05/2004'}</strong>
                  </div>
                  <div>
                    <span className="font-bold text-zinc-400 uppercase tracking-wide block text-[9px]">PUESTO:</span>
                    <strong className="text-zinc-900 text-xs font-bold leading-tight block">{usuario.puesto || 'Operador de Maquinaria A'}</strong>
                  </div>
                  <div>
                    <span className="font-bold text-zinc-400 uppercase tracking-wide block text-[9px]">DEPARTAMENTO:</span>
                    <strong className="text-zinc-900 text-xs font-bold">{usuario.departamento || 'Aseo Público'}</strong>
                  </div>
                  <div>
                    <span className="font-bold text-[#E07A2B] uppercase tracking-wide block text-[9px]">VIGENCIA:</span>
                    <strong className="text-zinc-900 text-sm font-black">{usuario.vigencia || '2027'}</strong>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Nombre, Identificaciones, Emergencia y Firma */}
              <div className="sm:col-span-7 flex flex-col justify-between space-y-3">
                
                {/* Nombre y No. Empleado */}
                <div className="space-y-0.5">
                  <h2 className="text-base sm:text-lg font-black text-zinc-900 leading-tight uppercase line-clamp-2">
                    {usuario.nombreCompleto}
                  </h2>
                  <p className="text-xs font-black text-zinc-800 tracking-wide pt-0.5">
                    No. EMPLEADO: <span className="text-[#E07A2B]">{usuario.numeroEmpleado}</span>
                  </p>
                </div>

                {/* Bloque de Identificaciones y Emergencia Optimizado */}
                <div className="space-y-2 text-xs bg-zinc-50/80 p-3 rounded-xl border border-zinc-200/60">
                  <div>
                    <span className="font-bold text-zinc-400 text-[9px] uppercase">CURP:</span>
                    <p className="font-mono font-bold text-zinc-900 text-xs">{usuario.curp || 'HELA741219HGTNTR08'}</p>
                  </div>
                  <div>
                    <span className="font-bold text-zinc-400 text-[9px] uppercase">IMSS:</span>
                    <p className="font-mono font-bold text-zinc-900 text-xs">{usuario.nss || '14747414363'}</p>
                  </div>
                  <div>
                    <span className="font-bold text-zinc-400 text-[9px] uppercase">TIPO DE SANGRE:</span>
                    <p className="font-black text-zinc-900 text-xs">{usuario.tipoSangre || 'O+'}</p>
                  </div>
                  
                  <div className="border-t border-zinc-200 pt-1.5 space-y-0.5">
                    <span className="font-bold text-zinc-500 text-[9px] uppercase block">CONTACTO DE EMERGENCIA:</span>
                    <p className="text-zinc-900 font-bold text-xs">{usuario.contactoEmergenciaNombre || 'Rebeca Esparza Ruiz'}</p>
                    <p className="text-zinc-900 font-bold text-xs">Tel. {usuario.contactoEmergenciaTelefono || '442 716 3120'}</p>
                  </div>
                </div>

                {/* Firma Institucional del Secretario General */}
                <div className="pt-1 text-right">
                  <div className="inline-block text-center w-full max-w-[180px]">
                    <div className="font-serif italic text-blue-900 text-sm font-bold pb-0 transform -rotate-2">
                      Celestino Bermúdez
                    </div>
                    <div className="border-t border-zinc-400 pt-0.5">
                      <p className="text-[9px] font-bold text-zinc-900 uppercase">C. Celestino Bermúdez Jiménez</p>
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-tight">SECRETARIO GENERAL</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Cerrar Credencial
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}