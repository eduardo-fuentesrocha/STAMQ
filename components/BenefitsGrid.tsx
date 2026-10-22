import { GraduationCap, Award, Wallet, HeartPulse, Shield, CalendarCheck } from 'lucide-react';

const benefits = [
  {
    icon: GraduationCap,
    title: 'Becas Escolares',
    description: 'Bolsa de apoyos económicos mensuales para hijos de trabajadores sindicalizados en niveles primaria, secundaria y nivel superior.',
    tag: 'Apoyo Familiar',
  },
  {
    icon: Award,
    title: 'Quinquenios y Antigüedad',
    description: 'Estímulos e incrementos salariales garantizados a partir de los 5 años de servicio ininterrumpido en el municipio.',
    tag: 'Económico',
  },
  {
    icon: Wallet,
    title: 'Caja de Ahorro y Despensa',
    description: 'Acceso al fondo de ahorro con rendimientos preferenciales y bonos en vales de despensa mensuales.',
    tag: 'Financiero',
  },
  {
    icon: HeartPulse,
    title: 'Asistencia Médica y Salud',
    description: 'Coordinación de permisos por incapacidad, insumos de protección personal y convenios de atención de salud.',
    tag: 'Salud',
  },
  {
    icon: Shield,
    title: 'Defensa Jurídica Laboral',
    description: 'Representación legal ante el Tribunal de Conciliación y Arbitraje en materia de nombramientos y sanciones.',
    tag: 'Legal',
  },
  {
    icon: CalendarCheck,
    title: 'Incentivo por Puntualidad',
    description: 'Recompensas anuales para trabajadores de servicios públicos y administrativos con récord perfecto de asistencia.',
    tag: 'Reconocimiento',
  },
];

export default function BenefitsGrid() {
  return (
    <section id="prestaciones" className="py-20 bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-red-800 tracking-widest uppercase mb-2">
            Derechos Conquistados
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Prestaciones Sociales y Laborales
          </p>
          <p className="mt-4 text-base text-slate-600">
            Conoce los beneficios respaldados por nuestro Convenio Colectivo de Trabajo vigente para todo el personal de base.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-red-200 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex rounded-xl bg-red-50 p-3 text-red-800 group-hover:bg-red-800 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {benefit.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
