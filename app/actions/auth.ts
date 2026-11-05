'use server'

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// 🔍 1. Buscar y verificar el número de empleado antes de activar la cuenta
export async function buscarEmpleadoParaRegistro(numeroEmpleado: string) {
  try {
    const empleadoLimpio = numeroEmpleado?.trim()
    if (!empleadoLimpio) {
      return { success: false, error: 'Ingresa un número de empleado válido.' }
    }

    const usuario = await prisma.usuario.findUnique({
      where: { numeroEmpleado: empleadoLimpio },
    })

    if (!usuario) {
      return { 
        success: false, 
        error: 'El número de empleado no se encuentra en el padrón registrado.' 
      }
    }

    // Si ya tiene contraseña configurada, significa que la cuenta ya fue activada
    if (usuario.password && usuario.password.trim() !== '') {
      return { 
        success: false, 
        error: 'Este número de empleado ya cuenta con una contraseña activa. Por favor inicia sesión.' 
      }
    }

    return {
      success: true,
      nombreCompleto: usuario.nombreCompleto,
      numeroEmpleado: usuario.numeroEmpleado,
    }
  } catch (error) {
    console.error('Error al buscar empleado para registro:', error)
    return { success: false, error: 'Ocurrió un error al consultar el padrón.' }
  }
}

// 🔐 2. Asignar contraseña al usuario ya existente en el padrón
export async function registrarUsuario(formData: FormData) {
  try {
    const numeroEmpleado = formData.get('numeroEmpleado') as string
    const password = formData.get('password') as string

    if (!numeroEmpleado || !password) {
      return { success: false, error: 'Todos los campos son obligatorios para completar el registro.' }
    }

    const usuario = await prisma.usuario.findUnique({
      where: { numeroEmpleado },
    })

    if (!usuario) {
      return { success: false, error: 'No se encontró la información del empleado en el sistema.' }
    }

    // Cifrar la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Actualizar el registro existente asignando la contraseña
    await prisma.usuario.update({
      where: { numeroEmpleado },
      data: {
        password: hashedPassword,
      },
    })

    return { success: true, message: '¡Cuenta activada con éxito! Tu contraseña ha sido creada. Ya puedes iniciar sesión.' }
  } catch (error) {
    console.error('Error al registrar contraseña de usuario:', error)
    return { success: false, error: 'Ocurrió un error en el servidor al guardar la contraseña.' }
  }
}

// Función para Iniciar Sesión
export async function iniciarSesion(formData: FormData) {
  try {
    const numeroEmpleado = formData.get('numeroEmpleado') as string
    const password = formData.get('password') as string

    if (!numeroEmpleado || !password) {
      return { success: false, error: 'Ingresa tu número de empleado y contraseña.' }
    }

    const usuario = await prisma.usuario.findUnique({
      where: { numeroEmpleado },
    })

    if (!usuario) {
      return { success: false, error: 'Número de empleado no encontrado en el padrón.' }
    }

    // Si el usuario del padrón aún no genera contraseña
    if (!usuario.password) {
      return { success: false, error: 'Tu cuenta aún no ha sido activada. Da clic en "Activa tu cuenta aquí".' }
    }

    const passwordValida = await bcrypt.compare(password, usuario.password)

    if (!passwordValida) {
      return { success: false, error: 'Contraseña incorrecta.' }
    }

    // Guardar cookies de sesión (Número de Empleado y Rol)
    const cookieStore = await cookies()
    
    cookieStore.set('usuario_num', usuario.numeroEmpleado, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    })

    cookieStore.set('usuario_rol', usuario.rol || 'agremiado', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    })

    return { 
      success: true, 
      usuario: { 
        nombre: usuario.nombreCompleto, 
        empleado: usuario.numeroEmpleado,
        rol: usuario.rol
      } 
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    return { success: false, error: 'Ocurrió un error al intentar autenticar.' }
  }
}

// Función para verificar a dónde enviar al usuario al hacer clic en "Trámites en Línea"
export async function obtenerRedireccionTramites() {
  const cookieStore = await cookies()
  const numeroEmpleado = cookieStore.get('usuario_num')?.value
  const rol = cookieStore.get('usuario_rol')?.value

  if (!numeroEmpleado) {
    return '/login'
  }

  if (rol === 'admin' || rol === 'ADMIN') {
    return '/admin'
  }

  return '/dashboard'
}

// Función para Cerrar Sesión (Borra cookies y permite redirección a /)
export async function cerrarSesion() {
  const cookieStore = await cookies()
  cookieStore.delete({ name: 'usuario_num', path: '/' })
  cookieStore.delete({ name: 'usuario_rol', path: '/' })
  return { success: true }
}