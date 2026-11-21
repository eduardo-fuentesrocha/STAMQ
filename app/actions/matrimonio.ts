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

    // Convertir archivo a Buffer y subirlo a Cloudflare R2 con el nombre renombrado desde MatrimonioTab
    const bufferActa = Buffer.from(await archivoActa.arrayBuffer())
    const keyActa = `matrimonios/${archivoActa.name}`
    const contentTypeActa = archivoActa.type || 'application/pdf'

    await subirArchivoR2(keyActa, bufferActa, contentTypeActa)

    // Guardar en la base de datos con la clave (key) del objeto en R2
    const nuevaSolicitud = await prisma.solicitudMatrimonio.create({
      data: {
        numeroEmpleado,
        nombreConyuge,
        tipoUnion,
        actaUrl: keyActa,
        estatus: 'En Revisión',
      },
    })

    const folioCorto = `MATR-2026-${nuevaSolicitud.id.slice(0, 4).toUpperCase()}`

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
        tipoTramite: 'Matrimonio',
        folio: folioCorto,
        detalles: {
          'Cónyuge / Pareja': nombreConyuge,
          'Tipo de Unión': tipoUnion,
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