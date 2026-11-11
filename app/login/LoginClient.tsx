'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Lock, Loader2, LogIn, Search, CheckCircle2, ShieldCheck, Mail, ArrowLeft, KeyRound } from 'lucide-react';
import { iniciarSesion, registrarUsuario, buscarEmpleadoParaRegistro, validarCorreoRecuperacion, actualizarPasswordAction } from '@/app/actions/auth';

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [isPending, startTransition] = useTransition();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const [pasoRegistro, setPasoRegistro] = useState<1 | 2>(1);
  const [pasoRecuperacion, setPasoRecuperacion] = useState<1 | 2>(1);
  
  const [numeroEmpleadoBusqueda, setNumeroEmpleadoBusqueda] = useState('');
  const [correoRecuperacion, setCorreoRecuperacion] = useState('');
  const [nombreEncontrado, setNombreEncontrado] = useState('');

  // 1. Buscar empleado para registro
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

  // 2. Validar correo para recuperación de contraseña (Paso 1 de recuperación)
  const handleValidarCorreoRecuperacion = () => {
    setError(null);
    if (!numeroEmpleadoBusqueda.trim() || !correoRecuperacion.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    startTransition(async () => {
      const res = await validarCorreoRecuperacion(numeroEmpleadoBusqueda, correoRecuperacion);
      if (res.success && res.nombreCompleto) {
        setNombreEncontrado(res.nombreCompleto);
        setPasoRecuperacion(2); // Pasamos al formulario de nueva contraseña
      } else {
        setError(res.error || 'Los datos no coinciden.');
      }
    });
  };

  // Submit General (Login, Registro o Cambio de Contraseña en Recuperación)
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
    } else if (isRecovering) {
      const newPassword = formData.get('newPassword') as string;
      const confirmNewPassword = formData.get('confirmNewPassword') as string;

      if (newPassword.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres.');
        return;
      }

      if (newPassword !== confirmNewPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }

      startTransition(async () => {
        const res = await actualizarPasswordAction(numeroEmpleadoBusqueda, newPassword);
        if (res.success) {
          setMensajeExito(res.message || '¡Contraseña restablecida con éxito!');
          setIsRecovering(false);
          setPasoRecuperacion(1);
          setNumeroEmpleadoBusqueda('');
          setCorreoRecuperacion('');
          setNombreEncontrado('');
          form.reset();
        } else {
          setError(res.error || 'Ocurrió un error al restablecer la contraseña.');
        }
      });
    } else {
      startTransition(async () => {
        if (callbackUrl) {
          formData.append('redirectTo', callbackUrl);
        }

        const res = await iniciarSesion(formData);
        
        if (res.success && res.usuario) {
          const destino = res.redirectTo || callbackUrl || ((res.usuario.rol === 'admin' || res.usuario.rol === 'ADMIN') ? '/admin' : '/dashboard');
          router.push(destino);
        } else {
          setError(res.error || 'Credenciales inválidas.');
        }
      });
    }
  };

  const cambiarModo = (modo: 'login' | 'registro' | 'recuperacion') => {
    setIsRegistering(modo === 'registro');
    setIsRecovering(modo === 'recuperacion');
    setPasoRegistro(1);
    setPasoRecuperacion(1);
    setError(null);
    setMensajeExito(null);
    setNumeroEmpleadoBusqueda('');
    setCorreoRecuperacion('');
    setNombreEncontrado('');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white text-zinc-800 flex flex-col justify-start items-center px-4 pt-8 sm:pt-12 pb-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#E07A2B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-4 bg-zinc-50/90 backdrop-blur-xl border border-zinc-200/80 p-6 sm:p-8 rounded-3xl shadow-xl shadow-zinc-200/50 relative z-10">
        
        {/* Encabezado dinámico */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-black text-zinc-900 tracking-tight">
            {isRegistering 
              ? 'Crear Cuenta' 
              : isRecovering 
                ? 'Recuperar Contraseña' 
                : 'Iniciar Sesión'}
          </h2>
          <p className="text-sm text-zinc-600 font-medium">
            {isRegistering 
              ? (pasoRegistro === 1 ? 'Paso 1: Consulta tu número de empleado' : 'Paso 2: Confirma tus datos y crea tu contraseña')
              : isRecovering
                ? (pasoRecuperacion === 1 ? 'Paso 1: Valida tu número de empleado y correo' : 'Paso 2: Crea tu nueva contraseña')
                : 'Ingresa tus credenciales para acceder al portal.'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold text-center animate-in fade-in">
            {error}
          </div>
        )}

        {mensajeExito && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold text-center animate-in fade-in">
            {mensajeExito}
          </div>
        )}

        {/* --- FLUJO DE REGISTRO PASO 1 --- */}
        {isRegistering && pasoRegistro === 1 && (
          <div className="space-y-3">
            <div className="space-y-1">
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] transition-colors shadow-sm"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleBuscarEmpleado}
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-sm font-bold transition-all shadow-md shadow-[#E07A2B]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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

        {/* --- FLUJO DE RECUPERACIÓN PASO 1 --- */}
        {isRecovering && pasoRecuperacion === 1 && (
          <div className="space-y-3">
            <div className="space-y-1">
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] transition-colors shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700">Correo electrónico asignado por el Municipio</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={correoRecuperacion}
                  onChange={(e) => setCorreoRecuperacion(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] transition-colors shadow-sm"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleValidarCorreoRecuperacion}
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-sm font-bold transition-all shadow-md shadow-[#E07A2B]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Validando identidad...</span>
                </>
              ) : (
                <>
                  <KeyRound className="h-4 w-4" />
                  <span>Verificar Credenciales</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* --- FORMULARIO DE ACCIÓN (Registro Paso 2, Recuperación Paso 2, o Login) --- */}
        {((isRegistering && pasoRegistro === 2) || (isRecovering && pasoRecuperacion === 2) || (!isRegistering && !isRecovering)) && (
          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* Tarjeta de empleado verificado */}
            {((isRegistering && pasoRegistro === 2) || (isRecovering && pasoRecuperacion === 2)) && (
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-[#E07A2B]/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#E07A2B] uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Identidad Verificada
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (isRegistering) setPasoRegistro(1);
                      if (isRecovering) setPasoRecuperacion(1);
                    }}
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

            {/* Input de número de empleado solo visible en Login */}
            {!isRegistering && !isRecovering && (
              <div className="space-y-1">
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] transition-colors shadow-sm"
                  />
                </div>
              </div>
            )}

            {/* Campo de Contraseña / Nueva Contraseña */}
            <div className="space-y-1">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-zinc-700">
                  {isRegistering ? 'Crea tu Contraseña' : isRecovering ? 'Nueva Contraseña' : 'Contraseña'}
                </label>
                {(isRegistering || isRecovering) && (
                  <span className="text-[11px] text-zinc-500 font-medium leading-tight mt-0.5">
                    Mínimo 8 caracteres.
                  </span>
                )}
              </div>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  name={isRecovering ? 'newPassword' : 'password'}
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* Campo de Confirmación de Contraseña */}
            {(isRegistering || isRecovering) && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700">
                  {isRecovering ? 'Confirma tu Nueva Contraseña' : 'Confirma tu Contraseña'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type="password"
                    name={isRecovering ? 'confirmNewPassword' : 'confirmPassword'}
                    required
                    minLength={8}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#E07A2B] focus:ring-1 focus:ring-[#E07A2B] transition-colors shadow-sm"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-1 py-3 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white text-sm font-bold transition-all shadow-md shadow-[#E07A2B]/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-[0.99]"
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
              ) : isRecovering ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Actualizar Contraseña</span>
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

        {/* --- ENLACES DE NAVEGACIÓN INFERIORES --- */}
        <div className="space-y-2 pt-2 border-t border-zinc-200 text-center">
          {/* Enlace de Olvidé mi contraseña (visible solo en modo login) */}
          {!isRegistering && !isRecovering && (
            <div>
              <button
                type="button"
                onClick={() => cambiarModo('recuperacion')}
                className="text-xs text-[#E07A2B] hover:underline font-semibold cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {/* Enlace para volver al login si está en registro o recuperación */}
          {(isRecovering) && (
            <div>
              <button
                type="button"
                onClick={() => cambiarModo('login')}
                className="text-xs text-zinc-500 hover:text-zinc-800 font-semibold flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Volver a Iniciar Sesión</span>
              </button>
            </div>
          )}

          {/* Enlace principal de alternar entre login y registro */}
          {!isRecovering && (
            <div>
              <button
                type="button"
                onClick={() => cambiarModo(isRegistering ? 'login' : 'registro')}
                className="text-xs sm:text-sm text-zinc-600 hover:text-[#E07A2B] transition-colors font-semibold cursor-pointer"
              >
                {isRegistering 
                  ? 'Si ya tienes cuenta inicia sesión aquí' 
                  : 'Si no estás registrado haz clic aquí'}
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}