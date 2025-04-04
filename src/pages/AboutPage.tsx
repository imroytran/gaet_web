
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AboutPage: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = language === 'vi' ? 'Giới thiệu - GAET' : 'About - GAET Corporation';
    
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, [language]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="bg-gaet-700 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white text-center">
              {language === 'vi' ? 'Giới thiệu' : 'About Us'}
            </h1>
          </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <div className="prose prose-lg">
                  <h2 className="text-2xl font-bold text-gaet-700 mb-6">{language === 'vi' ? 'Tổng quan' : 'Overview'}</h2>
                  <p>
                    {language === 'vi' 
                      ? 'Tổng Công ty Kinh tế kỹ thuật quốc phòng (GAET) được thành lập ngày 27/6/1962 và là doanh nghiệp quốc phòng – An ninh trực thuộc Tổng cục Công nghiệp quốc phòng / Bộ Quốc phòng Việt Nam.'
                      : 'Defence Economic Technical Industry Corporation (GAET) was established on June 27, 1962 and is a defense and security enterprise under the General Department of Defense Industry / Ministry of National Defense of Vietnam.'}
                  </p>
                  <p>
                    {language === 'vi' 
                      ? 'GAET hiện có trên 1700 cán bộ, công nhân viên làm việc tại 26 phòng ban, đơn vị trực thuộc cùng hàng chục chi nhánh, xí nghiệp hoạt động trải dài từ Bắc đến Nam. Với 20 ngành nghề kinh doanh, GAET tập trung vào hai nhóm vành chính là thị trường tiềm năng, then chốt là hoạt động thương mại quân sự và kinh doanh vật liệu nổ công nghiệp.'
                      : 'GAET currently has over 1,700 staff and employees working in 26 departments and affiliated units, along with dozens of branches and enterprises operating throughout the country from North to South. With 20 business sectors, GAET focuses on two key market segments: military trade activities and industrial explosives business.'}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
                  <img 
                    src="/assets/images/about/headquarters.jpg" 
                    alt={language === 'vi' ? 'Trụ sở GAET' : 'GAET Headquarters'} 
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{language === 'vi' ? 'Trụ sở chính' : 'Headquarters'}</h3>
                    <p className="text-gray-600">
                      {language === 'vi' 
                        ? 'Số 102 Kim Mã Thượng, Cống Vị, Ba Đình, Hà Nội, Việt Nam' 
                        : '102 Kim Ma Thuong, Cong Vi, Ba Dinh, Hanoi, Vietnam'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="prose prose-lg mx-auto">
              <h2 className="text-2xl font-bold text-gaet-700 mb-6">{language === 'vi' ? 'Tổng quan' : 'Overview'}</h2>
              <p>
                {language === 'vi' 
                  ? 'Tổng Công ty Kinh tế kỹ thuật quốc phòng (GAET) được thành lập ngày 27/6/1962 và là doanh nghiệp quốc phòng – An ninh trực thuộc Tổng cục Công nghiệp quốc phòng / Bộ Quốc phòng Việt Nam.'
                  : 'Defence Economic Technical Industry Corporation (GAET) was established on June 27, 1962 and is a defense and security enterprise under the General Department of Defense Industry / Ministry of National Defense of Vietnam.'}
              </p>
              <p>
                {language === 'vi' 
                  ? 'GAET hiện có trên 1700 cán bộ, công nhân viên làm việc tại 26 phòng ban, đơn vị trực thuộc cùng hàng chục chi nhánh, xí nghiệp hoạt động trải dài từ Bắc đến Nam. Với 20 ngành nghề kinh doanh, GAET tập trung vào hai nhóm vành chính là thị trường tiềm năng, then chốt là hoạt động thương mại quân sự và kinh doanh vật liệu nổ công nghiệp.'
                  : 'GAET currently has over 1,700 staff and employees working in 26 departments and affiliated units, along with dozens of branches and enterprises operating throughout the country from North to South. With 20 business sectors, GAET focuses on two key market segments: military trade activities and industrial explosives business.'}
              </p>
              <p>
                {language === 'vi' 
                  ? 'GAET đã và đang có mối quan hệ hợp tác với hàng trăm đối tác, bạn hàng tại hơn 50 quốc gia trên thế giới ở nhiều lĩnh vực khác nhau. Thương hiệu GAET ngày càng khẳng định được vị thế vững chắc trên thị trường quốc tế.'
                  : 'GAET has established cooperative relationships with hundreds of partners in more than 50 countries worldwide across various fields. The GAET brand continues to strengthen its solid position in the international market.'}
              </p>
              <p>
                {language === 'vi' 
                  ? 'GAET đã và đang được Bộ Quốc phòng, Tổng cục Công nghiệp Quốc phòng và các Quân, Binh chủng tin tưởng giao nhiệm vụ xuất, nhập khẩu, mua sắm vũ khí, khí tài, trang thiết bị phục vụ quốc phòng và cung ứng nhiều chủng loại khác của Quân đội.'
                  : 'GAET has been entrusted by the Ministry of Defense, the General Department of Defense Industry, and various military branches with the tasks of exporting, importing, and procuring weapons, equipment, and supplies for national defense purposes and providing various other categories for the military.'}
              </p>
              <p>
                {language === 'vi' 
                  ? 'Là doanh nghiệp hoạt động đa ngành, đa lĩnh vực, GAET đã tạo dựng được uy tín, thương hiệu với các đối tác trong và ngoài nước bằng năng lực hoạt các giao dịch thương vụ tin cậy. GAET là doanh nghiệp tiêu biểu ASEAN, Top 20 nhà nhập khẩu than bánh, Sản phẩm vàng - Dịch vụ Vàng; Top 50 Nhãn hiệu nổi tiếng, Top 10 doanh nghiệp tín nhiệm nhất cung ứng hàng công nghiệp kinh tế.'
                  : 'As a multi-sector, multi-field enterprise, GAET has built a reputation and brand with domestic and international partners through reliable business transaction capabilities. GAET is an exemplary ASEAN enterprise, ranked among the Top 20 coal briquette importers, recognized for Gold Products - Gold Services, Top 50 Famous Brands, and Top 10 most trusted enterprises supplying industrial economic goods.'}
              </p>
              
              <h2 className="text-2xl font-bold text-gaet-700 mb-6 mt-12">{language === 'vi' ? 'Sứ mệnh và Tầm nhìn' : 'Mission and Vision'}</h2>
              <h3 className="text-xl font-semibold">{language === 'vi' ? 'Sứ mệnh' : 'Mission'}</h3>
              <p>
                {language === 'vi' 
                  ? 'Cung cấp các sản phẩm và dịch vụ chất lượng cao phục vụ nền kinh tế và quốc phòng, góp phần vào sự phát triển bền vững của đất nước.'
                  : 'Providing high-quality products and services for the economy and defense, contributing to the sustainable development of the country.'}
              </p>
              
              <h3 className="text-xl font-semibold">{language === 'vi' ? 'Tầm nhìn' : 'Vision'}</h3>
              <p>
                {language === 'vi' 
                  ? 'Trở thành doanh nghiệp hàng đầu trong lĩnh vực kinh tế kỹ thuật và công nghiệp quốc phòng tại Việt Nam và khu vực.'
                  : 'To become a leading enterprise in the field of technical economics and defense industry in Vietnam and the region.'}
              </p>
              
              <h3 className="text-xl font-semibold">{language === 'vi' ? 'Giá trị cốt lõi' : 'Core Values'}</h3>
              <ul>
                <li>{language === 'vi' ? 'Chất lượng và uy tín' : 'Quality and reputation'}</li>
                <li>{language === 'vi' ? 'Đổi mới và sáng tạo' : 'Innovation and creativity'}</li>
                <li>{language === 'vi' ? 'Kỷ luật và trách nhiệm' : 'Discipline and responsibility'}</li>
                <li>{language === 'vi' ? 'Hội nhập và phát triển' : 'Integration and development'}</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gaet-700 mb-6 mt-12">{language === 'vi' ? 'Lịch sử phát triển' : 'History'}</h2>
              <p>
                {language === 'vi' 
                  ? 'Tiền thân của GAET là Cục Vật tư Nhiên liệu (Tổng cục Hậu cần), Cục Cung ứng Vật tư (Tổng cục Kỹ thuật) với nhiệm vụ quan trọng là cung cấp đảm bảo vũ khí, vật tư, nhiên liệu phục vụ cho cuộc kháng chiến giải phóng dân tộc.'
                  : 'The predecessor of GAET was the Department of Materials and Fuel (General Department of Logistics), Department of Materials Supply (General Department of Technology) with the important task of providing weapons, materials, and fuel for the resistance war of national liberation.'}
              </p>
              <p>
                {language === 'vi' 
                  ? 'Qua hơn 13 năm xây dựng và phát triển (2011-2025), GAET đã không ngừng mở rộng quy mô, nâng cao chất lượng sản phẩm và dịch vụ, góp phần quan trọng vào sự nghiệp xây dựng và bảo vệ Tổ quốc.'
                  : 'Over more than 13 years of construction and development (2011-2025), GAET has continuously expanded its scale, improved the quality of products and services, making an important contribution to the cause of building and protecting the Fatherland.'}
              </p>
              
              <h2 className="text-2xl font-bold text-gaet-700 mb-6 mt-12">{language === 'vi' ? 'Thành tích' : 'Achievements'}</h2>
              <p>
                {language === 'vi' 
                  ? 'Ghi nhận những đóng góp của GAET, Đảng, Nhà nước, Quân đội đã trao tặng nhiều phần thưởng cao quý như:'
                  : 'In recognition of GAET\'s contributions, the Party, State, and Army have awarded many prestigious honors such as:'}
              </p>
              <ul>
                <li>{language === 'vi' ? 'Danh hiệu Anh hùng Lao động' : 'Hero of Labor Title'}</li>
                <li>{language === 'vi' ? 'Huân chương Quân công hạng Nhất' : 'First-class Military Merit Medal'}</li>
                <li>{language === 'vi' ? 'Huân chương Quân công hạng Nhì' : 'Second-class Military Merit Medal'}</li>
                <li>{language === 'vi' ? 'Huân chương Quân công hạng Ba' : 'Third-class Military Merit Medal'}</li>
                <li>{language === 'vi' ? 'Huân chương Bảo vệ Tổ quốc hạng Nhất' : 'First-class Fatherland Defense Medal'}</li>
                <li>{language === 'vi' ? 'Top 50 Nhãn hiệu nổi tiếng' : 'Top 50 Famous Brands'}</li>
                <li>{language === 'vi' ? 'Top 10 doanh nghiệp tín nhiệm nhất cung ứng hàng công nghiệp kinh tế' : 'Top 10 most trusted enterprises supplying industrial economic goods'}</li>
                <li>{language === 'vi' ? 'Doanh nghiệp tiêu biểu ASEAN' : 'Exemplary ASEAN Enterprise'}</li>
                <li>{language === 'vi' ? 'Top 20 nhà nhập khẩu than bánh' : 'Top 20 coal briquette importers'}</li>
                <li>{language === 'vi' ? 'Sản phẩm vàng - Dịch vụ Vàng' : 'Gold Products - Gold Services'}</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gaet-700 mb-6 mt-12">{language === 'vi' ? 'Tổ chức' : 'Organization'}</h2>
              <h3 className="text-xl font-semibold">{language === 'vi' ? 'Lãnh đạo' : 'Leadership'}</h3>
              <ul>
                <li>{language === 'vi' ? 'Chủ tịch HĐTV: Đại tá Nguyễn Anh Tuấn' : 'Chairman of the Board: Colonel Nguyen Anh Tuan'}</li>
                <li>{language === 'vi' ? 'Tổng Giám đốc: Đại tá Phan Chiến Thắng' : 'General Director: Colonel Phan Chien Thang'}</li>
                <li>{language === 'vi' ? 'Các Phó Tổng Giám đốc: Trung tá Nguyễn Thanh Hải, Thượng tá Nguyễn Văn Hải, Đại tá Phạm Anh Tú' : 'Deputy General Directors: Lieutenant Colonel Nguyen Thanh Hai, Senior Colonel Nguyen Van Hai, Colonel Pham Anh Tu'}</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-4">{language === 'vi' ? 'Công ty con trực thuộc' : 'Subsidiary Companies'}</h3>
              <ul>
                <li>{language === 'vi' ? 'Công ty vật liệu nổ công nghiệp' : 'Industrial Explosives Company'}</li>
                <li>{language === 'vi' ? 'Công ty đào tạo nghề và XNK lao động' : 'Vocational Training and Labor Export Company'}</li>
                <li>{language === 'vi' ? 'Công ty sản xuất kinh doanh tổng hợp' : 'General Production and Business Company'}</li>
                <li>{language === 'vi' ? 'Công ty TNHH MTV vật tư kỹ thuật công nghiệp quốc phòng' : 'Defense Industry Technical Materials Company Limited (One Member)'}</li>
                <li>{language === 'vi' ? 'Công ty T622' : 'T622 Company'}</li>
                <li>{language === 'vi' ? 'Công ty T608' : 'T608 Company'}</li>
                <li>{language === 'vi' ? 'Công ty cơ khí Z179' : 'Z179 Mechanical Company'}</li>
                <li>{language === 'vi' ? 'Công ty khoan và nổ mìn Trường Sơn' : 'Truong Son Drilling and Blasting Company'}</li>
                <li>{language === 'vi' ? 'Công ty kinh tế kỹ thuật (Metco)' : 'Economic and Technical Company (Metco)'}</li>
                <li>{language === 'vi' ? 'Xí nghiệp 197' : 'Enterprise 197'}</li>
                <li>{language === 'vi' ? 'Xí nghiệp Lam Kinh' : 'Lam Kinh Enterprise'}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
