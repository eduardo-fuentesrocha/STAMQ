import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminDashboardClient from '@/components/AdminDashboardClient'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default async function AdminPage() {
  const cookieStore = await cookies()
  const numEmpleado = cookieStore.get('usuario_num')?.value

  if (!numEmpleado) {
    redirect('/login')
  }

  // Verificar usuario y rol directamente desde la base de datos
  const usuario = await prisma.usuario.findUnique({
    where: { numeroEmpleado: numEmpleado },
  })

  if (!usuario || usuario.rol !== 'admin') {
    redirect('/dashboard')
  }

  // 1. Obtener solicitudes de Becas
  let becas: any[] = []
  try {
    becas = await prisma.solicitudBeca.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error al cargar becas admin:', error)
  }

  // 2. Obtener solicitudes de Materiales
  let materiales: any[] = []
  try {
    materiales = await (prisma as any).solicitudMateriales?.findMany({
      orderBy: { createdAt: 'desc' },
    }) ?? await prisma.solicitudMaterial.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error al cargar materiales admin:', error)
  }

  // 3. Obtener solicitudes de Nacimiento
  let nacimientos: any[] = []
  try {
    nacimientos = await prisma.solicitudNacimiento.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error al cargar nacimientos admin:', error)
  }

  // 4. Obtener solicitudes de Matrimonio
  let matrimonios: any[] = []
  try {
    matrimonios = await prisma.solicitudMatrimonio.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error al cargar matrimonios admin:', error)
  }

  return (
    <AdminDashboardClient
      initialBecas={becas}
      initialMateriales={materiales}
      initialNacimientos={nacimientos}
      initialMatrimonios={matrimonios}
      adminNombre={usuario.nombreCompleto}
    />
  )
}