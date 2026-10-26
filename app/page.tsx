import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BenefitsGrid from '../components/BenefitsGrid';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BenefitsGrid />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}