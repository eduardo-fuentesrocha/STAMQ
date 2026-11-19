'use server'

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { enviarNotificacionAdmin } from '../lib/mailer'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function registrarSolicitudNacimiento(formData: FormData) {
  try {
    const cookieStore = await cookies()
    const numeroEmpleado = cookieStore.get('usuario_num')?.value

    if (!numeroEmpleado) {
      return { success: false, error: 'Sesión no válida. Inicia sesión nuevamente.' }
    }

    const nombreHijo = ((formData.get('nombreHijo') as string) || '').trim()
    const archivoActa = formData.get('actaNacimiento') as File

    if (!nombreHijo) {
      return { success: false, error: 'El nombre del hijo(a) es obligatorio.' }
    }

    if (!archivoActa || archivoActa.size === 0) {
      return { success: false, error: 'El acta de nacimiento en PDF es obligatoria.' }
    }

    // 🏷️ Usar directamente el nombre renombrado desde NacimientoTab y permitir sobrescritura
    const blob = await put(`nacimientos/${archivoActa.name}`, archivoActa, {
      access: 'private',
      allowOverwrite: true,
    })

    const actaUrl = blob.url

    // Guardar en la base de datos con la URL real de Vercel Blob
    const nuevaSolicitud = await prisma.solicitudNacimiento.create({
      data: {
        numeroEmpleado,
        nombreHijo,
        actaUrl,
        estatus: 'En Revisión',
      },
    })

    const folioCorto = `NAC-2026-${nuevaSolicitud.id.slice(0, 4).toUpperCase()}`

    // Obtener nombre del trabajador para la notificación al admin
    const usuario = await prisma.usuario.findUnique({
      where: { numeroEmpleado },
    })
    const nombreTrabajador =
      (usuario as { nombreCompleto?: string } | null)?.nombreCompleto || numeroEmpleado

    await enviarNotificacionAdmin({
      nombreTrabajador,
      numeroEmpleado,
      tipoTramite: 'Nacimiento de Hijos',
      folio: folioCorto,
      detalles: {
        'Hijo(a)': nombreHijo,
      },
    })

    revalidatePath('/dashboard')

    return {
      success: true,
      data: {
        id: nuevaSolicitud.id,
        folio: folioCorto,
        nombreHijo: nuevaSolicitud.nombreHijo,
        estatus: nuevaSolicitud.estatus,
      },
    }
  } catch (error) {
    console.error('Error al registrar nacimiento:', error)
    return { success: false, error: 'Ocurrió un error al guardar la solicitud en la base de datos.' }
  }
}