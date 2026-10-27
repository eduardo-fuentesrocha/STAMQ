import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BenefitsGrid from '../components/BenefitsGrid';
import Prestaciones from '../components/Prestaciones';
import Servicios from '../components/Servicios';
import Eventos from '../components/Eventos';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Hero />
        <Prestaciones />
        <Servicios />
        <Eventos />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}