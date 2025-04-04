
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { scrollToElement } from '@/utils/scroll';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  
  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToElement('about', 80);
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.querySelector('footer');
    if (footer) {
      const contactElement = footer.querySelector('#contact');
      if (contactElement) {
        const yOffset = -80; // Offset để tính đến thanh điều hướng cố định
        const y = contactElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        // Nếu không tìm thấy phần tử #contact, cuộn đến phần dưới cùng
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="video-container relative">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        poster="/assets/images/hero-poster.jpg"
      >
        <source
          src="/assets/videos/gaet-hero-video.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      
      <div className="video-overlay"></div>
      
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 inline-block">
            <span className="text-white bg-gaet-500/80 backdrop-blur-sm text-lg font-bold px-5 py-2.5 rounded-full">
              {t('hero.company')}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-slide-down animate-delay-100">
            {t('hero.slogan')}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto opacity-0 animate-slide-up animate-delay-300">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in animate-delay-500">
            <a 
              href="#about" 
              onClick={handleScrollToAbout}
              className="btn-primary flex items-center justify-center gap-2"
            >
              {t('hero.learnMore')}
              <ChevronRight size={16} />
            </a>
            <a 
              href="#contact" 
              onClick={handleScrollToContact}
              className="btn-secondary"
            >
              {t('hero.contact')}
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a 
          href="#about" 
          onClick={handleScrollToAbout}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Scroll Down"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1V13M7 13L13 7M7 13L1 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
