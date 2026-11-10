'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CreditCard } from 'lucide-react';
import { obtenerUsuarioActual } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export default function CredencialPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [estiloSeleccionado, setEstiloSeleccionado] = useState<
    'naranja-suave' | 'platino-clasico'
  >('naranja-suave');

  useEffect(() => {
    async function cargarUsuario() {
      const data = await obtenerUsuarioActual();
      if (!data) {
        router.push('/login?callbackUrl=/credencial');
      } else {
        setUsuario(data);
        setLoading(false);
      }
    }
    cargarUsuario();
  }, [router]);

  if (loading || !usuario) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-white flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-[#E07A2B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const estilosFondo = {
    'naranja-suave': 'bg-gradient-to-br from-white via-[#ffdcba] to-[#e8913e] text-zinc-950',
    'platino-clasico': 'bg-gradient-to-br from-white via-zinc-100 to-zinc-200 text-zinc-950',
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-white py-2 sm:py-8 px-2 sm:px-6 flex items-start sm:items-center justify-center">
      <div className="w-full max-w-2xl space-y-3 sm:space-y-6 flex flex-col items-center">

        {/* 🌟 TARJETA DE CREDENCIAL ADAPTATIVA */}
        <div className="w-full flex justify-center px-1">
          <div
            className={`w-full max-w-[420px] md:max-w-[580px] md:min-h-[340px] rounded-2xl overflow-hidden relative flex flex-col justify-between p-3.5 sm:p-4 select-none bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18),0_4px_8px_rgba(0,0,0,0.08)] border-[3px] border-t-white/50 border-l-white/50 border-r-zinc-400 border-b-zinc-500 ring-1 ring-black/5 ${estilosFondo[estiloSeleccionado]}`}
          >
            {/* Bisel volumétrico 3D interior */}
            <div className="absolute inset-0 border-[2px] border-t-transparent border-l-transparent border-r-black/30 border-b-black/40 rounded-2xl pointer-events-none z-30" />

            {/* Brillo especular superior de laminado PVC */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none z-20" />
            

            {/* =========================================================
                VISTA MÓVIL (< md) ACTUALIZADA Y COHERENTE
               ========================================================= */}
            <div className="flex flex-col md:hidden justify-between h-full relative z-10 space-y-2">
              
              {/* Nombre y Número de Empleado Centrados */}
              <div className="w-full text-center space-y-0.5 pb-2 pt-5">
                <h2 className="text-sm font-black uppercase tracking-tight leading-tight text-zinc-950 drop-shadow-xs">
                  {usuario.nombreCompleto}
                </h2>
                <p className="text-[11px] font-black tracking-wide text-zinc-900">
                  No. EMPLEADO:{' '}
                  <span className="text-[#C05A12] font-black text-xs">
                    {usuario.numeroEmpleado}
                  </span>
                </p>
              </div>

              {/* Cuerpo Móvil (Foto ampliada + Datos Laborales) */}
              <div className="flex flex-row items-center gap-3 pb-2 pt-2">
                <div className="w-24 h-32 rounded-xl bg-zinc-200 border-2 border-white overflow-hidden shadow-md relative shrink-0 flex items-center justify-center">
                  <img
                    src={usuario.fotoUrl || '/Foto Credencial.jpeg'}
                    alt="Foto de empleado"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
                <div className="space-y-1 text-[10px] bg-white/60 p-2 rounded-xl border border-zinc-200/85 w-full">
                  <div>
                    <span className="font-bold uppercase tracking-wide text-[9px] text-[#C05A12] mr-1">FECHA DE INGRESO:</span>
                    <strong className="text-zinc-950 font-extrabold text-[10px]">{usuario.fechaIngreso || '14/05/2004'}</strong>
                  </div>
                  <div>
                    <span className="font-bold uppercase tracking-wide text-[9px] text-[#C05A12] mr-1">PUESTO:</span>
                    <strong className="text-zinc-950 font-extrabold text-[10px]">{usuario.puesto || 'Operador de Maquinaria A'}</strong>
                  </div>
                  <div>
                    <span className="font-bold uppercase tracking-wide text-[9px] text-[#C05A12] mr-1">DEPARTAMENTO:</span>
                    <strong className="text-zinc-950 font-extrabold text-[10px]">{usuario.departamento || 'Aseo Público'}</strong>
                  </div>
                </div>
              </div>

              {/* Recuadro Médico Móvil Unificado */}
              <div className="space-y-1 text-[10px] p-2 rounded-xl border bg-white/95 backdrop-blur-xs border-zinc-300 text-zinc-950 shadow-xs w-full">
                <div className="grid grid-cols-2 gap-x-1.5">
                  <div className="space-y-0.5">
                    <div>
                      <span className="font-bold text-[9px] uppercase text-[#C05A12] block">CURP:</span>
                      <span className="font-mono font-bold text-zinc-950 text-[9px]">{usuario.curp || 'HELA741219HGTNTR08'}</span>
                    </div>
                    <div className="pt-0.5">
                      <span className="font-bold text-[9px] uppercase text-[#C05A12] block">IMSS:</span>
                      <span className="font-mono font-bold text-zinc-950 text-[9px]">{usuario.nss || '14747414363'}</span>
                    </div>
                  </div>
                  <div className="space-y-0">
                    <div>
                      <span className="font-bold text-[9px] uppercase text-[#C05A12] block">CONTACTO DE EMERGENCIA:</span>
                      <p className="font-bold text-zinc-950 text-[9px] leading-tight mt-0.5">{usuario.contactoEmergenciaNombre || 'Rebeca Esparza Ruiz'}</p>
                    </div>
                    <div className="pb-0.5">
                      <span className="font-semibold text-zinc-800 text-[9px]">Tel. {usuario.contactoEmergenciaTelefono || '442 716 3120'}</span>
                    </div>
                    <div className="pb-0">
                      <span className="font-bold text-[9px] uppercase text-[#C05A12] mr-1">TIPO DE SANGRE:</span>
                      <span className="font-black text-zinc-950 text-[9px]">{usuario.tipoSangre || 'O+'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Firma y Vigencia Móvil (Vigencia izquierda, Firma compacta a 12px centrada) */}
              <div className="relative flex items-end justify-between pb-5 pt-5">
                <div className="text-left shrink-0 pb-0.5 z-20">
                  <span className="font-black uppercase tracking-wide text-[9px] text-[#C05A12] mr-1">VIGENCIA:</span>
                  <strong className="text-zinc-950 font-black text-[9px]">{usuario.vigencia || '2027'}</strong>
                </div>
                <div className="text-center relative flex-1">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-36 h-12 pointer-events-none z-20 opacity-95">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" className="w-full h-full overflow-visible">
                      <g fill="none" stroke="#102b7b" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M 90,340 L 450,260" strokeWidth="12" />
                        <path d="M 170,320 C 140,280 180,210 240,210 C 300,210 270,330 200,340 C 150,345 130,290 160,250 C 190,210 260,200 300,240 C 330,270 290,340 220,335 C 160,330 180,260 220,240" strokeWidth="10" />
                        <path d="M 180,350 L 420,130" strokeWidth="10" />
                        <path d="M 150,330 L 450,135" strokeWidth="9.5" />
                        <path d="M 450,135 C 470,125 460,150 420,170 L 120,290" strokeWidth="9" />
                        <path d="M 420,130 L 380,180 L 470,220" strokeWidth="9" />
                        <path d="M 190,320 C 180,360 230,370 250,320 C 270,270 210,260 190,300" strokeWidth="9" />
                        <path d="M 230,310 C 260,340 310,320 330,280 L 400,275" strokeWidth="8" />
                      </g>
                    </svg>
                  </div>
                  <div className="inline-block w-full pt-1">
                    <div className="mt-1 relative z-10 flex flex-col space-y-0">
                      <p className="text-[9px] font-black uppercase text-zinc-950 tracking-tight whitespace-nowrap leading-none">C. Celestino Bermúdez Jiménez</p>
                      <p className="text-[9px] font-black uppercase tracking-wider leading-tight pt-0.5">SECRETARIO GENERAL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* =========================================================
                VISTA ESCRITORIO (md: en adelante)
               ========================================================= */}
            <div className="hidden md:flex flex-col justify-between h-full relative z-10 space-y-2.5">

              {/* Nombre y Número de Empleado CENTRADOS en la parte superior */}
              <div className="w-full text-center space-y-0.5 border-b border-zinc-300/40 pb-1">
                <h2 className="text-base font-black uppercase tracking-tight leading-tight text-zinc-950 drop-shadow-xs">
                  {usuario.nombreCompleto}
                </h2>
                <p className="text-[12px] font-black tracking-wide text-zinc-900">
                  No. EMPLEADO:{' '}
                  <span className="text-[#C05A12] font-black text-xs">
                    {usuario.numeroEmpleado}
                  </span>
                </p>
              </div>

              {/* Grid Principal de 12 Columnas */}
              <div className="grid grid-cols-12 gap-3 items-start w-full">
                
                {/* Columna Izquierda (5 columnas): Foto visible garantizada + Recuadro Médico */}
                <div className="col-span-3 flex flex-col space-y-4">
                  <div className="w-28 h-36 rounded-xl bg-zinc-200 border-2 border-white overflow-hidden shadow-md relative shrink-0">
                    <img
                      src={usuario.fotoUrl || '/Foto Credencial.jpeg'}
                      alt="Foto de empleado"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="text-left shrink-0 pb-0.5 z-20 pt-14">
                      <span className="font-black uppercase tracking-wide text-[12px] text-[#C05A12] mr-1">VIGENCIA:</span>
                      <strong className="text-zinc-950 font-black text-[12px]">{usuario.vigencia || '2027'}</strong>
                  </div>

                  {/* Recuadro Médico */}
                  
                </div>

                {/* Columna Derecha (7 columnas): Datos Laborales + Firma Institucional */}
                <div className="col-span-9 flex flex-col justify-between space-y-2">
                  
                  {/* Datos Laborales */}
                  <div className="space-y-1 text-[10px] bg-white/60 p-2.5 rounded-xl border border-zinc-200/80">
                    <div>
                      <span className="font-bold uppercase tracking-wide text-[12px] text-[#C05A12] mr-1">FECHA DE INGRESO:</span>
                      <strong className="text-zinc-950 font-extrabold text-[12px]">{usuario.fechaIngreso || '14/05/2004'}</strong>
                    </div>
                    <div>
                      <span className="font-bold uppercase tracking-wide text-[12px] text-[#C05A12] mr-1">PUESTO:</span>
                      <strong className="text-zinc-950 font-extrabold text-[12px]">{usuario.puesto || 'Operador de Maquinaria A'}</strong>
                    </div>
                    <div>
                      <span className="font-bold uppercase tracking-wide text-[12px] text-[#C05A12] mr-1">DEPARTAMENTO:</span>
                      <strong className="text-zinc-950 font-extrabold text-[12px]">{usuario.departamento || 'Aseo Público'}</strong>
                    </div>
                  </div>

                  <div className="space-y-1 text-[10px] p-2 rounded-xl border bg-white/95 backdrop-blur-xs border-zinc-300 text-zinc-950 shadow-xs w-full">
                    <div className="grid grid-cols-2 gap-x-1">
                      <div className="space-y-0.5">
                        <div>
                          <span className="font-bold text-[12px] uppercase text-[#C05A12] block">CURP:</span>
                          <span className="font-mono font-bold text-zinc-950 text-[12px]">{usuario.curp || 'HELA741219HGTNTR08'}</span>
                        </div>
                        <div className="pt-0.5">
                          <span className="font-bold text-[12px] uppercase text-[#C05A12] block">IMSS:</span>
                          <span className="font-mono font-bold text-zinc-950 text-[12px]">{usuario.nss || '14747414363'}</span>
                        </div>
                      </div>
                      <div className="space-y-0">
                        <div>
                          <span className="font-bold text-[12px] uppercase text-[#C05A12] block">CONTACTO DE EMERGENCIA:</span>
                          <p className="font-bold text-zinc-950 text-[12px] leading-tight mt-0.5">{usuario.contactoEmergenciaNombre || 'Rebeca Esparza Ruiz'}</p>
                        </div>
                        <div className="pb-0.5">
                          <span className="font-semibold text-zinc-800 text-[12px]">Tel. {usuario.contactoEmergenciaTelefono || '442 716 3120'}</span>
                        </div>
                        <div className="pb-0">
                        <span className="font-bold text-[12px] uppercase text-[#C05A12] mr-1">TIPO DE SANGRE:</span>
                        <span className="font-black text-zinc-950 text-[12px]">{usuario.tipoSangre || 'O+'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Firma y Vigencia Escritorio */}
                  <div className="pt-2 relative flex items-end justify-between">
                    <div className="text-center relative flex-1">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-36 h-12 pointer-events-none z-20 opacity-95">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" className="w-full h-full overflow-visible">
                          <g fill="none" stroke="#102b7b" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M 90,340 L 450,260" strokeWidth="12" />
                            <path d="M 170,320 C 140,280 180,210 240,210 C 300,210 270,330 200,340 C 150,345 130,290 160,250 C 190,210 260,200 300,240 C 330,270 290,340 220,335 C 160,330 180,260 220,240" strokeWidth="10" />
                            <path d="M 180,350 L 420,130" strokeWidth="10" />
                            <path d="M 150,330 L 450,135" strokeWidth="9.5" />
                            <path d="M 450,135 C 470,125 460,150 420,170 L 120,290" strokeWidth="9" />
                            <path d="M 420,130 L 380,180 L 470,220" strokeWidth="9" />
                            <path d="M 190,320 C 180,360 230,370 250,320 C 270,270 210,260 190,300" strokeWidth="9" />
                            <path d="M 230,310 C 260,340 310,320 330,280 L 400,275" strokeWidth="8" />
                          </g>
                        </svg>
                      </div>
                      <div className="inline-block w-full pt-1">
                        <div className="pt-2 mt-1.5 relative z-10">
                          <p className="text-[12px] font-black uppercase text-zinc-950 tracking-tight whitespace-nowrap">C. Celestino Bermúdez Jiménez</p>
                          <p className="text-[12px] font-black uppercase tracking-wider">SECRETARIO GENERAL</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}