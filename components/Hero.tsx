import Link from 'next/link';
import { ShieldCheck, ArrowRight, Download, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-28">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-900/60 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-red-200 border border-red-700/50">
              <ShieldCheck className="h-4 w-4 text-red-400" />
              Unidad, Justicia y Seguridad Laboral
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Defendiendo los derechos de los trabajadores del Municipio de Querétaro
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0">
              Representamos a la fuerza operativa y administrativa que mantiene en marcha nuestro municipio. Garantizamos certidumbre laboral, prestaciones justas y transparencia institucional.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="#prestaciones"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-red-800 px-6 py-3.5 text-base font-bold text-white shadow-lg hover:bg-red-700 transition-all focus:ring-2 focus:ring-red-500"
              >
                Conoce tus Prestaciones
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#transparencia"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-base font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
              >
                <Download className="h-5 w-5 text-slate-400" />
                Convenio Colectivo PDF
              </Link>
            </div>

            <div className="pt-8 border-t border-slate-800 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">1,000+</p>
                <p className="text-xs text-slate-400 font-medium">Trabajadores Agremiados</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">100%</p>
                <p className="text-xs text-slate-400 font-medium">Defensa Laboral</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">30+</p>
                <p className="text-xs text-slate-400 font-medium">Años de Trayectoria</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white text-slate-900 p-6 sm:p-8 shadow-2xl border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-red-100 p-2 text-red-800">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-900">Atención al Afiliado</h2>
                  <p className="text-xs text-slate-500">Servicios directos para personal de base</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Asesoría jurídica laboral sin costo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Seguimiento a trámites de escalafón y jubilación.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Gestión de becas escolares y apoyos extraordinarios.</span>
                </li>
              </ul>

              <Link
                href="#portal"
                className="block w-full text-center rounded-lg bg-slate-900 py-3 text-sm font-bold text-white shadow hover:bg-slate-800 transition-colors"
              >
                Ingresar al Portal Sindical
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
