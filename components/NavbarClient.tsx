'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LogIn, LogOut, User, FileText, CreditCard, Users, Gift, Search } from 'lucide-react';
import { cerrarSesion } from '@/app/actions/auth';

interface NavItem {
  name: string;
  href: string;
}

interface NavbarClientProps {
  usuarioNum?: string;
  navItems: NavItem[];
}

const iconMap: Record<string, any> = {
  'Trámites en línea': FileText,
  'Credencial Digital': CreditCard,
  'Comité Ejecutivo': Users,
  'Beneficios Exclusivos': Gift,
};

export default function NavbarClient({ usuarioNum, navItems }: NavbarClientProps) {
  const pathname = usePathname();
  const esHome = pathname === '/';

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleCerrarSesion = () => {
    startTransition(async () => {
      await cerrarSesion();
      router.push('/');
      router.refresh();
    });
  };

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!busqueda.trim()) return;
    
    router.push(`/beneficios?q=${encodeURIComponent(busqueda)}`);
    setBusqueda('');
  };

  return (
    <header 
      className={`z-50 transition-colors duration-300 w-full ${
        esHome 
          ? 'absolute top-0 left-0 bg-transparent text-white' 
          : 'sticky top-0 bg-white/95 backdrop-blur-md text-zinc-900 border-b border-zinc-200/80 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* =================================================== */}
        {/* PRIMER RENGLÓN: Logotipo, Texto Institucional y Sesión */}
        {/* =================================================== */}
        <div className={`flex items-center justify-between gap-2 py-2.5 sm:py-3 ${esHome ? '' : 'border-b border-zinc-100'}`}>
          
          {/* Logotipo e Identidad Institucional */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-4 group cursor-pointer min-w-0 flex-1">
            <div className="relative h-12 w-12 sm:h-20 sm:w-20 lg:h-24 lg:w-24 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/STSMQ Original.svg"
                alt="Logotipo Oficial STSMQ"
                fill
                className="object-contain drop-shadow-md"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span 
                style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 600 }}
                className="text-[11px] sm:text-base md:text-lg lg:text-2xl tracking-normal text-[#E07A2B] uppercase leading-tight drop-shadow-sm block whitespace-normal break-words"
              >
                SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO
              </span>
            </div>
          </Link>

          {/* Acciones de Escritorio (Buscador y Sesión) */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            
            {/* 🔍 Buscador en Escritorio */}
            <form onSubmit={handleBuscar} className="relative flex items-center">
              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className={`text-base sm:text-xs px-3.5 py-2 pl-9 rounded-xl outline-none transition-all w-48 xl:w-60 border ${
                  esHome 
                    ? 'bg-black/40 text-white placeholder-zinc-400 border-white/20 focus:border-[#E07A2B] backdrop-blur-sm' 
                    : 'bg-zinc-100 text-zinc-800 placeholder-zinc-500 border-zinc-200 focus:border-[#E07A2B] focus:bg-white'
                }`}
              />
              <Search className={`absolute left-3 h-4 w-4 ${esHome ? 'text-zinc-400' : 'text-zinc-500'}`} />
            </form>

            {/* Botón de Sesión */}
            {usuarioNum ? (
              <div className="flex items-center gap-2.5">
                <span className={`text-xs font-bold flex items-center gap-1.5 px-3.5 py-2 rounded-xl backdrop-blur-sm ${
                  esHome ? 'bg-black/40 text-white border border-white/20' : 'bg-zinc-100 text-zinc-700'
                }`}>
                  <User className="h-3.5 w-3.5 text-[#E07A2B]" />
                  {usuarioNum}
                </span>

                {/* Botón Cerrar Sesión Destacado */}
                <button
                  onClick={handleCerrarSesion}
                  disabled={isPending}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50 ${
                    esHome 
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/30' 
                      : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95"
              >
                <LogIn className="h-4 w-4" />
                <span>Iniciar sesión</span>
              </Link>
            )}
          </div>

          {/* Botón Menú Hamburguesa (Móvil) */}
          <div className="flex lg:hidden shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                esHome ? 'bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* =================================================== */}
        {/* SEGUNDO RENGLÓN: Opciones de Navegación (Escritorio) */}
        {/* =================================================== */}
        {!esHome && (
          <nav className="hidden lg:flex items-center justify-center gap-2 py-1.5 border-t border-zinc-100">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-zinc-600 hover:text-[#E07A2B] hover:bg-orange-50/80"
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        )}

      </div>

      {/* Menú Desplegable y Buscador Móvil */}
      {isOpen && (
        <div className={`absolute top-full left-0 w-full px-4 pt-4 pb-6 space-y-3 lg:hidden shadow-2xl animate-in slide-in-from-top duration-200 z-50 ${
          esHome ? 'bg-zinc-950/95 backdrop-blur-md text-white border-t border-white/10' : 'bg-white text-zinc-900 border-b border-zinc-200'
        }`}>
          
          <form onSubmit={handleBuscar} className="relative flex items-center">
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className={`text-base px-4 py-2.5 pl-10 rounded-xl outline-none w-full border ${
                esHome 
                  ? 'bg-black/50 text-white placeholder-zinc-400 border-white/20 focus:border-[#E07A2B]' 
                  : 'bg-zinc-100 text-zinc-800 placeholder-zinc-500 border-zinc-200 focus:border-[#E07A2B]'
              }`}
            />
            <Search className={`absolute left-3.5 h-4 w-4 ${esHome ? 'text-zinc-400' : 'text-zinc-500'}`} />
          </form>

          {navItems.map((item) => {
            const Icon = iconMap[item.name] || FileText;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  esHome ? 'hover:bg-white/10 text-zinc-200' : 'text-zinc-700 hover:text-[#E07A2B] hover:bg-orange-50/60'
                }`}
              >
                <div className={`p-2 rounded-lg ${esHome ? 'bg-white/10 text-[#E07A2B]' : 'bg-orange-100/60 text-[#E07A2B]'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-zinc-200/50">
            {usuarioNum ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleCerrarSesion();
                }}
                disabled={isPending}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar sesión ({usuarioNum})</span>
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-sm font-bold transition-all shadow-md shadow-[#E07A2B]/20"
              >
                <LogIn className="h-4 w-4" />
                <span>Iniciar sesión</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}