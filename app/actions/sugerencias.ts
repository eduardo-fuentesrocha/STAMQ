'use server'

import { enviarSugerenciaBuzon } from '@/app/lib/mailer'

export async function enviarSugerenciaAction(formData: FormData) {
  const categoria = formData.get('categoria') as string
  const asunto = formData.get('asunto') as string
  const mensaje = formData.get('mensaje') as string
  const nombreTrabajador = formData.get('nombreTrabajador') as string
  const numeroEmpleado = formData.get('numeroEmpleado') as string

  if (!asunto || !mensaje) {
    return { success: false, error: 'Faltan campos obligatorios.' }
  }

  try {
    await enviarSugerenciaBuzon({
      nombreTrabajador,
      numeroEmpleado,
      categoria,
      asunto,
      mensaje,
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Error al enviar la sugerencia por correo.' }
  }
}