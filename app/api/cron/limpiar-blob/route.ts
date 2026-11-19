import { NextResponse } from 'next/server'
import { list, del, type ListBlobResult } from '@vercel/blob'

const DIAS_RETENCION = 15
const MS_POR_DIA = 24 * 60 * 60 * 1000
const CARPETA_EXCLUIDA = 'fotos-credencial/'

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (
      !process.env.CRON_SECRET ||
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return new NextResponse('No autorizado', { status: 401 })
    }

    const limiteAntiguedad = Date.now() - DIAS_RETENCION * MS_POR_DIA
    const urlsAEliminar: string[] = []
    let cursor: string | undefined = undefined
    let hayMas = false

    do {
      const pagina: ListBlobResult = await list({
        ...(cursor ? { cursor } : {}),
        limit: 1000,
      })

      for (const blob of pagina.blobs) {
        if (blob.pathname.startsWith(CARPETA_EXCLUIDA)) {
          continue
        }

        const fechaSubida = new Date(blob.uploadedAt).getTime()
        if (fechaSubida <= limiteAntiguedad) {
          urlsAEliminar.push(blob.url)
        }
      }

      hayMas = pagina.hasMore
      cursor = pagina.cursor
    } while (hayMas)

    if (urlsAEliminar.length > 0) {
      await del(urlsAEliminar)
    }

    return NextResponse.json({
      ok: true,
      carpetaExcluida: CARPETA_EXCLUIDA,
      diasRetencion: DIAS_RETENCION,
      eliminados: urlsAEliminar.length,
      archivos: urlsAEliminar,
    })
  } catch (error) {
    console.error('Error al ejecutar limpieza de Vercel Blob:', error)
    return NextResponse.json(
      { ok: false, error: 'Error al limpiar archivos de Blob' },
      { status: 500 }
    )
  }
}