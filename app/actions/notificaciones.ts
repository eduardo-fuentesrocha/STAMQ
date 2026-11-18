'use server'

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { revalidatePath } from 'next/cache'
import { obtenerUsuarioActual } from '@/app/actions/auth'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) })

export async function marcarNotificacionRechazoVista(
  id: string,
  tipo: 'becas' | 'materiales' | 'nacimiento' | 'matrimonio' | 'utiles'
) {
  const usuario = await obtenerUsuarioActual()
  if (!usuario) return { success: false }

  const where = { id, numeroEmpleado: usuario.numeroEmpleado }
  const data = { notificacionVista: true }

  if (tipo === 'becas') await prisma.solicitudBeca.updateMany({ where, data })
  if (tipo === 'materiales') await prisma.solicitudMaterial.updateMany({ where, data })
  if (tipo === 'nacimiento') await prisma.solicitudNacimiento.updateMany({ where, data })
  if (tipo === 'matrimonio') await prisma.solicitudMatrimonio.updateMany({ where, data })
  if (tipo === 'utiles') await prisma.solicitudUtiles.updateMany({ where, data })

  revalidatePath('/dashboard')
  return { success: true }
}