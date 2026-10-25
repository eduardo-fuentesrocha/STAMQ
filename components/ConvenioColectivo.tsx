import { FileText, Download, CheckCircle2, ShieldAlert, Clock, Scale } from 'lucide-react';

const highlightPoints = [
  {
    icon: Scale,
    title: 'Incremento Salarial y Vigencia',
    description: 'Acuerdo de revisión integral con incremento directo al salario y depósito ante el Tribunal de Conciliación y Arbitraje del Estado de Querétaro.',
  },
  {
    icon: Clock,
    title: 'Jornada y Días de Descanso',
    description: 'Regulación de guardias operativas, días de descanso obligatorio institucionales (como el 10 de mayo y 12 de diciembre) y primas dominicales.',
  },
  {
    icon: CheckCircle2,
    title: 'Prestaciones y Previsión Social',
    description: 'Aguinaldo de 70 días, prima vacacional del 40%, vales de despensa, ayuda de transporte, quinquenios y fondo de ahorro.',
  },
  {
    icon: ShieldAlert,
    title: 'Apoyos Escolares y Familiares',
    description: 'Asignación de becas educativas, paquetes escolares anuales por nivel educativo, lentes graduados y apoyos por defunción.',
  },
];

export default function ConvenioColectivo() {
  return (
    <section id="transparencia" className="py-20 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2A9EDA] tracking-widest uppercase mb-2">
            <FileText className="h-4 w-4" />
            Marco Jurídico y Certeza Laboral
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Convenio Colectivo de Trabajo
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Documento oficial que rige las relaciones laborales y prestaciones adquiridas entre el Municipio de Querétaro y el STSMQ.
          </p>
        </div>

        {/* Banner principal con el enlace al PDF público actualizado */}
        <div className="mb-16 rounded-2xl bg-slate-900 text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-[#2A9EDA] text-xs font-bold rounded-full text-white">
                Documento Oficial Depositado
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold">
                Descarga el Convenio Colectivo Completo
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Consulta el archivo PDF íntegro con todas las cláusulas, firmas del Comité Ejecutivo y autoridades municipales registrado ante el Tribunal.
              </p>
            </div>

            <a
              href="/convenio-stsmq-2017.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Convenio_Colectivo_STSMQ_2017.pdf"
              className="w-full lg:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-[#2A9EDA] px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-[#2381b2] transition-all shrink-0"
            >
              <Download className="h-5 w-5" />
              Descargar PDF Oficial
            </a>
          </div>
        </div>

        {/* Grid de puntos clave */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlightPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="rounded-lg bg-[#2A9EDA]/10 p-3 text-[#2A9EDA] shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{point.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{point.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}