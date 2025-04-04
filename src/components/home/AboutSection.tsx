
import React from 'react';
import { Globe, Briefcase, Building, Factory } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      id: 1,
      icon: <Globe className="h-6 w-6 text-gaet-600" />,
      title: t('feature.globalVision'),
      description: t('feature.globalVision.desc')
    },
    {
      id: 2,
      icon: <Briefcase className="h-6 w-6 text-gaet-600" />,
      title: t('feature.professionalTeam'),
      description: t('feature.professionalTeam.desc')
    },
    {
      id: 3,
      icon: <Building className="h-6 w-6 text-gaet-600" />,
      title: t('feature.diverseFields'),
      description: t('feature.diverseFields.desc')
    },
    {
      id: 4,
      icon: <Factory className="h-6 w-6 text-gaet-600" />,
      title: t('feature.advancedTech'),
      description: t('feature.advancedTech.desc')
    }
  ];

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <div className="mb-6 text-center lg:text-left">
                <span className="text-sm font-semibold text-gaet-600 uppercase tracking-wider">
                  {t('about.title')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 header-underline about-text-balanced">
                  {t('about.companyName')}
                </h2>
              </div>
              
              <p className="text-gray-600 mb-6 about-text-balanced text-justify">
                {t('about.description1')}
              </p>
              
              <p className="text-gray-600 mb-8 about-text-balanced text-justify">
                {t('about.description2')}
              </p>
              
              <a href="/about" className="btn-primary inline-flex items-center">
                {t('about.learnMore')}
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={feature.id}
                  className="glass-card p-6 opacity-0 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-gaet-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gaet-100 rounded-full opacity-70 blur-3xl"></div>
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-gaet-200 rounded-full opacity-70 blur-3xl"></div>
          </div>
        </div>
        
        <div className="mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-center">
            <div className="opacity-0 animate-fade-in animate-delay-100">
              <div className="text-4xl font-bold text-gaet-700 mb-2">60+</div>
              <p className="text-gray-600">{t('stats.experience')}</p>
            </div>
            <div className="opacity-0 animate-fade-in animate-delay-200">
              <div className="text-4xl font-bold text-gaet-700 mb-2">10+</div>
              <p className="text-gray-600">{t('stats.subsidiaries')}</p>
            </div>
            <div className="opacity-0 animate-fade-in animate-delay-300">
              <div className="text-4xl font-bold text-gaet-700 mb-2">100+</div>
              <p className="text-gray-600">{t('stats.partnerCountries')}</p>
            </div>
            <div className="opacity-0 animate-fade-in animate-delay-400">
              <div className="text-4xl font-bold text-gaet-700 mb-2">1700+</div>
              <p className="text-gray-600">{t('stats.personnel')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
