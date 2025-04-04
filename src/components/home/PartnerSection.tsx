
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SmoothImage from '../ui/SmoothImage';
import { useLanguage } from '@/contexts/LanguageContext';

// Strategic partners data with Vietnamese and English names
const partners = [
  {
    id: 1,
    vi: "Quân chủng Phòng không - Không quân",
    en: "Air Defence - Air Force",
    logo: "/assets/images/partners/Air-Defence-Air-Force.png"
  },
  {
    id: 2,
    vi: "Binh chủng Tăng Thiết giáp",
    en: "Armour - Tank Arms",
    logo: "/assets/images/partners/Armour-Tank-Arms.png"
  },
  {
    id: 3,
    vi: "Binh chủng Pháo binh",
    en: "Artillery Arms",
    logo: "/assets/images/partners/Artillery-Arms.png"
  },
  {
    id: 4,
    vi: "Binh chủng Hóa học",
    en: "Chemical Arms",
    logo: "/assets/images/partners/Chemical-Arms.png"
  },
  {
    id: 5,
    vi: "Binh chủng Thông tin liên lạc",
    en: "Signal Arms",
    logo: "/assets/images/partners/Signal-Arms.png"
  },
  {
    id: 6,
    vi: "Binh chủng Đặc công",
    en: "Special Operation Force Arms",
    logo: "/assets/images/partners/Special-Operation-Force-Arms.png"
  },
  {
    id: 7,
    vi: "Bộ đội Biên phòng Việt Nam",
    en: "Vietnam Border Guard",
    logo: "/assets/images/partners/Vietnam-Border-Guard.png"
  },
  {
    id: 8,
    vi: "Cảnh sát biển Việt Nam",
    en: "Vietnam Coast Guard",
    logo: "/assets/images/partners/Vietnam-Coast-Guard.png"
  },
  {
    id: 9,
    vi: "Tổng cục Công nghiệp Quốc phòng",
    en: "Vietnam Defence Industry",
    logo: "/assets/images/partners/Vietnam-Defence-Industry.png"
  },
  {
    id: 10,
    vi: "Lục quân Việt Nam",
    en: "Vietnam Ground Forces",
    logo: "/assets/images/partners/Vietnam-Ground-Forces.png"
  },
  {
    id: 11,
    vi: "Quân chủng Hải quân Nhân dân Việt Nam",
    en: "Vietnam People's Navy",
    logo: "/assets/images/partners/Vietnam-Peoples-Navy.png"
  }
];

const PartnerSection: React.FC = () => {
  const { language } = useLanguage();
  
  const scrollLeft = () => {
    const container = document.getElementById('partners-container');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('partners-container');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-gaet-700">
            {language === 'vi' ? 'Đối tác chiến lược' : 'Strategic Partners'}
          </h2>
          <p className="text-gray-600">
            {language === 'vi' 
              ? 'GAET tự hào hợp tác với các đơn vị, binh chủng trong Quân đội Nhân dân Việt Nam, mở rộng cơ hội và nâng cao năng lực sản xuất quốc phòng.' 
              : 'GAET is proud to cooperate with units and branches in the Vietnam People\'s Army, expanding opportunities and enhancing defense production capabilities.'}
          </p>
        </div>

        <div className="relative mt-12">
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gaet-50 transition-colors hidden md:flex"
            aria-label="Scroll left"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div 
            id="partners-container"
            className="flex overflow-x-auto gap-8 pb-8 px-4 scrollbar-hide scroll-smooth"
          >
            {partners.map((partner, index) => (
              <div 
                key={partner.id}
                className="flex-shrink-0 glass-card p-6 rounded-xl w-64 flex flex-col items-center justify-center text-center opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-24 w-full flex items-center justify-center mb-4">
                  <SmoothImage
                    id={`partner-${partner.id}`}
                    src={partner.logo}
                    alt={language === 'vi' ? partner.vi : partner.en}
                    className="h-full max-w-[150px]"
                    imgClassName="object-contain h-full"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {language === 'vi' ? partner.vi : partner.en}
                </h3>
              </div>
            ))}
          </div>
          
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gaet-50 transition-colors hidden md:flex"
            aria-label="Scroll right"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        
        <div className="text-center mt-10">
          <a href="/partners" className="btn-secondary inline-flex items-center">
            {language === 'vi' ? 'Xem tất cả đối tác' : 'View all partners'}
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
