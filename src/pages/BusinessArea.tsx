import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SmoothImage from '../components/ui/SmoothImage';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const additionalImages = {
  'import-export': [
    "https://cdn.gpteng.co/resources/6727bae6-fb8d-465c-a993-8dce41dced45/import-export-2.jpg",
    "https://cdn.gpteng.co/resources/6727bae6-fb8d-465c-a993-8dce41dced45/import-export-3.jpg",
  ],
  'explosives': [
    "https://cdn.gpteng.co/resources/6727bae6-fb8d-465c-a993-8dce41dced45/explosives-2.jpg",
    "https://cdn.gpteng.co/resources/6727bae6-fb8d-465c-a993-8dce41dced45/explosives-3.jpg",
  ],
  'vocational-training': [
    "https://cdn.gpteng.co/resources/6727bae6-fb8d-465c-a993-8dce41dced45/training-2.jpg",
    "https://cdn.gpteng.co/resources/6727bae6-fb8d-465c-a993-8dce41dced45/training-3.jpg",
  ],
  'defense-production': [
    "https://cdn.gpteng.co/resources/6727bae6-fb8d-465c-a993-8dce41dced45/defense-2.jpg",
    "https://cdn.gpteng.co/resources/6727bae6-fb8d-465c-a993-8dce41dced45/defense-3.jpg",
  ],
  'transportation': [
    "https://cdn.gpteng.co/resources/6727bae6-fb8d-465c-a993-8dce41dced45/transportation-2.jpg",
    "https://cdn.gpteng.co/resources/6727bae6-fb8d-465c-a993-8dce41dced45/transportation-3.jpg",
  ],
  'industrial-production': [
    "https://cdn.gpteng.co/resources/6727bae6-fb8d-465c-a993-8dce41dced45/industrial-2.jpg",
    "https://cdn.gpteng.co/resources/6727bae6-fb8d-465c-a993-8dce41dced45/industrial-3.jpg",
  ],
};

const businessAreas = {
  'military-trade': {
    id: 1,
    titleKey: 'business.militaryTrade',
    descriptionKey: 'business.militaryTrade.desc',
    image: "/assets/images/business-areas/military-trade.jpg",
    contentKeys: {
      overview: {
        vi: 'GAET là doanh nghiệp Quốc phòng - An ninh hàng đầu của Bộ Quốc phòng Việt Nam có chức năng kinh doanh thương mại quân sự, với nhiều năm kinh nghiệm trong lĩnh vực xuất nhập khẩu các mặt hàng quân sự. Trong đó, GAET tập trung vào 3 lĩnh vực chính. Với đội ngũ cán bộ chuyên nghiệp, có trình độ chuyên môn cao, am hiểu sâu rộng về khí tài quân sự, GAET đã và đang thực hiện nhiều hợp đồng cung cấp trang thiết bị, khí tài quân sự cho Bộ Quốc phòng và nhiều đối tác trong và ngoài nước.',
        en: 'GAET is a leading Defense - Security enterprise of the Ministry of National Defense of Vietnam with the function of military trade business, with many years of experience in the field of import and export of military goods. In particular, GAET focuses on 3 main areas. With a professional team of highly qualified staff with extensive knowledge of military equipment, GAET has been implementing many contracts to supply equipment and military hardware to the Ministry of Defense and many partners at home and abroad.'
      },
      activities: {
        vi: [
          'THỰC HIỆN NHIỆM VỤ MUA SẮM VŨ KHÍ, TRANG THIẾT BỊ CHO BỘ QUỐC PHÒNG VIỆT NAM: GAET từ lâu đã là nhà cung cấp các sản phẩm và dịch vụ có uy tín nhằm nâng cao năng lực và sức mạnh chiến đấu của các Quân, Binh chủng và năng lực sản xuất của các nhà máy quốc phòng. Hàng năm, GAET có mặt ở nhiều quốc gia trên khắp thế giới để gặp gỡ, tìm hiểu năng lực của các nhà sản xuất, các nhà cung cấp nhằm tìm kiếm những đối tác và sản phẩm vũ khí trang bị tốt nhất, phù hợp nhất để cung cấp cho Bộ Quốc phòng Việt Nam.',
          'CHUYỂN GIAO CÔNG NGHỆ SẢN XUẤT, SỬA CHỮA, CẢI TIẾN, NÂNG CẤP VŨ KHÍ, TRANG BỊ VÀ KHÍ TÀI QUÂN SỰ: GAET tự hào là doanh nghiệp tiên phong của Bộ Quốc phòng Việt nam triển khai hàng loạt các dự án tiếp nhận chuyển giao công nghệ đồng bộ phục vụ sản xuất quốc phòng. Với quy trình thực hiện dự án chuyên nghiệp, đội ngũ nhân lực có trình độ cao, năng lực tốt, GAET đã thực hiện thành công nhiều dự án, đảm bảo tiến độ, chất lượng tốt nhất. Bên cạnh đó, GAET đã thực hiện hiệu quả các dự án sửa chữa, cải tiến nâng cấp vũ khí, trang bị của các Quân Binh chủng giúp tiết kiệm ngân sách đầu tư mua mới, đồng thời nâng cao sức chiến đấu của vũ khí trang bị, khí tài hiện có, từ đó nâng cao sức chiến đấu của Quân đội nhân dân Việt Nam góp phần hoàn thành nhiệm vụ bảo vệ Tổ quốc trong tình hình mới.',
          'XUẤT KHẨU CÁC SẢN PHẨM CÔNG NGHIỆP QUỐC PHÒNG DO VIỆT NAM SẢN XUẤT: GAET tự hào là đơn vị tiên phong, đi đầu trong hoạt động xúc tiến, thúc đẩy xuất khẩu sản phẩm CNQP do Việt Nam sản xuất, giá trị xuất khẩu hàng năm lên tới hàng trăm triệu USD. Với đội ngũ chuyên gia hàng đầu, mối quan hệ đối tác bền chặt với các nhà máy của Tổng cục Công nghiệp quốc phòng. GAET đã luôn nỗ lực hết mình để mang lại những giá trị tốt nhất cho ngành Công nghiệp quốc phòng Việt Nam cũng như cho đối tác, bạn hàng.'
        ],
        en: [
          'PERFORMING THE TASK OF PURCHASING WEAPONS AND EQUIPMENT FOR THE MINISTRY OF NATIONAL DEFENSE OF VIETNAM: GAET has long been a reputable provider of products and services to enhance the capabilities and combat strength of the Armed Forces and the production capacity of defense factories. Each year, GAET is present in many countries around the world to meet and understand the capabilities of manufacturers and suppliers to find the best and most suitable partners and weapons equipment products to supply to the Ministry of National Defense of Vietnam.',
          'TRANSFERRING TECHNOLOGY FOR THE PRODUCTION, REPAIR, IMPROVEMENT, AND UPGRADING OF WEAPONS, EQUIPMENT, AND MILITARY EQUIPMENT: GAET is proud to be a pioneering enterprise of the Ministry of Defense of Vietnam implementing a series of integrated technology transfer projects for defense production. With professional project implementation processes, highly qualified and capable personnel, GAET has successfully implemented many projects, ensuring the best progress and quality. Additionally, GAET has effectively implemented repair and improvement projects for weapons and equipment of the Armed Forces, helping to save the budget for new purchases while enhancing the combat capabilities of existing weapons and equipment, thereby increasing the combat strength of the Vietnam People\'s Army, contributing to the completion of the mission of defending the country in the new situation.',
          'EXPORTING DEFENSE INDUSTRY PRODUCTS MANUFACTURED BY VIETNAM: GAET is proud to be a pioneer in promoting and boosting the export of defense industry products manufactured by Vietnam, with annual export values reaching hundreds of millions of USD. With a team of top experts and strong partnerships with factories of the General Department of Defense Industry, GAET has always made every effort to bring the best values to Vietnam\'s defense industry as well as to partners and customers.'
        ]
      }
    }
  },
  'industrial-explosives': {
    id: 2,
    titleKey: 'business.explosives',
    descriptionKey: 'business.explosives.desc',
    image: "/assets/images/business-areas/industrial-explosives.jpg",
    contentKeys: {
      overview: {
        vi: 'GAET được biết đến là đầu mối duy nhất của Bộ Quốc phòng Việt Nam được phép kinh doanh Vật liệu nổ công nghiệp phục vụ nền kinh tế quốc dân. Nhiều năm liền, GAET luôn là điểm sáng của toàn quân trong thực hiện nhiệm vụ kinh tế. Tổng công ty có mạng lưới phân phối rộng khắp với các chi nhánh và đơn vị thành viên trải dài từ Bắc vào Nam, đáp ứng đầy đủ nhu cầu của khách hàng trên mọi miền đất nước.',
        en: 'GAET is known as the sole focal point of the Ministry of Defense of Vietnam authorized to trade in Industrial Explosives for the national economy. For many years, GAET has always been a bright spot of the entire military in performing economic tasks. The Corporation has a wide distribution network with branches and member units stretching from North to South, fully meeting the needs of customers in all regions of the country.'
      },
      projects: {
        vi: [
          'Hầm đường bộ Đèo Hải Vân',
          'Thủy điện Sơn La',
          'Thủy điện Đồng Nai 3',
          'Thủy điện Đồng Nai 4',
          'Thủy điện Sông Tranh - Quảng Nam',
          'Thủy điện Serepok 3',
          'Thủy điện Buôn Kuop - Đak Lawk',
          'đường mòn Hồ Chí Minh'
        ],
        en: [
          'Hai Van Pass Tunnel',
          'Son La Hydropower',
          'Dong Nai 3 Hydropower',
          'Dong Nai 4 Hydropower',
          'Song Tranh Hydropower - Quang Nam',
          'Serepok 3 Hydropower',
          'Buon Kuop Hydropower - Dak Lak',
          'Ho Chi Minh Trail'
        ]
      }
    }
  },
  'defense-relations': {
    id: 3,
    titleKey: 'business.defenseRelations',
    descriptionKey: 'business.defenseRelations.desc',
    image: "/assets/images/business-areas/defense-relations.jpg",
    contentKeys: {
      overview: {
        vi: 'GAET được BQP và Tổng cục Công nghiệp quốc phòng giao nhiệm vụ tham gia thực hiện nhiều hoạt động Đối ngoại Quốc phòng. Hoạt động đối ngoại quốc phòng của GAET không chỉ góp phần quảng bá hình ảnh của quân đội và đất nước Việt Nam mà còn tạo điều kiện cho các doanh nghiệp trong và ngoài quân đội có cơ hội giao lưu, học hỏi kinh nghiệm và hợp tác phát triển.',
        en: 'GAET has been assigned by the Ministry of Defense and the General Department of Defense Industry to participate in many Defense External Relations activities. GAET\'s defense external relations activities not only contribute to promoting the image of the military and the country of Vietnam but also create opportunities for businesses inside and outside the military to exchange, learn from experience, and cooperate for development.'
      },
      activities: {
        vi: [
          'GAET là doanh nghiệp kết nối, là địa chỉ tin cậy để các đối tác nước ngoài giới thiệu các công nghệ quốc phòng, sản phẩm quân sự tới các cơ quan, đơn vị của Bộ Quốc phòng Việt Nam.',
          'GAET đã tham gia trưng bày, quảng bá các sản phẩm kinh tế và sản phẩm công nghiệp quốc phòng do Việt Nam sản xuất tại nhiều Triển lãm trong nước và quốc tế. GAET tự hào là thành viên Ban tổ chức Triển lãm DSE 2019, Triển lãm Quốc phòng Quốc tế Việt Nam 2022 và 2024.',
          'GAET đã thực hiện tốt nhiệm vụ mua sắm, nhập khẩu vật tư, trang thiết bị phục vụ cho hoạt động gìn giữ hòa bình của Liên Hợp Quốc tại Nam Xu- Đăng.'
        ],
        en: [
          'GAET is a connecting enterprise, a reliable address for foreign partners to introduce defense technologies and military products to agencies and units of the Ministry of Defense of Vietnam.',
          'GAET has participated in exhibiting and promoting economic products and defense industry products manufactured by Vietnam at many domestic and international exhibitions. GAET is proud to be a member of the Organizing Committee of DSE 2019, Vietnam International Defense Exhibition 2022 and 2024.',
          'GAET has successfully performed the task of purchasing and importing materials and equipment for United Nations peacekeeping operations in South Sudan.'
        ]
      }
    }
  },
  'economic-export': {
    id: 4,
    titleKey: 'business.economicExport',
    descriptionKey: 'business.economicExport.desc',
    image: "/assets/images/business-areas/economic-export.jpg",
    contentKeys: {
      overview: {
        vi: 'GAET tự hào khẳng định lợi thế cạnh tranh khác biệt và được đối tác đánh giá cao các hoạt động cung cấp dịch vụ, chuyên xử lý các đơn hàng với số lượng lớn trong thời gian ngắn nhất trên thị trường. Với sự hợp tác lâu năm của GAET và các nhà sản xuất trong nước và quốc tế, GAET khẳng định sẽ cung cấp những sản phẩm chất lượng tốt nhất với giá thành cạnh tranh nhất phục vụ phát triển kinh tế.',
        en: 'GAET proudly affirms its distinct competitive advantage and is highly appreciated by partners for its service provision activities, specializing in processing large orders in the shortest time on the market. With the long-term cooperation between GAET and domestic and international manufacturers, GAET affirms that it will provide the best quality products at the most competitive prices to serve economic development.'
      }
    }
  },
  'other-activities': {
    id: 5,
    titleKey: 'business.otherActivities',
    descriptionKey: 'business.otherActivities.desc',
    image: "/assets/images/business-areas/other-activities.jpg",
    contentKeys: {
      overview: {
        vi: 'GAET cung cấp nhiều dịch vụ đa dạng với đội ngũ chuyên gia giàu kinh nghiệm và trang thiết bị hiện đại. Các dịch vụ của GAET đều được khách hàng và đối tác đánh giá cao về chất lượng và hiệu quả.',
        en: 'GAET provides diverse services with a team of experienced experts and modern equipment. GAET\'s services are highly rated by customers and partners for quality and efficiency.'
      },
      services: {
        vi: [
          {
            title: 'KHOAN NỔ MÌN TRỌN GÓI',
            details: [
              'GAET đánh giá dịch vụ nổ mìn trọn gói là hướng đi phát triển bền vững góp phần khẳng định vị thế cạnh tranh trong lĩnh vực cung cấp dịch vụ khoan, nổ mìn gần với dịch vụ cung ứng vật liệu nổ công nghiệp.',
              'GAET ghi dấu ấn trong việc triển khai thành công nhiều dự án nổ mìn dưới nước được đối tác và cơ quan chức năng đánh giá cao.'
            ]
          },
          {
            title: 'RÀ PHÁ BOM MÌN, VẬT NỔ',
            details: [
              'GAET đang đặt mục tiêu sẽ tạo nên một ngành nghề thế mạnh đặc thù nhằm góp phần hồi sinh những vùng đất chết.',
              'GAET cung cấp các giải pháp rà phá bom mìn và xử lý vật liệu nổ nhằm đáp ứng các nhu cầu khác nhau, bao gồm rà phá trên diện rộng và trên địa hình phức tạp.'
            ]
          },
          {
            title: 'KINH DOANH DỊCH VỤ DẦU KHÍ',
            details: [
              'GAET được Thủ tướng Chính phủ giao nhiệm vụ là đầu mối làm thủ tục nhập khẩu vật liệu nổ công nghiệp dùng cho thăm dò và khai thác dầu khí tại Việt Nam.',
              'GAET được vinh danh là một trong 20 nhà cung cấp dịch vụ tiêu biểu của ngành Dầu khí năm 2017.'
            ]
          },
          {
            title: 'ĐÀO TẠO NGHỀ VÀ XUẤT NHẬP KHẨU LAO ĐỘNG',
            details: [
              'GAET là đơn vị duy nhất của Bộ Quốc phòng có chức năng đào tạo, trao đổi thực tập sinh, xuất khẩu lao động sang các nước.'
            ]
          },
          {
            title: 'SẢN XUẤT CƠ KHÍ CHÍNH XÁC',
            details: [
              'GAET có năng lực sản xuất một số sản phẩm cơ khí chất lượng tới các thị trường quốc tế như : bánh răng , trục cầu xe , máy cưa vòng ...'
            ]
          },
          {
            title: 'SẢN XUẤT HÒM HỘP',
            details: [
              'GAET luôn sẵn sàng đáp ứng đầy đủ nhu cầu đa dạng của khách hàng về hình thức mẫu mã , chất lượng sản phẩm và tiến độ góp phần khẳng định được vị thế và thương hiệu Việt trên thị trường .'
            ]
          }
        ],
        en: [
          {
            title: 'COMPREHENSIVE DRILLING AND BLASTING',
            details: [
              'GAET evaluates comprehensive blasting services as a sustainable development direction, contributing to affirming its competitive position in the field of drilling and blasting services closely related to industrial explosive supply services.',
              'GAET has made its mark in successfully implementing many underwater blasting projects that are highly appreciated by partners and authorities.'
            ]
          },
          {
            title: 'MINE CLEARANCE AND EXPLOSIVES HANDLING',
            details: [
              'GAET is aiming to create a distinctive industry strength to help revitalize dead land areas.',
              'GAET provides mine clearance and explosives handling solutions to meet various needs, including wide-area clearance and clearance on complex terrain.'
            ]
          },
          {
            title: 'OIL AND GAS SERVICES',
            details: [
              'GAET has been assigned by the Prime Minister to be the focal point for import procedures of industrial explosives used for oil and gas exploration and exploitation in Vietnam.',
              'GAET was honored as one of the 20 exemplary service providers in the Oil and Gas industry in 2017.'
            ]
          },
          {
            title: 'VOCATIONAL TRAINING AND LABOR EXPORT',
            details: [
              'GAET is the only unit of the Ministry of Defense with the function of training, exchanging interns, and exporting labor to other countries.'
            ]
          },
          {
            title: 'PRECISION MECHANICAL MANUFACTURING',
            details: [
              'GAET has the capacity to produce several quality mechanical products for international markets such as: gears, axle shafts, band saws...'
            ]
          },
          {
            title: 'BOX PRODUCTION',
            details: [
              'GAET is always ready to fully meet the diverse needs of customers in terms of design, product quality, and progress, contributing to affirming the position and Vietnamese brand in the market.'
            ]
          }
        ]
      }
    }
  }
};

const getRelatedAreas = (currentId: string, count: number = 2) => {
  // Convert numeric ID to string ID if necessary
  let idToFind = currentId;
  if (!isNaN(Number(currentId))) {
    // If areaId is a number, map it to the corresponding string ID
    const areaEntries = Object.entries(businessAreas);
    const foundEntry = areaEntries.find(([_, area]) => area.id === Number(currentId));
    if (foundEntry) {
      idToFind = foundEntry[0];
    }
  }

  const allAreas = Object.entries(businessAreas);
  const filteredAreas = allAreas.filter(([id]) => id !== idToFind);
  return filteredAreas
    .sort(() => 0.5 - Math.random())
    .slice(0, count)
    .map(([id, area]) => ({ id, ...area }));
};

// Gallery image interface
interface GalleryImage {
  id: string;
  business_area_id: string;
  image_url: string;
  alt_text?: string;
  sort_order?: number;
  created_at: string;
}

const BusinessArea = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [relatedAreas, setRelatedAreas] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  
  // Handle both string IDs and numeric IDs
  let area;
  if (!isNaN(Number(areaId))) {
    // If areaId is a number, find the corresponding area by ID
    const areaEntry = Object.entries(businessAreas).find(([_, area]) => area.id === Number(areaId));
    area = areaEntry ? areaEntry[1] : undefined;
  } else {
    // If areaId is a string (like 'military-trade'), use it directly
    area = businessAreas[areaId as keyof typeof businessAreas];
  }
  
  // Function to fetch gallery images from Supabase
  const fetchGalleryImages = useCallback(async () => {
    if (!areaId) return;
    
    try {
      setLoadingGallery(true);
      const { data, error } = await supabase
        .from('business_area_gallery')
        .select('*')
        .eq('business_area_id', areaId)
        .order('sort_order', { ascending: true });
        
      if (error) {
        console.error('Error fetching gallery images:', error);
        return;
      }
      
      setGalleryImages(data || []);
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
    } finally {
      setLoadingGallery(false);
    }
  }, [areaId]);

  useEffect(() => {
    if (!area) {
      navigate('/404');
      return;
    }
    
    window.scrollTo(0, 0);
    setRelatedAreas(getRelatedAreas(areaId as string));
    fetchGalleryImages();
    
    document.title = language === 'vi' 
      ? `${t(area.titleKey)} - GAET` 
      : `${t(area.titleKey)} - GAET Corporation`;
  }, [area, areaId, navigate, language, t, fetchGalleryImages]);
  
  if (!area) return null;

  const images = additionalImages[areaId as keyof typeof additionalImages] || [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <SmoothImage
            id={`business-hero-${area.id}`}
            src={area.image}
            alt={t(area.titleKey)}
            className="w-full h-full"
            imgClassName="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 flex items-end justify-center pb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                  {t(area.titleKey)}
                </h1>
                <p className="text-xl text-white/80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  {t(area.descriptionKey)}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6 flex items-center justify-between border-b">
          <Link 
            to="/"
            className="inline-flex items-center text-gaet-600 hover:text-gaet-700"
          >
            <ArrowLeft size={16} className="mr-2" />
            {language === 'vi' ? 'Quay lại trang chủ' : 'Back to home'}
          </Link>
          
          <nav className="hidden md:flex space-x-4">
            <a href="#overview" className="text-gray-600 hover:text-gaet-600">
              {language === 'vi' ? 'Tổng quan' : 'Overview'}
            </a>
            <a href="#activities" className="text-gray-600 hover:text-gaet-600">
              {language === 'vi' ? 'Hoạt động chính' : 'Main Activities'}
            </a>
            <a href="#gallery" className="text-gray-600 hover:text-gaet-600">
              {language === 'vi' ? 'Hình ảnh' : 'Gallery'}
            </a>
            <a href="#related" className="text-gray-600 hover:text-gaet-600">
              {language === 'vi' ? 'Lĩnh vực liên quan' : 'Related Areas'}
            </a>
          </nav>
        </div>
        
        <section id="overview" className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 relative inline-block">
                {language === 'vi' ? 'Tổng quan' : 'Overview'}
                <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-gaet-500"></div>
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {area.contentKeys.overview[language]}
              </p>
            </div>
            
            {/* Images section removed as requested */}
          </div>
        </section>
        
        <section id="activities" className="bg-gradient-to-br from-gaet-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                <span className="relative inline-block">
                  {language === 'vi' ? 'Hoạt động chính' : 'Main Activities'}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gaet-500"></div>
                </span>
              </h2>
              
              {areaId === 'military-trade' ? (
                <div className="space-y-8">
                  {area.contentKeys.activities[language].map((activity, index) => {
                    // Split the activity at the colon to separate title and description
                    const parts = activity.split(': ');
                    const title = parts[0];
                    const description = parts.length > 1 ? parts[1] : '';
                    
                    return (
                      <div 
                        key={index} 
                        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-gaet-100 rounded-full p-2 flex-shrink-0">
                            <div className="bg-gaet-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                              {String(index + 1).padStart(2, '0')}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
                            <p className="text-gray-700 leading-relaxed">{description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : areaId === 'industrial-explosives' ? (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                    {language === 'vi' ? 'Các dự án tiêu biểu' : 'Notable Projects'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {area.contentKeys.projects[language].map((project, index) => (
                      <div 
                        key={index} 
                        className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-gaet-100 text-gaet-700 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                            {index + 1}
                          </div>
                          <h4 className="text-md font-medium text-gray-800">{project}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : areaId === 'other-activities' ? (
                <div className="space-y-8">
                  {area.contentKeys.services[language].map((service, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-gaet-100 rounded-full p-2 flex-shrink-0">
                          <div className="bg-gaet-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                        </div>
                        <div className="w-full">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                            {service.title}
                          </h3>
                          <div className="space-y-3">
                            {service.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-gray-700 leading-relaxed">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {area.contentKeys.activities ? area.contentKeys.activities[language].map((activity, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start gap-4"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CheckCircle2 className="text-gaet-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {language === 'vi' ? `Hoạt động ${index + 1}` : `Activity ${index + 1}`}
                        </h3>
                        <p className="text-gray-700">{activity}</p>
                      </div>
                    </div>
                  )) : <p className="text-center text-gray-500">No activities listed.</p>}
                </div>
              )}
              
              <div className="mt-12 bg-gaet-700 text-white p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">
                  {language === 'vi' ? 'Cam kết của chúng tôi' : 'Our Commitment'}
                </h3>
                <p className="leading-relaxed">
                  {language === 'vi' 
                    ? 'Với nhiều năm kinh nghiệm trong lĩnh vực này, GAET cam kết mang đến những giải pháp tối ưu, đáp ứng mọi yêu cầu của khách hàng. Chúng tôi luôn đặt chất lượng và sự hài lòng của khách hàng lên hàng đầu.'
                    : 'With many years of experience in this field, GAET is committed to providing optimal solutions to meet all customer requirements. We always put quality and customer satisfaction first.'}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="gallery" className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              <span className="relative inline-block">
                {language === 'vi' ? 'Hình ảnh hoạt động' : 'Activity Gallery'}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gaet-500"></div>
              </span>
            </h2>
            
            {loadingGallery ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gaet-600"></div>
              </div>
            ) : galleryImages.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Fallback to static images if no gallery images found */}
                <div className="md:col-span-2 aspect-video rounded-xl overflow-hidden shadow-md">
                  <SmoothImage
                    id={`business-gallery-1-${area.id}`}
                    src={area.image}
                    alt={t(area.titleKey)}
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden shadow-md">
                  <SmoothImage
                    id={`business-gallery-2-${area.id}`}
                    src={images[0] || area.image}
                    alt={t(area.titleKey)}
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden shadow-md">
                  <SmoothImage
                    id={`business-gallery-3-${area.id}`}
                    src={images[1] || area.image}
                    alt={t(area.titleKey)}
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-2 aspect-video rounded-xl overflow-hidden shadow-md">
                  <SmoothImage
                    id={`business-gallery-4-${area.id}`}
                    src={area.image}
                    alt={t(area.titleKey)}
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <div 
                    key={image.id} 
                    className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                      index === 0 ? 'col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2' : ''
                    }`}
                  >
                    <SmoothImage
                      id={`business-gallery-db-${image.id}`}
                      src={image.image_url}
                      alt={image.alt_text || t(area.titleKey)}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        <section id="related" className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                <span className="relative inline-block">
                  {language === 'vi' ? 'Lĩnh vực liên quan' : 'Related Business Areas'}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gaet-500"></div>
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedAreas.map((relatedArea, index) => (
                  <div 
                    key={relatedArea.id} 
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="h-48 overflow-hidden">
                      <SmoothImage
                        id={`business-related-${relatedArea.id}`}
                        src={relatedArea.image}
                        alt={t(relatedArea.titleKey)}
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">{t(relatedArea.titleKey)}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{t(relatedArea.descriptionKey)}</p>
                      <Link 
                        to={isNaN(Number(relatedArea.id)) ? `/business/${relatedArea.id}` : `/business/${relatedArea.id}`}
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
        
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-gaet-700 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {language === 'vi' ? 'Quan tâm đến lĩnh vực này?' : 'Interested in this business area?'}
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              {language === 'vi' 
                ? 'Hãy liên hệ với chúng tôi để được tư vấn chi tiết và hỗ trợ tốt nhất.'
                : 'Contact us for detailed consultation and the best support.'}
            </p>
            <Button className="bg-white text-gaet-700 hover:bg-gaet-50">
              {language === 'vi' ? 'Liên hệ ngay' : 'Contact Now'}
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessArea;
