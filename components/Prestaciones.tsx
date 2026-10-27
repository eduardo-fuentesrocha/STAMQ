'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  Clock, 
  Glasses, 
  HeartHandshake, 
  GraduationCap, 
  PackageCheck, 
  FileCheck2, 
  Hammer, 
  ShieldCheck,
  Phone,
  Mail,
  X,
  ChevronRight
} from 'lucide-react';

const prestaciones = [
  {
    id: 'jubilaciones',
    titulo: 'Jubilaciones y Pensiones',
    descripcion: 'Acompañamiento y gestión integral de trámites para el retiro digno de nuestros trabajadores.',
    icono: ShieldCheck,
    detalles: 'Asesoría personalizada en el proceso de jubilación, cálculo de cotizaciones ante las instancias correspondientes, y seguimiento administrativo para garantizar que obtengas las mejores condiciones y prestaciones correspondientes a tu trayectoria laboral.'
  },
  {
    id: 'estimulos',
    titulo: 'Estímulos por Años de Servicio',
    descripcion: 'Reconocimiento a la lealtad, trayectoria y dedicación continua en el Municipio de Querétaro.',
    icono: Award,
    detalles: 'Entrega de reconocimientos económicos y conmemorativos por cumplir quinquenios (5, 10, 15, 20 años o más) de servicio ininterrumpido en favor de la ciudadanía queretana.'
  },
  {
    id: 'puntualidad',
    titulo: 'Incentivos por Puntualidad',
    descripcion: 'Bonificación y reconocimientos al compromiso y constancia del personal operativo y administrativo.',
    icono: Clock,
    detalles: 'Estímulo periódico dirigido a premiar la asistencia regular y el cumplimiento puntual en las jornadas laborales asignadas en las diferentes áreas operativas del municipio.'
  },
  {
    id: 'lentes',
    titulo: 'Apoyo para Lentes Graduados',
    descripcion: 'Subsidio directo para la adquisición y renovación de anteojos para ti y tus dependientes.',
    icono: Glasses,
    detalles: 'Reembolso o apoyo económico parcial/total en ópticas afiliadas presentando tu receta médica y credencial de sindicalizado vigente. Aplica para el trabajador y beneficiarios directos.'
  },
  {
    id: 'fallecimiento',
    titulo: 'Apoyos por Fallecimiento',
    descripcion: 'Respaldo económico y orientación solidaria para las familias en momentos difíciles.',
    icono: HeartHandshake,
    detalles: 'Gestión inmediata de gastos funerarios y entrega de subsidio de solidaridad institucional para los deudos del trabajador sindicalizado, brindando acompañamiento humano y legal.'
  },
  {
    id: 'becas',
    titulo: 'Becas',
    descripcion: 'Apoyos económicos para continuar tus estudios o respaldar la formación académica de tus hijos.',
    icono: GraduationCap,
    detalles: 'Convocatorias semestrales o anuales para el otorgamiento de becas de excelencia académica y de apoyo general dirigidas a los hijos de los agremiados en niveles básico, medio superior y superior.'
  },
  {
    id: 'paquetes',
    titulo: 'Paquetes Escolares',
    descripcion: 'Entrega anual de útiles e insumos escolares al inicio de cada ciclo académico.',
    icono: PackageCheck,
    detalles: 'Dotación de mochilas y kits de útiles escolares de calidad, ajustados a las listas oficiales de la Secretaría de Educación, entregados directamente a los trabajadores previo al inicio de clases.'
  },
  {
    id: 'permisos',
    titulo: 'Permisos',
    descripcion: 'Gestión y trámite de licencias conforme a las condiciones generales de trabajo.',
    icono: FileCheck2,
    detalles: 'Asesoría y facilitación de permisos económicos, por paternidad, por matrimonio o por situaciones de fuerza mayor, respetando los derechos laborales establecidos en el tabulador.'
  },
  {
    id: 'construccion',
    titulo: 'Ayuda para Materiales de Construcción',
    descripcion: 'Apoyo enfocado en la mejora, ampliación y acondicionamiento de tu vivienda familiar.',
    icono: Hammer,
    detalles: 'Subsidios o convenios especiales para la obtención a bajo costo de cemento, varilla, impermeabilizante y otros materiales indispensables para el mejoramiento del patrimonio familiar del trabajador.'
  },
];

export default function Prestaciones() {
  const [prestacionSeleccionada, setPrestacionSeleccionada] = useState<typeof prestaciones[0] | null>(null);

  return (
    <section id="prestaciones" className="bg-white text-slate-900 py-20 px-6 sm:px-12 lg:px-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Encabezado de la Sección */}
        <div className="max-w-3xl space-y-4">
          <span className="text-[#E07A2B] text-xs font-black uppercase tracking-widest">
            Bienvenido
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Prestaciones
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Haz clic en cualquier opción para consultar. 
          </p>
        </div>

        {/* Cuadrícula de Prestaciones en Fondo Blanco */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prestaciones.map((item) => {
            const Icono = item.icono;
            return (
              <div
                key={item.id}
                onClick={() => setPrestacionSeleccionada(item)}
                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#E07A2B] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors duration-300">
                    <Icono className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#E07A2B] transition-colors">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#E07A2B]">
                  <span>Ver información y requisitos</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner General de Atención e Informes */}
        <div className="mt-12 p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center lg:text-left">
            <h4 className="text-xl font-bold text-slate-950">
              ¿Requieres orientación sobre tus trámites?
            </h4>
            <p className="text-sm text-slate-600">
              Comunícate directamente al teléfono o por correo electrónico para mayor información.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="tel:4422137119"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm border border-slate-300 shadow-sm transition-colors w-full sm:w-auto justify-center"
            >
              <Phone className="h-4 w-4 text-[#E07A2B]" />
              <span>(442) 213 7119</span>
            </Link>

            <Link
              href="mailto:sindicato.municipio.qro@gmail.com"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white font-bold text-sm shadow-md transition-colors w-full sm:w-auto justify-center"
            >
              <Mail className="h-4 w-4" />
              <span>Enviar Correo</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Modal / Panel Desplegable de Detalle al hacer clic */}
      {prestacionSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 relative space-y-6">
            
            {/* Botón de Cerrar */}
            <button
              onClick={() => setPrestacionSeleccionada(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Encabezado del Modal */}
            <div className="space-y-3">
              <div className="p-3 w-fit rounded-xl bg-[#E07A2B]/10 text-[#E07A2B]">
                <prestacionSeleccionada.icono className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-950">
                {prestacionSeleccionada.titulo}
              </h3>
            </div>

            {/* Contenido / Detalles */}
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                {prestacionSeleccionada.detalles}
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-[#E07A2B]">
                  ¿Cómo solicitarlo?
                </span>
                <p className="text-xs text-slate-600">
                  Acude a nuestras oficinas sindicales en Calle Independencia No. 210, Col. Centro, o comunícate al teléfono (442) 213 7119 para conocer la documentación específica y los formatos vigentes.
                </p>
              </div>
            </div>

            {/* Pie del Modal */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setPrestacionSeleccionada(null)}
                className="px-6 py-2.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white font-bold text-sm shadow-md transition-colors"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}