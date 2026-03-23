import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TopBar from './sections/TopBar';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import TrainingCarousel from './sections/TrainingCarousel';
import ServicesSection from './sections/ServicesSection';
import ProcessSection from './sections/ProcessSection';
import WhyChooseSection from './sections/WhyChooseSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger load animation
    setIsLoaded(true);
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className={`relative bg-background min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Top Bar */}
      <TopBar />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Training Carousel */}
      <TrainingCarousel />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Process Section */}
      <ProcessSection />
      
      {/* Why Choose Us */}
      <WhyChooseSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
