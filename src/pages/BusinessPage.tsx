import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SmoothImage from '../components/ui/SmoothImage';
import { ArrowRight } from 'lucide-react';

interface BusinessAreaItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const BusinessPage: React.FC = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = language === 'vi' ? 'Lĩnh vực hoạt động - GAET' : 'Business Areas - GAET Corporation';
    
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, [language]);

  const businessAreas: BusinessAreaItem[] = [
    {
      id: 'military-trade',
      title: t('business.militaryTrade'),
      description: t('business.militaryTrade.desc'),
      imageUrl: '/assets/images/business-areas/military-trade.jpg'
    },
    {
      id: 'industrial-explosives',
      title: t('business.explosives'),
      description: t('business.explosives.desc'),
      imageUrl: '/assets/images/business-areas/industrial-explosives.jpg'
    },
    {
      id: 'defense-relations',
      title: t('business.defenseRelations'),
      description: t('business.defenseRelations.desc'),
      imageUrl: '/assets/images/business-areas/defense-relations.jpg'
    },
    {
      id: 'economic-export',
      title: t('business.economicExport'),
      description: t('business.economicExport.desc'),
      imageUrl: '/assets/images/business-areas/economic-export.jpg'
    },
    {
      id: 'other-activities',
      title: t('business.otherActivities'),
      description: t('business.otherActivities.desc'),
      imageUrl: '/assets/images/business-areas/other-activities.jpg'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="bg-gaet-700 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white text-center">
              {language === 'vi' ? 'Lĩnh vực hoạt động' : 'Business Areas'}
            </h1>
            <p className="text-white/80 text-center mt-4 max-w-3xl mx-auto">
              {language === 'vi'
                ? 'Tổng công ty GAET hoạt động đa ngành, đa lĩnh vực, từ thương mại quân sự, vật liệu nổ công nghiệp đến các hoạt động kinh tế dân sự.'
                : 'GAET Corporation operates in multiple industries and fields, from military trade, industrial explosives to civilian economic activities.'}
            </p>
          </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {businessAreas.slice(0, 3).map((area, index) => (
                <div 
                  key={area.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 opacity-0 animate-scale-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-48 overflow-hidden">
                    <SmoothImage
                      id={`business-${area.id}`}
                      src={area.imageUrl}
                      alt={area.title}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{area.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{area.description}</p>
                    <Link 
                      to={`/business/${area.id}`}
                      className="inline-flex items-center text-gaet-600 font-medium group-hover:text-gaet-700"
                    >
                      {t('business.learnMore')}
                      <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:w-2/3 mx-auto">
                {businessAreas.slice(3).map((area, index) => (
                  <div 
                    key={area.id} 
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 opacity-0 animate-scale-in group"
                    style={{ animationDelay: `${index * 100 + 300}ms` }}
                  >
                    <div className="h-48 overflow-hidden">
                      <SmoothImage
                        id={`business-${area.id}`}
                        src={area.imageUrl}
                        alt={area.title}
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">{area.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{area.description}</p>
                      <Link 
                        to={`/business/${area.id}`}
                        className="inline-flex items-center text-gaet-600 font-medium group-hover:text-gaet-700"
                      >
                        {t('business.learnMore')}
                        <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {language === 'vi' ? 'Phát triển bền vững' : 'Sustainable Development'}
              </h2>
              <p className="text-gray-600 mb-8">
                {language === 'vi'
                  ? 'Bên cạnh việc phát triển các lĩnh vực kinh doanh chủ lực, Tổng công ty GAET luôn đặt mục tiêu phát triển bền vững lên hàng đầu, đảm bảo sự hài hòa giữa lợi ích kinh tế và trách nhiệm xã hội.'
                  : 'In addition to developing key business areas, GAET Corporation always prioritizes sustainable development goals, ensuring harmony between economic benefits and social responsibility.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-gaet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gaet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {language === 'vi' ? 'Hiệu quả' : 'Efficiency'}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {language === 'vi'
                      ? 'Tối ưu hóa quy trình sản xuất và kinh doanh để đạt hiệu quả cao nhất.'
                      : 'Optimizing production and business processes to achieve maximum efficiency.'}
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-gaet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gaet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {language === 'vi' ? 'Bền vững' : 'Sustainability'}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {language === 'vi'
                      ? 'Đảm bảo các hoạt động kinh doanh tuân thủ các nguyên tắc bảo vệ môi trường.'
                      : 'Ensuring business activities comply with environmental protection principles.'}
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-gaet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gaet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {language === 'vi' ? 'Trách nhiệm xã hội' : 'Social Responsibility'}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {language === 'vi'
                      ? 'Đóng góp tích cực vào sự phát triển của cộng đồng và xã hội.'
                      : 'Contributing positively to the development of the community and society.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessPage;
