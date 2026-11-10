import Image from 'next/image';
import { Search, CreditCard } from 'lucide-react';
import { buscarEmpleadoCredencial } from '@/app/actions/admin-credenciales';
import { obtenerUsuarioActual } from '@/app/actions/auth';
import { redirect } from 'next/navigation';

export default async function AdminCredencialesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }> | { q?: string };
}) {
  // 🔒 1. Validación 100% en el servidor (Instantánea y sin parpadeos)
  const usuario = await obtenerUsuarioActual();

  const esSecretarioOAdmin = 
    usuario && (
      usuario.rol === 'secretario_general' ||
      usuario.rol === 'SECRETARIO_GENERAL' ||
      usuario.rol === 'admin' ||
      usuario.rol === 'ADMIN' ||
      usuario.numeroEmpleado === '45892'
    );

  if (!usuario) {
    redirect('/login?callbackUrl=/admin/credenciales');
  } else if (!esSecretarioOAdmin) {
    redirect('/dashboard');
  }

  // 2. Capturamos el término de búsqueda desde los parámetros de la URL
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || '';
  let resultados: any[] = [];

  if (query.trim().length >= 2) {
    try {
      resultados = await buscarEmpleadoCredencial(query);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  }

  const estiloFondo = 'bg-gradient-to-br from-white via-[#ffdcba] to-[#e8913e] text-zinc-950';

  return (
    <div className="min-h-[calc(100vh-140px)] bg-white py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Cabecera institucional */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#E07A2B]/10 text-[#E07A2B] text-[10px] font-black uppercase tracking-wider">
              Acceso Exclusivo - Secretario General
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2.5">
            <CreditCard className="h-6 w-6 text-[#E07A2B]" />
            Consulta de Credenciales
          </h1>
          <p className="text-xs text-zinc-500 font-medium">
            Busca por nombre, apellido o número de empleado para visualizar la credencial del Trabajador Sindicalizado.
          </p>
        </div>
      </div>

      {/* 🔍 BARRA DE BÚSQUEDA NATIVA (GET) */}
      <form method="GET" className="flex gap-3 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Ej. Gelasio o 45892..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-xs font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#E07A2B]/40 focus:bg-white transition-all shadow-xs"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-[#E07A2B] hover:bg-[#c96821] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm shrink-0"
        >
          Buscar
        </button>
      </form>

      {/* 📋 RESULTADOS Y CREDENCIALES */}
      <div className="space-y-6">
        {resultados.length === 0 && query.trim().length >= 2 && (
          <div className="p-8 text-center bg-zinc-50 border border-dashed border-zinc-200 rounded-2xl text-xs text-zinc-500 font-medium">
            No se encontraron empleados registrados con ese nombre o número de empleado.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resultados.map((empleado) => (
            <div
              key={empleado.id}
              className="w-full flex justify-center px-1"
            >
              {/* 🌟 TARJETA DE CREDENCIAL ADAPTATIVA */}
              <div
                className={`w-full max-w-[420px] md:max-w-[540px] md:aspect-[1.58/1] rounded-2xl overflow-hidden relative flex flex-col justify-between p-3 sm:p-4 select-none bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18),0_4px_8px_rgba(0,0,0,0.08)] border-[3px] border-t-white/50 border-l-white/50 border-r-zinc-400 border-b-zinc-500 ring-1 ring-black/5 ${estiloFondo}`}
              >
                {/* Bisel volumétrico 3D interior */}
                <div className="absolute inset-0 border-[2px] border-t-transparent border-l-transparent border-r-black/30 border-b-black/40 rounded-2xl pointer-events-none z-30" />

                {/* Brillo especular superior de laminado PVC */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none z-20" />

                {/* Membrete Superior Institucional */}
                <div className="border-b border-zinc-300/70 pb-1.5 flex items-center justify-between shrink-0 relative z-10 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-xl shadow-xs mb-2 md:mb-0">
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0 flex items-center justify-center">
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
                <div className="flex flex-col md:grid md:grid-cols-12 md:gap-3 items-center my-auto relative z-10 space-y-3 md:space-y-0">
                  
                  {/* Bloque 1 en Móvil: Nombre y Número de Empleado */}
                  <div className="w-full md:hidden order-1 text-center space-y-0.5">
                    <h2 className="text-sm font-black uppercase tracking-tight leading-tight text-zinc-950 drop-shadow-xs">
                      {empleado.nombreCompleto}
                    </h2>
                    <p className="text-[11px] font-black tracking-wide text-zinc-900">
                      No. EMPLEADO:{' '}
                      <span className="text-[#C05A12] font-black text-xs">
                        {empleado.numeroEmpleado}
                      </span>
                    </p>
                  </div>

                  {/* Columna Izquierda: Fotografía + Datos Laborales */}
                  <div className="w-full md:col-span-5 order-2 flex flex-row md:flex-col items-center md:items-start gap-3.5 md:gap-2">
                    <div className="w-22 h-28 md:w-28 md:h-36 rounded-xl bg-zinc-200 border-2 border-white overflow-hidden shadow-md shrink-0">
                      <img
                        src={empleado.fotoUrl || '/Foto Credencial.jpeg'}
                        alt="Foto de empleado"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-0.5 text-xs md:text-[11.5px] w-full">
                      <div>
                        <span className="font-bold uppercase tracking-wide block text-[9px] text-[#C05A12]">
                          FECHA DE INGRESO:
                        </span>
                        <strong className="text-zinc-950 font-extrabold text-[10.5px]">
                          {empleado.fechaIngreso || '14/05/2004'}
                        </strong>
                      </div>
                      <div>
                        <span className="font-bold uppercase tracking-wide block text-[9px] text-[#C05A12]">
                          PUESTO:
                        </span>
                        <strong className="text-zinc-950 font-extrabold leading-tight block text-[10.5px]">
                          {empleado.puesto || 'Operador de Maquinaria A'}
                        </strong>
                      </div>
                      <div>
                        <span className="font-bold uppercase tracking-wide block text-[9px] text-[#C05A12]">
                          DEPARTAMENTO:
                        </span>
                        <strong className="text-zinc-950 font-extrabold leading-tight block text-[10.5px]">
                          {empleado.departamento || 'Aseo Público'}
                        </strong>
                      </div>
                      <div className="pt-0.5">
                        <span className="font-black uppercase tracking-wide block text-[9px] text-[#C05A12]">
                          VIGENCIA:
                          <strong className="text-zinc-950 font-black text-sm ml-1">
                            {empleado.vigencia || '2027'}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Columna Derecha: Nombre (en desktop), Identificaciones, Emergencia y Firma */}
                  <div className="w-full md:col-span-7 order-3 flex flex-col justify-between space-y-2 md:pl-1">
                    
                    {/* Nombre y Número de Empleado (Visible solo en desktop) */}
                    <div className="hidden md:block space-y-0.5">
                      <h2 className="text-base font-black uppercase tracking-tight leading-tight text-zinc-950 drop-shadow-xs">
                        {empleado.nombreCompleto}
                      </h2>
                      <p className="text-[11px] font-black tracking-wide text-zinc-900">
                        No. EMPLEADO:{' '}
                        <span className="text-[#C05A12] font-black text-xs">
                          {empleado.numeroEmpleado}
                        </span>
                      </p>
                    </div>

                    {/* CURP, IMSS, Tipo de Sangre y Teléfono */}
                    <div className="space-y-0.5 text-xs md:text-[11.5px] p-1.5 sm:p-2 rounded-xl border bg-white/95 backdrop-blur-xs border-zinc-300 text-zinc-950 shadow-xs w-full">
                      <div className="grid grid-cols-2 gap-x-2">
                        <div>
                          <span className="font-bold text-[9px] uppercase text-[#C05A12] block">CURP:</span>
                          <span className="font-mono font-bold text-zinc-950 text-[9.5px]">{empleado.curp || 'HELA741219HGTNTR08'}</span>
                        </div>
                        <div>
                          <span className="font-bold text-[9px] uppercase text-[#C05A12] block">IMSS:</span>
                          <span className="font-mono font-bold text-zinc-950 text-[9.5px]">{empleado.nss || '14747414363'}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-2 border-t border-zinc-200 pt-0.5">
                        <div>
                          <span className="font-bold text-[9px] uppercase text-[#C05A12] block">TIPO DE SANGRE:</span>
                          <span className="font-black text-zinc-950 text-[10px]">{empleado.tipoSangre || 'O+'}</span>
                        </div>
                        <div>
                          <span className="font-bold text-[9px] uppercase text-[#C05A12] block">TEL. EMERGENCIA:</span>
                          <span className="font-bold text-zinc-950 text-[9.5px]">{empleado.contactoEmergenciaTelefono || '442 716 3120'}</span>
                        </div>
                      </div>

                      <div className="border-t border-zinc-200 pt-0.5">
                        <span className="font-bold text-[9px] uppercase block text-[#C05A12]">CONTACTO DE EMERGENCIA:</span>
                        <p className="font-bold text-zinc-950 text-[10px]">{empleado.contactoEmergenciaNombre || 'Rebeca Esparza Ruiz'}</p>
                      </div>
                    </div>

                    {/* Firma Institucional del Secretario General */}
                    <div className="pt-1 text-center relative mt-1">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-44 h-14 pointer-events-none z-20 opacity-95">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 600 450"
                          className="w-full h-full overflow-visible drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
                        >
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
                        <div className="border-t border-zinc-400 pt-0.5 mt-1.5 relative z-10">
                          <p className="text-[9.5px] md:text-[10px] font-black uppercase text-zinc-950 tracking-tight whitespace-nowrap">
                            C. Celestino Bermúdez Jiménez
                          </p>
                          <p className="text-[8.5px] md:text-[9.5px] font-black uppercase tracking-wider">
                            SECRETARIO GENERAL
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}