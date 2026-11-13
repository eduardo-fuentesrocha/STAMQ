import { NextResponse } from 'next/server';
import { head } from '@vercel/blob';

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

    let blobDetails = null;
    let urlEncontrada = '';

    for (const path of posiblesRutas) {
      try {
        const details = await head(path, {
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        
        if (details && details.url) {
          blobDetails = details;
          urlEncontrada = details.url;
          break; 
        }
      } catch (e) {
        // Ignora si no existe con esta extensión y continúa probando la siguiente
      }
    }

    if (!urlEncontrada || !blobDetails) {
      return new NextResponse('Fotografía no encontrada', { status: 404 });
    }

    // Descarga segura del Blob privado con autorización y { cache: 'no-store' }
    const imageRes = await fetch(urlEncontrada, {
      cache: 'no-store',
      headers: {
        authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    });

    if (!imageRes.ok) {
      return new NextResponse('Error al descargar la imagen de Vercel Blob', { status: 500 });
    }

    const imageBuffer = await imageRes.arrayBuffer();
    const contentType = blobDetails.contentType || (urlEncontrada.endsWith('.png') ? 'image/png' : 'image/jpeg');

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error al procesar la fotografía privada:', error);
    return new NextResponse('Error al cargar la imagen', { status: 500 });
  }
}