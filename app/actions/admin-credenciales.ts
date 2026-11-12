'use server'

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { obtenerUsuarioActual } from '@/app/actions/auth'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const ROLES_AUTORIZADOS = ['secretario_general', 'SECRETARIO_GENERAL', 'admin']

// 💡 Función para limpiar acentos y estandarizar el texto a minúsculas
function normalizarTexto(texto: string): string {
  if (!texto) return ''
  return texto
    .normalize('NFD') // Separa las letras de sus tildes (ej. "é" -> "e" + "´")
    .replace(/[\u0300-\u036f]/g, '') // Elimina los signos de tildes/acentos
    .toLowerCase() // Pone todo en minúsculas
}

export async function buscarEmpleadoCredencial(query: string) {
  const usuarioActual = await obtenerUsuarioActual()

  if (!usuarioActual) {
    throw new Error('Sesión no válida.')
  }

  // Validación de permisos por rol o por tu número de empleado (45892)
  const tienePermiso = 
    ROLES_AUTORIZADOS.includes(usuarioActual.rol) ||
    usuarioActual.numeroEmpleado === '45892'

  if (!tienePermiso) {
    throw new Error('Acceso restringido a Secretaría General.')
  }

  if (!query || query.trim().length < 2) {
    return []
  }

  // Normalizamos lo que el usuario escribe en el buscador
  const terminoBusqueda = normalizarTexto(query)

  try {
    // 1. Obtenemos los usuarios de la base de datos incluyendo todos los campos de la credencial
    const todosLosUsuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nombreCompleto: true,
        numeroEmpleado: true,
        rol: true,
        createdAt: true,
        puesto: true,
        departamento: true,
        fechaIngreso: true,
        curp: true,
        nss: true,
        tipoSangre: true,
        contactoEmergenciaNombre: true,
        contactoEmergenciaTelefono: true,
        fotoUrl: true,
        vigencia: true,
      },
    })

    // 2. Filtramos en memoria aplicando normalización (ignora acentos, mayúsculas y minúsculas)
    const empleadosFiltrados = todosLosUsuarios.filter((usuario) => {
      const nombreNorm = normalizarTexto(usuario.nombreCompleto)
      const numeroNorm = normalizarTexto(usuario.numeroEmpleado)

      return (
        nombreNorm.includes(terminoBusqueda) ||
        numeroNorm.includes(terminoBusqueda)
      )
    })

    // Limitamos a 10 resultados para mantener la interfaz fluida
    return empleadosFiltrados.slice(0, 10)
  } catch (error) {
    console.error('Error al buscar empleados para credencial:', error)
    return []
  }
}