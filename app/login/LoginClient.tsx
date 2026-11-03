'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Loader2, LogIn, Search, CheckCircle2, ShieldCheck } from 'lucide-react';
import { iniciarSesion, registrarUsuario, buscarEmpleadoParaRegistro } from '@/app/actions/auth';

export default function LoginClient() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  // Estados del flujo de registro en 2 pasos
  const [pasoRegistro, setPasoRegistro] = useState<1 | 2>(1);
  const [numeroEmpleadoBusqueda, setNumeroEmpleadoBusqueda] = useState('');
  const [nombreEncontrado, setNombreEncontrado] = useState('');

  // Paso 1: Buscar el número de empleado en la base de datos
  const handleBuscarEmpleado = () => {
    setError(null);
    if (!numeroEmpleadoBusqueda.trim()) {
      setError('Por favor ingresa tu número de empleado.');
      return;
    }

    startTransition(async () => {
      const res = await buscarEmpleadoParaRegistro(numeroEmpleadoBusqueda);
      if (res.success && res.nombreCompleto) {
        setNombreEncontrado(res.nombreCompleto);
        setPasoRegistro(2);
      } else {
        setError(res.error || 'No se encontró el empleado.');
      }
    });
  };

  // Submit General (Login o Finalizar Registro)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMensajeExito(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (isRegistering) {
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }

      startTransition(async () => {
        formData.append('numeroEmpleado', numeroEmpleadoBusqueda);
        const res = await registrarUsuario(formData);
        if (res.success) {
          setMensajeExito(res.message || '¡Cuenta activada con éxito! Ya puedes iniciar sesión.');
          setIsRegistering(false);
          setPasoRegistro(1);
          setNumeroEmpleadoBusqueda('');
          setNombreEncontrado('');
          form.reset();
        } else {
          setError(res.error || 'Ocurrió un error al crear la contraseña.');
        }
      });
    } else {
      startTransition(async () => {
        const res = await iniciarSesion(formData);
        if (res.success && res.usuario) {
          const rol = res.usuario.rol;
          if (rol === 'admin' || rol === 'ADMIN') {
            router.push('/admin');
          } else {
            router.push('/dashboard');
          }
        } else {
          setError(res.error || 'Credenciales inválidas.');
        }
      });
    }
  };

  const resetModo = (modoRegistro: boolean) => {
    setIsRegistering(modoRegistro);
    setPasoRegistro(1);
    setError(null);
    setMensajeExito(null);
    setNumeroEmpleadoBusqueda('');
    setNombreEncontrado('');
  };

  return (
    <div className="min-h-screen bg-white text-zinc-800 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E07A2B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 bg-zinc-50/90 backdrop-blur-xl border border-zinc-200/80 p-8 rounded-3xl shadow-xl shadow-zinc-200/50 relative z-10">
        
        {/* Encabezado con Tipografía Idéntica a Hero */}
        <div className="space-y-4">
          <div className="flex items-center gap-3.5 border-b border-zinc-200/80 pb-4">
            <img 
              src="/STSMQ2.svg" 
              alt="Logo STSMQ" 
              className="h-14 w-auto object-contain shrink-0"
            />
            <div className="text-left leading-tight">
              <span 
                style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 500 }}
                className="text-xs uppercase tracking-normal text-[#E07A2B] leading-tight block"
              >
                SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO
              </span>
            </div>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-lg font-black text-zinc-900 tracking-tight">
              {isRegistering ? 'Activación de Cuenta' : 'Trámites en Línea'}
            </h2>
            <p className="text-xs text-zinc-600 font-medium">
              {isRegistering 
                ? (pasoRegistro === 1 ? 'Paso 1: Consulta tu número de empleado' : 'Paso 2: Confirma tus datos y crea tu contraseña')
                : 'Ingresa tu número de empleado y contraseña'}
            </p>
          </div>
        </div>

        {/* Notificaciones */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold text-center animate-in fade-in">
            {error}
          </div>
        )}

        {mensajeExito && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold text-center animate-in fade-in">
            {mensajeExito}
          </div>
        )}

        {/* ---------------- REGISTRO PASO 1: BÚSQUEDA ---------------- */}
        {isRegistering && pasoRegistro === 1 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700">Número de Empleado</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={numeroEmpleadoBusqueda}
                  onChange={(e) => setNumeroEmpleadoBusqueda(e.target.value)}
                  placeholder="Ej. 10482"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] transition-colors shadow-sm"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleBuscarEmpleado}
              disabled={isPending}
              className="w-full py-3.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-sm font-bold transition-all shadow-md shadow-[#E07A2B]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Consultando Padrón...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Verificar Empleado</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* ---------------- REGISTRO PASO 2 O INICIO DE SESIÓN ---------------- */}
        {(!isRegistering || pasoRegistro === 2) && (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Si está en el Paso 2 de Registro: Muestra la Ficha Confirmada del Empleado */}
            {isRegistering && pasoRegistro === 2 && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-[#E07A2B]/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#E07A2B] uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Empleado Verificado
                  </span>
                  <button
                    type="button"
                    onClick={() => setPasoRegistro(1)}
                    className="text-[11px] text-zinc-500 hover:text-zinc-800 underline font-semibold cursor-pointer"
                  >
                    Cambiar
                  </button>
                </div>
                <p className="text-sm font-black text-zinc-900 leading-tight">
                  {nombreEncontrado}
                </p>
                <p className="text-xs font-semibold text-zinc-500">
                  No. Empleado: {numeroEmpleadoBusqueda}
                </p>
              </div>
            )}

            {/* Campo Número de Empleado (Solo visible en Login) */}
            {!isRegistering && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Número de Empleado</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    name="numeroEmpleado"
                    required
                    placeholder="Ej. 10482"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] transition-colors shadow-sm"
                  />
                </div>
              </div>
            )}

            {/* Campos de Contraseña */}
            <div className="space-y-1.5">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-zinc-700">
                  {isRegistering ? 'Crea tu Contraseña' : 'Contraseña'}
                </label>
                {isRegistering && (
                  <span className="text-[11px] text-zinc-500 font-medium leading-tight mt-0.5">
                    Mínimo 8 caracteres (se aceptan números y letras, mayúsculas y minúsculas).
                  </span>
                )}
              </div>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] transition-colors shadow-sm"
                />
              </div>
            </div>

            {isRegistering && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Confirma tu Contraseña</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    minLength={8}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] transition-colors shadow-sm"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 py-3.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-sm font-bold transition-all shadow-md shadow-[#E07A2B]/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-[0.99]"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Procesando...</span>
                </>
              ) : isRegistering ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Confirmar y Crear Cuenta</span>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Iniciar Sesión</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Alternar entre Login y Registro */}
        <div className="text-center pt-2 border-t border-zinc-200">
          <button
            type="button"
            onClick={() => resetModo(!isRegistering)}
            className="text-sm text-black hover:text-[#E07A2B] transition-colors font-semibold cursor-pointer"
          >
            {isRegistering 
              ? '¿Ya tienes cuenta? Inicia sesión aquí' 
              : '¿Aún no estás registrado? Activa tu cuenta aquí'}
          </button>
        </div>

      </div>

      <footer className="mt-8 text-center text-xs text-zinc-400 font-medium">
        SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO © 2026
      </footer>
    </div>
  );
}