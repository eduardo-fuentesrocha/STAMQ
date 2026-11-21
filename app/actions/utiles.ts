'use server'

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { enviarNotificacionAdmin } from '../lib/mailer'
import { subirArchivoR2 } from '@/app/lib/r2'

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

    // Convertir archivos a Buffer y subirlos a Cloudflare R2 con los nombres renombrados desde UtilesTab
    const [bufferBoleta, bufferInscripcion] = await Promise.all([
      archivoBoleta.arrayBuffer().then((ab) => Buffer.from(ab)),
      archivoInscripcion.arrayBuffer().then((ab) => Buffer.from(ab)),
    ])

    const keyBoleta = `utiles/${archivoBoleta.name}`
    const keyInscripcion = `utiles/${archivoInscripcion.name}`

    const contentTypeBoleta = archivoBoleta.type || 'application/pdf'
    const contentTypeInscripcion = archivoInscripcion.type || 'application/pdf'

    await Promise.all([
      subirArchivoR2(keyBoleta, bufferBoleta, contentTypeBoleta),
      subirArchivoR2(keyInscripcion, bufferInscripcion, contentTypeInscripcion),
    ])

    // Guardar en la base de datos las claves (keys) de los objetos en R2
    const nuevaSolicitud = await prisma.solicitudUtiles.create({
      data: {
        numeroEmpleado,
        nombreHijo,
        nivelEducativo,
        boletaUrl: keyBoleta,
        inscripcionUrl: keyInscripcion,
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

    try {
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
    } catch (mailErr) {
      console.error('Error no bloqueante al enviar correo:', mailErr)
    }

    revalidatePath('/dashboard')

    return {
      success: true,
      data: {
        id: nuevaSolicitud.id,
        folio: folioCorto,
        hijo: nuevaSolicitud.nombreHijo,
        nivel: nuevaSolicitud.nivelEducativo,
        estatus: nuevaSolicitud.estatus,
        fecha: new Date(nuevaSolicitud.createdAt).toISOString(),
      },
    }
  } catch (error) {
    console.error('Error al registrar útiles escolares:', error)
    return { success: false, error: 'Ocurrió un error al guardar la solicitud en la base de datos.' }
  }
}