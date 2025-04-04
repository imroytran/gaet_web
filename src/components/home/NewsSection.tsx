
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import SmoothImage from '../ui/SmoothImage';
import { useLanguage } from '@/contexts/LanguageContext';

type NewsItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image_url: string;
};

const NewsSection: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('id, title, category, date, excerpt, image_url')
          .eq('published', true)
          .order('date', { ascending: false })
          .limit(4);

        if (error) throw error;
        setNewsItems(data || []);
      } catch (err: any) {
        console.error('Error fetching news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Fallback to static data if no items in database or error
  const staticNewsItems_vi = [
    {
      id: "1",
      title: "Đoàn cơ sở GAET tổ chức Giải Pickleball mở rộng năm 2025",
      date: "26/03/2025",
      category: "Tin tức nội bộ, Tin hoạt động",
      excerpt: "Ngày 25/3/2025 tại Hà Nội, Đoàn Cơ sở Tổng công ty GAET đã tổ chức thành công giải Pickleball mở rộng nhân dịp kỷ niệm 94 năm ngày thành lập Đoàn TNCS Hồ Chí Minh (26/3/1931- 26/3/2025).",
      image_url: "/assets/images/news/pickleball-tournament.jpg",
    },
    {
      id: "2",
      title: "Thanh niên GAET hưởng ứng Ngày hội hiến máu tình nguyện năm 2025",
      date: "24/03/2025",
      category: "Tin hoạt động, Tin tức nổi bật",
      excerpt: "Hưởng ứng lời kêu gọi hiến máu cứu người của Ban Chỉ đạo Vận động hiến máu tình nguyện Thành phố Hà Nội và Tổng cục Công nghiệp Quốc phòng, hàng chục cán bộ, đoàn viên thanh niên của Tổng công ty GAET đã tham gia Ngày hội hiến máu tình nguyện năm 2025.",
      image_url: "/assets/images/news/blood-donation.jpg",
    },
    {
      id: "3",
      title: "GAET sôi nổi các hoạt động chào mừng kỷ niệm 115 năm Ngày Quốc tế Phụ nữ 8/3",
      date: "07/03/2025",
      category: "Tin tức nội bộ, Tin hoạt động",
      excerpt: "Nhân dịp kỷ niệm 115 năm Ngày Quốc tế Phụ nữ (8/3/1910 - 8/3/2025), Tổng công ty GAET đã tổ chức nhiều hoạt động ý nghĩa để chào mừng và tôn vinh phụ nữ, nữ cán bộ, người lao động trong toàn Tổng công ty.",
      image_url: "/assets/images/news/womens-day.jpg",
    },
    {
      id: "4",
      title: "GAET: Quán triệt, triển khai Nghị quyết về đột phá phát triển khoa học, công nghệ",
      date: "28/02/2025",
      category: "Tin hoạt động, Tin tức nổi bật",
      excerpt: "Ngày 27/02/2025, Tổng công ty GAET đã tổ chức Hội nghị quán triệt, triển khai Nghị quyết của Quân ủy Trung ương về đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số trong Quân đội.",
      image_url: "/assets/images/news/resolution-deployment.jpg",
    }
  ];

  const staticNewsItems_en = [
    {
      id: "1",
      title: "GAET Youth Union Organizes Extended Pickleball Tournament 2025",
      date: "26/03/2025",
      category: "Internal News, Activities",
      excerpt: "On March 25, 2025 in Hanoi, the GAET Corporation Youth Union successfully organized an open Pickleball tournament on the occasion of the 94th anniversary of the founding of the Ho Chi Minh Communist Youth Union (March 26, 1931 - March 26, 2025).",
      image_url: "/assets/images/news/pickleball-tournament.jpg",
    },
    {
      id: "2",
      title: "GAET Youth Responds to Voluntary Blood Donation Day 2025",
      date: "24/03/2025",
      category: "Activities, Featured News",
      excerpt: "In response to the call for blood donation from the Hanoi City Voluntary Blood Donation Steering Committee and the General Department of Defense Industry, dozens of GAET Corporation's staff and youth union members participated in the Voluntary Blood Donation Day 2025.",
      image_url: "/assets/images/news/blood-donation.jpg",
    },
    {
      id: "3",
      title: "GAET Celebrates the 115th Anniversary of International Women's Day (March 8)",
      date: "07/03/2025",
      category: "Internal News, Activities",
      excerpt: "On the occasion of the 115th anniversary of International Women's Day (March 8, 1910 - March 8, 2025), GAET Corporation organized many meaningful activities to celebrate and honor women, female officials, and workers throughout the Corporation.",
      image_url: "/assets/images/news/womens-day.jpg",
    },
    {
      id: "4",
      title: "GAET: Implementation of Resolution on Breakthrough in Science and Technology Development",
      date: "28/02/2025",
      category: "Activities, Featured News",
      excerpt: "On February 27, 2025, GAET Corporation held a Conference to thoroughly grasp and implement the Resolution of the Central Military Commission on breakthrough development of science, technology, innovation and digital transformation in the Military.",
      image_url: "/assets/images/news/resolution-deployment.jpg",
    }
  ];

  // Use database items if available, otherwise use static fallback based on language
  const displayItems = newsItems.length > 0 ? newsItems : (language === 'vi' ? staticNewsItems_vi : staticNewsItems_en);

  return (
    <section id="news" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-sm font-semibold text-gaet-600 uppercase tracking-wider">
              {t('news.section.title')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 header-underline">
              {t('news.section.latestNews')}
            </h2>
          </div>
          <Link 
            to="/news" 
            className="hidden md:flex items-center text-gaet-600 font-medium hover:text-gaet-800 transition-colors"
          >
            {t('news.section.viewAll')}
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gaet-600"></div>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 text-red-600 rounded-lg">
            <p>{t('news.loadingErrorMessage')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayItems.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 opacity-0 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-48 overflow-hidden">
                  <SmoothImage
                    id={`news-${item.id}`}
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full" 
                    imgClassName="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium bg-gaet-50 text-gaet-700 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.date.includes('T') 
                        ? new Date(item.date).toLocaleDateString('vi-VN') 
                        : item.date}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 line-clamp-2">
                    <Link to={`/news/${item.id}`} className="hover:text-gaet-600 transition-colors">
                      {item.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {item.excerpt}
                  </p>
                  
                  <Link 
                    to={`/news/${item.id}`} 
                    className="inline-flex items-center text-gaet-600 font-medium text-sm hover:text-gaet-800 transition-colors"
                  >
                    {t('news.readMore')}
                    <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/news" 
            className="btn-secondary inline-flex items-center"
          >
            {t('news.section.viewAll')}
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
