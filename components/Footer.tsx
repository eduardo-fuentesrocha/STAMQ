import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 text-white border-t-2 border-[#E07A2B]">
      
      {/* Contenedor principal del Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-start">
          
          {/* Columna 1: Identidad Institucional y Lema */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 flex items-center justify-center">
                <Image
                  src="/STSMQ Original.svg"
                  alt="Logotipo STSMQ"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 700 }}
                className="text-[10px] md:text-[12.5px] uppercase tracking-tight text-[#E07A2B] leading-tight block drop-shadow-xs"
              >
                SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO
              </span>
            </div>

            {/* Lema Institucional */}
            <p className="text-xs font-semibold text-zinc-400 pl-1 border-l-2 border-[#E07A2B]/60">
              "Por la Unificación del Trabajador".
            </p>
          </div>

          {/* Columna 2: Oficinas y Horarios */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#E07A2B]">
              Oficinas
            </h3>
            <ul className="space-y-3 text-xs text-zinc-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#E07A2B] shrink-0 mt-0.5" />
                <span>Calle Independencia No. 210, Colonia Centro, Querétaro, Qro.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-[#E07A2B] shrink-0" />
                <span>Lunes a Viernes: 8:00 hrs - 16:00 hrs</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto Directo */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#E07A2B]">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li>
                <a 
                  href="tel:4422137119" 
                  className="flex items-center gap-3 hover:text-[#E07A2B] transition-colors group text-xs"
                >
                  <div className="p-1.5 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <span>(442) 213 7119</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:sindicato.trabajadores.muniqro@gmail.com" 
                  className="flex items-center gap-3 hover:text-[#E07A2B] transition-colors group text-xs"
                >
                  <div className="p-1.5 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <span className="truncate">sindicato.trabajadores.muniqro@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra inferior de derechos y avisos legales */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-zinc-500 font-medium text-center sm:text-left">
            © 2026 STSMQ. Todos los derechos reservados. <span className="hidden md:inline text-zinc-600"></span>
          </p>
          <div className="flex items-center gap-6 text-zinc-500">
            <Link href="/aviso-de-privacidad" className="hover:text-zinc-300 transition-colors">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos-de-uso" className="hover:text-zinc-300 transition-colors">
              Términos y Condiciones
            </Link>
          </div>
        </div>

      </div>

    </footer>
  );
}