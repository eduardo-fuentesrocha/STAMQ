import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { obtenerArchivoR2 } from '@/app/lib/r2';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const numEmpleado = cookieStore.get('usuario_num')?.value;

    // Validar que sea administrador
    if (!numEmpleado) {
      return new NextResponse('No autorizado', { status: 401 });
    }

    const admin = await prisma.usuario.findUnique({ where: { numeroEmpleado: numEmpleado } });
    if (!admin || (admin as any).rol !== 'admin') {
      return new NextResponse('No autorizado', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fileParam = searchParams.get('url');

    if (!fileParam) {
      return new NextResponse('Ruta de archivo no proporcionada', { status: 400 });
    }

    // Normalizar la clave (key) en R2:
    // Soporta tanto una clave directa ("actas/45892_...pdf") como una URL si llegara con dominio
    let key = fileParam.split('?')[0];
    if (key.startsWith('http://') || key.startsWith('https://')) {
      const parsedUrl = new URL(key);
      key = parsedUrl.pathname.replace(/^\/+/, '');
    } else {
      key = key.replace(/^\/+/, '');
    }

    // Extraer el nombre limpio del archivo para el encabezado Content-Disposition
    const nombreArchivo = key.split('/').pop() || 'documento.pdf';

    // Obtener el objeto desde Cloudflare R2
    const r2Response = await obtenerArchivoR2(key);

    if (!r2Response.Body) {
      return new NextResponse('Archivo no encontrado en el almacenamiento', { status: 404 });
    }

    // Convertir el stream de AWS SDK a Uint8Array para NextResponse
    const fileBytes = await r2Response.Body.transformToByteArray();

    return new NextResponse(fileBytes, {
      headers: {
        'Content-Type': r2Response.ContentType || 'application/pdf',
        'Content-Disposition': `inline; filename="${nombreArchivo}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    });
  } catch (error: any) {
    if (error?.name === 'NoSuchKey') {
      return new NextResponse('El archivo no existe en R2', { status: 404 });
    }
    console.error('Error al servir archivo privado desde R2:', error);
    return new NextResponse('Error interno del servidor', { status: 500 });
  }
}