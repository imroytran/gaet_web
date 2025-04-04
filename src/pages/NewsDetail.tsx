
import React, { useEffect, useState } from 'react';
import { sanitizeHtml } from '@/utils/html-helpers';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import SmoothImage from '@/components/ui/SmoothImage';
import { useLanguage } from '@/contexts/LanguageContext';

type NewsItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image_url: string;
  published: boolean;
};

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setNews(data);
      } catch (error: any) {
        toast({
          title: t('news.loadingError'),
          description: error.message,
          variant: 'destructive',
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gaet-600"></div>
      </div>
    );
  }

  if (!news) {
    return null;
  }

  // No need to format content as it's now HTML from Tiptap

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="outline"
            className="mb-6"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('news.backToHome')}
          </Button>
          
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">{news.title}</h1>
            
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(news.date).toLocaleDateString('vi-VN')}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                {news.category}
              </div>
            </div>
            
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <SmoothImage
                id={`news-detail-${news.id}`}
                src={news.image_url}
                alt={news.title}
                className="w-full h-full"
                imgClassName="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-lg font-medium text-gray-700 mb-8">
              {news.excerpt}
            </div>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(news.content) }}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsDetail;
