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

    // Realizar fetch al archivo privado utilizando el token secreto del servidor
    const response = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      return new NextResponse('No se pudo obtener el archivo desde el almacenamiento', { status: response.status });
    }

    const blobData = await response.blob();
    
    // Retornar el archivo directamente al navegador del admin
    return new NextResponse(blobData, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Disposition': 'inline', // Permite visualizar en el navegador en lugar de forzar descarga
      },
    });
  } catch (error) {
    console.error('Error al servir archivo privado:', error);
    return new NextResponse('Error interno del servidor', { status: 500 });
  }
}