
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ChartsPreviewSection from '../components/ChartsPreviewSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Hero Section */}
        <section id="home" className="relative">
          <HeroSection />
        </section>

        {/* Features Section */}
        <section id="features" className="relative">
          <FeaturesSection />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative">
          <HowItWorksSection />
        </section>

        {/* Charts Preview Section */}
        <section id="charts" className="relative">
          <ChartsPreviewSection />
        </section>

        {/* CTA Section */}
        <section id="cta" className="relative">
          <CTASection />
        </section>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;
