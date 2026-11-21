import { NextResponse } from 'next/server';
import { obtenerArchivoR2 } from '@/app/lib/r2';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ numeroEmpleado: string }> }
) {
  try {
    const resolvedParams = await params;
    const { numeroEmpleado } = resolvedParams;

    if (!numeroEmpleado) {
      return new NextResponse('Número de empleado no proporcionado', { status: 400 });
    }

    const posiblesRutas = [
      `fotos-credencial/${numeroEmpleado}.jpeg`,
      `fotos-credencial/${numeroEmpleado}.jpg`,
      `fotos-credencial/${numeroEmpleado}.png`,
    ];

    let r2Response = null;
    let rutaEncontrada = '';

    for (const path of posiblesRutas) {
      try {
        const res = await obtenerArchivoR2(path);

        if (res && res.Body) {
          r2Response = res;
          rutaEncontrada = path;
          break;
        }
      } catch (e: any) {
        // Si el objeto no existe con esta extensión (NoSuchKey), continúa con la siguiente
        if (e?.name !== 'NoSuchKey' && e?.$metadata?.httpStatusCode !== 404) {
          console.error(`Error inesperado consultando ${path} en R2:`, e);
        }
      }
    }

    if (!r2Response || !r2Response.Body) {
      return new NextResponse('Fotografía no encontrada', { status: 404 });
    }

    const imageBytes = await r2Response.Body.transformToByteArray();
    const contentType =
      r2Response.ContentType || (rutaEncontrada.endsWith('.png') ? 'image/png' : 'image/jpeg');

    return new NextResponse(imageBytes, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error al procesar la fotografía privada desde R2:', error);
    return new NextResponse('Error al cargar la imagen', { status: 500 });
  }
}