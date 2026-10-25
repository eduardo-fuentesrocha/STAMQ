import { Shield, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A1F3F] text-white border-t border-[#2A9EDA]/30">
      <div className="w-full px-6 sm:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Columna 1: Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2A9EDA]/20 text-[#2A9EDA] border border-[#2A9EDA]/30">
                <Shield className="h-5 w-5 text-[#2A9EDA]" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">STSMQ</span>
            </div>
            <p className="text-xs text-blue-100/80 leading-relaxed">
              Defendiendo los derechos laborales, la justicia y las prestaciones de nuestra base trabajadora.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Enlaces Institucionales</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#inicio" className="text-blue-100/80 hover:text-[#2A9EDA] transition-colors">Inicio</Link></li>
              <li><Link href="#prestaciones" className="text-blue-100/80 hover:text-[#2A9EDA] transition-colors">Prestaciones y Tabulador</Link></li>
              <li><Link href="/convenio-stsmq-2017.pdf" target="_blank" className="text-blue-100/80 hover:text-[#2A9EDA] transition-colors">Convenio Colectivo PDF</Link></li>
              <li><Link href="#noticias" className="text-blue-100/80 hover:text-[#2A9EDA] transition-colors">Comunicados Oficiales</Link></li>
            </ul>
          </div>

          {/* Columna 3: Ubicación y Contacto */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Oficinas y Contacto</h4>
            <div className="space-y-2 text-xs text-blue-100/80">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#2A9EDA] shrink-0 mt-0.5" />
                <span>Independencia 210, La Santa Cruz, Santiago de Querétaro, Qro.</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#2A9EDA] shrink-0" />
                <span>Atención Ciudadana: (442) 213-7119</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#2A9EDA] shrink-0" />
                <span>contacto@stsmq.org.mx</span>
              </p>
            </div>
          </div>

          {/* Columna 4: Sitios de Interés */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Sitios de Interés</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://municipiodequeretaro.gob.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-100/80 hover:text-[#2A9EDA] transition-colors"
                >
                  Municipio de Querétaro <ExternalLink className="h-3 w-3 text-[#2A9EDA]" />
                </a>
              </li>
              <li>
                <a
                  href="https://sindicatos.gob.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-100/80 hover:text-[#2A9EDA] transition-colors"
                >
                  Tribunal de Conciliación <ExternalLink className="h-3 w-3 text-[#2A9EDA]" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright y avisos */}
        <div className="pt-8 border-t border-white/10 text-center text-xs text-blue-200/70 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Sindicato de Trabajadores al Servicio del Municipio de Querétaro (STSMQ). Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#2A9EDA] transition-colors">Aviso de Privacidad</Link>
            <Link href="#" className="hover:text-[#2A9EDA] transition-colors">Términos de Uso</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}