import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import OldWay from '@/components/landing/OldWay';
import HowItWorks from '@/components/landing/HowItWorks';
import FeatureRows from '@/components/landing/FeatureRows';
import EverythingElse from '@/components/landing/EverythingElse';
import TrustSection from '@/components/landing/TrustSection';
import CTA from '@/components/landing/CTA';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ color: 'var(--pl-text)' }}>
      <Navbar />
      <Hero />
      <OldWay />
      <HowItWorks />
      <FeatureRows />
      <EverythingElse />
      <TrustSection />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  );
}
