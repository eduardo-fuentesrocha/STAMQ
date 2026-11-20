# Portal STSMQ — Plataforma del Trabajador Sindicalizado

Aplicación web desarrollada con **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Lucide React**, **Prisma ORM**, **PostgreSQL**, **Vercel Blob** y **Vercel Analytics** para digitalizar y unificar la solicitud, revisión, dictamen y trazabilidad de prestaciones sindicales, padrón familiar y credencialización de los trabajadores.

---

## Características, Herramientas, Servicios e Implementaciones

El **Portal STSMQ** articula en una sola aplicación web la experiencia del trabajador sindicalizado y la operación del panel administrativo bajo un esquema de control de acceso basado en roles (`agremiado`, `admin`, `secretario_general`), autenticación mediante cookies de sesión (`usuario_num`) y validación de usuario y rol directamente contra la base de datos en cada vista protegida. La interfaz se construyó con **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS** y **Lucide React**, incorporando tipografía `Montserrat` optimizada mediante `next/font/google`, navegación superior con `Navbar`, pie de página fijo con `Footer` y telemetría de tráfico y *page views* con `@vercel/analytics/next` montado en el layout raíz (`app/layout.tsx`).

En el **Portal del Trabajador (`/dashboard`)**, el sistema presenta la credencial sindical digital del trabajador (con puesto, departamento, fecha de ingreso, CURP, NSS, tipo de sangre, vigencia y contacto de emergencia), la consulta de su padrón familiar aprobado (`Familiar` con hijos y cónyuge) y pestañas organizadas para consultar y tramitar prestaciones sindicales, cubriendo **Jubilaciones**, **Pensiones**, **Apoyos por Fallecimiento**, **Becas**, **Útiles Escolares**, **Nacimiento de Hijos**, **Matrimonio o Concubinato**, **Renta del Salón del Sindicato**, **Ayuda de Materiales para Construcción** y **Buzón de Sugerencias**. En los trámites interactivos, los trabajadores pueden enviar solicitudes de **Becas** (con acta de nacimiento y boleta de calificaciones por nivel educativo), **Útiles Escolares** (seleccionando hijos registrados en el padrón familiar y adjuntando boleta del ciclo anterior más recibo de inscripción), **Nacimiento de Hijos** (con acta de nacimiento), **Matrimonio o Concubinato** (especificando tipo de unión y acta o constancia) y **Ayuda de Materiales para Construcción** (registrando domicilio del inmueble y cantidades de tepetate, arena, grava, piedra negra y cantera). Antes de subirse a la nube, todos los documentos pasan por validación estricta de formato `.pdf`, normalización de texto (eliminación de acentos y caracteres especiales) y renombrado estandarizado (`[NumEmpleado]_[Trabajador]_[Familiar]_[Documento].pdf`) para guardarse de forma privada en **Vercel Blob** (`access: 'private'`). Al enviarse una solicitud, se genera un folio único (`BEC-2026-...`, `UTIL-2026-...`, `NAC-2026-...`, `MATR-2026-...`, `MAT-2026-...`), se despacha un aviso por correo mediante el servicio interno en `app/lib/mailer.ts` y se actualiza el historial en tiempo real con estatus (`En Revisión`, `Aprobada`, `Rechazada`), control de lectura de alertas (`notificacionVista`) y motivos de rechazo.

En el **Panel de Administración (`/admin`)**, la vista cliente (`AdminDashboardClient`) organiza las categorías con pestañas y etiquetas alineadas en orden y denominación con el dashboard (**Becas**, **Útiles Escolares**, **Nacimiento de Hijos**, **Matrimonio o Concubinato** y **Ayuda de Materiales para Construcción**), mostrando contadores de registros y acceso seguro a los documentos PDF privados a través del endpoint proxy `/api/admin/ver-archivo` para evitar exponer URLs crudas del blob. Los administradores pueden aprobar o rechazar solicitudes mediante un modal con motivo obligatorio; cada acción ejecuta Server Actions en `app/actions/admin.ts` que validan permisos administrativos, registran `gestionadoPor`, `fechaGestion`, `motivoRechazo` y `notificacionVista`, envían notificación por correo electrónico al trabajador y revalidan rutas (`/admin` y `/dashboard`) con `revalidatePath`. Al aprobar trámites de **Nacimiento de Hijos** o **Matrimonio o Concubinato**, el backend ejecuta una transacción atómica en **PostgreSQL** mediante `prisma.$transaction` que actualiza la solicitud y registra automáticamente al hijo(a) o cónyuge en la tabla `Familiar`.

A nivel de infraestructura y calidad de datos, el proyecto utiliza **Prisma ORM** con `@prisma/client`, `@prisma/adapter-pg` y `pg` sobre **PostgreSQL**, estandariza todas las marcas de tiempo en formato ISO completo (`toISOString()`) y centraliza su presentación visual en `app/lib/fechas.ts` (`formatearFechaHoraMX`) mediante `Intl.DateTimeFormat` con zona horaria `America/Mexico_City`, eliminando truncamientos UTC y desfases horarios entre servidor y cliente. Asimismo, el despliegue en **Vercel** (`vercel.json`) contempla tareas programadas y rutinas de mantenimiento (`limpiar-blob`) para gestionar y depurar archivos en **Vercel Blob**, manteniendo la consistencia del almacenamiento y la base de datos.

---

## Herramientas y Servicios Utilizados

* **Framework y Lenguaje:** Next.js (App Router), React, TypeScript
* **Diseño e Iconografía:** Tailwind CSS, Lucide React, `next/font/google` (`Montserrat`)
* **Base de Datos y ORM:** PostgreSQL, Prisma ORM (`@prisma/client`, `@prisma/adapter-pg`, `pg`)
* **Almacenamiento y Analítica en la Nube:** Vercel Blob (archivos PDF privados), Vercel Analytics (`@vercel/analytics/next`), Vercel Cron / `vercel.json`
* **Notificaciones y Fechas:** Módulo de correo (`app/lib/mailer.ts`), `Intl.DateTimeFormat` (`America/Mexico_City` en `app/lib/fechas.ts`)

---

## Estructura del Proyecto

```text
├── app/
│   ├── actions/          # Server Actions (admin, auth, becas, materiales, matrimonio, nacimiento, utiles)
│   ├── admin/            # Página servidor del panel administrativo
│   ├── api/              # Endpoints (/api/admin/ver-archivo y tareas programadas / limpiar-blob)
│   ├── dashboard/        # Página servidor del portal del trabajador
│   ├── lib/              # Utilidades compartidas (fechas.ts, mailer.ts)
│   └── layout.tsx        # Layout raíz con fuentes, Navbar, Footer y <Analytics/>
├── components/           # Componentes cliente (AdminDashboardClient y vistas/pestañas de trámites)
├── prisma/               # Esquema de base de datos (schema.prisma)
└── vercel.json           # Configuración de despliegue y cron jobs en Vercel

# 1. Instalar dependencias
npm install

# 2. Generar el cliente de Prisma
npx prisma generate

# 3. Sincronizar el esquema con la base de datos
npx prisma db push

# 4. Iniciar el servidor de desarrollo
npm run dev

La aplicación estará disponible en http://localhost:3000