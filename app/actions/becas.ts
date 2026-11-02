'use server'

import { put } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache' // 👈 1. Importar revalidatePath
import { enviarNotificacionAdmin } from '../lib/mailer';

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function registrarSolicitudBeca(formData: FormData) {
  try {
    // Obtener el número de empleado de la sesión actual
    const cookieStore = await cookies()
    const numeroEmpleado = cookieStore.get('usuario_num')?.value

    if (!numeroEmpleado) {
      return { success: false, error: 'Sesión no válida. Inicia sesión nuevamente.' }
    }

    // Buscar al usuario para obtener su nombre completo y notificar correctamente
    const usuario = await prisma.usuario.findUnique({
      where: { numeroEmpleado },
    })

    const nombreHijo = formData.get('nombreHijo') as string
    const nivelEducativo = formData.get('nivelEducativo') as string
    const archivoActa = formData.get('actaNacimiento') as File
    const archivoBoleta = formData.get('boletaCalificaciones') as File

    if (!nombreHijo || !nivelEducativo || !archivoActa || !archivoBoleta) {
      return { success: false, error: 'Todos los campos y documentos son obligatorios.' }
    }

    // Subir archivos a Vercel Blob de forma privada en paralelo
    const [blobActa, blobBoleta] = await Promise.all([
      put(`actas/${Date.now()}-${archivoActa.name}`, archivoActa, { access: 'private' }),
      put(`boletas/${Date.now()}-${archivoBoleta.name}`, archivoBoleta, { access: 'private' })
    ])

    // Guardar en la base de datos incluyendo las URLs y el número de empleado asociado
    const nuevaSolicitud = await prisma.solicitudBeca.create({
      data: {
        nombreHijo,
        nivelEducativo,
        numeroEmpleado,
        estatus: 'En Revisión',
        actaUrl: blobActa.url,
        boletaUrl: blobBoleta.url,
      },
    })

    // Generar folio corto para el registro y la notificación
    const folioCorto = `BEC-2026-${nuevaSolicitud.id.slice(0, 4).toUpperCase()}`

    // Enviar notificación por correo electrónico al administrador
    try {
      await enviarNotificacionAdmin({
        nombreTrabajador: usuario?.nombreCompleto || 'Trabajador STSMQ',
        numeroEmpleado,
        tipoTramite: 'Beca Escolar',
        folio: folioCorto,
        detalles: {
          'Nombre del Hijo(a)': nombreHijo,
          'Nivel Educativo': nivelEducativo,
        },
      })
    } catch (mailErr) {
      console.error('Error no bloqueante al enviar correo:', mailErr)
    }

    // 🔑 2. Revalidar la caché del Dashboard para que al refrescar consulte la BD
    revalidatePath('/dashboard')

    return {
      success: true,
      data: {
        id: nuevaSolicitud.id,
        nombreHijo: nuevaSolicitud.nombreHijo,
        nivelEducativo: nuevaSolicitud.nivelEducativo,
        estatus: nuevaSolicitud.estatus,
      },
    }
  } catch (error) {
    console.error('Error al procesar la solicitud de beca:', error)
    return { success: false, error: 'Ocurrió un error al guardar en la base de datos.' }
  }
}