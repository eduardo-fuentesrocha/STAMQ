import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/DashboardClient'

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const numeroEmpleado = cookieStore.get('usuario_num')?.value;

  if (!numeroEmpleado) {
    // Redirigir a login si no hay sesión
    redirect('/login'); 
  }

  // 1. Buscar al usuario y sus familiares relacionados (incluyendo email y campos de credencial)
  const usuarioRaw = await prisma.usuario.findUnique({
    where: { numeroEmpleado },
    include: {
      familiares: true,
    },
  });

  // Sanitizar el objeto usuario para asegurar compatibilidad estricta de tipos (evitando nulls)
  const usuario = usuarioRaw ? {
    ...usuarioRaw,
    email: usuarioRaw.email ?? '',
    puesto: usuarioRaw.puesto ?? '',
    departamento: usuarioRaw.departamento ?? '',
    fechaIngreso: usuarioRaw.fechaIngreso ?? '',
    curp: usuarioRaw.curp ?? '',
    nss: usuarioRaw.nss ?? '',
    tipoSangre: usuarioRaw.tipoSangre ?? '',
    contactoEmergenciaNombre: usuarioRaw.contactoEmergenciaNombre ?? '',
    contactoEmergenciaTelefono: usuarioRaw.contactoEmergenciaTelefono ?? '',
    vigencia: usuarioRaw.vigencia ?? '',
  } : {
    nombreCompleto: 'Usuario',
    numeroEmpleado: '',
    email: '',
    puesto: '',
    departamento: '',
    fechaIngreso: '',
    curp: '',
    nss: '',
    tipoSangre: '',
    contactoEmergenciaNombre: '',
    contactoEmergenciaTelefono: '',
    vigencia: '',
    rol: 'agremiado',
    password: '',
    createdAt: new Date(),
    id: '',
    familiares: [],
  };

  // 2. Buscar las solicitudes de becas de este empleado
  const solicitudesBecasRaw = await prisma.solicitudBeca.findMany({
    where: { numeroEmpleado },
    orderBy: { createdAt: 'desc' },
  });

  // 3. Buscar las solicitudes de nacimiento de este empleado
  const solicitudesNacimientoRaw = await prisma.solicitudNacimiento.findMany({
    where: { numeroEmpleado },
    orderBy: { createdAt: 'desc' },
  });

  // 4. Buscar las solicitudes de matrimonio de este empleado
  const solicitudesMatrimonioRaw = await prisma.solicitudMatrimonio.findMany({
    where: { numeroEmpleado },
    orderBy: { createdAt: 'desc' },
  });

  // 🔑 5. Buscar las solicitudes de útiles escolares de este empleado
  const solicitudesUtilesRaw = await prisma.solicitudUtiles.findMany({
    where: { numeroEmpleado },
    orderBy: { createdAt: 'desc' },
  });

  // 🧱 6. Buscar las solicitudes de materiales de este empleado
  const solicitudesMaterialesRaw = await prisma.solicitudMaterial.findMany({
    where: { numeroEmpleado },
    orderBy: { createdAt: 'desc' },
  });

  // Formatear la estructura que espera BecasTab
  const initialBecas = solicitudesBecasRaw.map((item) => ({
    id: item.id,
    folio: `BEC-2026-${item.id.slice(0, 4).toUpperCase()}`,
    hijo: item.nombreHijo,
    nivel: item.nivelEducativo,
    estatus: item.estatus || 'En Revisión',
    fecha: item.createdAt.toISOString().split('T')[0],
  }));

  const initialNacimientos = solicitudesNacimientoRaw.map((item) => ({
    id: item.id,
    folio: `NAC-2026-${item.id.slice(0, 4).toUpperCase()}`,
    nombreHijo: item.nombreHijo,
    estatus: item.estatus || 'En Revisión',
    fecha: item.createdAt.toISOString().split('T')[0],
  }));

  const initialMatrimonios = solicitudesMatrimonioRaw.map((item) => ({
    id: item.id,
    folio: `MATR-2026-${item.id.slice(0, 4).toUpperCase()}`,
    nombreConyuge: item.nombreConyuge,
    tipoUnion: item.tipoUnion,
    estatus: item.estatus || 'En Revisión',
    fecha: item.createdAt.toISOString().split('T')[0],
  }));

  const initialUtiles = solicitudesUtilesRaw.map((item) => ({
    id: item.id,
    folio: `UTIL-2026-${item.id.slice(0, 4).toUpperCase()}`,
    hijo: item.nombreHijo,
    nivel: item.nivelEducativo,
    estatus: item.estatus || 'En Revisión',
    fecha: item.createdAt.toISOString().split('T')[0],
  }));

  // 🧱 Formatear la estructura que espera MaterialesTab
  const initialMateriales = solicitudesMaterialesRaw.map((item) => ({
    id: item.id,
    folio: `MAT-2026-${item.id.slice(0, 4).toUpperCase()}`,
    domicilio: item.domicilioInmueble,
    cantidadTepetate: item.cantidadTepetate,
    cantidadArena: item.cantidadArena,
    cantidadGrava: item.cantidadGrava,
    cantidadPiedraNegra: item.cantidadPiedraNegra,
    cantidadCantera: item.cantidadCantera,
    estatus: item.estatus || 'En Revisión',
    fecha: item.createdAt.toISOString().split('T')[0],
  }));

  return (
    <DashboardClient 
      initialSolicitudes={initialBecas}
      initialMateriales={initialMateriales}  
      initialNacimientos={initialNacimientos}
      initialMatrimonios={initialMatrimonios}
      initialUtiles={initialUtiles} 
      usuario={usuario}
    />
  );
}