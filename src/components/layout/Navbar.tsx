
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { scrollToElement } from '@/utils/scroll';
import { ChevronDown, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavItem {
  label: string;
  href: string;
  translationKey: string;
  children?: {
    label: string;
    href: string;
    translationKey: string;
  }[];
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Adjust href based on current page
  const getHref = (sectionId: string, fallbackPath: string) => {
    return isHomePage ? sectionId : fallbackPath;
  };

  const navigation: NavItem[] = [
    { label: t('home'), translationKey: 'home', href: '/' },
    { 
      label: t('about'), 
      translationKey: 'about',
      href: getHref('#about', '/about'),
      children: [
        { label: t('history'), translationKey: 'history', href: '/about/history' },
        { label: t('vision'), translationKey: 'vision', href: '/about/vision' },
        { label: t('organization'), translationKey: 'organization', href: '/about/organization' },
        { label: t('leadership'), translationKey: 'leadership', href: '/about/leadership' },
      ]
    },
    { 
      label: t('business'), 
      translationKey: 'business',
      href: getHref('#business', '/business'),
      children: [
        { label: t('business.militaryTrade'), translationKey: 'business.militaryTrade', href: '/business/military-trade' },
        { label: t('business.explosives'), translationKey: 'business.explosives', href: '/business/industrial-explosives' },
        { label: t('business.defenseRelations'), translationKey: 'business.defenseRelations', href: '/business/defense-relations' },
        { label: t('business.economicExport'), translationKey: 'business.economicExport', href: '/business/economic-export' },
        { label: t('business.otherActivities'), translationKey: 'business.otherActivities', href: '/business/other-activities' },
      ]
    },
    { label: t('news'), translationKey: 'news', href: getHref('#news', '/news') },
    { 
      label: t('subsidiaries'), 
      translationKey: 'subsidiaries', 
      href: '/subsidiaries'
    },

  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-10',
        scrolled
          ? 'bg-gaet-700/95 backdrop-blur-md shadow-md py-2'
          : isHomePage ? 'bg-transparent py-6' : 'bg-gaet-700/95 py-4'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center"
          aria-label="GAET Logo"
        >
          <div className="overflow-hidden">
            <img 
              src="/assets/logos/logo_GAET_transparent.png" 
              alt="GAET Logo" 
              className={cn(
                'transition-all duration-300',
                scrolled || !isHomePage ? 'max-w-[4.5rem]' : 'max-w-[9rem]'
              )}
            />
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <div key={item.translationKey} className="relative group">
              {item.href.startsWith('#') && isHomePage ? (
                <a
                  href={item.href}
                  className={cn(
                    'font-medium text-sm transition-colors duration-200 hover:text-gaet-300 flex items-center gap-1',
                    'text-white'
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    const sectionId = item.href.substring(1);
                    scrollToElement(sectionId, 80);
                  }}
                >
                  {item.label}
                  {item.children && item.children.length > 0 && (
                    <ChevronDown size={14} className="mt-0.5" />
                  )}
                </a>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    'font-medium text-sm transition-colors duration-200 hover:text-gaet-300 flex items-center gap-1',
                    'text-white'
                  )}
                >
                  {item.label}
                  {item.children && item.children.length > 0 && (
                    <ChevronDown size={14} className="mt-0.5" />
                  )}
                </Link>
              )}

              {item.children && item.children.length > 0 && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg p-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left scale-95 group-hover:scale-100 z-50">
                  <div className="py-1 grid gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.translationKey}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gaet-50 rounded-md hover:text-gaet-600 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-white hover:text-gaet-300 transition-colors"
            aria-label="Toggle Language"
          >
            <Globe size={16} />
            <span className="text-sm font-medium">{language === 'vi' ? 'EN' : 'VI'}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-white hover:text-gaet-300 transition-colors"
            aria-label="Toggle Language"
          >
            <Globe size={16} />
            <span className="text-sm font-medium">{language === 'vi' ? 'EN' : 'VI'}</span>
          </button>
          
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-gaet-700 shadow-lg min-h-screen animate-fade-in">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <div key={item.translationKey}>
                {item.children && item.children.length > 0 ? (
                  <div>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-white hover:bg-gaet-600 hover:text-white rounded-md"
                      onClick={() => toggleSubmenu(item.label)}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={cn(
                          'transition-transform duration-200',
                          openSubmenu === item.label ? 'rotate-180' : ''
                        )}
                      />
                    </button>
                    {openSubmenu === item.label && (
                      <div className="pl-4 space-y-1 animate-fade-in">
                        {item.children.map((child) => (
                          <Link
                            key={child.translationKey}
                            to={child.href}
                            className="block px-4 py-2 text-sm text-white/80 hover:bg-gaet-600 hover:text-white rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {item.href.startsWith('#') && isHomePage ? (
                      <a
                        href={item.href}
                        className="block px-4 py-3 text-base font-medium text-white hover:bg-gaet-600 hover:text-white rounded-md"
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileMenuOpen(false);
                          const sectionId = item.href.substring(1);
                          scrollToElement(sectionId, 80);
                        }}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="block px-4 py-3 text-base font-medium text-white hover:bg-gaet-600 hover:text-white rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
