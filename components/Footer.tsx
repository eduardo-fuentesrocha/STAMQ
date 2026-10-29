import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 text-white border-t-2 border-[#E07A2B]">
      
      {/* Contenedor principal del Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-start">
          
          {/* Columna 1: Imagen Oficial Institucional (Credencial / Identidad STSMQ) */}
          <div className="space-y-4">
            <div className="relative w-full aspect-[16/9] max-w-sm rounded-xl overflow-hidden border border-zinc-800 shadow-xl">
              <Image
                src="/Credencial.jpeg"
                alt="Credencial e Identidad Oficial STSMQ"
                fill
                className="object-cover"
                quality={90}
              />
            </div>
          </div>

          {/* Columna 2: Enlaces Institucionales */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#E07A2B]">
              Enlaces al Portal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#prestaciones" className="text-zinc-300 hover:text-[#E07A2B] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#E07A2B]" />
                  <span>Prestaciones</span>
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-zinc-300 hover:text-[#E07A2B] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#E07A2B]" />
                  <span>Trámites y Servicios</span>
                </Link>
              </li>
              <li>
                <Link href="#eventos" className="text-zinc-300 hover:text-[#E07A2B] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#E07A2B]" />
                  <span>Eventos</span>
                </Link>
              </li>
              <li>
                <Link href="#circulares" className="text-zinc-300 hover:text-[#E07A2B] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#E07A2B]" />
                  <span>Circulares, Boletines y Convocatorias</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Oficinas y Contacto */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#E07A2B]">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li>
                <a 
                  href="tel:4422137119" 
                  className="flex items-center gap-3 hover:text-[#E07A2B] transition-colors group"
                >
                  <div className="p-1.5 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>Teléfono: (442) 213 7119</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:sindicato.municipio.qro@gmail.com" 
                  className="flex items-center gap-3 hover:text-[#E07A2B] transition-colors group"
                >
                  <div className="p-1.5 rounded-lg bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>sindicato.municipio.qro@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra inferior de derechos y avisos legales */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#E07A2B] font-medium">
            © 2026 SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-zinc-500">
            <Link href="/aviso-de-privacidad" className="hover:text-zinc-300 transition-colors">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos-de-uso" className="hover:text-zinc-300 transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>

      </div>

    </footer>
  );
}