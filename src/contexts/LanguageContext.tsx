
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar items
  'home': {
    'vi': 'Trang chủ',
    'en': 'Home'
  },
  'about': {
    'vi': 'Giới thiệu',
    'en': 'About'
  },
  'business': {
    'vi': 'Lĩnh vực hoạt động',
    'en': 'Business Areas'
  },
  'news': {
    'vi': 'Tin tức & Sự kiện',
    'en': 'News & Events'
  },
  'subsidiaries': {
    'vi': 'Đơn vị thành viên',
    'en': 'Member Units'
  },
  'contact': {
    'vi': 'Liên hệ',
    'en': 'Contact'
  },
  'history': {
    'vi': 'Lịch sử phát triển',
    'en': 'History'
  },
  'vision': {
    'vi': 'Tầm nhìn và chiến lược',
    'en': 'Vision & Strategy'
  },
  'organization': {
    'vi': 'Sơ đồ tổ chức',
    'en': 'Organization'
  },
  'leadership': {
    'vi': 'Ban lãnh đạo',
    'en': 'Leadership'
  },
  
  // AboutSection
  'about.title': {
    'vi': 'Về chúng tôi',
    'en': 'About Us'
  },
  'about.companyName': {
    'vi': 'Tổng Công Ty Kinh Tế Kỹ Thuật Công Nghiệp Quốc Phòng',
    'en': 'General Corporation for Economics and Engineering Technology'
  },
  'about.description1': {
    'vi': 'Tổng công ty Kinh tế Kỹ thuật Công nghiệp quốc phòng (GAET) là đơn vị Quốc phòng-An ninh trực thuộc Tổng cục Công nghiệp Quốc phòng, Bộ Quốc phòng Việt Nam. Qua nhiều năm hình thành và phát triển, GAET đã khẳng định được vị thế và vai trò quan trọng trong lĩnh vực kinh tế kỹ thuật và công nghiệp quốc phòng.',
    'en': 'General Corporation for Economics and Engineering Technology (GAET) is a Defense-Security unit under the General Department of Defense Industry, Ministry of Defense of Vietnam. Through many years of formation and development, GAET has affirmed its position and important role in the field of technical economics and defense industry.'
  },
  'about.description2': {
    'vi': 'GAET được thành lập vào ngày 27/6/1962 và trải qua nhiều giai đoạn phát triển. GAET có chức năng kinh doanh đa ngành, đa lĩnh vực: xuất nhập khẩu trang thiết bị quân sự, kinh doanh vật liệu nổ công nghiệp, hoạt động đối ngoại quốc phòng, xuất khẩu các mặt hàng kinh tế, rà phá bom mìn, đào tạo nghề và xuất khẩu lao động.',
    'en': 'GAET was established on June 27, 1962 and has gone through many stages of development. GAET has multi-industry, multi-field business functions: import-export of military equipment, industrial explosives business, defense external relations, export of economic goods, mine clearance, vocational training and labor export.'
  },
  'about.learnMore': {
    'vi': 'Tìm hiểu thêm',
    'en': 'Learn More'
  },
  
  // About features
  'feature.globalVision': {
    'vi': 'Tầm nhìn toàn cầu',
    'en': 'Global Vision'
  },
  'feature.globalVision.desc': {
    'vi': 'Mở rộng thị trường quốc tế thông qua mạng lưới đối tác chiến lược trên khắp thế giới.',
    'en': 'Expanding international markets through a network of strategic partners around the world.'
  },
  'feature.professionalTeam': {
    'vi': 'Đội ngũ chuyên nghiệp',
    'en': 'Professional Team'
  },
  'feature.professionalTeam.desc': {
    'vi': 'Đội ngũ nhân sự với kinh nghiệm chuyên môn cao và kiến thức sâu rộng về các lĩnh vực kinh doanh.',
    'en': 'Personnel team with high professional experience and extensive knowledge in business fields.'
  },
  'feature.diverseFields': {
    'vi': 'Đa dạng lĩnh vực',
    'en': 'Diverse Fields'
  },
  'feature.diverseFields.desc': {
    'vi': 'Hoạt động trong nhiều lĩnh vực từ xuất nhập khẩu, công nghiệp quốc phòng đến đào tạo và phát triển nguồn nhân lực.',
    'en': 'Operating in many fields from import-export, defense industry to training and human resource development.'
  },
  'feature.advancedTech': {
    'vi': 'Công nghệ tiên tiến',
    'en': 'Advanced Technology'
  },
  'feature.advancedTech.desc': {
    'vi': 'Áp dụng công nghệ hiện đại và quy trình tiên tiến vào hoạt động sản xuất, kinh doanh.',
    'en': 'Applying modern technology and advanced processes to production and business activities.'
  },
  
  // Stats
  'stats.experience': {
    'vi': 'Năm kinh nghiệm',
    'en': 'Years of experience'
  },
  'stats.subsidiaries': {
    'vi': 'Công ty thành viên',
    'en': 'Subsidiaries'
  },
  'stats.partnerCountries': {
    'vi': 'Quốc gia đối tác',
    'en': 'Partner countries'
  },
  'stats.personnel': {
    'vi': 'Nhân sự',
    'en': 'Personnel'
  },
  
  // HeroSection
  'hero.company': {
    'vi': 'TỔNG CÔNG TY KINH TẾ KỸ THUẬT CÔNG NGHIỆP QUỐC PHÒNG',
    'en': 'GENERAL CORPORATION FOR ECONOMICS AND ENGINEERING TECHNOLOGY'
  },
  'hero.slogan': {
    'vi': 'LẤY TÍN TẠO TẦM',
    'en': 'BUILD STATURE BY TRUST'
  },
  'hero.description': {
    'vi': 'Doanh nghiệp quốc phòng, luôn đi đầu trong lĩnh vực chuyển giao công nghệ và xuất khẩu hàng công nghiệp quốc phòng.',
    'en': 'Defense enterprise, always leading in technology transfer and export of defense industry products.'
  },
  'hero.learnMore': {
    'vi': 'Tìm hiểu thêm',
    'en': 'Learn More'
  },
  'hero.contact': {
    'vi': 'Liên hệ ngay',
    'en': 'Contact Now'
  },
  
  // News section
  'news.backToHome': {
    'vi': 'Quay lại trang chủ',
    'en': 'Back to home'
  },
  'news.readMore': {
    'vi': 'Đọc tiếp',
    'en': 'Read more'
  },
  'news.loadingError': {
    'vi': 'Lỗi khi tải dữ liệu',
    'en': 'Error loading data'
  },
  'news.loadingErrorMessage': {
    'vi': 'Đã xảy ra lỗi khi tải tin tức. Vui lòng thử lại sau.',
    'en': 'An error occurred while loading news. Please try again later.'
  },
  
  // Homepage news section
  'news.section.title': {
    'vi': 'Tin tức & Sự kiện',
    'en': 'News & Events'
  },
  'news.section.latestNews': {
    'vi': 'Tin tức mới nhất',
    'en': 'Latest News'
  },
  'news.section.viewAll': {
    'vi': 'Xem tất cả tin tức',
    'en': 'View all news'
  },
  
  // Footer 
  'footer.contact': {
    'vi': 'Liên hệ',
    'en': 'Contact'
  },
  'footer.address': {
    'vi': '102 Kim Mã Thượng, Ba Đình, Hà Nội',
    'en': '102 Kim Ma Thuong, Ba Dinh, Hanoi, Vietnam'
  },
  'footer.businessAreas': {
    'vi': 'Lĩnh vực kinh doanh',
    'en': 'Business Areas'
  },
  'footer.militaryTrade': {
    'vi': 'HOẠT ĐỘNG THƯƠNG MẠI QUÂN SỰ',
    'en': 'MILITARY TRADE ACTIVITIES'
  },
  'footer.industrialExplosives': {
    'vi': 'Vật liệu nổ công nghiệp',
    'en': 'Industrial Explosives'
  },
  'footer.defenseRelations': {
    'vi': 'Đối ngoại quốc phòng',
    'en': 'Defense External Relations'
  },
  'footer.economicExport': {
    'vi': 'Xuất khẩu mặt hàng kinh tế',
    'en': 'Export of Economic Goods'
  },
  'footer.otherActivities': {
    'vi': 'Hoạt động khác',
    'en': 'Other Activities'
  },
  'footer.quickLinks': {
    'vi': 'Liên kết nhanh',
    'en': 'Quick Links'
  },
  'footer.home': {
    'vi': 'Trang chủ',
    'en': 'Home'
  },
  'footer.about': {
    'vi': 'Giới thiệu',
    'en': 'About'
  },
  'footer.businessAreas.menu': {
    'vi': 'Lĩnh vực kinh doanh',
    'en': 'Business Areas'
  },
  'footer.newsEvents': {
    'vi': 'Tin tức & Sự kiện',
    'en': 'News & Events'
  },
  'footer.memberUnits': {
    'vi': 'Đơn vị thành viên',
    'en': 'Member Units'
  },
  'footer.careerOpportunities': {
    'vi': 'Cơ hội nghề nghiệp',
    'en': 'Career Opportunities'
  },
  'footer.privacyPolicy': {
    'vi': 'Chính sách bảo mật',
    'en': 'Privacy Policy'
  },
  'footer.termsOfUse': {
    'vi': 'Điều khoản sử dụng',
    'en': 'Terms of Use'
  },
  'footer.sitemap': {
    'vi': 'Sơ đồ trang',
    'en': 'Sitemap'
  },
  'footer.copyright': {
    'vi': 'Tất cả các quyền được bảo lưu.',
    'en': 'All rights reserved.'
  },
  'footer.sendMessage': {
    'vi': 'Gửi tin nhắn',
    'en': 'Send a Message'
  },
  'footer.fullName': {
    'vi': 'Họ và tên',
    'en': 'Full Name'
  },
  'footer.subject': {
    'vi': 'Tiêu đề',
    'en': 'Subject'
  },
  'footer.message': {
    'vi': 'Nội dung tin nhắn',
    'en': 'Your message'
  },
  'footer.send': {
    'vi': 'Gửi tin nhắn',
    'en': 'Send Message'
  },
  
  // BusinessSection
  'business.title': {
    'vi': 'Lĩnh vực hoạt động',
    'en': 'Business Areas'
  },
  'business.description': {
    'vi': 'Trong quá trình hoạt động kinh doanh, GAET đã thu được nhiều thành công nhờ sự nhạy bén, linh hoạt trong cơ chế thị trường. Với các đơn vị xuyên suốt từ Bắc đến Nam tạo sức mạnh tổng hợp khẳng định thương hiệu GAET trong suốt quá trình xây dựng, bảo vệ Tổ quốc và hội nhập kinh tế quốc tế.',
    'en': 'During its business operations, GAET has achieved many successes thanks to its acumen and flexibility in the market mechanism. With units throughout the country from North to South, it creates a combined strength affirming the GAET brand throughout the process of building, protecting the country and international economic integration.'
  },
  
  // Business areas
  'business.militaryTrade': {
    'vi': 'HOẠT ĐỘNG THƯƠNG MẠI QUÂN SỰ',
    'en': 'MILITARY TRADE ACTIVITIES'
  },
  'business.militaryTrade.desc': {
    'vi': 'GAET là doanh nghiệp Quốc phòng - An ninh hàng đầu của Bộ Quốc phòng Việt Nam có chức năng kinh doanh thương mại quân sự, với nhiều năm kinh nghiệm trong lĩnh vực xuất nhập khẩu các mặt hàng quân sự. Trong đó, GAET tập trung vào 3 lĩnh vực chính:',
    'en': 'GAET is a leading Defense - Security enterprise of the Ministry of National Defense of Vietnam with the function of military trade business, with many years of experience in the field of import and export of military goods. In particular, GAET focuses on 3 main areas:'
  },
  'business.explosives': {
    'vi': 'KINH DOANH VẬT LIỆU NỔ CÔNG NGHIỆP',
    'en': 'INDUSTRIAL EXPLOSIVES BUSINESS'
  },
  'business.explosives.desc': {
    'vi': 'GAET được biết đến là đầu mối duy nhất của Bộ Quốc phòng Việt Nam được phép kinh doanh Vật liệu nổ công nghiệp phục vụ nền kinh tế quốc dân. Nhiều năm liền, GAET luôn là điểm sáng của toàn quân trong thực hiện nhiệm vụ kinh tế.',
    'en': 'GAET is known as the sole focal point of the Ministry of Defense of Vietnam authorized to trade in Industrial Explosives for the national economy. For many years, GAET has always been a bright spot of the entire military in performing economic tasks.'
  },
  'business.defenseRelations': {
    'vi': 'HOẠT ĐỘNG ĐỐI NGOẠI QUỐC PHÒNG',
    'en': 'DEFENSE EXTERNAL RELATIONS'
  },
  'business.defenseRelations.desc': {
    'vi': 'GAET được BQP và Tổng cục Công nghiệp quốc phòng giao nhiệm vụ tham gia thực hiện nhiều hoạt động Đối ngoại Quốc phòng.',
    'en': 'GAET has been assigned by the Ministry of Defense and the General Department of Defense Industry to participate in many Defense External Relations activities.'
  },
  'business.economicExport': {
    'vi': 'XUẤT NHẬP KHẨU VÀ KINH DOANH CÁC MẶT HÀNG KINH TẾ',
    'en': 'IMPORT-EXPORT AND TRADING OF ECONOMIC GOODS'
  },
  'business.economicExport.desc': {
    'vi': 'GAET tự hào khẳng định lợi thế cạnh tranh khác biệt và được đối tác đánh giá cao các hoạt động cung cấp dịch vụ, chuyên xử lý các đơn hàng với số lượng lớn trong thời gian ngắn nhất trên thị trường.',
    'en': 'GAET proudly affirms its distinct competitive advantage and is highly appreciated by partners for its service provision activities, specializing in processing large orders in the shortest time on the market.'
  },
  'business.otherActivities': {
    'vi': 'DỊCH VỤ',
    'en': 'SERVICES'
  },
  'business.otherActivities.desc': {
    'vi': 'GAET cung cấp nhiều dịch vụ đa dạng từ Khoan nổ mìn trọn gói, Rà phá bom mìn, Dịch vụ dầu khí đến Đào tạo nghề, Sản xuất cơ khí, và Sản xuất hòm hộp.',
    'en': 'GAET provides diverse services from Comprehensive Drilling and Blasting, Mine Clearance, Oil and Gas Services to Vocational Training, Precision Mechanical Manufacturing, and Box Production.'
  },
  'business.learnMore': {
    'vi': 'Tìm hiểu thêm',
    'en': 'Learn More'
  },
};

const defaultLanguageContext: LanguageContextType = {
  language: 'vi',
  setLanguage: () => {},
  t: (key: string) => key,
};

export const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Check URL for language parameter
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      
      if (langParam === 'en') {
        return 'en';
      }
    }
    return 'vi'; // Default language
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  // Update document language attribute
  useEffect(() => {
    document.documentElement.lang = language;
    
    // Update URL when language changes (optional)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      
      if (language === 'en') {
        url.searchParams.set('lang', 'en');
      } else {
        url.searchParams.delete('lang');
      }
      
      // Use history API to update URL without page reload
      window.history.replaceState({}, '', url.toString());
    }
  }, [language]);

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
