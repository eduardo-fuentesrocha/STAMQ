'use server'

import { enviarSugerenciaBuzon, enviarConfirmacionSugerenciaUsuario } from '@/app/lib/mailer'

export async function enviarSugerenciaAction(formData: FormData) {
  const mensaje = formData.get('mensaje') as string
  const nombreTrabajador = formData.get('nombreTrabajador') as string
  const numeroEmpleado = formData.get('numeroEmpleado') as string
  const correoTrabajador = formData.get('correoTrabajador') as string

  // Validar únicamente los campos requeridos
  if (!mensaje) {
    return { success: false, error: 'El mensaje de la sugerencia es obligatorio.' }
  }

  try {
    // 1. Notificar al administrador con la sugerencia recibida
    await enviarSugerenciaBuzon({
      nombreTrabajador,
      numeroEmpleado,
      mensaje,
      correoTrabajador,
    })

    // 2. Enviar acuse de recibo al agremiado si el correo está presente
    if (correoTrabajador) {
      await enviarConfirmacionSugerenciaUsuario({
        nombreTrabajador,
        mensaje,
        correoTrabajador,
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Error al procesar el envío de la sugerencia:', error)
    return { success: false, error: 'Error al enviar la sugerencia por correo.' }
  }
}