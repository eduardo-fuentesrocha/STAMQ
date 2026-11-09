import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import LoginClient from './LoginClient';

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const numeroEmpleado = cookieStore.get('usuario_num')?.value;
  const rol = cookieStore.get('usuario_rol')?.value;

  const params = await searchParams;
  const callbackUrl = params.callbackUrl;

  // 🔑 Si el usuario ya inició sesión, evaluamos si venía por callbackUrl o por rol
  if (numeroEmpleado) {
    if (callbackUrl && callbackUrl.startsWith('/')) {
      redirect(callbackUrl);
    }
    if (rol === 'admin' || rol === 'ADMIN') {
      redirect('/admin');
    } else {
      redirect('/dashboard');
    }
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-sm font-semibold text-zinc-500">Cargando...</div>}>
      <LoginClient />
    </Suspense>
    
  );
}