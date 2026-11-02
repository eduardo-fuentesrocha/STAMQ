'use server'

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache' // 👈 1. Importar revalidatePath para sincronizar el dashboard
import { enviarNotificacionAdmin } from '../lib/mailer'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function registrarSolicitudMateriales(formData: FormData) {
  try {
    const cookieStore = await cookies()
    const numeroEmpleado = cookieStore.get('usuario_num')?.value

    if (!numeroEmpleado) {
      return { success: false, error: 'Sesión no válida. Inicia sesión nuevamente.' }
    }

    const usuario = await prisma.usuario.findUnique({
      where: { numeroEmpleado },
    })

    const domicilioInmueble = (formData.get('domicilioInmueble') as string) || ''
    const cantidadTepetate = Number(formData.get('cantidadTepetate')) || 0
    const cantidadArena = Number(formData.get('cantidadArena')) || 0
    const cantidadGrava = Number(formData.get('cantidadGrava')) || 0
    const cantidadPiedraNegra = Number(formData.get('cantidadPiedraNegra')) || 0
    const cantidadCantera = Number(formData.get('cantidadCantera')) || 0

    if (!domicilioInmueble.trim()) {
      return { success: false, error: 'El domicilio del inmueble es obligatorio.' }
    }

    const totalMateriales = cantidadTepetate + cantidadArena + cantidadGrava + cantidadPiedraNegra + cantidadCantera
    if (totalMateriales === 0) {
      return { success: false, error: 'Debes indicar al menos 1 unidad de algún material.' }
    }

    // Guardar en la base de datos
    const nuevaSolicitud = await prisma.solicitudMaterial.create({
      data: {
        domicilioInmueble,
        cantidadTepetate,
        cantidadArena,
        cantidadGrava,
        cantidadPiedraNegra,
        cantidadCantera,
        numeroEmpleado,
        estatus: 'En Revisión',
      },
    })

    const folioCorto = `MAT-2026-${nuevaSolicitud.id.slice(0, 4).toUpperCase()}`

    // Enviar notificación al administrador de forma segura (no bloqueante)
    try {
      await enviarNotificacionAdmin({
        nombreTrabajador: usuario?.nombreCompleto || 'Trabajador STSMQ',
        numeroEmpleado,
        tipoTramite: 'Materiales de Construcción',
        folio: folioCorto,
        detalles: {
          'Domicilio del Inmueble': domicilioInmueble,
          'Tepetate (m³)': cantidadTepetate,
          'Arena (m³)': cantidadArena,
          'Grava (m³)': cantidadGrava,
          'Piedra Negra (viajes)': cantidadPiedraNegra,
          'Cantera (viajes)': cantidadCantera,
        },
      })
    } catch (mailErr) {
      console.error('Error no bloqueante al enviar correo de materiales:', mailErr)
    }

    // 🔑 2. Revalidar la ruta del dashboard para mantener los datos sincronizados al recargar
    revalidatePath('/dashboard')

    return {
      success: true,
      data: {
        id: nuevaSolicitud.id,
        folio: folioCorto,
        domicilio: nuevaSolicitud.domicilioInmueble,
        cantidadTepetate: nuevaSolicitud.cantidadTepetate,
        cantidadArena: nuevaSolicitud.cantidadArena,
        cantidadGrava: nuevaSolicitud.cantidadGrava,
        cantidadPiedraNegra: nuevaSolicitud.cantidadPiedraNegra,
        cantidadCantera: nuevaSolicitud.cantidadCantera,
        estatus: nuevaSolicitud.estatus,
        fecha: new Date(nuevaSolicitud.createdAt || Date.now()).toISOString().split('T')[0],
      },
    }
  } catch (error) {
    console.error('Error al procesar la solicitud de materiales:', error)
    return { success: false, error: 'Ocurrió un error al guardar en la base de datos.' }
  }
}