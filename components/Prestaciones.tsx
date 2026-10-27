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
  ChevronRight,
  FileText,
  CheckCircle2
} from 'lucide-react';

const prestaciones = [
  {
    id: 'jubilaciones-pensiones',
    titulo: 'Pensiones y Jubilaciones',
    descripcion: 'Acompañamiento y gestión integral de trámites para el retiro digno de nuestros trabajadores.',
    icono: ShieldCheck,
    esDoble: true,
    jubilacion: {
      titulo: 'Jubilaciones',
      descripcion: 'Bolsa de apoyos económicos mensuales y trámites de jubilación por años de servicio para trabajadores sindicalizados y sus familias.',
      requisitos: [
        'Tener un mínimo de años de servicio ininterrumpido en el Municipio (Jubilación) conforme a la ley.',
        'Estar registrado en el padrón activo de sindicalizados del STSMQ.',
        'Contar con solicitud formal de trámite ingresada ante la instancia correspondiente.',
        'No contar con adeudos administrativos vigentes en el Sindicato.'
      ],
      documentos: [
        'Identificación oficial vigente (INE o Pasaporte).',
        'Último recibo de nómina timbrado.',
        'Constancia de semanas/años cotizados emitida por la Dirección de RH del Municipio.',
        'Acta de nacimiento del trabajador.'
      ]
    },
    pension: {
      titulo: 'Pensiones',
      descripcion: 'Gestión de pensiones por invalidez, vejez o viudez conforme a la normatividad vigente y el dictamen médico oficial.',
      requisitos: [
        'Cumplir con el dictamen médico oficial o los supuestos de ley establecidos para pensión por invalidez o vejez.',
        'Estar registrado en el padrón activo de sindicalizados del STSMQ.',
        'Acreditar la dependencia económica en caso de beneficiarios (viudez u orfandad).',
        'No contar con adeudos administrativos vigentes en el Sindicato.'
      ],
      documentos: [
        'Identificación oficial vigente (INE o Pasaporte).',
        'Dictamen médico oficial o resolución de invalidez/vejez.',
        'Acta de matrimonio o nacimiento de beneficiarios según corresponda.',
        'Comprobante de domicilio reciente y constancia de percepciones.'
      ]
    }
  },
  {
    id: 'estimulos',
    titulo: 'Estímulos por Años de Servicio',
    descripcion: 'Reconocimiento a la lealtad, trayectoria y dedicación continua en el Municipio de Querétaro.',
    icono: Award,
    esDoble: false,
    descripcionDetallada: 'Entrega de reconocimientos económicos y conmemorativos por cumplir quinquenios (5, 10, 15, 20 años o más) de servicio ininterrumpido en favor de la ciudadanía queretana.',
    requisitos: [
      'Cumplir 5, 10, 15, 20 o más años de servicio ininterrumpido.',
      'Dictamen favorable de expediente por parte de Recursos Humanos.'
    ],
    documentos: [
      'Copia del nombramiento base o primer contrato.',
      'Último recibo de nómina.',
      'Identificación oficial vigente.'
    ]
  },
  {
    id: 'puntualidad',
    titulo: 'Incentivos por Puntualidad',
    descripcion: 'Bonificación y reconocimientos al compromiso y constancia del personal operativo y administrativo.',
    icono: Clock,
    esDoble: false,
    descripcionDetallada: 'Estímulo periódico dirigido a premiar la asistencia regular y el cumplimiento puntual en las jornadas laborales asignadas en las diferentes áreas operativas del municipio.',
    requisitos: [
      'Mantener asistencia regular sin faltas ni retardos injustificados en el periodo evaluado.',
      'Estar registrado en el padrón activo de sindicalizados del STSMQ.'
    ],
    documentos: [
      'Reporte de asistencia emitido por el área correspondiente.',
      'Último recibo de nómina timbrado.',
      'Credencial de sindicalizado vigente.'
    ]
  },
  {
    id: 'lentes',
    titulo: 'Apoyo para Lentes Graduados',
    descripcion: 'Subsidio directo para la adquisición y renovación de anteojos para ti y tus dependientes.',
    icono: Glasses,
    esDoble: false,
    descripcionDetallada: 'Reembolso o apoyo económico parcial/total en ópticas afiliadas presentando tu receta médica y credencial de sindicalizado vigente. Aplica para el trabajador y beneficiarios directos.',
    requisitos: [
      'Presentar receta médica original con graduación reciente.',
      'Estar al corriente con las cuotas sindicales ordinarias.'
    ],
    documentos: [
      'Receta médica original de óptica habilitada.',
      'Credencial de sindicalizado vigente.',
      'Copia de la última comanda o recibo de nómina.'
    ]
  },
  {
    id: 'fallecimiento',
    titulo: 'Apoyos por Fallecimiento',
    descripcion: 'Respaldo económico y orientación solidaria para las familias en momentos difíciles.',
    icono: HeartHandshake,
    esDoble: false,
    descripcionDetallada: 'Gestión inmediata de gastos funerarios y entrega de subsidio de solidaridad institucional para los deudos del trabajador sindicalizado, brindando acompañamiento humano y legal.',
    requisitos: [
      'Ser familiar directo designado o beneficiario registrado del trabajador sindicalizado fallecido.'
    ],
    documentos: [
      'Acta de defunción oficial en copia certificada.',
      'Identificación oficial del solicitante.',
      'Credencial de sindicalizado del agremiado.'
    ]
  },
  {
    id: 'becas',
    titulo: 'Becas',
    descripcion: 'Apoyos económicos para continuar tus estudios o respaldar la formación académica de tus hijos.',
    icono: GraduationCap,
    esDoble: false,
    descripcionDetallada: 'Convocatorias semestrales o anuales para el otorgamiento de becas de excelencia académica y de apoyo general dirigidas a los hijos de los agremiados en niveles básico, medio superior y superior.',
    requisitos: [
      'Hijos inscritos en ciclo escolar activo en institución oficial reconocida por la SEP.',
      'Acreditar promedio mínimo general requerido en la convocatoria.'
    ],
    documentos: [
      'Constancia de estudios oficial o boleta de calificaciones sellada.',
      'Acta de nacimiento del hijo(a).',
      'Último recibo de nómina del trabajador.'
    ]
  },
  {
    id: 'paquetes',
    titulo: 'Paquetes Escolares',
    descripcion: 'Entrega anual de útiles e insumos escolares al inicio de cada ciclo académico.',
    icono: PackageCheck,
    esDoble: false,
    descripcionDetallada: 'Dotación de mochilas y kits de útiles escolares de calidad, ajustados a las listas oficiales de la Secretaría de Educación, entregados directamente a los trabajadores previo al inicio de clases.',
    requisitos: [
      'Ser trabajador activo sindicalizado del STSMQ.',
      'Contar con hijos cursando educación básica o media superior.'
    ],
    documentos: [
      'Constancia de inscripción o boleta del ciclo escolar correspondiente.',
      'Copia de credencial de elector (INE) vigente.',
      'Último recibo de nómina.'
    ]
  },
  {
    id: 'permisos',
    titulo: 'Permisos',
    descripcion: 'Gestión y trámite de licencias conforme a las condiciones generales de trabajo.',
    icono: FileCheck2,
    esDoble: false,
    descripcionDetallada: 'Asesoría y facilitación de permisos económicos, por paternidad, por matrimonio o por situaciones de fuerza mayor, respetando los derechos laborales establecidos en el tabulador.',
    requisitos: [
      'Presentar solicitud con anticipación conforme a las condiciones generales de trabajo.'
    ],
    documentos: [
      'Oficio de solicitud de licencia o permiso firmado.',
      'Comprobante o justificante del motivo del permiso (en caso de fuerza mayor).'
    ]
  },
  {
    id: 'construccion',
    titulo: 'Ayuda para Materiales de Construcción',
    descripcion: 'Apoyo enfocado en la mejora, ampliación y acondicionamiento de tu vivienda familiar.',
    icono: Hammer,
    esDoble: false,
    descripcionDetallada: 'Subsidios o convenios especiales para la obtención a bajo costo de cemento, varilla, impermeabilizante y otros materiales indispensables para el mejoramiento del patrimonio familiar del trabajador.',
    requisitos: [
      'Ser trabajador de base sindicalizado con antigüedad mínima requerida.',
      'Demostrar propiedad o posesión legal del inmueble a mejorar.'
    ],
    documentos: [
      'Comprobante de domicilio reciente.',
      'Identificación oficial vigente (INE).',
      'Último recibo de nómina.'
    ]
  },
];

export default function Prestaciones() {
  const [prestacionSeleccionada, setPrestacionSeleccionada] = useState<typeof prestaciones[0] | null>(null);
  const [tabSeleccionada, setTabSeleccionada] = useState<'jubilacion' | 'pension'>('jubilacion');

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
                onClick={() => {
                  setPrestacionSeleccionada(item);
                  setTabSeleccionada('jubilacion');
                }}
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
                  <span>Ver requisitos y documentos</span>
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

      {/* Modal / Panel Desplegable */}
      {prestacionSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Botón de Cerrar */}
            <button
              onClick={() => setPrestacionSeleccionada(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Cabecera del Modal */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#E07A2B]/10 text-[#E07A2B]">
                {prestacionSeleccionada.icono && <prestacionSeleccionada.icono className="h-7 w-7" />}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  {prestacionSeleccionada.esDoble 
                    ? (tabSeleccionada === 'jubilacion' ? prestacionSeleccionada.jubilacion?.titulo : prestacionSeleccionada.pension?.titulo)
                    : prestacionSeleccionada.titulo}
                </h3>
              </div>
            </div>

            {/* SELECTOR DE PESTAÑAS: Solo para Jubilaciones y Pensiones */}
            {prestacionSeleccionada.esDoble && (
              <div className="mb-6 grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-slate-100 border border-slate-200/80">
                <button
                  onClick={() => setTabSeleccionada('jubilacion')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    tabSeleccionada === 'jubilacion'
                      ? 'bg-[#E07A2B] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Jubilaciones</span>
                </button>

                <button
                  onClick={() => setTabSeleccionada('pension')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    tabSeleccionada === 'pension'
                      ? 'bg-[#E07A2B] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Pensiones</span>
                </button>
              </div>
            )}

            <p className="text-sm text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200/60 leading-relaxed">
              {prestacionSeleccionada.esDoble 
                ? (tabSeleccionada === 'jubilacion' ? prestacionSeleccionada.jubilacion?.descripcion : prestacionSeleccionada.pension?.descripcion)
                : prestacionSeleccionada.descripcionDetallada}
            </p>

            {/* Sección 1: Requisitos */}
            <div className="mb-6 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#E07A2B]" />
                Requisitos para acceder al beneficio
              </h4>
              <ul className="space-y-2">
                {(prestacionSeleccionada.esDoble 
                  ? (tabSeleccionada === 'jubilacion' ? prestacionSeleccionada.jubilacion?.requisitos : prestacionSeleccionada.pension?.requisitos)
                  : prestacionSeleccionada.requisitos)?.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E07A2B] shrink-0 mt-1.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sección 2: Documentación requerida */}
            <div className="mb-8 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#E07A2B]" />
                Documentación requerida
              </h4>
              <ul className="space-y-2">
                {(prestacionSeleccionada.esDoble 
                  ? (tabSeleccionada === 'jubilacion' ? prestacionSeleccionada.jubilacion?.documentos : prestacionSeleccionada.pension?.documentos)
                  : prestacionSeleccionada.documentos)?.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200/50">
                    <span className="font-bold text-[#E07A2B] shrink-0">{idx + 1}.</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pie del Modal con el texto actualizado y botón Entendido en color Naranja */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-500 text-center sm:text-left leading-relaxed">
                Para entregar tus documentos acude a las oficinas del Sindicato de Trabajadores al Servicio del Municipio de Querétaro en Calle Independencia No. 210, Colonia Centro.
              </p>
              <button
                onClick={() => setPrestacionSeleccionada(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-xs font-bold transition-colors shrink-0 shadow-md"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}