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

// Función para Registrar un Nuevo Agremiado
export async function registrarUsuario(formData: FormData) {
  try {
    const numeroEmpleado = formData.get('numeroEmpleado') as string
    const nombreCompleto = formData.get('nombreCompleto') as string
    const password = formData.get('password') as string

    if (!numeroEmpleado || !nombreCompleto || !password) {
      return { success: false, error: 'Todos los campos son obligatorios para el registro.' }
    }

    // Verificar si el número de empleado ya existe
    const existe = await prisma.usuario.findUnique({
      where: { numeroEmpleado },
    })

    if (existe) {
      return { success: false, error: 'Este número de empleado ya se encuentra registrado.' }
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear el usuario en Supabase con rol por defecto 'agremiado'
    await prisma.usuario.create({
      data: {
        numeroEmpleado,
        nombreCompleto,
        password: hashedPassword,
        rol: 'agremiado',
      },
    })

    return { success: true, message: '¡Registro exitoso! Ya puedes iniciar sesión.' }
  } catch (error) {
    console.error('Error al registrar usuario:', error)
    return { success: false, error: 'Ocurrió un error en el servidor al procesar el registro.' }
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

    const passwordValida = await bcrypt.compare(password, usuario.password)

    if (!passwordValida) {
      return { success: false, error: 'Contraseña incorrecta.' }
    }

    // Guardar el número de empleado en una cookie de sesión segura
    const cookieStore = await cookies()
    cookieStore.set('usuario_num', usuario.numeroEmpleado, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 días de duración
      path: '/',
    })

    return { 
      success: true, 
      usuario: { 
        nombre: usuario.nombreCompleto, 
        empleado: usuario.numeroEmpleado,
        rol: usuario.rol // Devuelve el rol para determinar si va a /admin o /dashboard
      } 
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    return { success: false, error: 'Ocurrió un error al intentar autenticar.' }
  }
}

// Función para Cerrar Sesión
export async function cerrarSesion() {
  const cookieStore = await cookies()
  cookieStore.delete('usuario_num')
}