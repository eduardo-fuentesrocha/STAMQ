'use client';

import { Award, CheckCircle2, Clock } from 'lucide-react';

export default function TramiteGenericoTab({ tipo }: { tipo: string }) {
  const titulos: Record<string, string> = {
    jubilaciones: 'Jubilaciones',
    pensiones: 'Pensiones',
    fallecimiento: 'Apoyos por Fallecimiento de familiar directo',
    utiles: 'Útiles Escolares',
    nacimiento: 'Registro de Nacimiento de Hijos',
    matrimonio: 'Registro de Matrimonio o Concubinato',
    salon: 'Renta del Salón del Sindicato',
    albanil: 'Apoyo día del Albañil',
    guardias: 'Apoyo para guardias 12 de Diciembre',
  };

  return (
    <div className="p-8 rounded-3xl bg-zinc-50/90 border border-zinc-200/80 shadow-sm space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 border-b border-zinc-200 pb-4">
        <div className="p-3.5 rounded-2xl bg-[#E07A2B]/10 text-[#E07A2B]">
          <Award className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
            {titulos[tipo] || 'Tramite Sindical'}
          </h3>
          <p className="text-xs text-zinc-500 font-medium">Consulta los requisitos e inicia tu proceso ante el Sindicato.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-4">
          <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#E07A2B]" />
            Requisitos Principales
          </h4>
          <ul className="text-xs text-zinc-600 space-y-2 list-disc pl-4 font-medium leading-relaxed">
            <li>Ser trabajador sindicalizado activo con antigüedad comprobable.</li>
            <li>Presentar identificación oficial (INE) y último talón de pago de nómina.</li>
            <li>Entregar la documentación probatoria correspondiente en formato PDF en oficinas sindicales.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#E07A2B]" />
              Estatus y Seguimiento
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
              Puedes acudir directamente a la secretaría correspondiente de nuestro sindicato para dar seguimiento o agendar tu cita personalizada.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#E07A2B]/5 border border-[#E07A2B]/20 text-[#E07A2B] text-xs font-bold text-center">
            Módulo habilitado para el periodo sindical 2026
          </div>
        </div>
      </div>
    </div>
  );
}