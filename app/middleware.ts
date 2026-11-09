import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const usuarioNum = request.cookies.get('usuario_num')?.value;
  const usuarioRol = request.cookies.get('usuario_rol')?.value;

  const esRutaProtegida = 
    path.startsWith('/dashboard') || 
    path.startsWith('/credencial') || 
    path.startsWith('/admin');
    
  const esRutaAdmin = path.startsWith('/admin');

  // 🔑 Forzamos la URL incluyendo el parámetro directamente en el string
  if (esRutaProtegida && !usuarioNum) {
    const urlLogin = new URL(`/login?callbackUrl=${encodeURIComponent(path)}`, request.url);
    return NextResponse.redirect(urlLogin);
  }

  // Protección por rol para /admin
  if (esRutaAdmin && usuarioRol !== 'admin' && usuarioRol !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/credencial',
    '/credencial/:path*',
    '/admin/:path*'
  ],
};