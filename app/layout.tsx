import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Configurar Montserrat directamente
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO",
  description: "Portal del Trabajador Sindicalizado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`scroll-smooth ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-900 min-h-screen flex flex-col">
        <Navbar />
        
        {/* 🔑 min-h-[calc(100vh-160px)] previene el salto del footer durante redirecciones y cargas rápidas */}
        <main className="flex-1 min-h-[calc(100vh-160px)]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}