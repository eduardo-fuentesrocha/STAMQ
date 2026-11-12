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
},);

export const metadata: Metadata = {
  // 🔑 NECESARIO: Define la URL base para que OpenGraph resuelva las imágenes absolutas en producción
  metadataBase: new URL("https://stsmq.vercel.app"),

  title: "SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO",
  description: "Portal del Trabajador Sindicalizado",
  manifest: "/manifest.json",
  
  // 🌐 Íconos de pestaña, accesos directos y dispositivos móviles
  icons: {
    icon: [
      {
        url: "/STSMQ Original.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/STSMQ Original.png",
    apple: [
      {
        url: "/STSMQ Original.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  // 📲 Vista previa para WhatsApp, Facebook y Redes Sociales (Open Graph)
  openGraph: {
    title: "SINDICATO DE TRABAJADORES AL SERVICIO DEL MUNICIPIO DE QUERÉTARO",
    description: "Portal del Trabajador Sindicalizado",
    url: "https://stsmq.vercel.app/",
    siteName: "STSMQ",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Logo STSMQ",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`scroll-smooth ${montserrat.variable}`}>
      {/* Añadimos w-full overflow-x-hidden para cortar cualquier elemento rebelde */}
      <body className="font-sans antialiased bg-white text-slate-900 min-h-screen flex flex-col w-full overflow-x-hidden">
        <Navbar />
        
        <main className="flex-1 min-h-[calc(100vh-160px)] w-full max-w-full">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}