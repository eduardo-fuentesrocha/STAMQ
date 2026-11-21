import { NextResponse } from 'next/server'
import { listarArchivosR2, eliminarMultiplesArchivosR2 } from '@/app/lib/r2'

const DIAS_RETENCION = 30 // 1 mes
const MS_POR_DIA = 24 * 60 * 60 * 1000
const CARPETA_EXCLUIDA = 'fotos-credencial/'
const LOTE_ELIMINACION = 1000

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
    const keysAEliminar: string[] = []

    const objetos = await listarArchivosR2()

    for (const objeto of objetos) {
      const key = objeto.Key
      if (!key) continue

      if (key.startsWith(CARPETA_EXCLUIDA)) {
        continue
      }

      if (objeto.LastModified) {
        const fechaSubida = new Date(objeto.LastModified).getTime()
        if (fechaSubida <= limiteAntiguedad) {
          keysAEliminar.push(key)
        }
      }
    }

    for (let i = 0; i < keysAEliminar.length; i += LOTE_ELIMINACION) {
      const lote = keysAEliminar.slice(i, i + LOTE_ELIMINACION)
      await eliminarMultiplesArchivosR2(lote)
    }

    return NextResponse.json({
      ok: true,
      carpetaExcluida: CARPETA_EXCLUIDA,
      diasRetencion: DIAS_RETENCION,
      eliminados: keysAEliminar.length,
      archivos: keysAEliminar,
    })
  } catch (error) {
    console.error('Error al ejecutar limpieza de Cloudflare R2:', error)
    return NextResponse.json(
      { ok: false, error: 'Error al limpiar archivos de R2' },
      { status: 500 }
    )
  }
}