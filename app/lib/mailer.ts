import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface NotificacionTramiteParams {
  nombreTrabajador: string
  numeroEmpleado: string
  tipoTramite: string
  folio: string
  detalles: Record<string, string | number>
}

interface SugerenciaParams {
  nombreTrabajador: string
  numeroEmpleado: string
  categoria: string
  asunto: string
  mensaje: string
}

export async function enviarNotificacionAdmin({
  nombreTrabajador,
  numeroEmpleado,
  tipoTramite,
  folio,
  detalles,
}: NotificacionTramiteParams) {
  const adminEmail = process.env.ADMIN_EMAIL || 'sindicato.municipio.qro@gmail.com'
  const fecha = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })

  // Construir tabla de detalles
  const filasDetalles = Object.entries(detalles)
    .map(
      ([clave, valor]) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">${clave}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${valor}</td>
        </tr>`
    )
    .join('')

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; padding: 24px; background-color: #ffffff;">
      <h2 style="color: #E07A2B; margin-top: 0;">Nueva Solicitud de Trámite Recibida</h2>
      <p style="color: #555;">Se ha registrado una nueva solicitud en el portal STSMQ.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Trámite:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;"><strong>${tipoTramite}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Folio:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #E07A2B; font-weight: bold;">${folio}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Trabajador:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${nombreTrabajador}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">N° Empleado:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${numeroEmpleado}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Fecha y Hora:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${fecha}</td>
        </tr>
        ${filasDetalles}
      </table>
      
      <p style="font-size: 12px; color: #888; margin-top: 24px;">Este es un mensaje automático generado por el Portal STSMQ 2026.</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Portal STSMQ" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `[Nuevo Trámite] ${tipoTramite} - Folio ${folio} (${nombreTrabajador})`,
      html: htmlBody,
    })
  } catch (error) {
    console.error('Error al enviar correo de notificación al admin:', error)
  }
}

export async function enviarSugerenciaBuzon({
  nombreTrabajador,
  numeroEmpleado,
  categoria,
  asunto,
  mensaje,
}: SugerenciaParams) {
  const adminEmail = process.env.ADMIN_EMAIL || 'sindicato.municipio.qro@gmail.com'
  const fecha = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; padding: 24px; background-color: #ffffff;">
      <h2 style="color: #E07A2B; margin-top: 0;">📬 Nueva Sugerencia</h2>
      <p style="color: #555;">Se ha enviado un nuevo mensaje a través del Buzón de Sugerencias del Portal.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Categoría:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #E07A2B; font-weight: bold;">${categoria}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Asunto:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333; font-weight: bold;">${asunto}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Trabajador:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${nombreTrabajador}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">N° Empleado:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${numeroEmpleado}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Fecha y Hora:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${fecha}</td>
        </tr>
      </table>

      <div style="background-color: #f9f9f9; border-left: 4px solid #E07A2B; padding: 16px; border-radius: 8px; margin-top: 16px;">
        <p style="font-weight: bold; margin: 0 0 8px 0; color: #333;">Mensaje / Sugerencia:</p>
        <p style="color: #444; margin: 0; white-space: pre-wrap; line-height: 1.5;">${mensaje}</p>
      </div>
      
      <p style="font-size: 12px; color: #888; margin-top: 24px;">Este es un mensaje automático generado por el Buzón del Portal del Trabajador Sinficalizado.</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Buzón STSMQ" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `[Buzón de Sugerencias] (${categoria}) - ${asunto} [${nombreTrabajador}]`,
      html: htmlBody,
    })
    return { success: true }
  } catch (error) {
    console.error('Error al enviar correo de sugerencia:', error)
    throw new Error('No se pudo enviar la sugerencia.')
  }
}