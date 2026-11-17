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
  mensaje: string
  correoTrabajador?: string
}

export async function enviarNotificacionAdmin({
  nombreTrabajador,
  numeroEmpleado,
  tipoTramite,
  folio,
  detalles,
}: NotificacionTramiteParams) {
  const adminEmail = process.env.ADMIN_EMAIL || 'sindicato.trabajadores.muniqro@gmail.com'
  const fecha = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })

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
  mensaje,
  correoTrabajador,
}: SugerenciaParams) {
  const adminEmail = process.env.ADMIN_EMAIL || 'sindicato.trabajadores.muniqro@gmail.com'
  const fecha = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; padding: 24px; background-color: #ffffff;">
      <h2 style="color: #E07A2B; margin-top: 0;">📬 Nueva Sugerencia</h2>
      <p style="color: #555;">Se ha enviado un nuevo mensaje a través del Buzón de Sugerencias del Portal del Trabajador Sindicalizado.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Trabajador:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${nombreTrabajador}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">N° Empleado:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${numeroEmpleado}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Correo de Contacto:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${correoTrabajador || 'No registrado'}</td>
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
      
      <p style="font-size: 12px; color: #888; margin-top: 24px;">Este es un mensaje automático generado por el Buzón del Portal del Trabajador Sindicalizado.</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Buzón STSMQ" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `[Buzón de Sugerencias] Nueva sugerencia de ${nombreTrabajador} (${numeroEmpleado})`,
      html: htmlBody,
    })
    return { success: true }
  } catch (error) {
    console.error('Error al enviar correo de sugerencia al admin:', error)
    throw new Error('No se pudo enviar la sugerencia.')
  }
}

export async function enviarConfirmacionSugerenciaUsuario({
  nombreTrabajador,
  mensaje,
  correoTrabajador,
}: {
  nombreTrabajador: string
  mensaje: string
  correoTrabajador: string
}) {
  const logoUrl = 'https://stsmq.vercel.app/STSMQ Original.svg' 

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; padding: 24px; background-color: #ffffff;">
      
      <!-- Encabezado con Logo y Título en el mismo renglón -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; padding-bottom: 16px;">
        <tr>
          <td style="width: 50px; vertical-align: middle; padding-right: 12px;">
            <img src="${logoUrl}" alt="Logo STSMQ" style="width: 45px; height: auto; display: block;" />
          </td>
          <td style="vertical-align: middle;">
            <h2 style="color: #E07A2B; font-size: 15px; font-weight: 800; margin: 0; line-height: 1.2;">
              SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO
            </h2>
          </td>
        </tr>
      </table>

      <h3 style="color: #333; margin-top: 0;">¡Hemos recibido tu sugerencia!</h3>
      <p style="color: #555; font-size: 14px; line-height: 1.5;">
        Hola <strong>${nombreTrabajador || 'Estimado Trabajador'}</strong>, te confirmamos que tu propuesta ha sido recibida correctamente a través de nuestro Buzón de Sugerencias.
      </p>

      <div style="background-color: #f9f9f9; border-left: 4px solid #E07A2B; padding: 16px; border-radius: 8px; margin: 20px 0;">
        <p style="font-weight: bold; margin: 0 0 6px 0; color: #333; font-size: 13px;">Resumen de tu mensaje:</p>
        <p style="color: #555; margin: 0; white-space: pre-wrap; font-style: italic; font-size: 13px;">"${mensaje}"</p>
      </div>

      <p style="color: #555; font-size: 13px; line-height: 1.5;">
        Agradecemos tu participación activa para continuar mejorando nuestros servicios.
      </p>

      <div style="border-top: 1px solid #eee; margin-top: 24px; padding-top: 16px; text-align: center;">
        <p style="font-size: 11px; color: #999; margin: 0;">Este es un mensaje automático de acuse de recibo, por favor no respondas a este correo.</p>
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Buzón STSMQ" <${process.env.SMTP_USER}>`,
      to: correoTrabajador,
      subject: `Hemos recibido tu sugerencia - STSMQ`,
      html: htmlBody,
    })
  } catch (error) {
    console.error('Error al enviar correo de confirmación al usuario:', error)
  }
}

// ==========================================
// 4. NOTIFICACIÓN AL TRABAJADOR (APROBACIÓN / RECHAZO DE TRÁMITE)
// ==========================================
export async function enviarNotificacionEstatusTrabajador({
  correoTrabajador,
  nombreTrabajador,
  tipoTramite,
  folio,
  detalleTramite,
  estatus,
  motivoRechazo,
}: {
  correoTrabajador: string
  nombreTrabajador: string
  tipoTramite: string
  folio: string
  detalleTramite: string
  estatus: 'Aprobada' | 'Rechazada' | string
  motivoRechazo?: string | null
}) {
  if (!correoTrabajador) return

  const logoUrl = 'https://stsmq.vercel.app/STSMQ Original.svg'
  const fecha = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
  const esAprobada = estatus === 'Aprobada'
  const estatusTitulo = esAprobada ? 'Aprobado' : 'Rechazado'

  const colorEstatus = esAprobada ? '#047857' : '#be123c'
  const fondoEstatus = esAprobada ? '#ecfdf5' : '#fff1f2'
  const bordeEstatus = esAprobada ? '#a7f3d0' : '#fecdd3'

  const bloqueMotivoRechazo =
    !esAprobada && motivoRechazo
      ? `
        <div style="background-color: #fff1f2; border-left: 4px solid #e11d48; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <p style="font-weight: bold; margin: 0 0 6px 0; color: #9f1239; font-size: 13px;">Motivo del rechazo:</p>
          <p style="color: #881337; margin: 0; white-space: pre-wrap; font-size: 13px; line-height: 1.5;">${motivoRechazo}</p>
        </div>
      `
      : ''

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; padding: 24px; background-color: #ffffff;">
      
      <!-- Encabezado con Logo y Título STSMQ -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; padding-bottom: 16px;">
        <tr>
          <td style="width: 50px; vertical-align: middle; padding-right: 12px;">
            <img src="${logoUrl}" alt="Logo STSMQ" style="width: 45px; height: auto; display: block;" />
          </td>
          <td style="vertical-align: middle;">
            <h2 style="color: #E07A2B; font-size: 15px; font-weight: 800; margin: 0; line-height: 1.2;">
              SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO
            </h2>
          </td>
        </tr>
      </table>

      <h3 style="color: #333; margin-top: 0;">Actualización en el estatus de tu trámite</h3>
      <p style="color: #555; font-size: 14px; line-height: 1.5;">
        Hola <strong>${nombreTrabajador}</strong>, te informamos que tu solicitud registrada en el Portal STSMQ ha sido revisada con el siguiente resultado:
      </p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 35%;">Trámite:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;"><strong>${tipoTramite}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Folio:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #E07A2B; font-weight: bold;">${folio}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Detalle:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${detalleTramite}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Fecha de resolución:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${fecha}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Estatus:</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">
            <span style="display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: bold; color: ${colorEstatus}; background-color: ${fondoEstatus}; border: 1px solid ${bordeEstatus};">
              ${estatus}
            </span>
          </td>
        </tr>
      </table>

      ${bloqueMotivoRechazo}

      <p style="color: #555; font-size: 13px; line-height: 1.5;">
        ${
          esAprobada
            ? 'Tu trámite ha sido validado satisfactoriamente. Puedes consultar el detalle ingresando a tu panel en el portal.'
            : 'Si deseas volver a ingresar tu trámite corrigiendo las observaciones señaladas, puedes hacerlo desde tu panel en el portal del trabajador.'
        }
      </p>

      <div style="border-top: 1px solid #eee; margin-top: 24px; padding-top: 16px; text-align: center;">
        <p style="font-size: 11px; color: #999; margin: 0;">Este es un mensaje automático generado por el Portal STSMQ, por favor no respondas a este correo.</p>
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Trámites STSMQ" <${process.env.SMTP_USER}>`,
      to: correoTrabajador,
      subject: `[Trámite ${estatusTitulo}] ${tipoTramite} - Folio ${folio}`,
      html: htmlBody,
    })
  } catch (error) {
    console.error('Error al enviar correo de notificación al trabajador:', error)
  }
}