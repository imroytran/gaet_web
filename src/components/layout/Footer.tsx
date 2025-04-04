import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Mail, Phone, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Helper function to create language-aware URLs
  const getLanguageUrl = (baseUrl: string) => {
    // Add language parameter only for English
    return language === 'en' ? `${baseUrl}?lang=en` : baseUrl;
  };
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div id="contact">
            <div className="mb-4">
              <img src="/assets/logos/logo_GAET_transparent.png" alt="GAET Logo" className="h-10" />
            </div>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-gaet-600 rounded-full flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-gaet-600 rounded-full flex items-center justify-center transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-gaet-600 rounded-full flex items-center justify-center transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-gaet-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </a>
            </div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={16} className="mr-3 flex-shrink-0 text-gray-500" />
                <span className="text-gray-400 text-sm">{t('footer.address')}</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-3 flex-shrink-0 text-gray-500" />
                <a href="mailto:contact@gaet.com.vn" className="text-gray-400 text-sm hover:text-white transition-colors">
                  contact@gaet.com.vn
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-3 flex-shrink-0 text-gray-500" />
                <div className="text-gray-400 text-sm">
                  <a href="tel:+84243832537" className="hover:text-white transition-colors block">
                    +84 243 832 5377
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-3 flex-shrink-0 text-gray-500 opacity-0" />
                <div className="text-gray-400 text-sm">
                  <a href="tel:+84243832771" className="hover:text-white transition-colors block">
                    +84 243 832 7710
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Globe size={16} className="mr-3 flex-shrink-0 text-gray-500" />
                <a href="https://gaet.com.vn" className="text-gray-400 text-sm hover:text-white transition-colors">
                  gaet.com.vn
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.businessAreas')}</h4>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to={getLanguageUrl("/business/military-trade")} className="text-gray-400 hover:text-white text-sm transition-colors block">
                  {t('footer.militaryTrade')}
                </Link>
              </li>
              <li>
                <Link to={getLanguageUrl("/business/industrial-explosives")} className="text-gray-400 hover:text-white text-sm transition-colors block">
                  {t('footer.industrialExplosives')}
                </Link>
              </li>
              <li>
                <Link to={getLanguageUrl("/business/defense-relations")} className="text-gray-400 hover:text-white text-sm transition-colors block">
                  {t('footer.defenseRelations')}
                </Link>
              </li>
              <li>
                <Link to={getLanguageUrl("/business/economic-export")} className="text-gray-400 hover:text-white text-sm transition-colors block">
                  {t('footer.economicExport')}
                </Link>
              </li>
              <li>
                <Link to={getLanguageUrl("/business/other-activities")} className="text-gray-400 hover:text-white text-sm transition-colors block">
                  {t('footer.otherActivities')}
                </Link>
              </li>
            </ul>
            
            <div className="pt-6 border-t border-gray-800">
              <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link to={getLanguageUrl("/")} className="text-gray-400 hover:text-white text-sm transition-colors block">
                  {t('footer.home')}
                </Link>
                <Link to={getLanguageUrl("/about")} className="text-gray-400 hover:text-white text-sm transition-colors block">
                  {t('footer.about')}
                </Link>
                <Link to={getLanguageUrl("/business")} className="text-gray-400 hover:text-white text-sm transition-colors block">
                  {t('footer.businessAreas.menu')}
                </Link>
                <Link to={getLanguageUrl("/news")} className="text-gray-400 hover:text-white text-sm transition-colors block">
                  {t('footer.newsEvents')}
                </Link>
                <Link to={getLanguageUrl("/subsidiaries")} className="text-gray-400 hover:text-white text-sm transition-colors block">
                  {t('footer.memberUnits')}
                </Link>
                <Link to={getLanguageUrl("/career")} className="text-gray-400 hover:text-white text-sm transition-colors block">
                  {t('footer.careerOpportunities')}
                </Link>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.sendMessage')}</h4>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  id="footer-name"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-gaet-500 focus:border-gaet-500"
                  placeholder={t('footer.fullName')}
                />
              </div>
              <div>
                <input
                  type="email"
                  id="footer-email"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-gaet-500 focus:border-gaet-500"
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="footer-subject"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-gaet-500 focus:border-gaet-500"
                  placeholder={t('footer.subject')}
                />
              </div>
              <div>
                <textarea
                  id="footer-message"
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm placeholder-gray-500 focus:ring-1 focus:ring-gaet-500 focus:border-gaet-500"
                  placeholder={t('footer.message')}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gaet-600 text-white text-sm font-medium rounded-md hover:bg-gaet-700 transition-colors"
              >
                {t('footer.send')}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} GAET. {t('footer.copyright')}
            </p>
            <div className="flex space-x-6">
              <Link to={getLanguageUrl("/privacy")} className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to={getLanguageUrl("/terms")} className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.termsOfUse')}
              </Link>
              <Link to={getLanguageUrl("/sitemap")} className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.sitemap')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;