import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Target, Compass, Award, Globe, Users, ShieldCheck } from 'lucide-react';

const VisionPage: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = language === 'vi' ? 'Tầm nhìn và sứ mệnh - GAET' : 'Vision and Mission - GAET Corporation';
    
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, [language]);

  const coreValues = [
    {
      icon: <Target className="h-12 w-12 text-gaet-600" />,
      title: language === 'vi' ? 'Chất lượng và uy tín' : 'Quality and reputation',
      description: language === 'vi'
        ? 'Đặt chất lượng sản phẩm và dịch vụ lên hàng đầu, xây dựng uy tín vững chắc với đối tác và khách hàng.'
        : 'Putting product and service quality first, building a solid reputation with partners and customers.'
    },
    {
      icon: <Compass className="h-12 w-12 text-gaet-600" />,
      title: language === 'vi' ? 'Đổi mới và sáng tạo' : 'Innovation and creativity',
      description: language === 'vi'
        ? 'Không ngừng đổi mới, áp dụng công nghệ tiên tiến và tìm kiếm các giải pháp sáng tạo.'
        : 'Constantly innovating, applying advanced technology and seeking creative solutions.'
    },
    {
      icon: <Award className="h-12 w-12 text-gaet-600" />,
      title: language === 'vi' ? 'Kỷ luật và trách nhiệm' : 'Discipline and responsibility',
      description: language === 'vi'
        ? 'Thực hiện công việc với tinh thần kỷ luật cao và có trách nhiệm với kết quả công việc.'
        : 'Performing work with high discipline and responsibility for work results.'
    },
    {
      icon: <Globe className="h-12 w-12 text-gaet-600" />,
      title: language === 'vi' ? 'Hội nhập và phát triển' : 'Integration and development',
      description: language === 'vi'
        ? 'Hội nhập với xu thế phát triển của khu vực và thế giới, mở rộng mạng lưới đối tác quốc tế.'
        : 'Integrating with regional and global development trends, expanding the network of international partners.'
    },
    {
      icon: <Users className="h-12 w-12 text-gaet-600" />,
      title: language === 'vi' ? 'Con người là nền tảng' : 'People are the foundation',
      description: language === 'vi'
        ? 'Coi trọng và phát triển nguồn nhân lực, xây dựng môi trường làm việc chuyên nghiệp và thân thiện.'
        : 'Valuing and developing human resources, building a professional and friendly working environment.'
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-gaet-600" />,
      title: language === 'vi' ? 'An toàn và bảo mật' : 'Safety and security',
      description: language === 'vi'
        ? 'Đảm bảo an toàn trong mọi hoạt động sản xuất kinh doanh và bảo mật thông tin.'
        : 'Ensuring safety in all business operations and information security.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="bg-gaet-700 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white text-center">
              {language === 'vi' ? 'Tầm nhìn và sứ mệnh' : 'Vision and Mission'}
            </h1>
          </div>
        </div>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gaet-700 mb-6">
                {language === 'vi' ? 'Tầm nhìn' : 'Vision'}
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                {language === 'vi' 
                  ? 'Trở thành doanh nghiệp hàng đầu trong lĩnh vực kinh tế kỹ thuật và công nghiệp quốc phòng tại Việt Nam và khu vực.'
                  : 'To become a leading enterprise in the field of technical economics and defense industry in Vietnam and the region.'}
              </p>
              
              <div className="mt-12 relative">
                <div className="absolute inset-0 bg-gaet-50 transform -skew-y-3 z-0"></div>
                <div className="relative z-10 py-12 px-8">
                  <h2 className="text-3xl font-bold text-gaet-700 mb-6">
                    {language === 'vi' ? 'Sứ mệnh' : 'Mission'}
                  </h2>
                  <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                    {language === 'vi' 
                      ? 'Cung cấp các sản phẩm và dịch vụ chất lượng cao phục vụ nền kinh tế và quốc phòng, góp phần vào sự phát triển bền vững của đất nước.'
                      : 'Providing high-quality products and services for the economy and defense, contributing to the sustainable development of the country.'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-gaet-700 mb-10 text-center">
                {language === 'vi' ? 'Giá trị cốt lõi' : 'Core Values'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreValues.map((value, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-center mb-3 text-gray-800">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-gaet-700 mb-10 text-center">
                {language === 'vi' ? 'Mục tiêu chiến lược' : 'Strategic Objectives'}
              </h2>
              
              <div className="bg-white shadow-lg rounded-lg p-8 border-t-4 border-gaet-600">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-gaet-100 rounded-full p-1 mr-3 mt-1">
                      <div className="bg-gaet-600 rounded-full w-3 h-3"></div>
                    </div>
                    <p className="text-gray-700">
                      {language === 'vi' 
                        ? 'Phát triển bền vững với tốc độ tăng trưởng cao, đảm bảo hiệu quả kinh tế và quân sự.'
                        : 'Sustainable development with high growth rates, ensuring economic and military efficiency.'}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gaet-100 rounded-full p-1 mr-3 mt-1">
                      <div className="bg-gaet-600 rounded-full w-3 h-3"></div>
                    </div>
                    <p className="text-gray-700">
                      {language === 'vi' 
                        ? 'Đổi mới công nghệ, nâng cao năng lực sản xuất và chất lượng sản phẩm, dịch vụ.'
                        : 'Technological innovation, improving production capacity and quality of products and services.'}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gaet-100 rounded-full p-1 mr-3 mt-1">
                      <div className="bg-gaet-600 rounded-full w-3 h-3"></div>
                    </div>
                    <p className="text-gray-700">
                      {language === 'vi' 
                        ? 'Mở rộng thị trường trong nước và quốc tế, tăng cường hợp tác với các đối tác chiến lược.'
                        : 'Expanding domestic and international markets, strengthening cooperation with strategic partners.'}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gaet-100 rounded-full p-1 mr-3 mt-1">
                      <div className="bg-gaet-600 rounded-full w-3 h-3"></div>
                    </div>
                    <p className="text-gray-700">
                      {language === 'vi' 
                        ? 'Phát triển nguồn nhân lực chất lượng cao, xây dựng đội ngũ chuyên gia đầu ngành.'
                        : 'Developing high-quality human resources, building a team of leading experts.'}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-gaet-100 rounded-full p-1 mr-3 mt-1">
                      <div className="bg-gaet-600 rounded-full w-3 h-3"></div>
                    </div>
                    <p className="text-gray-700">
                      {language === 'vi' 
                        ? 'Nâng cao hiệu quả quản trị doanh nghiệp, ứng dụng công nghệ số trong quản lý và điều hành.'
                        : 'Improving corporate governance efficiency, applying digital technology in management and operation.'}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VisionPage;
