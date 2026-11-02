'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Loader2, UserPlus, LogIn } from 'lucide-react';
import { iniciarSesion, registrarUsuario } from '@/app/actions/auth';

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMensajeExito(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const password = formData.get('password') as string;

    // Validación de seguridad para el registro (mínimo 8 caracteres)
    if (isRegistering && password && password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    startTransition(async () => {
      if (isRegistering) {
        const res = await registrarUsuario(formData);
        if (res.success) {
          setMensajeExito(res.message || '¡Registro exitoso! Ya puedes iniciar sesión.');
          setIsRegistering(false);
          form.reset();
        } else {
          setError(res.error || 'Ocurrió un error al registrarse.');
        }
      } else {
        const res = await iniciarSesion(formData);
        if (res.success && res.usuario) {
          if (res.usuario.rol === 'admin') {
            router.push('/admin');
          } else {
            router.push('/dashboard');
          }
        } else {
          setError(res.error || 'Credenciales inválidas.');
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-800 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Fondo decorativo tenue en tonos zinc y naranja marca */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E07A2B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 bg-zinc-50/90 backdrop-blur-xl border border-zinc-200/80 p-8 rounded-3xl shadow-xl shadow-zinc-200/50 relative z-10">
        
        {/* Cabecera del Formulario con Logotipo y Nombre Horizontal */}
        <div className="space-y-4">
          <div className="flex items-center gap-3.5 border-b border-zinc-200/80 pb-4">
            <img 
              src="/STSMQ2.svg" 
              alt="Logo STSMQ" 
              className="h-14 w-auto object-contain shrink-0"
            />
            <div className="text-left leading-tight">
              <h1 className="text-xs font-black text-[#E07A2B] tracking-tight uppercase">
                SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO
              </h1>
            </div>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-lg font-black text-zinc-900 tracking-tight">
              {isRegistering ? 'Registro de Cuenta' : 'Trámites en Línea'}
            </h2>
            <p className="text-sm text-black font-medium">
              {isRegistering 
                ? 'Ingresa tus datos para darte de alta' 
                : 'Ingresa tu número de empleado y contraseña'}
            </p>
          </div>
        </div>

        {/* Alertas de Error o Éxito */}
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

        {/* Formulario Principal */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isRegistering && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700">Nombre Completo</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  name="nombreCompleto"
                  required
                  placeholder="Ej. Juan Pérez González"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] transition-colors shadow-sm"
                />
              </div>
            </div>
          )}

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

          <div className="space-y-1.5">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-zinc-700">Contraseña</label>
              {isRegistering && (
                <span className="text-[11px] text-zinc-500 font-medium leading-tight mt-0.5">
                  Define 8 caracteres, cualquier letra o número, se aceptan mayúsculas y minúsculas.
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                placeholder={isRegistering ? 'Crea una contraseña segura' : '••••••••'}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] transition-colors shadow-sm"
              />
            </div>
          </div>

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
                <UserPlus className="h-4 w-4" />
                <span>Registrarse</span>
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span>Iniciar Sesión</span>
              </>
            )}
          </button>
        </form>

        {/* Botón para alternar entre Login y Registro */}
        <div className="text-center pt-2 border-t border-zinc-200">
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError(null);
              setMensajeExito(null);
            }}
            className="text-sm text-black hover:text-[#E07A2B] transition-colors font-semibold cursor-pointer"
          >
            {isRegistering 
              ? '¿Ya tienes cuenta? Inicia sesión aquí' 
              : '¿Aún no estás registrado? Regístrate aquí'}
          </button>
        </div>

      </div>

      <footer className="mt-8 text-center text-xs text-zinc-400 font-medium">
        SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO © 2026
      </footer>
    </div>
  );
}