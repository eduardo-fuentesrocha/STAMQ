import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const numEmpleado = cookieStore.get('usuario_num')?.value;

    // Validar que sea administrador
    const admin = await prisma.usuario.findUnique({ where: { numeroEmpleado: numEmpleado } });
    if (!admin || (admin as any).rol !== 'admin') {
      return new NextResponse('No autorizado', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('url');

    if (!fileUrl) {
      return new NextResponse('URL no proporcionada', { status: 400 });
    }

    // 🏷️ Extraer el nombre real y limpio del archivo desde la URL de Vercel Blob
    // Ejemplo de URL: .../actas/45892_Eduardo_Fuentes_Rocha_Eduardo_Acta.pdf -> Extrae "45892_Eduardo_Fuentes_Rocha_Eduardo_Acta.pdf"
    const urlSinQuery = fileUrl.split('?')[0];
    const nombreArchivo = urlSinQuery.split('/').pop() || 'documento.pdf';

    // Realizar fetch al archivo privado utilizando el token secreto del servidor
    const response = await fetch(fileUrl, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      return new NextResponse('No se pudo obtener el archivo desde el almacenamiento', { status: response.status });
    }

    const blobData = await response.blob();
    
    // Retornar el archivo forzando el nombre estructurado en el navegador sin caché
    return new NextResponse(blobData, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/pdf',
        // 'inline' permite abrirlo en el visor, pero agregando filename="..." los navegadores modernos
        // ya sugieren este nombre al guardarlo. Si prefieres forzar la descarga directa usa 'attachment'.
        'Content-Disposition': `inline; filename="${nombreArchivo}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error al servir archivo privado:', error);
    return new NextResponse('Error interno del servidor', { status: 500 });
  }
}