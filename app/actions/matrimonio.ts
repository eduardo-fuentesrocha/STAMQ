'use server'

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function registrarSolicitudMatrimonio(formData: FormData) {
  try {
    const cookieStore = await cookies()
    const numeroEmpleado = cookieStore.get('usuario_num')?.value

    if (!numeroEmpleado) {
      return { success: false, error: 'Sesión no válida. Inicia sesión nuevamente.' }
    }

    const nombreConyuge = ((formData.get('nombreConyuge') as string) || '').trim()
    const tipoUnion = ((formData.get('tipoUnion') as string) || '').trim()
    const archivoActa = formData.get('actaMatrimonio') as File

    if (!nombreConyuge || !tipoUnion) {
      return { success: false, error: 'Todos los campos son obligatorios.' }
    }

    if (!archivoActa || archivoActa.size === 0) {
      return { success: false, error: 'El acta o constancia en PDF es obligatoria.' }
    }

    // 🏷️ Usar directamente el nombre renombrado desde MatrimonioTab y permitir sobrescritura
    const blob = await put(`matrimonios/${archivoActa.name}`, archivoActa, {
      access: 'private',
      allowOverwrite: true,
    })

    const actaUrl = blob.url

    // Guardar en la base de datos con la URL real de Vercel Blob
    const nuevaSolicitud = await prisma.solicitudMatrimonio.create({
      data: {
        numeroEmpleado,
        nombreConyuge,
        tipoUnion,
        actaUrl,
        estatus: 'En Revisión',
      },
    })

    const folioCorto = `MATR-2026-${nuevaSolicitud.id.slice(0, 4).toUpperCase()}`

    revalidatePath('/dashboard')

    return {
      success: true,
      data: {
        id: nuevaSolicitud.id,
        folio: folioCorto,
        nombreConyuge: nuevaSolicitud.nombreConyuge,
        tipoUnion: nuevaSolicitud.tipoUnion,
        estatus: nuevaSolicitud.estatus,
      },
    }
  } catch (error) {
    console.error('Error al registrar matrimonio:', error)
    return { success: false, error: 'Ocurrió un error al guardar la solicitud en la base de datos.' }
  }
}