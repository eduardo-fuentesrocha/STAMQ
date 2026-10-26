'use client';

import { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Wallet, 
  HeartPulse, 
  Shield, 
  CalendarCheck, 
  X, 
  CheckCircle2, 
  FileText,
  ChevronRight
} from 'lucide-react';

interface Benefit {
  id: string;
  icon: any;
  title: string;
  description: string;
  tag: string;
  requirements: string[];
  documents: string[];
}

const benefits: Benefit[] = [
  {
    id: 'pensiones',
    icon: GraduationCap,
    title: 'Pensiones y Jubilaciones',
    description: 'Bolsa de apoyos económicos mensuales y trámites de jubilación para trabajadores sindicalizados y sus familias.',
    tag: 'Apoyo Familiar',
    requirements: [
      'Tener un mínimo de 25 años de servicio ininterrumpido en el Municipio (Jubilación) o cumplir con el dictamen médico oficial.',
      'Estar registrado en el padrón activo de sindicalizados del STSMQ.',
      'Para becas o apoyos a hijos: acreditar promedio mínimo de 8.5 en el ciclo escolar anterior.',
      'No contar con adeudos administrativos vigentes en el Sindicato.'
    ],
    documents: [
      'Identificación oficial vigente (INE o Pasaporte).',
      'Último recibo de nómina timbrado.',
      'Constancia de semanas/años cotizados emitida por la Dirección de RH del Municipio.',
      'Acta de nacimiento del trabajador y beneficiarios.',
      'Para becas de hijos: Boleta de calificaciones oficial firmada y sellada por la institución educativa.'
    ]
  },
  {
    id: 'quinquenios',
    icon: Award,
    title: 'Quinquenios y Antigüedad',
    description: 'Estímulos e incrementos salariales garantizados a partir de los 5 años de servicio ininterrumpido en el municipio.',
    tag: 'Económico',
    requirements: [
      'Cumplir 5, 10, 15, 20 o más años de servicio ininterrumpido.',
      'Dictamen favorable de expediente por parte de Recursos Humanos.'
    ],
    documents: [
      'Copia del nombramiento base o primer contrato.',
      'Último recibo de nómina.',
      'Identificación oficial vigente.'
    ]
  },
  {
    id: 'caja-ahorro',
    icon: Wallet,
    title: 'Caja de Ahorro y Despensa',
    description: 'Acceso al fondo de ahorro con rendimientos preferenciales y bonos en vales de despensa mensuales.',
    tag: 'Financiero',
    requirements: [
      'Mínimo 6 meses de afiliación continua al STSMQ.',
      'Formato de descuento vía nómina firmado por el trabajador.'
    ],
    documents: [
      'Formato de solicitud de aportación a la Caja de Ahorro.',
      'Copia de identificación oficial (INE).',
      'Comprobante de domicilio reciente (no mayor a 3 meses).'
    ]
  },
  {
    id: 'salud',
    icon: HeartPulse,
    title: 'Asistencia Médica y Salud',
    description: 'Coordinación de permisos por incapacidad, insumos de protección personal y convenios de atención de salud.',
    tag: 'Salud',
    requirements: [
      'Incapacidad emitida o validada por el servicio médico institucional.',
      'Notificación inmediata al delegado sindical correspondiente.'
    ],
    documents: [
      'Dictamen o pase médico oficial.',
      'Credencial de afiliado al STSMQ.'
    ]
  },
  {
    id: 'juridico',
    icon: Shield,
    title: 'Defensa Jurídica Laboral',
    description: 'Representación legal ante el Tribunal de Conciliación y Arbitraje en materia de nombramientos y sanciones.',
    tag: 'Legal',
    requirements: [
      'Ser miembro activo del sindicato sin procedimientos disciplinarios internos vigentes.'
    ],
    documents: [
      'Copia de la citación, acta u oficio administrativo notificado.',
      'Carta de solicitud de representación legal firmada.'
    ]
  },
  {
    id: 'puntualidad',
    icon: CalendarCheck,
    title: 'Incentivo por Puntualidad',
    description: 'Recompensas anuales para trabajadores de servicios públicos y administrativos con récord perfecto de asistencia.',
    tag: 'Reconocimiento',
    requirements: [
      '100% de asistencias y registros de entrada/salida a tiempo durante el periodo evaluado.'
    ],
    documents: [
      'Tarjeta o reporte digital de checado validado por la jefatura inmediata.'
    ]
  }
];

export default function BenefitsGrid() {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

  return (
    <section id="prestaciones" className="py-20 bg-slate-100 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-[#E07A2B] tracking-widest uppercase mb-2">
            Bienvenido
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Prestaciones Sociales y Laborales
          </p>
          <p className="mt-4 text-base text-slate-600">
            Haz clic en cualquier opción para consultar los requisitos y documentos necesarios.
          </p>
        </div>

        {/* Rejilla de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <button
                key={benefit.id}
                onClick={() => setSelectedBenefit(benefit)}
                className="group text-left relative rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-[#E07A2B]/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex rounded-xl bg-[#E07A2B]/10 p-3 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {benefit.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#E07A2B] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#E07A2B]">
                  <span>Ver requisitos y documentos</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* MODAL DE REQUISITOS */}
      {selectedBenefit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cerrar */}
            <button
              onClick={() => setSelectedBenefit(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Cabecera del Modal */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#E07A2B]/10 text-[#E07A2B]">
                <selectedBenefit.icon className="h-7 w-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#E07A2B] uppercase tracking-wider block">
                  {selectedBenefit.tag}
                </span>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  {selectedBenefit.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200/60 leading-relaxed">
              {selectedBenefit.description}
            </p>

            {/* Sección 1: Requisitos */}
            <div className="mb-6 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#E07A2B]" />
                Requisitos para acceder al beneficio
              </h4>
              <ul className="space-y-2">
                {selectedBenefit.requirements.map((req, idx) => (
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
                {selectedBenefit.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200/50">
                    <span className="font-bold text-[#E07A2B] shrink-0">{idx + 1}.</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pie del Modal */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-500">
                Para entregar tus documentos acude a las oficinas del STSMQ en Independencia 210.
              </p>
              <button
                onClick={() => setSelectedBenefit(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0A1F3F] text-white text-xs font-bold hover:bg-[#0A1F3F]/90 transition-colors"
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