import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Configurar Montserrat directamente
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "STSMQ | Sindicato de Trabajadores al Servicio del Municipio de Querétaro",
  description: "Portal oficial del Sindicato de Trabajadores al Servicio del Municipio de Querétaro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`scroll-smooth ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}