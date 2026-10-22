import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'STAMQ - Sindicato de Trabajadores al Servicio del Municipio de Querétaro',
  description: 'Sitio oficial del Sindicato de Trabajadores al Servicio del Municipio de Querétaro. Defensa de derechos laborales, prestaciones sociales y transparencia.',
  keywords: ['STAMQ', 'Sindicato Querétaro', 'Trabajadores Municipales Querétaro', 'Convenio Colectivo', 'Derechos Laborales'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
