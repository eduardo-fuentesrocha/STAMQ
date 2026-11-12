import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import NavbarClient from './NavbarClient'; // Componente cliente que manejará la ruta y el menú móvil

export default async function Navbar() {
  const cookieStore = await cookies();
  const usuarioNum = cookieStore.get('usuario_num')?.value;

  const navItems = [
    { name: 'Credencial Digital', href: '/credencial' },
    { name: 'Trámites en Línea', href: '/dashboard' },
    { name: 'Comité Ejecutivo', href: '/comite' },
    { name: 'Beneficios Exclusivos', href: '/beneficios' },
  ];

  return <NavbarClient usuarioNum={usuarioNum} navItems={navItems} />;
}