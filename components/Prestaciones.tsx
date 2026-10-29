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
  CheckCircle2,
  Undo2
} from 'lucide-react';

const prestaciones = [
  {
    id: 'jubilaciones-pensiones',
    titulo: 'Jubilaciones y Pensiones',
    descripcion: 'Acompañamiento y gestión integral de trámites para el retiro digno de nuestros trabajadores.',
    icono: ShieldCheck,
    esDoble: true,
    jubilacion: {
      titulo: 'Jubilaciones',
      descripcion: 'Derecho a solicitar la jubilación al cumplir 28 años de servicio, independientemente de la edad, conforme a la Ley de los Trabajadores del Estado de Querétaro.',
      requisitos: [
        'Cumplir con un mínimo de 28 años de servicio ininterrumpido en el Municipio.',
        'Estar registrado en el padrón activo del Sindicato.',
        'Presentar solicitud formal de jubilación ante la Oficialía Mayor o instancia equivalente del Municipio.',
        'No contar con adeudos administrativos vigentes en el Sindicato.'
      ],
      documentos: [
        'Solicitud por escrito de jubilación dirigida a la Oficialía Mayor del Municipio.',
        'Identificación oficial vigente (INE o Pasaporte).',
        'Constancia de años de servicio y antigüedad emitida por la Dirección de Recursos Humanos.',
        'Último recibo de nómina timbrado y acta de nacimiento del trabajador.'
      ]
    },
    pension: {
      titulo: 'Pensiones',
      descripcion: 'Gestión de pensión por vejez al cumplir 60 años de edad y al menos 18 años de servicio, o bien por invalidez conforme a la normatividad estatal.',
      requisitos: [
        'Haber cumplido 60 años de edad y contar con un mínimo de 18 años de servicio para pensión por vejez, o bien contar con el dictamen médico oficial en caso de invalidez.',
        'Estar registrado en el padrón activo del Sindicato.',
        'Acreditar fehacientemente la dependencia económica en caso de beneficiarios por viudez u orfandad.',
        'No contar con adeudos administrativos vigentes en el Sindicato.'
      ],
      documentos: [
        'Solicitud formal de pensión ante la instancia municipal correspondiente.',
        'Identificación oficial vigente (INE o Pasaporte).',
        'Dictamen médico oficial (para pensión por invalidez) o actas de estado civil (para pensión por viudez/orfandad).',
        'Comprobante de domicilio reciente y constancia de percepciones salariales.'
      ]
    }
  },
  {
    id: 'estimulos',
    titulo: 'Estímulos por Años de Servicio',
    descripcion: 'Reconocimiento anual por aniversario laboral a los trabajadores que cumplen años de servicio.',
    icono: Award,
    esDoble: false,
    descripcionDetallada: 'Incentivo entregado anualmente en la segunda quincena de agosto para reconocer la trayectoria y antigüedad del personal conforme al tabulador institucional.',
    requisitos: [
      'Cumplir con los periodos de servicio ininterrumpido establecidos en el Municipio.',
      'Dictamen favorable de expediente laboral por parte de Recursos Humanos y el Sindicato.'
    ],
    documentos: [
      'Copia del nombramiento base o primer contrato.',
      'Último recibo de nómina timbrado.',
      'Identificación oficial vigente.'
    ]
  },
  {
    id: 'puntualidad',
    titulo: 'Incentivos por Puntualidad',
    descripcion: 'Reconocimiento anual a trabajadores operativos con destacada asistencia y puntualidad.',
    icono: Clock,
    esDoble: false,
    descripcionDetallada: 'Otorgado a quienes observen la mejor asistencia al trabajo y antigüedad. Calificado conjuntamente por la Dirección de Recursos Humanos y el Sindicato para su entrega anual.',
    requisitos: [
      'Ser trabajador operativo con registro en el padrón activo del Sindicato.',
      'Mantener un expediente destacado en asistencia, puntualidad y antigüedad.'
    ],
    documentos: [
      'Reporte de incidencias y asistencia emitido por el área correspondiente.',
      'Último recibo de nómina timbrado.',
      'Credencial de sindicalizado vigente.'
    ]
  },
  {
    id: 'lentes',
    titulo: 'Apoyo para Lentes Graduados',
    descripcion: 'Suministro anual de lentes graduados para el trabajador, cónyuge e hijos que estudian.',
    icono: Glasses,
    esDoble: false,
    descripcionDetallada: 'Prestación anual que cubre la valoración médica y la entrega de lentes graduados para el trabajador, cónyuge y dependientes acreditados que estudian, en la óptica designada por el Municipio.',
    requisitos: [
      'Estar al corriente con las cuotas sindicales ordinarias.',
      'Hijos acreditados estudiando conforme a los límites de edad establecidos.'
    ],
    documentos: [
      'Valoración médica emitida por la óptica designada por el Municipio.',
      'Credencial de sindicalizado vigente.',
      'Constancia de estudios de los beneficiarios y actas correspondientes.'
    ]
  },
  {
    id: 'fallecimiento',
    titulo: 'Apoyos por Fallecimiento',
    descripcion: 'Apoyo económico institucional y respaldo solidario en momentos difíciles para la familia.',
    icono: HeartHandshake,
    esDoble: false,
    descripcionDetallada: 'Gestión de apoyo económico en caso de fallecimiento del trabajador, su cónyuge o hijos, así como el otorgamiento de respaldo institucional para gastos de marcha a los beneficiarios.',
    requisitos: [
      'Ser familiar directo designado o beneficiario registrado del trabajador sindicalizado.'
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
    descripcion: 'Fondo de apoyo para becas académicas, para capacidades diferentes y becas de excelencia.',
    icono: GraduationCap,
    esDoble: false,
    descripcionDetallada: 'Aportaciones periódicas administradas por el Sindicato para impulsar la formación académica de los hijos de los agremiados, incluyendo apoyos especiales y de excelencia académica.',
    requisitos: [
      'Hijos inscritos en ciclo escolar activo en institución oficial reconocida.',
      'Cumplir con los procedimientos internos de asignación del Sindicato.'
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
    descripcion: 'Dotación anual de paquetes escolares y apoyos para el inicio de clases.',
    icono: PackageCheck,
    esDoble: false,
    descripcionDetallada: 'Entrega de mochilas, útiles escolares ajustados a las listas oficiales y apoyos complementarios para los hijos de los agremiados en los diferentes niveles educativos.',
    requisitos: [
      'Ser trabajador activo sindicalizado.',
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
    descripcion: 'Licencias y permisos con goce de sueldo por matrimonio, paternidad y defunción.',
    icono: FileCheck2,
    esDoble: false,
    descripcionDetallada: 'Asesoría y facilitación de permisos por matrimonio civil, licencias por nacimiento de hijos y permisos por fallecimiento de familiares directos, respetando los derechos laborales.',
    requisitos: [
      'Presentar solicitud con anticipación conforme a las condiciones generales de trabajo.'
    ],
    documentos: [
      'Oficio de solicitud de licencia firmado.',
      'Acta de matrimonio, certificado de nacimiento o acta de defunción según corresponda.'
    ]
  },
  {
    id: 'construccion',
    titulo: 'Ayuda para Materiales de Construcción',
    descripcion: 'Apoyos e infraestructura para el mejoramiento del patrimonio familiar del trabajador.',
    icono: Hammer,
    esDoble: false,
    descripcionDetallada: 'Subsidios institucionales y programas de apoyo para obra, mantenimiento y mejoras al patrimonio y condiciones de bienestar del agremiado.',
    requisitos: [
      'Ser trabajador de base sindicalizado con antigüedad mínima requerida.',
      'Demostrar posesión legal del inmueble o cumplir con las bases de la convocatoria.'
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
  const [tipoIndependiente, setTipoIndependiente] = useState<'jubilacion' | 'pension' | null>(null);

  return (
    <section id="prestaciones" className="bg-white text-zinc-900 py-20 px-6 sm:px-12 lg:px-16 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Encabezado de la Sección */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
            Prestaciones
          </h2>
          <p className="text-zinc-600 text-base leading-relaxed">
            Haz clic en cualquier opción para consultar los requisitos y la documentación necesaria. 
          </p>
        </div>

        {/* Cuadrícula de Prestaciones en Fondo Blanco con Tarjetas Suaves */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prestaciones.map((item) => {
            const Icono = item.icono;
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!item.esDoble) {
                    setPrestacionSeleccionada(item);
                    setTipoIndependiente(null);
                  }
                }}
                className={`group p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm transition-all duration-300 flex flex-col justify-between ${
                  item.esDoble ? 'cursor-default' : 'hover:border-[#E07A2B] hover:shadow-md cursor-pointer'
                }`}
              >
                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors duration-300">
                    <Icono className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 group-hover:text-[#E07A2B] transition-colors">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>

                {/* Comportamiento independiente para Jubilaciones y Pensiones */}
                {item.esDoble ? (
                  <div className="mt-6 pt-4 border-t border-zinc-100 space-y-2.5">
                    <span className="text-xs font-semibold text-zinc-500 block">
                      Selecciona la opción deseada:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPrestacionSeleccionada(item);
                          setTipoIndependiente('jubilacion');
                        }}
                        className="py-2 px-3 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <GraduationCap className="h-3.5 w-3.5" />
                        <span>Jubilaciones</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPrestacionSeleccionada(item);
                          setTipoIndependiente('pension');
                        }}
                        className="py-2 px-3 rounded-lg bg-[#E07A2B]/10 hover:bg-[#E07A2B] text-[#E07A2B] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Pensiones</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-[#E07A2B]">
                    <span>Requisitos y documentos</span>
                    <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Banner General de Atención e Informes */}
        <div className="mt-12 p-8 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center lg:text-left">
            <h4 className="text-xl font-bold text-zinc-950">
              ¿Requieres orientación sobre tus trámites?
            </h4>
            <p className="text-sm text-zinc-600">
              Comunícate directamente al teléfono o por correo electrónico para mayor información.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="tel:4422137119"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-sm border border-zinc-300 shadow-sm transition-colors w-full sm:w-auto justify-center"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 p-6 sm:p-8 relative text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Botón de Cerrar */}
            <button
              onClick={() => setPrestacionSeleccionada(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
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
                <h3 className="text-2xl font-black text-zinc-900 leading-tight">
                  {prestacionSeleccionada.esDoble 
                    ? (tipoIndependiente === 'jubilacion' ? prestacionSeleccionada.jubilacion?.titulo : prestacionSeleccionada.pension?.titulo)
                    : prestacionSeleccionada.titulo}
                </h3>
              </div>
            </div>

            <p className="text-sm text-zinc-600 mb-6 bg-zinc-50 p-4 rounded-xl border border-zinc-200/60 leading-relaxed">
              {prestacionSeleccionada.esDoble 
                ? (tipoIndependiente === 'jubilacion' ? prestacionSeleccionada.jubilacion?.descripcion : prestacionSeleccionada.pension?.descripcion)
                : prestacionSeleccionada.descripcionDetallada}
            </p>

            {/* Sección 1: Requisitos */}
            <div className="mb-6 space-y-3">
              <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#E07A2B]" />
                Requisitos
              </h4>
              <ul className="space-y-2">
                {(prestacionSeleccionada.esDoble 
                  ? (tipoIndependiente === 'jubilacion' ? prestacionSeleccionada.jubilacion?.requisitos : prestacionSeleccionada.pension?.requisitos)
                  : prestacionSeleccionada.requisitos)?.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 leading-relaxed">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E07A2B] shrink-0 mt-1.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sección 2: Documentación requerida */}
            <div className="mb-8 space-y-3">
              <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#E07A2B]" />
                Documentos para solicitar el trámite
              </h4>
              <ul className="space-y-2">
                {(prestacionSeleccionada.esDoble 
                  ? (tipoIndependiente === 'jubilacion' ? prestacionSeleccionada.jubilacion?.documentos : prestacionSeleccionada.pension?.documentos)
                  : prestacionSeleccionada.documentos)?.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 leading-relaxed bg-zinc-50 p-2.5 rounded-lg border border-zinc-200/50">
                    <span className="font-bold text-[#E07A2B] shrink-0">{idx + 1}.</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pie del Modal con botón Regresar */}
            <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-zinc-500 text-center sm:text-left leading-relaxed">
                Una vez reunidos los documentos deberás entregarlos en las oficinas del Sindicato.
                Si requieres alguna orientación, comunícate con nosotros al <strong className="text-zinc-800">(442) 213 7119</strong> o envíanos un correo electrónico.
              </p>
              <button
                onClick={() => setPrestacionSeleccionada(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-sm font-semibold transition-all shrink-0 shadow-md flex items-center justify-center gap-2 group"
              >
                <Undo2 className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Regresar</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}