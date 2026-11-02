'use server'

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache' // 👈 1. Importar revalidatePath para sincronizar el dashboard

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

    const nombreConyuge = (formData.get('nombreConyuge') as string) || ''
    const tipoUnion = (formData.get('tipoUnion') as string) || ''
    const archivoActa = formData.get('actaMatrimonio') as File

    if (!nombreConyuge.trim() || !tipoUnion) {
      return { success: false, error: 'Todos los campos son obligatorios.' }
    }

    if (!archivoActa || archivoActa.size === 0) {
      return { success: false, error: 'El acta o constancia en PDF es obligatoria.' }
    }

    // 1. Subir el archivo a Vercel Blob
    const blob = await put(`matrimonios/${numeroEmpleado}-${Date.now()}-${archivoActa.name}`, archivoActa, {
      access: 'private',
    });

    const actaUrl = blob.url;

    // 2. Guardar en la base de datos con la URL real
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

    // 🔑 3. Revalidar la ruta del dashboard para mantener los datos sincronizados al recargar
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