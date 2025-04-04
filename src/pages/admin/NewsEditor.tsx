
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import HtmlEditor from '@/components/custom/HtmlEditor';
import { sanitizeHtml } from '@/utils/html-helpers';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const categoriesList = [
  'Hợp tác quốc tế',
  'Sự kiện',
  'Giải thưởng',
  'Đào tạo',
  'Công nghệ',
  'Kinh doanh',
];

const NewsEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categoriesList[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchNewsItem();
    }
  }, [id]);

  const fetchNewsItem = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setTitle(data.title);
        setCategory(data.category);
        setDate(data.date);
        setExcerpt(data.excerpt);
        setContent(data.content);
        setImageUrl(data.image_url);
        setPublished(data.published);
      }
    } catch (error: any) {
      toast({
        title: 'Lỗi khi tải dữ liệu',
        description: error.message,
        variant: 'destructive',
      });
      navigate('/admin/news');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (publishAfterSave: boolean = false) => {
    try {
      setLoading(true);

      if (!title || !category || !excerpt || !content) {
        throw new Error('Vui lòng điền đầy đủ thông tin bắt buộc');
      }

      // Check if we need to upload a new image
      let finalImageUrl = imageUrl;
      if (imageFile) {
        // In a real scenario, you would upload to Supabase Storage or your CDN
        // For simplicity in this demo, we're just using the existing URL or a placeholder
        finalImageUrl = imageUrl || 'https://cdn.gpteng.co/resources/6727bae6-fb8d-465c-a993-8dce41dced45/news1.jpg';
      } else if (!imageUrl) {
        throw new Error('Vui lòng chọn hình ảnh cho bài viết');
      }

      // Sanitize the HTML content before saving
      const sanitizedContent = sanitizeHtml(content);
      
      const newsData = {
        title,
        category,
        date,
        excerpt,
        content: sanitizedContent,
        image_url: finalImageUrl,
        published: publishAfterSave || published,
        created_by: user?.id,
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        // Update existing news
        const { error } = await supabase
          .from('news')
          .update(newsData)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: 'Cập nhật thành công',
          description: 'Bài viết đã được cập nhật',
        });
      } else {
        // Create new news
        const { error } = await supabase
          .from('news')
          .insert(newsData);

        if (error) throw error;

        toast({
          title: 'Tạo thành công',
          description: 'Bài viết mới đã được tạo',
        });
      }

      navigate('/admin/news');
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isEditing) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Xóa thành công',
        description: 'Bài viết đã được xóa',
      });
      navigate('/admin/news');
    } catch (error: any) {
      toast({
        title: 'Lỗi khi xóa',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  if (initialLoading) {
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
          <Button variant="outline" onClick={() => navigate('/admin/news')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <div className="space-x-2">
            {isEditing && (
              <Button 
                variant="destructive" 
                onClick={() => setDeleteDialogOpen(true)}
                disabled={loading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa
              </Button>
            )}
            <Button 
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={loading}
            >
              <Save className="mr-2 h-4 w-4" />
              Lưu bản nháp
            </Button>
            <Button 
              onClick={() => handleSave(true)}
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Lưu và công bố
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề bài viết"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Tóm tắt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Nhập tóm tắt ngắn gọn về bài viết"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Nội dung</Label>
              <HtmlEditor
                content={content}
                onChange={setContent}
                placeholder="Nhập nội dung chi tiết bài viết..."
                rows={15}
              />
              <p className="text-xs text-muted-foreground">
                Sử dụng thanh công cụ trên để định dạng nội dung. Bạn có thể thêm định dạng đậm, nghiêng, gạch ngang, 
                tiêu đề, danh sách, trích dẫn, liên kết và hình ảnh. Để thêm hình ảnh, sử dụng nút hình ảnh và 
                tải ảnh lên trực tiếp - không cần phải sử dụng URL. Nhấn tab "Xem trước" để kiểm tra kết quả.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <div className="flex items-center justify-between">
                    <span>{published ? 'Đã công bố' : 'Bản nháp'}</span>
                    <Switch
                      id="status"
                      checked={published}
                      onCheckedChange={setPublished}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesList.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Ngày đăng</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Hình ảnh</Label>
                  {imageUrl && (
                    <div className="relative mb-2 rounded-md overflow-hidden">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  )}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {imageUrl ? 'Thay đổi hình ảnh' : 'Tải lên hình ảnh'}
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500">
                    Khuyến nghị: Hình ảnh có tỷ lệ 16:9 và kích thước tối thiểu 1200x675px
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Bài viết sẽ bị xóa vĩnh viễn khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default NewsEditor;
