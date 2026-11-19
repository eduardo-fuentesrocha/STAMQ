'use server'

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { enviarNotificacionAdmin } from '../lib/mailer';

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function registrarSolicitudUtiles(formData: FormData) {
  try {
    const cookieStore = await cookies()
    const numeroEmpleado = cookieStore.get('usuario_num')?.value

    if (!numeroEmpleado) {
      return { success: false, error: 'Sesión no válida. Inicia sesión nuevamente.' }
    }

    const nombreHijo = ((formData.get('nombreHijo') as string) || '').trim()
    const nivelEducativo = ((formData.get('nivelEducativo') as string) || '').trim()
    const archivoBoleta = formData.get('boleta') as File
    const archivoInscripcion = formData.get('inscripcion') as File

    if (!nombreHijo || !nivelEducativo) {
      return { success: false, error: 'Todos los campos son obligatorios.' }
    }

    if (!archivoBoleta || archivoBoleta.size === 0) {
      return { success: false, error: 'La boleta de calificaciones es obligatoria.' }
    }

    if (!archivoInscripcion || archivoInscripcion.size === 0) {
      return { success: false, error: 'El recibo de inscripción es obligatorio.' }
    }

    // 🏷️ Usar directamente los nombres renombrados desde UtilesTab y permitir sobrescritura
    const [blobBoleta, blobInscripcion] = await Promise.all([
      put(`utiles/${archivoBoleta.name}`, archivoBoleta, {
        access: 'private',
        allowOverwrite: true,
      }),
      put(`utiles/${archivoInscripcion.name}`, archivoInscripcion, {
        access: 'private',
        allowOverwrite: true,
      }),
    ])

    // Guardar en la base de datos
    const nuevaSolicitud = await prisma.solicitudUtiles.create({
      data: {
        numeroEmpleado,
        nombreHijo,
        nivelEducativo,
        boletaUrl: blobBoleta.url,
        inscripcionUrl: blobInscripcion.url,
        estatus: 'En Revisión',
      },
    })

    const folioCorto = `UTIL-2026-${nuevaSolicitud.id.slice(0, 4).toUpperCase()}`

    // Obtener nombre del trabajador para la notificación al admin
    const usuario = await prisma.usuario.findUnique({
      where: { numeroEmpleado },
    })
    const nombreTrabajador =
      (usuario as { nombreCompleto?: string } | null)?.nombreCompleto || numeroEmpleado

    await enviarNotificacionAdmin({
      nombreTrabajador,
      numeroEmpleado,
      tipoTramite: 'Útiles Escolares',
      folio: folioCorto,
      detalles: {
        'Hijo(a)': nombreHijo,
        'Nivel Educativo': nivelEducativo,
      },
    })

    revalidatePath('/dashboard')

    return {
      success: true,
      data: {
        id: nuevaSolicitud.id,
        folio: folioCorto,
        hijo: nuevaSolicitud.nombreHijo,
        nivel: nuevaSolicitud.nivelEducativo,
        estatus: nuevaSolicitud.estatus,
        fecha: new Date(nuevaSolicitud.createdAt).toISOString().split('T')[0],
      },
    }
  } catch (error) {
    console.error('Error al registrar útiles escolares:', error)
    return { success: false, error: 'Ocurrió un error al guardar la solicitud en la base de datos.' }
  }
}