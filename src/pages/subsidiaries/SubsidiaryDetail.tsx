import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SmoothImage from '../../components/ui/SmoothImage';

type SubsidiaryData = {
  id: number;
  slug: string;
  name: {
    vi: string;
    en: string;
  };
  address: {
    vi: string;
    en: string;
  };
  phoneNumbers: string[];
  fax?: string;
  email?: string;
  website?: string;
  businessFunctions: {
    vi: string[];
    en: string[];
  };
  imageUrl: string;
};

const subsidiariesData: SubsidiaryData[] = [
  {
    id: 1,
    slug: 'vat-lieu-no-cong-nghiep',
    name: {
      vi: 'CÔNG TY VẬT LIỆU NỔ CÔNG NGHIỆP',
      en: 'INDUSTRIAL EXPLOSIVES COMPANY'
    },
    address: {
      vi: 'Số 102 Kim Mã Thượng, Cống Vị, Ba Đình, Hà Nội',
      en: '102 Kim Ma Thuong, Cong Vi, Ba Dinh, Hanoi'
    },
    phoneNumbers: [
      '(+84) 24.3762 4131'
    ],
    fax: '(+84) 24.37623980',
    businessFunctions: {
      vi: [
        'Xuất nhập khẩu và kinh doanh vật liệu nổ công nghiệp',
        'Vận tải vật liệu nổ công nghiệp.',
        'Tư vấn, cung cấp dịch vụ khoan nổ mìn.',
        'Cung cấp, vận chuyển vật liệu nổ công nghiệp cho ngành dầu khí'
      ],
      en: [
        'Import-export and trading of industrial explosives',
        'Transportation of industrial explosives',
        'Consulting and providing drilling and blasting services',
        'Supply and transportation of industrial explosives for the oil and gas industry'
      ]
    },
    imageUrl: '/assets/images/subsidiaries/subsidiary1.jpg'
  },
  {
    id: 2,
    slug: 'vat-lieu-no-mien-trung',
    name: {
      vi: 'CHI NHÁNH VẬT LIỆU NỐ MIỀN TRUNG',
      en: 'CENTRAL REGION EXPLOSIVES BRANCH'
    },
    address: {
      vi: 'Xóm Kim My, Xã Nghi Ân, Thành phố Vinh',
      en: 'Kim My Hamlet, Nghi An Commune, Vinh City'
    },
    phoneNumbers: [
      '(+84) 23 8385 1166'
    ],
    fax: '(+84) 23 83511638',
    businessFunctions: {
      vi: [
        'Xuất nhập khẩu và kinh doanh vật liệu nổ công nghiệp',
        'Vận tải vật liệu nổ công nghiệp.',
        'Tư vấn, cung cấp dịch vụ khoan nổ mìn'
      ],
      en: [
        'Import-export and trading of industrial explosives',
        'Transportation of industrial explosives',
        'Consulting and providing drilling and blasting services'
      ]
    },
    imageUrl: '/assets/images/subsidiaries/subsidiary2.jpg'
  },
  {
    id: 3,
    slug: 'dao-tao-nghe-xnk-lao-dong',
    name: {
      vi: 'CÔNG TY ĐÀO TẠO NGHỀ XNK LAO ĐỘNG',
      en: 'VOCATIONAL TRAINING AND LABOR EXPORT COMPANY'
    },
    address: {
      vi: 'Số 16, Ngõ 92 Đường Nguyễn Sơn, Phường Ngọc Lâm, Quận Long Biên, Hà Nội',
      en: '16, Lane 92 Nguyen Son Street, Ngoc Lam Ward, Long Bien District, Hanoi'
    },
    phoneNumbers: [
      '(+84) 24 3650 0778'
    ],
    fax: '(+84) 24 3650 1846',
    email: 'mangoeta@mangaet.com',
    website: 'mangaet.com.vn',
    businessFunctions: {
      vi: [
        'Đào tạo nghề và xuất nhập khẩu lao động.',
        'Nhập khẩu chuyên gia cho các dự án FDI.'
      ],
      en: [
        'Vocational training and labor export.',
        'Import of experts for FDI projects.'
      ]
    },
    imageUrl: '/assets/images/subsidiaries/subsidiary3.jpg'
  },
  {
    id: 4,
    slug: 'xi-nghiep-lam-kinh',
    name: {
      vi: 'CHI NHÁNH XÍ NGHIỆP LAM KINH',
      en: 'LAM KINH ENTERPRISE BRANCH'
    },
    address: {
      vi: 'Số 156 Đình Hương, P. Đông Cương, Thanh Hóa',
      en: '156 Dinh Huong, Dong Cuong Ward, Thanh Hoa'
    },
    phoneNumbers: [
      '(+84) 23 7396 1968'
    ],
    fax: '(+84) 23 7396.0004',
    businessFunctions: {
      vi: [
        'Sản xuất giấy, các loại bao bì phục vụ Quốc phòng và kinh tế',
        'Chế biến gỗ, sản xuất đồ mỹ nghệ, hộp hòm'
      ],
      en: [
        'Paper production, packaging for Defense and economic purposes',
        'Wood processing, production of handicrafts, boxes'
      ]
    },
    imageUrl: '/assets/images/subsidiaries/subsidiary4.jpg'
  },
  {
    id: 5,
    slug: 'co-khi-2179',
    name: {
      vi: 'CÔNG TY TNHH MỘT THÀNH VIÊN CƠ KHÍ 2179',
      en: 'MECHANICAL ENGINEERING COMPANY 2179 LLC'
    },
    address: {
      vi: 'Km12, quốc lộ 1A, Xã Tứ Hiệp, Huyện Thanh Trì, Hà Nội',
      en: 'Km12, National Highway 1A, Tu Hiep Commune, Thanh Tri District, Hanoi'
    },
    phoneNumbers: [
      '(+84) 24 38615255'
    ],
    fax: '(+84) 24 3861 2981',
    businessFunctions: {
      vi: [
        'Chế tạo, sản xuất thiết bị phụ tùng cơ khí'
      ],
      en: [
        'Manufacturing and production of mechanical equipment and spare parts'
      ]
    },
    imageUrl: '/assets/images/subsidiaries/subsidiary5.jpg'
  },
  {
    id: 6,
    slug: 'xi-nghiep-197',
    name: {
      vi: 'CHI NHÁNH XÍ NGHIỆP 197',
      en: 'ENTERPRISE 197 BRANCH'
    },
    address: {
      vi: 'Số 98, Đường Nguyễn Văn Giáp, Phường Cầu Diễn, Quận Nam Từ Liêm, Hà Nội',
      en: '98 Nguyen Van Giap Street, Cau Dien Ward, Nam Tu Liem District, Hanoi'
    },
    phoneNumbers: [
      '(+84) 24.3764 4090'
    ],
    fax: '(+84) 24 3764 8193',
    businessFunctions: {
      vi: [
        'Xuất nhập khẩu và kinh doanh vật tư sản xuất quốc phòng và kinh tế,',
        'Tư liệu tiêu dùng xe nông, lâm, thủy sản.'
      ],
      en: [
        'Import-export and trading of materials for defense and economic production',
        'Consumer materials for agricultural, forestry and fishery vehicles'
      ]
    },
    imageUrl: '/assets/images/subsidiaries/subsidiary6.jpg'
  },
  {
    id: 7,
    slug: 't608',
    name: {
      vi: 'CÔNG TY TNHH MỘT THÀNH VIÊN T608',
      en: 'T608 ONE MEMBER COMPANY LIMITED'
    },
    address: {
      vi: 'Số 467 Hà Huy Tập, Thị trấn Yên Viên, Huyện Gia Lâm, Thành phố Hà Nội.',
      en: '467 Ha Huy Tap, Yen Vien Town, Gia Lam District, Hanoi'
    },
    phoneNumbers: [
      '(+84) 24 6261 4577'
    ],
    fax: '(+84) 24 6261 4524',
    businessFunctions: {
      vi: [
        'Kinh doanh vận tải, kinh doanh xăng dầu, dịch vụ kho bãi,',
        'kinh doanh thương mại.'
      ],
      en: [
        'Transport business, fuel business, warehouse services',
        'Commercial business'
      ]
    },
    imageUrl: '/assets/images/subsidiaries/subsidiary7.jpg'
  },
  {
    id: 8,
    slug: 'vat-tu-ky-thuat-cong-nghiep-quoc-phong',
    name: {
      vi: 'CÔNG TY TNHH MỘT THÀNH VIÊN VẬT TƯ KỸ THUẬT CÔNG NGHIỆP QUỐC PHÒNG',
      en: 'DEFENSE INDUSTRY TECHNICAL MATERIALS ONE MEMBER COMPANY LIMITED'
    },
    address: {
      vi: '1984 đường 3/2, Phường 12, Quận 10, Tp. Hồ Chí Minh',
      en: '1984 3/2 Street, Ward 12, District 10, Ho Chi Minh City'
    },
    phoneNumbers: [
      '(+84) 28 3602 5677',
      '(+84) 28 3868 0095'
    ],
    businessFunctions: {
      vi: [
        'Sản xuất kinh doanh thiết bị và hàng cơ khí',
        'Xuất nhập khẩu, kinh doanh vật tư, thiết bị và sản phẩm phục vụ sản xuất Công nghiệp quốc phòng và kinh tế',
        'Cho thuê văn phòng, trung tâm thương mại'
      ],
      en: [
        'Production and trading of equipment and mechanical goods',
        'Import-export, trading of materials, equipment and products for Defense Industry and economic production',
        'Office rental, commercial center'
      ]
    },
    imageUrl: '/assets/images/subsidiaries/subsidiary8.jpg'
  },
  {
    id: 9,
    slug: 'kinh-te-ky-thuat',
    name: {
      vi: 'CÔNG TY CỔ PHẦN KINH TẾ - KỸ THUẬT',
      en: 'ECONOMIC - TECHNICAL JOINT STOCK COMPANY'
    },
    address: {
      vi: 'Hà Nội, Việt Nam',
      en: 'Hanoi, Vietnam'
    },
    phoneNumbers: ['(+84) 24.3832 5377'],
    businessFunctions: {
      vi: [
        'Kinh doanh xuất nhập khẩu vật tư, thiết bị, sản phẩm phục vụ quốc phòng và kinh tế.',
        'Dịch vụ khoa học kỹ thuật, khảo sát, thăm dò, rà phá bom mìn, vật nổ.',
        'XNK vật tư, thiết bị, sản phẩm, dịch vụ sản xuất QP & KT.',
        'SXKD vật liệu xây dựng, thiết bị, phụ tùng cơ khí'
      ],
      en: [
        'Import-export business of materials, equipment, products for defense and economic purposes',
        'Scientific and technical services, survey, exploration, mine clearance, explosives',
        'Import-export of materials, equipment, products, services for defense and economic production',
        'Production and trading of building materials, equipment, mechanical spare parts'
      ]
    },
    imageUrl: '/assets/images/subsidiaries/subsidiary9.jpg'
  },
  {
    id: 10,
    slug: 'khoan-va-no-min-truong-son',
    name: {
      vi: 'CÔNG TY TNHH KHOAN VÀ NỔ MÌN TRƯỜNG SƠN',
      en: 'TRUONG SON DRILLING AND BLASTING COMPANY LIMITED'
    },
    address: {
      vi: 'Đường Phontong, bản Khamhung, quận Xaythany, thủ đô Viêng Chăn, nước CHDCND Lào',
      en: 'Phontong Road, Khamhung Village, Xaythany District, Vientiane Capital, Lao PDR'
    },
    phoneNumbers: [
      '(+856) 217 20343'
    ],
    fax: '(+856) 217 20343',
    email: 'phouluara.plc@gmail.com',
    businessFunctions: {
      vi: [
        'Cung ứng nguyên liệu sản xuất vật liệu nổ công nghiệp,',
        'dịch vụ khoan nổ mìn,',
        'Rà phá bom mìn, vật nổ.'
      ],
      en: [
        'Supply of raw materials for industrial explosives production',
        'Drilling and blasting services',
        'Mine clearance, explosives'
      ]
    },
    imageUrl: '/assets/images/subsidiaries/subsidiary10.jpg'
  }
];

const SubsidiaryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [subsidiary, setSubsidiary] = useState<SubsidiaryData | null>(null);

  useEffect(() => {
    // Find the subsidiary data based on the slug
    const foundSubsidiary = subsidiariesData.find(sub => sub.slug === slug);
    
    if (foundSubsidiary) {
      setSubsidiary(foundSubsidiary);
      // Set page title
      document.title = language === 'vi' 
        ? `${foundSubsidiary.name.vi} - GAET` 
        : `${foundSubsidiary.name.en} - GAET Corporation`;
    } else {
      // If subsidiary not found, redirect to the main subsidiaries page
      navigate('/subsidiaries');
    }
    
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, [slug, language, navigate]);

  if (!subsidiary) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gaet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="bg-gaet-700 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white text-center">
              {language === 'vi' ? subsidiary.name.vi : subsidiary.name.en}
            </h1>
          </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="rounded-xl overflow-hidden shadow-md bg-white">
                  <div className="h-64 overflow-hidden">
                    <SmoothImage
                      id={`subsidiary-detail-${subsidiary.id}`}
                      src={subsidiary.imageUrl}
                      alt={language === 'vi' ? subsidiary.name.vi : subsidiary.name.en}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover"
                      fallback={
                        <div className="w-full h-full flex items-center justify-center bg-gaet-100">
                          <span className="text-gaet-600 font-medium text-3xl">
                            {(language === 'vi' ? subsidiary.name.vi : subsidiary.name.en).charAt(0)}
                          </span>
                        </div>
                      }
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">
                      {language === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-md font-medium text-gray-700 mb-1">
                          {language === 'vi' ? 'Địa chỉ' : 'Address'}:
                        </h4>
                        <p className="text-gray-600">
                          {language === 'vi' ? subsidiary.address.vi : subsidiary.address.en}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-md font-medium text-gray-700 mb-1">
                          {language === 'vi' ? 'Điện thoại' : 'Phone'}:
                        </h4>
                        <ul className="space-y-1">
                          {subsidiary.phoneNumbers.map((phone, index) => (
                            <li key={index} className="text-gray-600">
                              <a 
                                href={`tel:${phone.replace(/[()+ ]/g, '')}`}
                                className="hover:text-gaet-600 transition-colors duration-300"
                              >
                                {phone}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {subsidiary.fax && (
                        <div>
                          <h4 className="text-md font-medium text-gray-700 mb-1">
                            Fax:
                          </h4>
                          <p className="text-gray-600">
                            {subsidiary.fax}
                          </p>
                        </div>
                      )}
                      
                      {subsidiary.email && (
                        <div>
                          <h4 className="text-md font-medium text-gray-700 mb-1">
                            Email:
                          </h4>
                          <p className="text-gray-600">
                            <a 
                              href={`mailto:${subsidiary.email}`}
                              className="hover:text-gaet-600 transition-colors duration-300"
                            >
                              {subsidiary.email}
                            </a>
                          </p>
                        </div>
                      )}
                      
                      {subsidiary.website && (
                        <div>
                          <h4 className="text-md font-medium text-gray-700 mb-1">
                            Website:
                          </h4>
                          <p className="text-gray-600">
                            <a 
                              href={`https://${subsidiary.website}`}
                              className="hover:text-gaet-600 transition-colors duration-300"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {subsidiary.website}
                            </a>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="rounded-xl overflow-hidden shadow-md bg-white p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4 border-gray-200">
                    {language === 'vi' ? 'Chức năng kinh doanh chính' : 'Main Business Functions'}
                  </h2>
                  
                  <ul className="space-y-4 list-disc pl-6">
                    {(language === 'vi' ? subsidiary.businessFunctions.vi : subsidiary.businessFunctions.en).map((func, index) => (
                      <li key={index} className="text-gray-700">
                        {func}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">
                      {language === 'vi' ? 'Giới thiệu' : 'Introduction'}
                    </h3>
                    
                    <p className="text-gray-700 mb-4">
                      {language === 'vi' 
                        ? `${subsidiary.name.vi} là một trong những đơn vị thành viên chủ chốt của GAET, hoạt động trong lĩnh vực ${(language === 'vi' ? subsidiary.businessFunctions.vi : subsidiary.businessFunctions.en)[0].toLowerCase()}.`
                        : `${subsidiary.name.en} is one of the key member units of GAET, operating in the field of ${(language === 'vi' ? subsidiary.businessFunctions.vi : subsidiary.businessFunctions.en)[0].toLowerCase()}.`
                      }
                    </p>
                    
                    <p className="text-gray-700">
                      {language === 'vi'
                        ? 'Với đội ngũ nhân viên giàu kinh nghiệm và chuyên môn cao, chúng tôi cam kết cung cấp các sản phẩm và dịch vụ chất lượng cao, đáp ứng nhu cầu của khách hàng trong và ngoài nước.'
                        : 'With a team of experienced and highly qualified staff, we are committed to providing high-quality products and services to meet the needs of domestic and international customers.'
                      }
                    </p>
                  </div>
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

export default SubsidiaryDetail;
