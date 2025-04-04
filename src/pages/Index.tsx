
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import BusinessSection from '../components/home/BusinessSection';
import PartnerSection from '../components/home/PartnerSection';
import NewsSection from '../components/home/NewsSection';
import Footer from '../components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);

    // Update page title
    document.title = language === 'vi' ? 'GAET - Tổng Công Ty Đa Ngành' : 'GAET - Multidisciplinary Corporation';
  }, [language]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <BusinessSection />
        <PartnerSection />
        <NewsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
