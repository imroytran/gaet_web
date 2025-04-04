import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const HistoryPage: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = language === 'vi' ? 'Lịch sử hình thành - GAET' : 'Our History - GAET Corporation';
    
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, [language]);

  const milestones = [
    {
      year: "1960s",
      title: language === 'vi' ? 'Nguồn gốc' : 'Origins',
      description: language === 'vi' 
        ? 'Tiền thân của GAET là Cục Vật tư Nhiên liệu (Tổng cục Hậu cần), Cục Cung ứng Vật tư (Tổng cục Kỹ thuật) với nhiệm vụ quan trọng là cung cấp đảm bảo vũ khí, vật tư, nhiên liệu phục vụ cho cuộc kháng chiến giải phóng dân tộc.'
        : 'The predecessor of GAET was the Department of Materials and Fuel (General Department of Logistics), Department of Materials Supply (General Department of Technology) with the important task of providing weapons, materials, and fuel for the resistance war of national liberation.'
    },
    {
      year: "1975-1985",
      title: language === 'vi' ? 'Giai đoạn sau giải phóng' : 'Post-liberation period',
      description: language === 'vi' 
        ? 'Sau chiến tranh, tiền thân của GAET chuyển hướng hoạt động, mở rộng sang các lĩnh vực khác để đáp ứng nhu cầu phát triển kinh tế của đất nước.'
        : 'After the war, GAET\'s predecessor shifted its operations, expanding to other fields to meet the country\'s economic development needs.'
    },
    {
      year: "1986-2000",
      title: language === 'vi' ? 'Đổi mới' : 'Renovation',
      description: language === 'vi' 
        ? 'Thực hiện chính sách đổi mới của Đảng, đơn vị tiền thân của GAET định hướng lại hoạt động, tập trung vào phát triển các lĩnh vực kinh tế kỹ thuật và công nghiệp quốc phòng.'
        : 'Implementing the Party\'s renovation policy, GAET\'s predecessor reoriented its activities, focusing on developing technical economics and defense industry fields.'
    },
    {
      year: "2000-2010",
      title: language === 'vi' ? 'Phát triển mới' : 'New development',
      description: language === 'vi' 
        ? 'Mở rộng hợp tác quốc tế, ký kết nhiều hợp đồng quan trọng, nâng cao vị thế trên thị trường trong nước và quốc tế.'
        : 'Expanded international cooperation, signed many important contracts, improving its position in domestic and international markets.'
    },
    {
      year: "2011",
      title: language === 'vi' ? 'Thành lập GAET' : 'GAET Establishment',
      description: language === 'vi' 
        ? 'Tổng công ty Kinh tế Kỹ thuật Công nghiệp Quốc phòng (GAET) được thành lập theo Quyết định số 3035/QĐ-BQP ngày 23 tháng 8 năm 2011, hoạt động theo hình thức công ty mẹ - công ty con trên cơ sở tổ chức lại Công ty TNHH một thành viên Vật tư Công nghiệp quốc phòng.'
        : 'Defence Economic Technical Industry Corporation (GAET) was established according to Decision No. 3035/QD-BQP dated August 23, 2011, operating in the form of a parent company - subsidiary on the basis of reorganizing the one-member Defense Industry Materials Company.'
    },
    {
      year: "2012",
      title: language === 'vi' ? 'Ghi nhận thành tích' : 'Recognition of Achievements',
      description: language === 'vi' 
        ? 'GAET được trao tặng Huân chương Quân công hạng Ba và được công nhận là một trong "Top 50 nhãn hiệu cạnh tranh Việt Nam" do Hội Sở hữu trí tuệ Việt Nam cùng các cơ quan bảo trợ tổ chức bình chọn.'
        : 'GAET was awarded the Third-class Military Achievement Medal and was recognized as one of the "Top 50 competitive brands in Vietnam" organized by the Vietnam Intellectual Property Association.'
    },
    {
      year: "2013-2020",
      title: language === 'vi' ? 'Đổi mới và phát triển' : 'Innovation and Development',
      description: language === 'vi' 
        ? 'GAET mở rộng quy mô hoạt động, tăng cường đầu tư vào các lĩnh vực mới, hiện đại hóa công nghệ sản xuất và quản lý.'
        : 'GAET expanded its scale of operations, increased investment in new fields, modernized production technology and management.'
    },
    {
      year: "2021-2025",
      title: language === 'vi' ? 'Chuyển đổi số và hội nhập' : 'Digital Transformation and Integration',
      description: language === 'vi' 
        ? 'GAET tập trung vào chuyển đổi số, đẩy mạnh ứng dụng công nghệ hiện đại, nâng cao năng lực cạnh tranh trên thị trường quốc tế.'
        : 'GAET focuses on digital transformation, promotes the application of modern technology, improving competitiveness in the international market.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="bg-gaet-700 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white text-center">
              {language === 'vi' ? 'Lịch sử hình thành' : 'Our History'}
            </h1>
          </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="prose prose-lg mx-auto mb-16">
              <h2 className="text-2xl font-bold text-gaet-700 mb-6">{language === 'vi' ? 'Lịch sử phát triển' : 'History of Development'}</h2>
              <p>
                {language === 'vi' 
                  ? 'Tổng công ty GAET có lịch sử phát triển gắn liền với sự nghiệp xây dựng và bảo vệ Tổ quốc. Tiền thân của GAET là Cục Vật tư Nhiên liệu (Tổng cục Hậu cần), Cục Cung ứng Vật tư (Tổng cục Kỹ thuật) với nhiệm vụ quan trọng là cung cấp đảm bảo vũ khí, vật tư, nhiên liệu phục vụ cho cuộc kháng chiến giải phóng dân tộc.'
                  : 'GAET Corporation has a history of development associated with the cause of building and protecting the Fatherland. The predecessor of GAET was the Department of Materials and Fuel (General Department of Logistics), Department of Materials Supply (General Department of Technology) with the important task of providing weapons, materials, and fuel for the resistance war of national liberation.'}
              </p>
              <p>
                {language === 'vi' 
                  ? 'Trải qua nhiều giai đoạn lịch sử, đến ngày 23 tháng 8 năm 2011, Tổng công ty Kinh tế Kỹ thuật Công nghiệp Quốc phòng (GAET) chính thức được thành lập theo Quyết định số 3035/QĐ-BQP, trên cơ sở tổ chức lại Công ty TNHH một thành viên Vật tư Công nghiệp quốc phòng.'
                  : 'Through many historical periods, on August 23, 2011, Defence Economic Technical Industry Corporation (GAET) was officially established according to Decision No. 3035/QD-BQP, on the basis of reorganizing the one-member Defense Industry Materials Company.'}
              </p>
            </div>
            
            <div className="relative border-l-4 border-gaet-500 ml-6 md:ml-0 md:mx-auto md:max-w-3xl pl-8 pb-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year} 
                  className="mb-16 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="absolute -left-3.5 bg-white border-4 border-gaet-500 rounded-full w-7 h-7"></div>
                  <div className="bg-white shadow-lg rounded-lg p-6 relative">
                    <div className="absolute top-0 -left-14 w-12 h-12 bg-gaet-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-gaet-700 mt-0 pt-0 md:ml-0 ml-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-gaet-700 mb-6">
                {language === 'vi' ? 'Các thành tích nổi bật' : 'Notable Achievements'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-bold text-gaet-600 mb-3">2007</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'vi' ? 'Thương hiệu Vàng' : 'Gold Brand'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'vi'
                      ? 'Được Bộ Công Thương công nhận là Thương hiệu Vàng'
                      : 'Recognized as Gold Brand by the Ministry of Industry and Trade'}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-bold text-gaet-600 mb-3">2012</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'vi' ? 'Top 50 Nhãn hiệu cạnh tranh' : 'Top 50 Competitive Brands'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'vi'
                      ? 'Được công nhận trong "Top 50 nhãn hiệu cạnh tranh Việt Nam"'
                      : 'Recognized in the "Top 50 competitive brands in Vietnam"'}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-bold text-gaet-600 mb-3">2012</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'vi' ? 'Huân chương Quân công' : 'Military Achievement Medal'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'vi'
                      ? 'Được trao tặng Huân chương Quân công hạng Ba'
                      : 'Awarded the Third-class Military Achievement Medal'}
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

export default HistoryPage;
