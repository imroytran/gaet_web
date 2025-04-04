import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Building, Mail, Phone, MapPin, Globe, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = language === 'vi' ? 'Liên hệ - GAET' : 'Contact - GAET Corporation';
    
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, [language]);

  const contactOffices = [
    {
      name: {
        vi: 'Trụ sở chính',
        en: 'Headquarters'
      },
      address: {
        vi: '102 Kim Mã Thượng, Cống Vị, Ba Đình, Hà Nội, Việt Nam',
        en: '102 Kim Ma Thuong, Cong Vi, Ba Dinh, Hanoi, Vietnam'
      },
      phone: ['+84 243 832 5377', '+84 243 832 7710'],
      email: 'contact@gaet.com.vn'
    },
    {
      name: {
        vi: 'Văn phòng đại diện miền Trung',
        en: 'Central Region Representative Office'
      },
      address: {
        vi: 'Xóm Kim Mỹ, Xã Nghi Ân, Thành phố Vinh, Tỉnh Nghệ An',
        en: 'Kim My Hamlet, Nghi An Commune, Vinh City, Nghe An Province'
      },
      phone: ['+84 238 385 1166', '+84 238 351 1638']
    },
    {
      name: {
        vi: 'Văn phòng đại diện miền Nam',
        en: 'Southern Region Representative Office'
      },
      address: {
        vi: 'Số 7, Ngõ 1229, đường Bùi Văn Hòa, Phường Long Bình, TP. Biên Hòa, Tỉnh Đồng Nai',
        en: '7, Lane 1229, Bui Van Hoa Street, Long Binh Ward, Bien Hoa City, Dong Nai Province'
      },
      phone: ['+84 251 393 0285', '+84 251 393 0275']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="bg-gaet-700 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white text-center">
              {language === 'vi' ? 'Liên hệ' : 'Contact Us'}
            </h1>
          </div>
        </div>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gaet-700 mb-6">
                {language === 'vi' ? 'Kết nối với chúng tôi' : 'Connect with us'}
              </h2>
              <p className="text-gray-600">
                {language === 'vi' 
                  ? 'Hãy liên hệ với GAET để được tư vấn và hỗ trợ. Chúng tôi luôn sẵn sàng lắng nghe và đáp ứng mọi nhu cầu của quý khách hàng và đối tác.'
                  : 'Contact GAET for advice and support. We are always ready to listen and meet all the needs of our customers and partners.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-gaet-700 mb-6">
                  {language === 'vi' ? 'Gửi tin nhắn cho chúng tôi' : 'Send us a message'}
                </h2>
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
                        required
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
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'vi' ? 'Số điện thoại' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gaet-500 focus:border-gaet-500 transition-colors"
                      placeholder={language === 'vi' ? 'Nhập số điện thoại' : 'Enter your phone number'}
                    />
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
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'vi' ? 'Nội dung' : 'Message'}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gaet-500 focus:border-gaet-500 transition-colors"
                      placeholder={language === 'vi' ? 'Nhập nội dung tin nhắn' : 'Enter your message'}
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    {language === 'vi' ? 'Gửi tin nhắn' : 'Send Message'}
                  </button>
                </form>
              </div>
              
              <div>
                <div className="glass-card p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gaet-700 mb-6">
                    {language === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}
                  </h2>
                  
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
                            ? '102 Kim Mã Thượng, Cống Vị, Ba Đình, Hà Nội, Việt Nam'
                            : '102 Kim Ma Thuong, Cong Vi, Ba Dinh, Hanoi, Vietnam'}
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
                        <h4 className="font-medium text-gray-900 mb-1">
                          {language === 'vi' ? 'Điện thoại' : 'Phone'}
                        </h4>
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
                        <Clock className="h-5 w-5 text-gaet-600" />
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
                
                <div className="glass-card p-8">
                  <h2 className="text-2xl font-bold text-gaet-700 mb-6">
                    {language === 'vi' ? 'Liên hệ quốc tế' : 'International Contact'}
                  </h2>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-gaet-50 rounded-full flex items-center justify-center mr-4">
                      <Globe className="h-5 w-5 text-gaet-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {language === 'vi' ? 'Văn phòng đại diện nước ngoài' : 'International Representative Office'}
                      </h4>
                      <p className="text-gray-600 mb-2">
                        {language === 'vi'
                          ? 'GAET có các văn phòng đại diện ở nhiều quốc gia và khu vực trên thế giới.'
                          : 'GAET has representative offices in many countries and regions around the world.'}
                      </p>
                      <a href="mailto:international@gaet.com.vn" className="text-gaet-600 hover:text-gaet-800 transition-colors">
                        international@gaet.com.vn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gaet-700 mb-6 text-center">
                {language === 'vi' ? 'Văn phòng đại diện' : 'Representative Offices'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contactOffices.map((office, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {office.name[language === 'vi' ? 'vi' : 'en']}
                    </h3>
                    
                    <div className="space-y-4 text-gray-600">
                      <p>
                        <MapPin className="w-4 h-4 inline-block mr-2 text-gaet-600" />
                        {office.address[language === 'vi' ? 'vi' : 'en']}
                      </p>
                      
                      <div>
                        <Phone className="w-4 h-4 inline-block mr-2 text-gaet-600" />
                        <span className="block ml-6">
                          {office.phone.map((phone, phoneIndex) => (
                            <a 
                              key={phoneIndex}
                              href={`tel:${phone.replace(/[^\d+]/g, '')}`} 
                              className="text-gaet-600 hover:text-gaet-800 transition-colors block"
                            >
                              {phone}
                            </a>
                          ))}
                        </span>
                      </div>
                      
                      {office.email && (
                        <p>
                          <Mail className="w-4 h-4 inline-block mr-2 text-gaet-600" />
                          <a 
                            href={`mailto:${office.email}`} 
                            className="text-gaet-600 hover:text-gaet-800 transition-colors"
                          >
                            {office.email}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gaet-700 mb-6 text-center">
                {language === 'vi' ? 'Bản đồ' : 'Map'}
              </h2>
              
              <div className="rounded-lg overflow-hidden shadow-lg h-96 bg-white">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8978177206023!2d105.80698707500812!3d21.036179987480198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab145bf89bd7%3A0xd94a869b494c04b6!2zMTAyIEtpbSBNw6MsIEPhu5FuZyBW4buLLCBCYSDEkMOsbmgsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1712051812869!5m2!1svi!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GAET Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
