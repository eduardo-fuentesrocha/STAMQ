'use server'

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { revalidatePath } from 'next/cache'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// ==========================================
// 1. GESTIÓN DE SOLICITUDES DE BECAS
// ==========================================
export async function actualizarEstatusSolicitud(id: string, nuevoEstatus: string) {
  try {
    const solicitud = await prisma.solicitudBeca.update({
      where: { id },
      data: { estatus: nuevoEstatus },
    })

    revalidatePath('/admin')
    revalidatePath('/dashboard')
    return { success: true, data: solicitud }
  } catch (error) {
    console.error('Error al actualizar estatus de beca:', error)
    return { success: false, error: 'No se pudo actualizar el estatus de la beca.' }
  }
}

// ==========================================
// 2. GESTIÓN DE MATERIALES DE CONSTRUCCIÓN
// ==========================================
export async function actualizarEstatusMateriales(id: string, nuevoEstatus: string) {
  try {
    const material = await prisma.solicitudMaterial.update({
      where: { id },
      data: { estatus: nuevoEstatus },
    })

    revalidatePath('/admin')
    revalidatePath('/dashboard')
    return { success: true, data: material }
  } catch (error) {
    console.error('Error al actualizar estatus de materiales:', error)
    return { success: false, error: 'No se pudo actualizar el estatus del material.' }
  }
}

// ==========================================
// 3. REGISTRO DE NACIMIENTO + ALTA AUTOMÁTICA EN FAMILIAR
// ==========================================
export async function actualizarEstatusNacimiento(id: string, nuevoEstatus: string) {
  try {
    const solicitud = await prisma.solicitudNacimiento.findUnique({
      where: { id },
    })

    if (!solicitud) {
      return { success: false, error: 'La solicitud de nacimiento no existe.' }
    }

    if (nuevoEstatus === 'Aprobada') {
      // Transacción atómica: Actualiza estatus y crea registro en la tabla Familiar
      await prisma.$transaction([
        prisma.solicitudNacimiento.update({
          where: { id },
          data: { estatus: 'Aprobada' },
        }),
        prisma.familiar.create({
          data: {
            numeroEmpleado: solicitud.numeroEmpleado,
            nombreCompleto: solicitud.nombreHijo,
            parentesco: 'Hijo(a)',
            estatus: 'Aprobado',
          },
        }),
      ])
    } else {
      await prisma.solicitudNacimiento.update({
        where: { id },
        data: { estatus: nuevoEstatus },
      })
    }

    revalidatePath('/admin')
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Error al actualizar estatus de nacimiento:', error)
    return { success: false, error: 'No se pudo procesar la solicitud de nacimiento.' }
  }
}

// ==========================================
// 4. MATRIMONIO / CONCUBINATO + ALTA AUTOMÁTICA EN FAMILIAR
// ==========================================
export async function actualizarEstatusMatrimonio(id: string, nuevoEstatus: string) {
  try {
    const solicitud = await prisma.solicitudMatrimonio.findUnique({
      where: { id },
    })

    if (!solicitud) {
      return { success: false, error: 'La solicitud de matrimonio no existe.' }
    }

    if (nuevoEstatus === 'Aprobada') {
      // Transacción atómica: Actualiza estatus y crea registro del cónyuge en la tabla Familiar
      await prisma.$transaction([
        prisma.solicitudMatrimonio.update({
          where: { id },
          data: { estatus: 'Aprobada' },
        }),
        prisma.familiar.create({
          data: {
            numeroEmpleado: solicitud.numeroEmpleado,
            nombreCompleto: solicitud.nombreConyuge,
            parentesco: 'Cónyuge',
            estatus: 'Aprobado',
          },
        }),
      ])
    } else {
      await prisma.solicitudMatrimonio.update({
        where: { id },
        data: { estatus: nuevoEstatus },
      })
    }

    revalidatePath('/admin')
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Error al actualizar estatus de matrimonio:', error)
    return { success: false, error: 'No se pudo procesar la solicitud de matrimonio.' }
  }
}

// ==========================================
// 5. VISUALIZACIÓN DE ARCHIVOS PRIVADOS
// ==========================================
export async function obtenerUrlArchivoPrivado(urlOriginal: string) {
  try {
    // Si tus archivos están guardados directamente o en almacenamiento externo
    if (!urlOriginal) {
      return { success: false, error: 'No se encontró la URL del archivo.' }
    }
    
    return { success: true, url: urlOriginal }
  } catch (error) {
    console.error('Error al recuperar URL del archivo:', error)
    return { success: false, error: 'Ocurrió un error al intentar abrir el archivo.' }
  }
}