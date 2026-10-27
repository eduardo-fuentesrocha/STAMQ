import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-white border-t-2 border-[#E07A2B]">
      
      {/* Contenedor principal del Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-start">
          
          {/* Columna 1: Logotipo Oficial Prominente en Blanco y Descripción */}
          <div className="space-y-4">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0">
              <Image
                src="/STSMQ.svg"
                alt="Logotipo Oficial STSMQ"
                fill
                className="object-contain brightness-0 invert drop-shadow-md"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Defendiendo los derechos laborales, la justicia y las prestaciones de nuestra base trabajadora.
            </p>
          </div>

          {/* Columna 2: Enlaces Institucionales */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#E07A2B]">
              Enlaces Institucionales
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#prestaciones" className="text-slate-300 hover:text-[#E07A2B] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#E07A2B]" />
                  <span>Prestaciones</span>
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-slate-300 hover:text-[#E07A2B] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#E07A2B]" />
                  <span>Servicios</span>
                </Link>
              </li>
              <li>
                <Link href="#eventos" className="text-slate-300 hover:text-[#E07A2B] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#E07A2B]" />
                  <span>Eventos</span>
                </Link>
              </li>
              <li>
                <Link href="#circulares" className="text-slate-300 hover:text-[#E07A2B] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#E07A2B]" />
                  <span>Circulares</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Oficinas y Contacto */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#E07A2B]">
              Oficinas y Contacto
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Calle Independencia No. 210, Colonia Centro, Querétaro, Qro.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <span>Teléfono: (442) 213 7119</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <span>sindicato.municipio.qro@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra inferior de derechos y avisos legales */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="/aviso-de-privacidad" className="hover:text-slate-300 transition-colors">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos-de-uso" className="hover:text-slate-300 transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>

      </div>

    </footer>
  );
}