import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';

const accountId = process.env.R2_ACCOUNT_ID!;
const accessKeyId = process.env.R2_ACCESS_KEY_ID!;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!;
export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * Sube un archivo PDF a R2 y retorna su clave (key) dentro del bucket.
 * Ejemplo: "becas/45892_Eduardo_Fuentes_Rocha_Acta.pdf"
 */
export async function subirArchivoR2(
  key: string,
  body: Buffer | Uint8Array,
  contentType = 'application/pdf'
): Promise<string> {
  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );

  return key;
}

/**
 * Obtiene un archivo desde R2 a partir de su clave (key).
 */
export async function obtenerArchivoR2(key: string) {
  const response = await r2Client.send(
    new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    })
  );

  return response;
}

/**
 * Elimina un archivo individual de R2.
 */
export async function eliminarArchivoR2(key: string): Promise<void> {
  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    })
  );
}

/**
 * Elimina múltiples archivos en lote (útil para el cron de limpieza).
 */
export async function eliminarMultiplesArchivosR2(keys: string[]): Promise<void> {
  if (keys.length === 0) return;

  await r2Client.send(
    new DeleteObjectsCommand({
      Bucket: R2_BUCKET_NAME,
      Delete: {
        Objects: keys.map((Key) => ({ Key })),
      },
    })
  );
}

/**
 * Lista todos los objetos de un prefijo o de todo el bucket.
 */
export async function listarArchivosR2(prefix?: string) {
  const response = await r2Client.send(
    new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      Prefix: prefix,
    })
  );

  return response.Contents || [];
}