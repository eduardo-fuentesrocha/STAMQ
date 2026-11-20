const ZONA_HORARIA_MX = 'America/Mexico_City';

export function formatearFechaHoraMX(valor: string | Date | null | undefined): string {
  if (!valor) return 'Sin fecha';
  const fecha = valor instanceof Date ? valor : new Date(valor);
  if (Number.isNaN(fecha.getTime())) return String(valor);

  return new Intl.DateTimeFormat('es-MX', {
    timeZone: ZONA_HORARIA_MX,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(fecha);
}

export function formatearSoloFechaMX(valor: string | Date | null | undefined): string {
  if (!valor) return 'Sin fecha';
  const fecha = valor instanceof Date ? valor : new Date(valor);
  if (Number.isNaN(fecha.getTime())) return String(valor);

  return new Intl.DateTimeFormat('es-MX', {
    timeZone: ZONA_HORARIA_MX,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(fecha);
}