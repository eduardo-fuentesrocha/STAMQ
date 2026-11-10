'use server'

import { enviarSugerenciaBuzon } from '@/app/lib/mailer'

export async function enviarSugerenciaAction(formData: FormData) {
  const mensaje = formData.get('mensaje') as string
  const nombreTrabajador = formData.get('nombreTrabajador') as string
  const numeroEmpleado = formData.get('numeroEmpleado') as string

  // Validar únicamente los campos requeridos actuales
  if (!mensaje) {
    return { success: false, error: 'El mensaje de la sugerencia es obligatorio.' }
  }

  try {
    await enviarSugerenciaBuzon({
      nombreTrabajador,
      numeroEmpleado,
      mensaje,
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Error al enviar la sugerencia por correo.' }
  }
}