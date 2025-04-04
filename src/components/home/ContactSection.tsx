
import React from 'react';
import { Building, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  return (
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-gaet-100 rounded-full opacity-50 blur-3xl z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gaet-50 rounded-full opacity-70 blur-3xl z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-gaet-600 uppercase tracking-wider">
            {language === 'vi' ? 'Liên hệ' : 'Contact'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
            {language === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}
          </h2>
          <p className="text-gray-600">
            {language === 'vi' 
              ? 'Thông tin liên hệ của GAET. Chúng tôi luôn sẵn sàng lắng nghe và đáp ứng mọi nhu cầu của quý khách hàng và đối tác.'
              : 'Contact information of GAET. We are always ready to listen and meet all the needs of our customers and partners.'}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 opacity-0 animate-fade-in">
            <div className="glass-card p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                {language === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-gaet-50 rounded-full flex items-center justify-center mr-4">
                    <Building className="h-5 w-5 text-gaet-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {language === 'vi' ? 'Trụ sở chính' : 'Headquarters'}
                    </h4>
                    <p className="text-gray-600">
                      {language === 'vi'
                        ? '102 Kim Mã Thượng, Ba Đình, Hà Nội, Việt Nam'
                        : '102 Kim Ma Thuong, Ba Dinh, Hanoi, Vietnam'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-gaet-50 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-gaet-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                    <a href="mailto:contact@gaet.com.vn" className="text-gaet-600 hover:text-gaet-800 transition-colors">
                      contact@gaet.com.vn
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-gaet-50 rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-gaet-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Điện thoại</h4>
                    <div className="space-y-1">
                      <a href="tel:+84243832537" className="text-gaet-600 hover:text-gaet-800 transition-colors block">
                        +84 243 832 5377
                      </a>
                      <a href="tel:+84243832771" className="text-gaet-600 hover:text-gaet-800 transition-colors block">
                        +84 243 832 7710
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-gaet-50 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-gaet-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {language === 'vi' ? 'Giờ làm việc' : 'Working Hours'}
                    </h4>
                    <p className="text-gray-600">
                      {language === 'vi' ? 'Thứ Hai - Thứ Sáu: 8:00 - 17:00' : 'Monday - Friday: 8:00 - 17:00'}
                    </p>
                    <p className="text-gray-600">
                      {language === 'vi' ? 'Thứ Bảy: 8:00 - 12:00' : 'Saturday: 8:00 - 12:00'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 opacity-0 animate-fade-in animate-delay-200">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                {language === 'vi' ? 'Gửi tin nhắn' : 'Send a Message'}
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'vi' ? 'Họ và tên' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gaet-500 focus:border-gaet-500 transition-colors"
                      placeholder={language === 'vi' ? 'Nhập họ và tên' : 'Enter your full name'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gaet-500 focus:border-gaet-500 transition-colors"
                      placeholder={language === 'vi' ? 'Nhập địa chỉ email' : 'Enter your email address'}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'vi' ? 'Tiêu đề' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gaet-500 focus:border-gaet-500 transition-colors"
                    placeholder={language === 'vi' ? 'Nhập tiêu đề' : 'Enter subject'}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'vi' ? 'Nội dung' : 'Message'}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gaet-500 focus:border-gaet-500 transition-colors"
                    placeholder={language === 'vi' ? 'Nhập nội dung tin nhắn' : 'Enter your message'}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto"
                >
                  {language === 'vi' ? 'Gửi tin nhắn' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
