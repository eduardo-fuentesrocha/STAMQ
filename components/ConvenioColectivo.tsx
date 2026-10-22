import { FileText, Download, CheckCircle2, ShieldAlert, Clock, Scale } from 'lucide-react';

const highlightPoints = [
  {
    icon: Scale,
    title: 'Tabulador Salarial y Aumentos',
    description: 'Bases para las revisiones salariales anuales, garantizando incrementos por encima de la inflación para el personal operativo y de base.',
  },
  {
    icon: Clock,
    title: 'Jornada Laboral y Descansos',
    description: 'Establecimiento de jornadas de trabajo reglamentadas, días de descanso obligatorio, primas dominicales y pago de horas extraordinarias.',
  },
  {
    icon: CheckCircle2,
    title: 'Licencias y Permisos Especiales',
    description: 'Derechos de permisos con goce de sueldo por maternidad, paternidad, matrimonio, duelo familiar y cuidados médicos.',
  },
  {
    icon: ShieldAlert,
    title: 'Seguridad y Salud Ocupacional',
    description: 'Obligatoriedad de entrega de herramientas, uniformes y equipo de protección personal (EPP) adecuado para cada área.',
  },
];

export default function ConvenioColectivo() {
  return (
    <section id="transparencia" className="py-20 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-red-800 tracking-widest uppercase mb-2">
            <FileText className="h-4 w-4" />
            Marco Jurídico y Certeza Laboral
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Convenio Colectivo de Trabajo
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Documento oficial que rige las relaciones laborales entre el Municipio de Querétaro y el Sindicato de Trabajadores (STAMQ).
          </p>
        </div>

        {/* Banner principal de descarga */}
        <div className="mb-16 rounded-2xl bg-slate-900 text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-red-800 text-xs font-bold rounded-full text-white">
                Vigente 2026 - Documento Oficial
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold">
                Consulta el Convenio Colectivo Completo
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Descarga el documento en formato PDF registrado y depositado ante el Tribunal de Conciliación y Arbitraje del Estado de Querétaro.
              </p>
            </div>

            <a
              href="#"
              download
              className="w-full lg:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-red-800 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-red-700 transition-all shrink-0"
            >
              <Download className="h-5 w-5" />
              Descargar PDF (CCT 2026)
            </a>
          </div>
        </div>

        {/* Grilla de aspectos clave del convenio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlightPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="rounded-lg bg-red-100 p-3 text-red-800 shrink-0">
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