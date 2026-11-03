import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginClient from './LoginClient';

export default async function LoginPage() {
  const cookieStore = await cookies();
  const numeroEmpleado = cookieStore.get('usuario_num')?.value;
  const rol = cookieStore.get('usuario_rol')?.value;

  // 🔑 Si el usuario ya inició sesión, redirigir automáticamente sin mostrar la pantalla de login
  if (numeroEmpleado) {
    if (rol === 'admin' || rol === 'ADMIN') {
      redirect('/admin');
    } else {
      redirect('/dashboard');
    }
  }

  return <LoginClient />;
}