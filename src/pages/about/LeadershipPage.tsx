import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

type LeadershipPosition = {
  position: {
    vi: string;
    en: string;
  };
  name: string;
  rank: {
    vi: string;
    en: string;
  };
  imageUrl: string;
  description?: {
    vi: string;
    en: string;
  };
};

const LeadershipPage: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = language === 'vi' ? 'Ban lãnh đạo - GAET' : 'Leadership - GAET Corporation';
    
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, [language]);

  const leadershipTeam: LeadershipPosition[] = [
    {
      position: {
        vi: 'Chủ tịch HĐTV',
        en: 'Chairman of the Board',
      },
      name: 'Nguyễn Anh Tuấn',
      rank: {
        vi: 'Đại tá',
        en: 'Colonel',
      },
      imageUrl: '/assets/images/leadership/chairman.jpg',
      description: {
        vi: 'Đại tá Nguyễn Anh Tuấn là Chủ tịch Hội đồng thành viên của Tổng công ty Kinh tế Kỹ thuật Công nghiệp Quốc phòng.',
        en: 'Colonel Nguyen Anh Tuan is the Chairman of the Board of Members of Defense Economic Technical Industry Corporation.',
      },
    },
    {
      position: {
        vi: 'Tổng Giám đốc',
        en: 'General Director',
      },
      name: 'Phan Chiến Thắng',
      rank: {
        vi: 'Đại tá',
        en: 'Colonel',
      },
      imageUrl: '/assets/images/leadership/ceo.jpg',
      description: {
        vi: 'Đại tá Phan Chiến Thắng là Tổng Giám đốc Tổng công ty Kinh tế Kỹ thuật Công nghiệp Quốc phòng.',
        en: 'Colonel Phan Chien Thang is the General Director of Defense Economic Technical Industry Corporation.',
      },
    },
    {
      position: {
        vi: 'Phó Tổng Giám đốc',
        en: 'Deputy General Director',
      },
      name: 'Nguyễn Thanh Hải',
      rank: {
        vi: 'Trung tá',
        en: 'Lieutenant Colonel',
      },
      imageUrl: '/assets/images/leadership/deputy1.jpg',
    },
    {
      position: {
        vi: 'Phó Tổng Giám đốc',
        en: 'Deputy General Director',
      },
      name: 'Nguyễn Văn Hải',
      rank: {
        vi: 'Thượng tá',
        en: 'Senior Colonel',
      },
      imageUrl: '/assets/images/leadership/deputy2.jpg',
    },
    {
      position: {
        vi: 'Phó Tổng Giám đốc',
        en: 'Deputy General Director',
      },
      name: 'Phạm Anh Tú',
      rank: {
        vi: 'Đại tá',
        en: 'Colonel',
      },
      imageUrl: '/assets/images/leadership/deputy3.jpg',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="bg-gaet-700 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white text-center">
              {language === 'vi' ? 'Ban lãnh đạo' : 'Leadership'}
            </h1>
          </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="prose prose-lg mx-auto mb-16">
              <h2 className="text-2xl font-bold text-gaet-700 mb-6">
                {language === 'vi' ? 'Hội đồng thành viên và Ban Tổng Giám đốc' : 'Board of Members and Executive Management'}
              </h2>
              <p>
                {language === 'vi' 
                  ? 'Ban lãnh đạo của Tổng công ty Kinh tế Kỹ thuật Công nghiệp Quốc phòng (GAET) bao gồm những cán bộ quản lý có năng lực và kinh nghiệm, với tinh thần trách nhiệm cao, luôn hướng đến mục tiêu phát triển bền vững của Tổng công ty.'
                  : 'The leadership of the Defense Economic Technical Industry Corporation (GAET) consists of capable and experienced managers, with a high sense of responsibility, always aiming at the sustainable development goals of the Corporation.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipTeam.map((leader, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 opacity-0 animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="h-64 overflow-hidden bg-gray-100">
                    <div className="w-full h-full flex items-center justify-center">
                      {leader.imageUrl ? (
                        <img 
                          src={leader.imageUrl} 
                          alt={`${leader.rank[language === 'vi' ? 'vi' : 'en']} ${leader.name}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/assets/images/leadership/placeholder.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gaet-600 flex items-center justify-center">
                          <span className="text-white text-4xl font-bold">
                            {leader.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium bg-gaet-50 text-gaet-700 px-2 py-1 rounded">
                        {leader.position[language === 'vi' ? 'vi' : 'en']}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {leader.rank[language === 'vi' ? 'vi' : 'en']} {leader.name}
                    </h3>
                    
                    {leader.description && (
                      <p className="text-gray-600 mt-3 text-sm">
                        {leader.description[language === 'vi' ? 'vi' : 'en']}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="prose prose-lg mx-auto mt-16">
              <h2 className="text-2xl font-bold text-gaet-700 mb-6">
                {language === 'vi' ? 'Cơ cấu tổ chức' : 'Organizational Structure'}
              </h2>
              <p>
                {language === 'vi' 
                  ? 'Cơ cấu tổ chức của GAET được xây dựng một cách khoa học và hiệu quả, bao gồm Hội đồng thành viên, Ban Tổng Giám đốc, các phòng ban chức năng và các đơn vị trực thuộc, đảm bảo sự vận hành thông suốt và hiệu quả của Tổng công ty.'
                  : 'GAET\'s organizational structure is built in a scientific and efficient manner, including the Board of Members, the Executive Management Board, functional departments and subordinate units, ensuring the smooth and efficient operation of the Corporation.'}
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LeadershipPage;
