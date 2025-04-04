
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SmoothImage from '../components/ui/SmoothImage';

type Subsidiary = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  slug?: string;
};

const SubsidiariesPage: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = language === 'vi' ? 'Đơn vị thành viên - GAET' : 'Member Units - GAET Corporation';
    
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, [language]);

  const subsidiaries: Subsidiary[] = [
    {
      id: 1,
      name: language === 'vi' ? '1. CÔNG TY VẬT LIỆU NỔ CÔNG NGHIỆP' : '1. INDUSTRIAL EXPLOSIVES COMPANY',
      description: language === 'vi'
        ? 'Xuất nhập khẩu và kinh doanh vật liệu nổ công nghiệp, vận tải vật liệu nổ công nghiệp, tư vấn, cung cấp dịch vụ khoan nổ mìn, cung cấp, vận chuyển vật liệu nổ công nghiệp cho ngành dầu khí.'
        : 'Import-export and trading of industrial explosives, transportation of industrial explosives, consulting, providing drilling and blasting services, supplying and transporting industrial explosives for the oil and gas industry.',
      imageUrl: '/assets/images/subsidiaries/subsidiary1.jpg',
      slug: 'vat-lieu-no-cong-nghiep'
    },
    {
      id: 2,
      name: language === 'vi' ? '2. CHI NHÁNH VẬT LIỆU NỔ MIỀN TRUNG' : '2. CENTRAL REGION EXPLOSIVES BRANCH',
      description: language === 'vi'
        ? 'Xuất nhập khẩu và kinh doanh vật liệu nổ công nghiệp, vận tải vật liệu nổ công nghiệp, tư vấn, cung cấp dịch vụ khoan nổ mìn tại khu vực miền Trung.'
        : 'Import-export and trading of industrial explosives, transportation of industrial explosives, consulting, providing drilling and blasting services in the Central region.',
      imageUrl: '/assets/images/subsidiaries/subsidiary2.jpg',
      slug: 'vat-lieu-no-mien-trung'
    },
    {
      id: 3,
      name: language === 'vi' ? '3. CÔNG TY ĐÀO TẠO NGHỀ XNK LAO ĐỘNG' : '3. VOCATIONAL TRAINING AND LABOR EXPORT COMPANY',
      description: language === 'vi'
        ? 'Đào tạo nghề và xuất nhập khẩu lao động, nhập khẩu chuyên gia cho các dự án FDI.'
        : 'Vocational training and labor export, importing experts for FDI projects.',
      imageUrl: '/assets/images/subsidiaries/subsidiary3.jpg',
      slug: 'dao-tao-nghe-xnk-lao-dong'
    },
    {
      id: 4,
      name: language === 'vi' ? '4. CHI NHÁNH XÍ NGHIỆP LAM KINH' : '4. LAM KINH ENTERPRISE BRANCH',
      description: language === 'vi'
        ? 'Sản xuất giấy, các loại bao bì phục vụ Quốc phòng và kinh tế, chế biến gỗ, sản xuất đồ mỹ nghệ, hộp hộp.'
        : 'Paper production, various types of packaging for Defense and economic purposes, wood processing, production of handicrafts, boxes.',
      imageUrl: '/assets/images/subsidiaries/subsidiary4.jpg',
      slug: 'xi-nghiep-lam-kinh'
    },
    {
      id: 5,
      name: language === 'vi' ? '5. CÔNG TY TNHH MỘT THÀNH VIÊN CƠ KHÍ 2179' : '5. MECHANICAL ENGINEERING COMPANY 2179 LLC',
      description: language === 'vi'
        ? 'Chế tạo, sản xuất thiết bị phụ tùng cơ khí.'
        : 'Manufacturing and production of mechanical equipment and spare parts.',
      imageUrl: '/assets/images/subsidiaries/subsidiary5.jpg',
      slug: 'co-khi-2179'
    },
    {
      id: 6,
      name: language === 'vi' ? '6. CHI NHÁNH XÍ NGHIỆP 197' : '6. ENTERPRISE 197 BRANCH',
      description: language === 'vi'
        ? 'Xuất nhập khẩu và kinh doanh vật tư sản xuất quốc phòng và kinh tế, tư liệu tiêu dùng xe nông, lâm, thủy sản.'
        : 'Import-export and trading of production materials for defense and economic purposes, consumer materials for agricultural, forestry and fishery vehicles.',
      imageUrl: '/assets/images/subsidiaries/subsidiary6.jpg',
      slug: 'xi-nghiep-197'
    },
    {
      id: 7,
      name: language === 'vi' ? '7. CÔNG TY TNHH MỘT THÀNH VIÊN T608' : '7. T608 COMPANY LLC',
      description: language === 'vi'
        ? 'Kinh doanh vận tải, kinh doanh xăng dầu, dịch vụ kho bãi, kinh doanh thương mại.'
        : 'Transportation business, petroleum business, warehouse services, commercial business.',
      imageUrl: '/assets/images/subsidiaries/subsidiary7.jpg',
      slug: 't608'
    },
    {
      id: 8,
      name: language === 'vi' ? '8. CÔNG TY TNHH MỘT THÀNH VIÊN VẬT TƯ KỸ THUẬT CÔNG NGHIỆP QUỐC PHÒNG' : '8. DEFENSE INDUSTRY TECHNICAL MATERIALS COMPANY LLC',
      description: language === 'vi'
        ? 'Sản xuất kinh doanh thiết bị và hàng cơ khí, xuất nhập khẩu, kinh doanh vật tư, thiết bị và sản phẩm phục vụ sản xuất Công nghiệp quốc phòng và kinh tế, cho thuê văn phòng, trung tâm thương mại.'
        : 'Production and trading of equipment and mechanical goods, import-export, trading of materials, equipment and products for Defense Industry and economic production, office and shopping center rental.',
      imageUrl: '/assets/images/subsidiaries/subsidiary8.jpg',
      slug: 'vat-tu-ky-thuat-cong-nghiep-quoc-phong'
    },
    {
      id: 9,
      name: language === 'vi' ? '9. CÔNG TY CỔ PHẦN KINH TẾ - KỸ THUẬT' : '9. ECONOMIC - TECHNICAL JOINT STOCK COMPANY',
      description: language === 'vi'
        ? 'Kinh doanh xuất nhập khẩu vật tư, thiết bị, sản phẩm phục vụ quốc phòng và kinh tế. Dịch vụ khoa học kỹ thuật, khảo sát, thăm dò, rà phá bom mìn, vật nổ. SX-KD vật liệu xây dựng, thiết bị, phụ tùng cơ khí.'
        : 'Import-export business of materials, equipment, products for defense and economic purposes. Scientific and technical services, surveying, exploration, bomb and mine clearance. Production and trading of construction materials, equipment, mechanical spare parts.',
      imageUrl: '/assets/images/subsidiaries/subsidiary9.jpg',
      slug: 'kinh-te-ky-thuat'
    },
    {
      id: 10,
      name: language === 'vi' ? '10. CÔNG TY TNHH KHOAN VÀ NỔ MÌN TRƯỜNG SƠN' : '10. TRUONG SON DRILLING AND BLASTING COMPANY LLC',
      description: language === 'vi'
        ? 'Cung ứng nguyên liệu sản xuất vật liệu nổ công nghiệp, dịch vụ khoan nổ mìn, rà phá bom mìn, vật nổ.'
        : 'Supply of raw materials for industrial explosives production, drilling and blasting services, bomb and mine clearance.',
      imageUrl: '/assets/images/subsidiaries/subsidiary10.jpg',
      slug: 'khoan-va-no-min-truong-son'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="bg-gaet-700 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white text-center">
              {language === 'vi' ? 'Đơn vị thành viên' : 'Member Units'}
            </h1>
            <p className="text-white/80 text-center mt-4 max-w-3xl mx-auto">
              {language === 'vi'
                ? 'GAET có một hệ thống các đơn vị thành viên hoạt động trong nhiều lĩnh vực khác nhau, từ sản xuất công nghiệp đến thương mại và dịch vụ.'
                : 'GAET has a system of member units operating in various fields, from industrial production to commerce and services.'}
            </p>
          </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subsidiaries.map((subsidiary, index) => (
                <Link 
                  to={`/subsidiaries/${subsidiary.slug}`}
                  key={subsidiary.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 opacity-0 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-48 overflow-hidden bg-gray-200">
                    <SmoothImage
                      id={`subsidiary-${subsidiary.id}`}
                      src={subsidiary.imageUrl}
                      alt={subsidiary.name}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                      fallback={
                        <div className="w-full h-full flex items-center justify-center bg-gaet-100">
                          <span className="text-gaet-600 font-medium">{subsidiary.name.charAt(0)}</span>
                        </div>
                      }
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">
                      {subsidiary.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {subsidiary.description}
                    </p>
                    
                    <div className="flex justify-end">
                      <span className="text-gaet-600 text-sm font-medium hover:text-gaet-800 transition-colors duration-300">
                        {language === 'vi' ? 'Xem chi tiết →' : 'View details →'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubsidiariesPage;
