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

    const hashedPassword = await bcrypt.hash(password, 10)

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

// 🔑 3. Función para Iniciar Sesión (Con redirección diferenciada por rol)
export async function iniciarSesion(formData: FormData) {
  try {
    const numeroEmpleado = formData.get('numeroEmpleado') as string
    const password = formData.get('password') as string
    const redirectTo = formData.get('redirectTo') as string // <--- Capturamos la ruta de redirección

    if (!numeroEmpleado || !password) {
      return { success: false, error: 'Ingresa tu número de empleado y contraseña.' }
    }

    const usuario = await prisma.usuario.findUnique({
      where: { numeroEmpleado },
    })

    if (!usuario) {
      return { success: false, error: 'Número de empleado no encontrado en el padrón.' }
    }

    if (!usuario.password) {
      return { success: false, error: 'Tu cuenta aún no ha sido activada. Da clic en "Activa tu cuenta aquí".' }
    }

    const passwordValida = await bcrypt.compare(password, usuario.password)

    if (!passwordValida) {
      return { success: false, error: 'Contraseña incorrecta.' }
    }

    const cookieStore = await cookies()
    
    cookieStore.set('usuario_num', usuario.numeroEmpleado, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    const rol = usuario.rol || 'agremiado'
    cookieStore.set('usuario_rol', rol, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    // 🔑 Lógica de destino diferenciada: Admin -> /admin | Secretario General (o 45892) -> /admin/credenciales
    let targetUrl = '/dashboard'

    const esAdminPuro = rol === 'admin' || rol === 'ADMIN'
    const esSecretarioGeneral = 
      rol === 'secretario_general' || 
      rol === 'SECRETARIO_GENERAL' || 
      usuario.numeroEmpleado === '45892'

    if (esAdminPuro) {
      targetUrl = '/admin'
    } else if (esSecretarioGeneral) {
      targetUrl = '/admin/credenciales'
    }

    if (redirectTo && redirectTo.startsWith('/')) {
      targetUrl = redirectTo
    }

    return { 
      success: true, 
      redirectTo: targetUrl, 
      usuario: { 
        nombre: usuario.nombreCompleto, 
        empleado: usuario.numeroEmpleado,
        rol: rol
      } 
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    return { success: false, error: 'Ocurrió un error al intentar autenticar.' }
  }
}

// 🛡️ 4. Validar correo electrónico asignado para recuperación de contraseña
export async function validarCorreoRecuperacion(numeroEmpleado: string, emailIngresado: string) {
  try {
    const empleadoLimpio = numeroEmpleado?.trim()
    const emailLimpio = emailIngresado?.trim()

    if (!empleadoLimpio || !emailLimpio) {
      return { success: false, error: 'Por favor ingresa tu número de empleado y tu correo electrónico.' }
    }

    const usuario = await prisma.usuario.findUnique({
      where: { numeroEmpleado: empleadoLimpio },
      select: { email: true, nombreCompleto: true, numeroEmpleado: true }
    })

    if (!usuario) {
      return { success: false, error: 'No se encontró un usuario registrado con ese número de empleado.' }
    }

    if (!usuario.email || usuario.email.trim() === '') {
      return { success: false, error: 'Tu usuario no tiene un correo asignado en el sistema. Contacta al administrador.' }
    }

    if (usuario.email.trim().toLowerCase() !== emailLimpio.toLowerCase()) {
      return { success: false, error: 'El correo electrónico no coincide con el registrado para este número de empleado.' }
    }

    return {
      success: true,
      nombreCompleto: usuario.nombreCompleto,
      numeroEmpleado: usuario.numeroEmpleado,
    }
  } catch (error) {
    console.error('Error al validar correo para recuperación:', error)
    return { success: false, error: 'Ocurrió un error al consultar la información del usuario.' }
  }
}

// 🔄 5. Restablecer / Actualizar la contraseña del usuario
export async function actualizarPasswordAction(numeroEmpleado: string, nuevoPassword: string) {
  try {
    const empleadoLimpio = numeroEmpleado?.trim()

    if (!empleadoLimpio || !nuevoPassword || nuevoPassword.length < 8) {
      return { success: false, error: 'La nueva contraseña debe tener al menos 8 caracteres.' }
    }

    const usuario = await prisma.usuario.findUnique({
      where: { numeroEmpleado: empleadoLimpio },
    })

    if (!usuario) {
      return { success: false, error: 'No se encontró la información del empleado.' }
    }

    const hashedPassword = await bcrypt.hash(nuevoPassword, 10)

    await prisma.usuario.update({
      where: { numeroEmpleado: empleadoLimpio },
      data: {
        password: hashedPassword,
      },
    })

    return { 
      success: true, 
      message: '¡Contraseña restablecida con éxito! Ya puedes iniciar sesión con tu nueva contraseña.' 
    }
  } catch (error) {
    console.error('Error al restablecer contraseña:', error)
    return { success: false, error: 'No se pudo actualizar la contraseña en el servidor.' }
  }
}

// 👤 6. Obtener la información del usuario actual autenticado mediante la cookie
export async function obtenerUsuarioActual() {
  try {
    const cookieStore = await cookies()
    const numeroEmpleado = cookieStore.get('usuario_num')?.value

    if (!numeroEmpleado) {
      return null
    }

    const usuario = await prisma.usuario.findUnique({
      where: { numeroEmpleado },
    })

    return usuario
  } catch (error) {
    console.error('Error al obtener usuario actual:', error)
    return null
  }
}

// 🔄 7. Función para verificar a dónde enviar al usuario al hacer clic en "Trámites en Línea"
export async function obtenerRedireccionTramites() {
  const cookieStore = await cookies()
  const numeroEmpleado = cookieStore.get('usuario_num')?.value
  const rol = cookieStore.get('usuario_rol')?.value

  if (!numeroEmpleado) {
    return '/login'
  }

  const esAdminPuro = rol === 'admin' || rol === 'ADMIN'
  const esSecretarioGeneral = 
    rol === 'secretario_general' || 
    rol === 'SECRETARIO_GENERAL' || 
    numeroEmpleado === '45892'

  if (esAdminPuro) {
    return '/admin'
  } else if (esSecretarioGeneral) {
    return '/admin/credenciales'
  }

  return '/dashboard'
}

// 🚪 8. Función para Cerrar Sesión (Borra cookies y permite redirección a /)
export async function cerrarSesion() {
  const cookieStore = await cookies()
  cookieStore.delete({ name: 'usuario_num', path: '/' })
  cookieStore.delete({ name: 'usuario_rol', path: '/' })
  return { success: true }
}