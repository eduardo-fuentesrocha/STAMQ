import Link from 'next/link';
import { MapPin, Phone, Mail, FileText, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contacto" className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-800 text-white font-black text-lg">
                ST
              </div>
              <span className="font-bold text-white text-lg">STAMQ</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sindicato de Trabajadores al Servicio del Municipio de Querétaro. Organización gremial comprometida con la dignidad laboral y la justicia social.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Secciones</h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="#inicio" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="#prestaciones" className="hover:text-white transition-colors">Prestaciones Colectivas</Link></li>
              <li><Link href="#noticias" className="hover:text-white transition-colors">Boletines Oficiales</Link></li>
              <li><Link href="#transparencia" className="hover:text-white transition-colors">Convenio Colectivo PDF</Link></li>
              <li><Link href="#portal" className="hover:text-white transition-colors">Acceso a Agremiados</Link></li>
            </ul>
          </div>

          <div id="transparencia">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Transparencia</h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-500" />
                <a href="#" className="hover:text-white transition-colors">Estatutos Sindicales</a>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-500" />
                <a href="#" className="hover:text-white transition-colors">Convenio de Trabajo 2026</a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-slate-500" />
                <a href="#" className="hover:text-white transition-colors">Tribunal de Conciliación Qro.</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Sede Sindical</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <span>Querétaro, Qro., México.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-red-500 shrink-0" />
                <span>(442) 000-0000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-red-500 shrink-0" />
                <span>contacto@stamq.org.mx</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} STAMQ - Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-400">Aviso de Privacidad</Link>
            <span>•</span>
            <Link href="#" className="hover:text-slate-400">Términos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
