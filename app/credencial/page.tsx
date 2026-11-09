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

  // Fondos optimizados
  const estilosFondo = {
    'naranja-suave': 'bg-gradient-to-br from-white via-[#ffdcba] to-[#e8913e] text-zinc-950',
    'platino-clasico': 'bg-gradient-to-br from-white via-zinc-100 to-zinc-200 text-zinc-950',
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-white py-8 px-3 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-6 flex flex-col items-center">

        {/* Título de sección */}
        <div className="text-center space-y-1">
          <h1 className="text-lg sm:text-xl font-black text-zinc-900 tracking-tight flex items-center justify-center gap-2">
            <CreditCard className="h-5 w-5 text-[#E07A2B]" />
            Credencial Digital
          </h1>
        </div>

        {/* 🎛️ SELECTOR INTERACTIVO */}
        <div className="bg-zinc-50 p-2 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-center gap-2 sm:gap-3 text-xs font-bold w-full max-w-md">
          <button
            onClick={() => setEstiloSeleccionado('naranja-suave')}
            className={`px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer ${
              estiloSeleccionado === 'naranja-suave'
                ? 'bg-[#E07A2B] text-white shadow-sm'
                : 'text-zinc-600 hover:bg-zinc-200/60'
            }`}
          >
            1. Naranja Suave
          </button>
          <button
            onClick={() => setEstiloSeleccionado('platino-clasico')}
            className={`px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer ${
              estiloSeleccionado === 'platino-clasico'
                ? 'bg-[#E07A2B] text-white shadow-sm'
                : 'text-zinc-600 hover:bg-zinc-200/60'
            }`}
          >
            3. Platino Clásico
          </button>
        </div>

        {/* 🌟 TARJETA DE CREDENCIAL ADAPTATIVA */}
        <div className="w-full flex justify-center px-1">
          <div
            className={`w-full max-w-[420px] md:max-w-[540px] md:aspect-[1.58/1] rounded-2xl overflow-hidden relative flex flex-col justify-between p-4 sm:p-4 select-none bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18),0_4px_8px_rgba(0,0,0,0.08)] border-[3px] border-t-white/50 border-l-white/50 border-r-zinc-400 border-b-zinc-500 ring-1 ring-black/5 ${estilosFondo[estiloSeleccionado]}`}
          >
            {/* Bisel volumétrico 3D interior */}
            <div className="absolute inset-0 border-[2px] border-t-transparent border-l-transparent border-r-black/30 border-b-black/40 rounded-2xl pointer-events-none z-30" />

            {/* Brillo especular superior de laminado PVC */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none z-20" />

            {/* Membrete Superior Institucional */}
            <div className="border-b border-zinc-300/70 pb-2 flex items-center justify-between shrink-0 relative z-10 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs mb-3 md:mb-0">
              <div className="flex items-center gap-2.5">
                <div className="relative h-9 w-9 shrink-0 flex items-center justify-center">
                  <Image
                    src="/STSMQ Original.svg"
                    alt="Logotipo Oficial STSMQ"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span
                  style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 700 }}
                  className="text-[10px] md:text-[12.5px] uppercase tracking-tight text-[#E07A2B] leading-tight block drop-shadow-xs"
                >
                  SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO
                </span>
              </div>
            </div>

            {/* CUERPO PRINCIPAL */}
            <div className="flex flex-col md:grid md:grid-cols-12 md:gap-3 items-center my-auto relative z-10 space-y-4 md:space-y-0">
              
              {/* Bloque 1 en Móvil: Nombre y Número de Empleado (Aparece PRIMERO arriba en celulares usando order-1) */}
              <div className="w-full md:hidden order-1 text-center space-y-0.5">
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

              {/* Columna Izquierda: Fotografía + Datos Laborales (order-2 en móviles) */}
              <div className="w-full md:col-span-5 order-2 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-2">
                <div className="w-24 h-32 md:w-28 md:h-36 rounded-xl bg-zinc-200 border-2 border-white overflow-hidden shadow-md shrink-0">
                  <img
                    src={usuario.fotoUrl || '/Foto Credencial.jpeg'}
                    alt="Foto de empleado"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-0 text-xs md:text-[11.5px] w-full">
                  <div>
                    <span className="font-bold uppercase tracking-wide block text-[10px] text-[#C05A12]">
                      FECHA DE INGRESO:
                    </span>
                    <strong className="text-zinc-950 font-extrabold">
                      {usuario.fechaIngreso || '14/05/2004'}
                    </strong>
                  </div>
                  <div>
                    <span className="font-bold uppercase tracking-wide block text-[10px] text-[#C05A12]">
                      PUESTO:
                    </span>
                    <strong className="text-zinc-950 font-extrabold leading-tight block">
                      {usuario.puesto || 'Operador de Maquinaria A'}
                    </strong>
                  </div>
                  <div>
                    <span className="font-bold uppercase tracking-wide block text-[10px] text-[#C05A12]">
                      DEPARTAMENTO:
                    </span>
                    <strong className="text-zinc-950 font-extrabold leading-tight block">
                      {usuario.departamento || 'Aseo Público'}
                    </strong>
                  </div>
                  <div className="pt-0">
                    <span className="font-black uppercase tracking-wide block text-[10px] text-[#C05A12]">
                      VIGENCIA:
                      <strong className="text-zinc-950 font-black text-sm">
                      { usuario.vigencia || ' 2027'}
                    </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Nombre (en desktop), Identificaciones, Emergencia y Firma (order-3 en móviles) */}
              <div className="w-full md:col-span-7 order-3 flex flex-col justify-between space-y-2.5 md:pl-1">
                
                {/* Nombre y Número de Empleado (Visible solo en computadoras / md en adelante) */}
                <div className="hidden md:block space-y-0.5">
                  <h2 className="text-base font-black uppercase tracking-tight leading-tight text-zinc-950 drop-shadow-xs">
                    {usuario.nombreCompleto}
                  </h2>
                  <p className="text-[11px] font-black tracking-wide text-zinc-900">
                    No. EMPLEADO:{' '}
                    <span className="text-[#C05A12] font-black text-xs">
                      {usuario.numeroEmpleado}
                    </span>
                  </p>
                </div>

                {/* CURP, IMSS, Tipo de Sangre y Teléfono */}
                <div className="space-y-1 text-xs md:text-[11.5px] p-2 rounded-xl border bg-white/95 backdrop-blur-xs border-zinc-300 text-zinc-950 shadow-xs w-full">
                  <div className="grid grid-cols-2 gap-x-2">
                    <div>
                      <span className="font-bold text-[10px] uppercase text-[#C05A12] block">CURP:</span>
                      <span className="font-mono font-bold text-zinc-950 text-[10px]">{usuario.curp || 'HELA741219HGTNTR08'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[10px] uppercase text-[#C05A12] block">IMSS:</span>
                      <span className="font-mono font-bold text-zinc-950 text-[10px]">{usuario.nss || '14747414363'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-2 border-t border-zinc-200 pt-1">
                    <div>
                      <span className="font-bold text-[10px] uppercase text-[#C05A12] block">TIPO DE SANGRE:</span>
                      <span className="font-black text-zinc-950 text-[10px]">{usuario.tipoSangre || 'O+'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[10px] uppercase text-[#C05A12] block">TEL. EMERGENCIA:</span>
                      <span className="font-bold text-zinc-950 text-[10px]">{usuario.contactoEmergenciaTelefono || '442 716 3120'}</span>
                    </div>
                  </div>

                  <div className="border-t border-zinc-200 pt-1">
                    <span className="font-bold text-[10px] uppercase block text-[#C05A12]">CONTACTO DE EMERGENCIA:</span>
                    <p className="font-bold text-zinc-950 text-[10px]">{usuario.contactoEmergenciaNombre || 'Rebeca Esparza Ruiz'}</p>
                  </div>
                </div>

                {/* Firma Institucional */}
                <div className="pt-0 text-center">
                  <div className="inline-block w-full">
                    <div className="h-5 w-36 mx-auto flex items-center justify-center">
                      <svg viewBox="0 0 160 40" className="w-full h-full overflow-visible" fill="none" stroke="#1e3a8a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 25 C15 5, 20 35, 30 15 C35 5, 45 35, 55 12 C60 2, 70 30, 80 18 C90 5, 100 32, 110 15 C125 3, 140 38, 155 10" />
                        <path d="M20 28 C45 38, 90 35, 145 22" strokeWidth="1.5" stroke="#1e3a8a" opacity="0.8" />
                      </svg>
                    </div>
                    <div className="border-t border-zinc-400 pt-0.5">
                      <p className="text-[10px] md:text-[10px] font-black uppercase text-zinc-950 tracking-tight whitespace-nowrap">
                        C. Celestino Bermúdez Jiménez
                      </p>
                      <p className="text-[10px] md:text-[10px] font-black uppercase tracking-wider text-[#C05A12]">
                        SECRETARIO GENERAL
                      </p>
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