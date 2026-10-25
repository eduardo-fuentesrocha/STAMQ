import { Users, Mail, Phone, Shield } from 'lucide-react';

const committeeMembers = [
  {
    name: 'Celestino Bermúdez Jiménez',
    role: 'Secretario General',
    email: 'secretariageneral@stsmq.org.mx',
  },
  {
    name: 'Luis Álvarez Álvarez',
    role: 'Secretario del Interior',
    email: 'interior@stsmq.org.mx',
  },
  {
    name: 'José Pueblito Olvera Espinosa',
    role: 'Secretario de Trabajo y Conflictos',
    email: 'conflictos@stsmq.org.mx',
  },
  {
    name: 'Sotero Álvarez Álvarez',
    role: 'Secretario de Hacienda',
    email: 'hacienda@stsmq.org.mx',
  },
  {
    name: 'Ma. Ángeles Ramírez González',
    role: 'Secretaria de Actas',
    email: 'actas@stsmq.org.mx',
  },
  {
    name: 'Ma. Pueblito Ruiz Álvarez',
    role: 'Secretaria del Exterior',
    email: 'exterior@stsmq.org.mx',
  },
  {
    name: 'José Guadalupe Reséndiz Zamorano',
    role: 'Secretario de Organización',
    email: 'organizacion@stsmq.org.mx',
  },
  {
    name: 'Nicolás Barrios Vega',
    role: 'Secretario de Acción Deportiva',
    email: 'deportes@stsmq.org.mx',
  },
];

export default function Committee() {
  return (
    <section id="contacto" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2A9EDA] tracking-widest uppercase mb-2">
            <Shield className="h-4 w-4" />
            Liderazgo y Representación
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comité Directivo
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Representantes sindicales encargados de velar por los derechos de los trabajadores al servicio del Municipio de Querétaro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {committeeMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-[#2A9EDA]/40 transition-all"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2A9EDA] text-white font-bold mb-4 shadow-sm">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{member.name}</h3>
                <p className="text-xs font-semibold text-[#2A9EDA] mt-1">{member.role}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}