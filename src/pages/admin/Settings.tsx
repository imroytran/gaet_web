
import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type SiteSettings = {
  site_name: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  social_facebook: string;
  social_twitter: string;
  social_linkedin: string;
  social_youtube: string;
  maintenance_mode: boolean;
  logo_url: string;
  favicon_url: string;
  footer_text: string;
  meta_keywords: string;
};

const defaultSettings: SiteSettings = {
  site_name: 'GAET Business Hub',
  site_description: 'Trung tâm thông tin về các lĩnh vực kinh doanh của tập đoàn GAET',
  contact_email: 'contact@gaet.com',
  contact_phone: '+84 xxx xxx xxx',
  address: 'Số 123, Đường ABC, Quận XYZ, Thành phố Hồ Chí Minh',
  social_facebook: 'https://facebook.com/gaet',
  social_twitter: 'https://twitter.com/gaet',
  social_linkedin: 'https://linkedin.com/company/gaet',
  social_youtube: 'https://youtube.com/gaet',
  maintenance_mode: false,
  logo_url: '/assets/logos/logo_GAET_transparent.png',
  favicon_url: '/assets/icons/favicon.ico',
  footer_text: '© 2023 GAET Group. Tất cả các quyền được bảo lưu.',
  meta_keywords: 'gaet, business hub, tập đoàn, đầu tư, kinh doanh, công nghệ',
};

const Settings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 means no rows returned, which is fine for initial setup
        throw error;
      }

      if (data) {
        setSettings(data as SiteSettings);
      }
    } catch (error: any) {
      toast({
        title: 'Lỗi khi tải cài đặt',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Check if we already have settings
      const { data: existingData, error: checkError } = await supabase
        .from('settings')
        .select('count')
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingData && existingData.count > 0) {
        // Update existing
        const { error } = await supabase
          .from('settings')
          .update(settings)
          .eq('id', existingData.id);

        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('settings')
          .insert(settings);

        if (error) throw error;
      }

      toast({
        title: 'Lưu thành công',
        description: 'Cài đặt hệ thống đã được cập nhật',
      });
    } catch (error: any) {
      toast({
        title: 'Lỗi khi lưu',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: keyof SiteSettings, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gaet-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Cài đặt Hệ thống</h1>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={fetchSettings}
              disabled={saving}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Tải lại
            </Button>
            <Button 
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Lưu cài đặt
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Cài đặt chung</TabsTrigger>
            <TabsTrigger value="contact">Thông tin liên hệ</TabsTrigger>
            <TabsTrigger value="social">Mạng xã hội</TabsTrigger>
            <TabsTrigger value="appearance">Giao diện</TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt chung</CardTitle>
                <CardDescription>
                  Thông tin cơ bản về website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site_name">Tên website</Label>
                  <Input 
                    id="site_name"
                    value={settings.site_name}
                    onChange={(e) => handleChange('site_name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site_description">Mô tả website</Label>
                  <Textarea 
                    id="site_description"
                    value={settings.site_description}
                    onChange={(e) => handleChange('site_description', e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meta_keywords">Từ khóa Meta</Label>
                  <Input 
                    id="meta_keywords"
                    value={settings.meta_keywords}
                    onChange={(e) => handleChange('meta_keywords', e.target.value)}
                    placeholder="Nhập các từ khóa, phân cách bằng dấu phẩy"
                  />
                  <p className="text-sm text-gray-500">Các từ khóa sẽ giúp tối ưu SEO cho website</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="footer_text">Nội dung chân trang</Label>
                  <Input 
                    id="footer_text"
                    value={settings.footer_text}
                    onChange={(e) => handleChange('footer_text', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance_mode">Chế độ bảo trì</Label>
                    <Switch 
                      id="maintenance_mode"
                      checked={settings.maintenance_mode}
                      onCheckedChange={(checked) => handleChange('maintenance_mode', checked)}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Khi bật chế độ bảo trì, người dùng sẽ thấy thông báo website đang được bảo trì
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Contact Settings */}
          <TabsContent value="contact" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
                <CardDescription>
                  Cài đặt thông tin liên hệ của tổ chức
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Email liên hệ</Label>
                  <Input 
                    id="contact_email"
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) => handleChange('contact_email', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Số điện thoại</Label>
                  <Input 
                    id="contact_phone"
                    value={settings.contact_phone}
                    onChange={(e) => handleChange('contact_phone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Textarea 
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Social Media Settings */}
          <TabsContent value="social" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mạng xã hội</CardTitle>
                <CardDescription>
                  Liên kết đến các trang mạng xã hội
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="social_facebook">Facebook</Label>
                  <Input 
                    id="social_facebook"
                    value={settings.social_facebook}
                    onChange={(e) => handleChange('social_facebook', e.target.value)}
                    placeholder="https://facebook.com/yourusername"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="social_twitter">Twitter</Label>
                  <Input 
                    id="social_twitter"
                    value={settings.social_twitter}
                    onChange={(e) => handleChange('social_twitter', e.target.value)}
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="social_linkedin">LinkedIn</Label>
                  <Input 
                    id="social_linkedin"
                    value={settings.social_linkedin}
                    onChange={(e) => handleChange('social_linkedin', e.target.value)}
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="social_youtube">YouTube</Label>
                  <Input 
                    id="social_youtube"
                    value={settings.social_youtube}
                    onChange={(e) => handleChange('social_youtube', e.target.value)}
                    placeholder="https://youtube.com/c/yourcompany"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Giao diện</CardTitle>
                <CardDescription>
                  Cài đặt liên quan đến giao diện website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logo_url">URL Logo</Label>
                  <Input 
                    id="logo_url"
                    value={settings.logo_url}
                    onChange={(e) => handleChange('logo_url', e.target.value)}
                    placeholder="/logo.png"
                  />
                  {settings.logo_url && (
                    <div className="mt-2 border rounded p-2 inline-block">
                      <img 
                        src={settings.logo_url} 
                        alt="Logo Preview" 
                        className="h-10 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.png';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="favicon_url">URL Favicon</Label>
                  <Input 
                    id="favicon_url"
                    value={settings.favicon_url}
                    onChange={(e) => handleChange('favicon_url', e.target.value)}
                    placeholder="/favicon.ico"
                  />
                  {settings.favicon_url && (
                    <div className="mt-2 border rounded p-2 inline-block">
                      <img 
                        src={settings.favicon_url} 
                        alt="Favicon Preview" 
                        className="h-8 w-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.png';
                        }}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
