import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

const SubsidiariesSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="subsidiaries" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-sm font-semibold text-gaet-600 uppercase tracking-wider">
              {language === 'vi' ? 'Đơn vị thành viên' : 'Member Units'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 header-underline">
              {language === 'vi' ? 'Các đơn vị thành viên' : 'Our Member Units'}
            </h2>
          </div>
          <Link 
            to="/subsidiaries" 
            className="hidden md:flex items-center text-gaet-600 font-medium hover:text-gaet-800 transition-colors"
          >
            {language === 'vi' ? 'Xem tất cả đơn vị' : 'View all units'}
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto">
            {language === 'vi'
              ? 'GAET là tập hợp của nhiều đơn vị thành viên hoạt động trong các lĩnh vực chuyên biệt, từ vật liệu nổ công nghiệp đến dịch vụ kỹ thuật và đào tạo nghề.'
              : 'GAET is a collection of many member units operating in specialized fields, from industrial explosives to technical services and vocational training.'}
          </p>

          <Link
            to="/subsidiaries"
            className="inline-flex items-center mt-6 px-5 py-2.5 bg-gaet-600 text-white font-medium rounded-md hover:bg-gaet-700 transition-colors duration-300 group md:hidden"
          >
            {language === 'vi' ? 'Xem tất cả đơn vị' : 'View all units'}
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SubsidiariesSection;
