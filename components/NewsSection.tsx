import Link from 'next/link';
import { Calendar, ArrowUpRight, Megaphone } from 'lucide-react';

const newsItems = [
  {
    date: '20 Octubre, 2026',
    category: 'Comunicado Oficial',
    title: 'Acuerdo de incremento salarial para el personal operativo del Municipio',
    summary: 'Se concluyó exitosamente la revisión salarial con la administración municipal, logrando un ajuste beneficioso para el tabulador general.',
    link: '#',
  },
  {
    date: '15 Octubre, 2026',
    category: 'Asamblea General',
    title: 'Convocatoria a la Asamblea Ordinaria de Afiliados',
    summary: 'Se cita a todos los delegados y trabajadores sindicalizados al auditorio sindical para la rendición de cuentas trimestral.',
    link: '#',
  },
  {
    date: '02 Octubre, 2026',
    category: 'Prestaciones',
    title: 'Apertura del registro para Becas Escolares Ciclo 2026-2027',
    summary: 'Consulta la documentación requerida para ingresar la solicitud de beca de tus hijas e hijos.',
    link: '#',
  },
];

export default function NewsSection() {
  return (
    <section id="noticias" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-800 tracking-widest uppercase mb-2">
              <Megaphone className="h-4 w-4" />
              Acción Sindical y Transparencia
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Boletines e Información Reciente
            </h2>
          </div>
          <Link
            href="#todas-las-noticias"
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-bold text-red-800 hover:text-red-900"
          >
            Ver todos los comunicados <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <article
              key={index}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-red-800">{item.category}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug hover:text-red-800 transition-colors">
                  <Link href={item.link}>{item.title}</Link>
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3">{item.summary}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-red-800 transition-colors"
                >
                  Leer comunicado completo <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
