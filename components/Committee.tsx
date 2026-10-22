import { Users, Mail, Phone, Shield } from 'lucide-react';

const committeeMembers = [
  {
    name: 'Lic. Celestino Morales Trejo',
    role: 'Secretario General',
    department: 'Dirección General de Gobierno',
    email: 'secretaria@stamq.org.mx',
    phone: '(442) 123-4567',
  },
  {
    name: 'C. María de los Ángeles Pérez',
    role: 'Secretaria de Conflictos y Escalafón',
    department: 'Servicios Públicos Municipales',
    email: 'conflictos@stamq.org.mx',
    phone: '(442) 234-5678',
  },
  {
    name: 'Ing. Alejandro Domínguez R.',
    role: 'Secretario de Finanzas y Caja de Ahorro',
    department: 'Obras Públicas',
    email: 'finanzas@stamq.org.mx',
    phone: '(442) 345-6789',
  },
  {
    name: 'Lic. Sofía Hernández Vega',
    role: 'Secretaria de Prestaciones y Previsión Social',
    department: 'Administración y Finanzas',
    email: 'prestaciones@stamq.org.mx',
    phone: '(442) 456-7890',
  },
];

export default function Committee() {
  return (
    <section id="contacto" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-red-800 tracking-widest uppercase mb-2">
            <Shield className="h-4 w-4" />
            Liderazgo Gremial
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comité Ejecutivo
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Conoce a los representantes sindicales encargados de velar por los derechos laborales y la atención directa de los agremiados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {committeeMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-800 text-white font-bold mb-4 shadow-sm">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">{member.name}</h3>
                <p className="text-xs font-semibold text-red-800 mt-1">{member.role}</p>
                <p className="text-xs text-slate-500 mt-2">Adscripción: {member.department}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{member.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}