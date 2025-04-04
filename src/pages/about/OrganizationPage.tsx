import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

type Department = {
  name: {
    vi: string;
    en: string;
  };
  description?: {
    vi: string;
    en: string;
  };
};

type DepartmentCategory = {
  title: {
    vi: string;
    en: string;
  };
  departments: Department[];
};

const OrganizationPage: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = language === 'vi' ? 'Sơ đồ tổ chức - GAET' : 'Organization - GAET Corporation';
    
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, [language]);

  const organizationStructure: DepartmentCategory[] = [
    {
      title: {
        vi: 'Cơ quan trực thuộc',
        en: 'Directly Affiliated Agencies',
      },
      departments: [
        { name: { vi: 'Văn phòng', en: 'Administration Office' } },
        { name: { vi: 'Phòng Kế hoạch', en: 'Planning Department' } },
        { name: { vi: 'Phòng Chính trị', en: 'Political Department' } },
        { name: { vi: 'Phòng Tổ chức Lao động', en: 'Organization and Labor Department' } },
        { name: { vi: 'Phòng Tài chính Kế toán', en: 'Finance and Accounting Department' } },
        { name: { vi: 'Phòng Hậu cần', en: 'Logistics Department' } },
        { name: { vi: 'Phòng Kỹ thuật An toàn', en: 'Technical Safety Department' } },
        { name: { vi: 'Phòng Xuất nhập khẩu 1', en: 'Import-Export Department 1' } },
        { name: { vi: 'Phòng Xuất nhập khẩu 2', en: 'Import-Export Department 2' } },
        { name: { vi: 'Phòng Xuất nhập khẩu 3', en: 'Import-Export Department 3' } },
        { name: { vi: 'Phòng Xuất nhập khẩu 4', en: 'Import-Export Department 4' } },
        { name: { vi: 'Phòng Xuất nhập khẩu 5', en: 'Import-Export Department 5' } },
        { name: { vi: 'Phòng Marketing', en: 'Marketing Department' } },
        { name: { vi: 'Phòng Kinh doanh và phát triển dự án Quân binh chủng', en: 'Business and Project Development Department for Military Services and Arms' } },
        { name: { vi: 'Phòng Kinh doanh XNK Vật liệu nổ Công nghiệp', en: 'Industrial Explosives Import-Export Business Department' } },
      ],
    },
    {
      title: {
        vi: 'Công ty con trực thuộc',
        en: 'Subsidiary Companies',
      },
      departments: [
        { name: { vi: 'Công ty vật liệu nổ công nghiệp', en: 'Industrial Explosives Company' } },
        { name: { vi: 'Công ty đào tạo nghề và XNK lao động', en: 'Vocational Training and Labor Export Company' } },
        { name: { vi: 'Công ty sản xuất kinh doanh tổng hợp', en: 'General Production and Business Company' } },
        { name: { vi: 'Công ty TNHH MTV vật tư kỹ thuật công nghiệp quốc phòng', en: 'Defense Industry Technical Materials Company Limited (One Member)' } },
        { name: { vi: 'Công ty T622', en: 'T622 Company' } },
        { name: { vi: 'Công ty T608', en: 'T608 Company' } },
        { name: { vi: 'Công ty cơ khí Z179', en: 'Z179 Mechanical Company' } },
        { name: { vi: 'Công ty khoan và nổ mìn Trường Sơn', en: 'Truong Son Drilling and Blasting Company' } },
        { name: { vi: 'Công ty kinh tế kỹ thuật (Metco)', en: 'Economic and Technical Company (Metco)' } },
        { name: { vi: 'Xí nghiệp 197', en: 'Enterprise 197' } },
        { name: { vi: 'Xí nghiệp Lam Kinh', en: 'Lam Kinh Enterprise' } },
      ],
    },
    {
      title: {
        vi: 'Văn phòng đại diện',
        en: 'Representative Offices',
      },
      departments: [
        { name: { vi: 'Văn phòng đại diện tại miền Trung', en: 'Representative Office in Central Region' } },
        { name: { vi: 'Văn phòng đại diện tại miền Nam', en: 'Representative Office in Southern Region' } },
        { name: { vi: 'Văn phòng đại diện nước ngoài', en: 'International Representative Office' } },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="bg-gaet-700 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white text-center">
              {language === 'vi' ? 'Sơ đồ tổ chức' : 'Organization'}
            </h1>
          </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="prose prose-lg mx-auto mb-16">
              <h2 className="text-2xl font-bold text-gaet-700 mb-6">
                {language === 'vi' ? 'Cơ cấu tổ chức' : 'Organizational Structure'}
              </h2>
              <p>
                {language === 'vi' 
                  ? 'Tổng công ty Kinh tế Kỹ thuật Công nghiệp Quốc phòng (GAET) được tổ chức theo mô hình công ty mẹ - con với cấu trúc khoa học, hiệu quả, bao gồm các cơ quan trực thuộc, công ty con trực thuộc và các văn phòng đại diện tại các khu vực.'
                  : 'Defence Economic Technical Industry Corporation (GAET) is organized according to the parent-subsidiary model with a scientific and efficient structure, including directly affiliated agencies, subsidiary companies, and representative offices in different regions.'}
              </p>
            </div>
            
            <div className="mb-16">
              <div className="bg-gaet-600 text-white rounded-t-lg p-4 flex justify-center items-center">
                <div className="text-xl font-bold px-6 py-3 border-2 border-white rounded-lg">
                  {language === 'vi' ? 'HỘI ĐỒNG THÀNH VIÊN' : 'BOARD OF MEMBERS'}
                </div>
              </div>
              <div className="bg-gaet-500 text-white p-4 flex justify-center items-center">
                <div className="text-xl font-bold">
                  {language === 'vi' ? 'TỔNG GIÁM ĐỐC' : 'GENERAL DIRECTOR'}
                </div>
              </div>
              <div className="bg-gaet-400 text-white p-3 flex justify-center items-center">
                <div className="text-lg font-semibold">
                  {language === 'vi' ? 'CÁC PHÓ TỔNG GIÁM ĐỐC' : 'DEPUTY GENERAL DIRECTORS'}
                </div>
              </div>
            </div>

            {organizationStructure.map((category, catIndex) => (
              <div 
                key={catIndex} 
                className="mb-12 opacity-0 animate-fade-in"
                style={{ animationDelay: `${catIndex * 150}ms` }}
              >
                <h2 className="text-xl font-bold text-gaet-700 border-b-2 border-gaet-200 pb-3 mb-6">
                  {category.title[language === 'vi' ? 'vi' : 'en']}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.departments.map((dept, deptIndex) => (
                    <div 
                      key={deptIndex} 
                      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-gaet-500"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {dept.name[language === 'vi' ? 'vi' : 'en']}
                      </h3>
                      {dept.description && (
                        <p className="text-gray-600 text-sm mt-2">
                          {dept.description[language === 'vi' ? 'vi' : 'en']}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gaet-700 mb-6 text-center">
                {language === 'vi' ? 'Sơ đồ tổ chức' : 'Organization Chart'}
              </h2>
              
              <div className="flex justify-center">
                <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                  <img 
                    src="/assets/images/about/org-chart.png" 
                    alt={language === 'vi' ? "Sơ đồ tổ chức GAET" : "GAET Organization Chart"} 
                    className="w-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.classList.add('hidden');
                      const parent = target.parentElement;
                      if (parent) {
                        const placeholder = document.createElement('div');
                        placeholder.className = "h-96 flex items-center justify-center bg-gray-100 rounded-lg";
                        placeholder.innerHTML = `<p class="text-gray-500">${language === 'vi' ? 'Sơ đồ đang được cập nhật' : 'Chart is being updated'}</p>`;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
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

export default OrganizationPage;
