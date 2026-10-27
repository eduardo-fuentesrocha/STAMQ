'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  CreditCard, 
  BadgeCheck, 
  Phone, 
  Mail, 
  X, 
  ChevronRight 
} from 'lucide-react';

const servicios = [
  {
    id: 'salon',
    titulo: 'Renta del Salón del Sindicato',
    descripcion: 'Espacio acondicionado y exclusivo para eventos sociales, reuniones y celebraciones de nuestros agremiados.',
    icono: Building2,
    detalles: 'El salón sindical está disponible para eventos familiares (bodas, XV años, aniversarios, cumpleaños) con tarifaspreferenciales y descuentos especiales para los trabajadores sindicalizados activos. Cuenta con facilidades de mobiliario y áreas comunes.'
  },
  {
    id: 'prestamos',
    titulo: 'Préstamos Sindicales',
    descripcion: 'Apoyo financiero de liquidez a corto y mediano plazo con esquemas accesibles para el agremiado.',
    icono: CreditCard,
    detalles: 'Otorgamiento de créditos condicionados al fondo de ahorro y tabulador vigente, diseñados para solventar imprevistos familiares, emergencias médicas o necesidades de liquidez con tasas preferenciales y cómodos plazos de descuento vía nómina.'
  },
  {
    id: 'credenciales',
    titulo: 'Credenciales',
    descripcion: 'Emisión, renovación y reposición de la credencial oficial que acredita tus derechos sindicales.',
    icono: BadgeCheck,
    detalles: 'Tramita tu identificación oficial como trabajador sindicalizado del Municipio de Querétaro. La credencial es indispensable para validar tus descuentos en establecimientos afiliados, acceso a eventos y solicitud de prestaciones vigentes.'
  },
];

export default function Servicios() {
  const [servicioSeleccionado, setServicioSeleccionado] = useState<typeof servicios[0] | null>(null);

  return (
    <section id="servicios" className="bg-white text-slate-900 py-20 px-6 sm:px-12 lg:px-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Encabezado de la Sección */}
        <div className="max-w-3xl space-y-4">
          <span className="text-[#E07A2B] text-xs font-black uppercase tracking-widest">
            Atención
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Servicios
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Haz clic en cada tarjeta para conocer más.
          </p>
        </div>

        {/* Cuadrícula de Servicios en Fondo Blanco */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((item) => {
            const Icono = item.icono;
            return (
              <div
                key={item.id}
                onClick={() => setServicioSeleccionado(item)}
                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#E07A2B] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-[#E07A2B]/10 text-[#E07A2B] group-hover:bg-[#E07A2B] group-hover:text-white transition-colors duration-300">
                    <Icono className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#E07A2B] transition-colors">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#E07A2B]">
                  <span>Ver detalles y requisitos</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal / Panel Desplegable para el Servicio Seleccionado */}
      {servicioSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 relative space-y-6">
            
            {/* Botón de Cerrar */}
            <button
              onClick={() => setServicioSeleccionado(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Encabezado del Modal */}
            <div className="space-y-3">
              <div className="p-3 w-fit rounded-xl bg-[#E07A2B]/10 text-[#E07A2B]">
                <servicioSeleccionado.icono className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-950">
                {servicioSeleccionado.titulo}
              </h3>
            </div>

            {/* Contenido / Detalles */}
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                {servicioSeleccionado.detalles}
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-[#E07A2B]">
                  Informes y Solicitudes
                </span>
                <p className="text-xs text-slate-600">
                  Para iniciar tu trámite, acércate a nuestras oficinas en Calle Independencia No. 210, Col. Centro, o contáctanos vía telefónica al (442) 213 7119.
                </p>
              </div>
            </div>

            {/* Pie del Modal */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setServicioSeleccionado(null)}
                className="px-6 py-2.5 rounded-xl bg-[#E07A2B] hover:bg-[#c46522] text-white font-bold text-sm shadow-md transition-colors"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}