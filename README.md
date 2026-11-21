# Portal STSMQ — Plataforma del Trabajador Sindicalizado

Aplicación web desarrollada con **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, **PostgreSQL**, **Cloudflare R2** y **Vercel Analytics** para gestionar las prestaciones sindicales, el padrón familiar y la credencialización de los trabajadores.

---

## Características Principales

- **Autenticación y Roles:** Control de acceso (`agremiado`, `admin`, `secretario_general`) mediante cookies de sesión (`usuario_num`) y validación en base de datos.
- **Portal del Trabajador (`/dashboard`):**
  - Credencial sindical digital con fotografía privada y padrón familiar aprobado (`Familiar`).
  - Consulta de prestaciones generales (**Jubilaciones**, **Pensiones**, **Fallecimiento**, **Renta del Salón** y **Buzón de Sugerencias**).
  - Trámites interactivos con seguimiento de estatus, folios únicos (`BEC-2026-...`, `UTIL-2026-...`, etc.) y alertas: **Becas**, **Útiles Escolares**, **Nacimiento de Hijos**, **Matrimonio o Concubinato** y **Ayuda de Materiales para Construcción**.
- **Panel de Administración (`/admin`):**
  - Revisión, aprobación y rechazo de solicitudes con motivo obligatorio, notificaciones por correo y visor seguro de documentos PDF privados.
  - Registro automático de hijos o cónyuge en el padrón familiar mediante transacciones atómicas (`prisma.$transaction`) al aprobar trámites de nacimiento o matrimonio.
- **Almacenamiento Privado y Mantenimiento:**
  - Validación, normalización y renombrado estandarizado de PDFs antes de subirlos a un bucket privado en **Cloudflare R2** (`@aws-sdk/client-s3`).
  - Cron mensual (`vercel.json`) que elimina documentos de trámites con más de 30 días de antigüedad, conservando intactas las fotografías de credencial (`fotos-credencial/`).
- **Estandarización de Fechas:** Manejo en formato ISO completo y formateo centralizado en zona horaria `America/Mexico_City` (`app/lib/fechas.ts`).

---

## Stack Tecnológico

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide React
- **Base de Datos:** PostgreSQL, Prisma ORM (`@prisma/client`, `@prisma/adapter-pg`, `pg`)
- **Almacenamiento y Cloud:** Cloudflare R2 (`@aws-sdk/client-s3`), Vercel Analytics, Vercel Cron
- **Servicios:** Notificaciones SMTP (`app/lib/mailer.ts`), `Intl.DateTimeFormat` (`app/lib/fechas.ts`)

---

## Estructura del Proyecto

```text
├── app/
│   ├── actions/          # Server Actions (admin, auth, becas, materiales, matrimonio, nacimiento, utiles)
│   ├── admin/            # Panel administrativo
│   ├── api/              # Endpoints privados (visor de PDFs, fotos de credencial y cron de limpieza)
│   ├── dashboard/        # Portal del trabajador
│   ├── lib/              # Utilidades (r2.ts, fechas.ts, mailer.ts)
│   └── layout.tsx        # Layout raíz, navegación y analítica
├── components/           # Componentes cliente y pestañas de trámites
├── prisma/               # Esquema de base de datos (schema.prisma)
└── vercel.json           # Configuración de despliegue y cron mensual

# 1. Instalar dependencias
npm install

# 2. Generar el cliente de Prisma
npx prisma generate

# 3. Sincronizar el esquema con la base de datos
npx prisma db push

# 4. Iniciar el servidor de desarrollo
npm run dev