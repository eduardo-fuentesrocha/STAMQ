'use server'

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'

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

    const nombreHijo = (formData.get('nombreHijo') as string) || ''
    const nivelEducativo = (formData.get('nivelEducativo') as string) || ''
    const archivoBoleta = formData.get('boleta') as File
    const archivoInscripcion = formData.get('inscripcion') as File

    if (!nombreHijo.trim() || !nivelEducativo) {
      return { success: false, error: 'Todos los campos son obligatorios.' }
    }

    if (!archivoBoleta || archivoBoleta.size === 0) {
      return { success: false, error: 'La boleta de calificaciones es obligatoria.' }
    }

    if (!archivoInscripcion || archivoInscripcion.size === 0) {
      return { success: false, error: 'El recibo de inscripción es obligatorio.' }
    }

    // 1. Subir la boleta de calificaciones a Vercel Blob (privado)
    const blobBoleta = await put(`utiles/${numeroEmpleado}-boleta-${Date.now()}-${archivoBoleta.name}`, archivoBoleta, {
      access: 'private',
    });

    // 2. Subir el recibo de inscripción a Vercel Blob (privado)
    const blobInscripcion = await put(`utiles/${numeroEmpleado}-inscripcion-${Date.now()}-${archivoInscripcion.name}`, archivoInscripcion, {
      access: 'private',
    });

    // 3. Guardar en la base de datos
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

    const folioCorto = `UTIL-2026-${Date.now().toString().slice(-4)}`

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