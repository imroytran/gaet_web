import React, { useState, useRef } from 'react';
import { Editor } from '@tiptap/react';
import { 
  Bold, 
  Italic, 
  Heading, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  Quote,
  Strikethrough,
  PilcrowSquare,
  Pilcrow,
  Database,
  Settings
} from 'lucide-react';
import TestConnectionDialog from './TestConnectionDialog';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { newsService } from '@/services/newsService';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, X } from 'lucide-react';

interface TiptapToolbarProps {
  editor: Editor;
}

const TiptapToolbar: React.FC<TiptapToolbarProps> = ({ editor }) => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState('');
  const [activeTab, setActiveTab] = useState('upload');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    setIsImageDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Kiểm tra kích thước file (tối đa 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB.');
        return;
      }
      
      // Kiểm tra định dạng file
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Định dạng file không hỗ trợ. Vui lòng chọn file JPG, PNG, GIF, WEBP hoặc SVG.');
        return;
      }
      
      setFile(selectedFile);
      
      // Tạo URL xem trước
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 90) {
        clearInterval(interval);
        return;
      }
      setUploadProgress(Math.min(progress, 90));
    }, 300);
    
    return () => clearInterval(interval);
  };

  const handleUpload = async () => {
    let progressInterval: NodeJS.Timeout | null = null;
    
    try {
      setError('');
      setIsUploading(true);
      
      // Bắt đầu hiển thị thanh tiến trình giả
      progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval!);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 300);
      
      if (file) {
        try {
          console.log('Đang tải lên hình ảnh qua Supabase:', file.name);
          // Thử tải lên Supabase
          const url = await newsService.uploadImage(file);
          console.log('Đã tải lên Supabase thành công:', url);
          
          clearInterval(progressInterval);
          progressInterval = null;
          
          setUploadProgress(100);
          editor.chain().focus().setImage({ src: url }).run();
          
          setTimeout(() => {
            setIsImageDialogOpen(false);
            resetImageForm();
          }, 800);
        } catch (supabaseError: any) {
          console.error('Lỗi khi tải lên Supabase:', supabaseError);
          
          // Tự động thử dùng Data URL thay thế
          console.log('Chuyển sang sử dụng Data URL...');
          setError(`Lỗi khi tải lên Supabase (${supabaseError.message}). Đang sử dụng giải pháp thay thế...`);
          
          try {
            const dataUrl = await newsService.getDataUrlFromFile(file);
            console.log('Đã tạo Data URL thành công');
            
            setUploadProgress(100);
            
            setTimeout(() => {
              editor.chain().focus().setImage({ src: dataUrl }).run();
              setIsImageDialogOpen(false);
              resetImageForm();
            }, 1500);
          } catch (dataUrlError: any) {
            console.error('Không thể tạo Data URL:', dataUrlError);
            throw new Error('Không thể tải ảnh lên Supabase hoặc tạo Data URL.');
          }
        }
      }
    } catch (error: any) {
      console.error('Lỗi tổng thể khi tải hình ảnh:', error);
      
      let errorMessage = `Lỗi tải lên: ${error.message}`;
      
      // Kiểm tra lỗi liên quan đến RLS
      if (error.message.includes('row-level security') || error.message.includes('permissions')) {
        errorMessage = `Lỗi quyền truy cập Supabase Storage: Vui lòng đảm bảo bucket 'newsimages' đã được tạo từ Supabase Dashboard và cấu hình RLS policy cho phép tải lên/truy cập.`;
      }
      
      // Kiểm tra lỗi bucket không tồn tại
      if (error.message.includes('bucket') || error.message.includes('Bucket not found')) {
        errorMessage = `Bucket 'newsimages' không tồn tại: Vui lòng tạo bucket này từ Supabase Dashboard (Storage -> New Bucket -> 'newsimages' -> Public).`;
      }
      
      setError(errorMessage);
      setUploadProgress(0);
      
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    } finally {
      setIsUploading(false);
      
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    }
  };

  const handleUrlSubmit = () => {
    if (!imageUrl) {
      setError('Vui lòng nhập URL hình ảnh');
      return;
    }
    
    try {
      new URL(imageUrl); // Kiểm tra URL hợp lệ
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setIsImageDialogOpen(false);
      resetImageForm();
    } catch (error) {
      setError('URL không hợp lệ. Vui lòng nhập URL hợp lệ.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setError('');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Kiểm tra kích thước file (tối đa 5MB)
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB.');
        return;
      }
      
      // Kiểm tra định dạng file
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!validTypes.includes(droppedFile.type)) {
        setError('Định dạng file không hỗ trợ. Vui lòng chọn file JPG, PNG, GIF, WEBP hoặc SVG.');
        return;
      }
      
      setFile(droppedFile);
      
      // Tạo URL xem trước
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const resetImageForm = () => {
    setFile(null);
    setPreviewUrl('');
    setImageUrl('');
    setError('');
    setUploadProgress(0);
    setIsUploading(false);
    setActiveTab('upload');
  };

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    disabled = false,
    title,
    icon: Icon
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    disabled?: boolean;
    title: string;
    icon: React.ElementType;
  }) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            type="button" 
            variant={isActive ? "secondary" : "ghost"} 
            size="sm" 
            onClick={onClick}
            disabled={disabled}
            className="h-8 w-8 p-0 flex items-center justify-center"
          >
            <Icon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
    );
  };

  return (
    <>
      <div className="border-b bg-gray-50 p-1 flex flex-wrap gap-1 items-center justify-between">
        <div className="flex flex-wrap gap-1 items-center">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Đậm"
          icon={Bold}
        />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Nghiêng"
          icon={Italic}
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Gạch ngang"
          icon={Strikethrough}
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive('paragraph')}
          title="Đoạn văn"
          icon={Pilcrow}
        />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Tiêu đề"
          icon={Heading}
        />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Trích dẫn"
          icon={Quote}
        />
        
        <Separator orientation="vertical" className="mx-1 h-6" />
        
        {/* Nút căn chỉnh */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Căn trái"
          icon={AlignLeft}
        />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Căn giữa"
          icon={AlignCenter}
        />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Căn phải"
          icon={AlignRight}
        />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          title="Căn đều"
          icon={AlignJustify}
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Danh sách"
          icon={List}
        />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Danh sách có thứ tự"
          icon={ListOrdered}
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive('link')}
          title="Thêm liên kết"
          icon={LinkIcon}
        />
        
        <ToolbarButton
          onClick={addImage}
          title="Thêm hình ảnh"
          icon={ImageIcon}
        />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Hoàn tác"
          icon={Undo}
        />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Làm lại"
          icon={Redo}
        />
        </div>
        
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsTestDialogOpen(true)}
                className="h-8 w-8 p-0 flex items-center justify-center"
              >
                <Database className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Kiểm tra kết nối Storage</TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      {/* Connection Test Dialog */}
      <TestConnectionDialog
        open={isTestDialogOpen}
        onOpenChange={setIsTestDialogOpen}
      />

      {/* Image Upload Dialog */}
      <Dialog 
        open={isImageDialogOpen} 
        onOpenChange={(open) => {
          setIsImageDialogOpen(open);
          if (!open) resetImageForm();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm hình ảnh</DialogTitle>
            <DialogDescription>
              Tải lên hình ảnh hoặc thêm từ URL
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="upload">Tải lên</TabsTrigger>
              <TabsTrigger value="url">Từ URL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-4">
              <div 
                className={`border-2 border-dashed rounded-lg p-4 text-center ${error ? 'border-red-400' : 'border-gray-300'} hover:border-blue-400 transition-colors`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  <div className="relative">
                    <img 
                      src={previewUrl} 
                      alt="Xem trước" 
                      className="max-h-64 mx-auto rounded-md"
                    />
                    <button 
                      className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setPreviewUrl('');
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="py-8 cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Kéo và thả hình ảnh vào đây hoặc click để duyệt file
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        JPG, PNG, GIF, WEBP hoặc SVG. Tối đa 5MB.
                      </p>
                    </div>
                  </div>
                )}
                <Input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </div>
              
              {error && (
        <div className="mt-2">
          <p className="text-sm text-red-500">{error}</p>
          {error.includes('Supabase Storage') && (
            <div className="mt-2 p-3 bg-yellow-50 rounded-md border border-yellow-200">
              <p className="text-sm text-yellow-800 font-medium">Hướng dẫn khắc phục:</p>
              <ol className="text-xs text-yellow-700 list-decimal pl-4 mt-1 space-y-1">
                <li>Truy cập Supabase Dashboard</li>
                <li>Vào phần Storage</li>
                <li>Tạo bucket mới với tên "newsimages"</li>
                <li>Đặt bucket ở chế độ Public</li>
                <li>Vào mục Policies và thêm policy cho phép select/insert</li>
                <li>Thử lại việc tải lên</li>
              </ol>
              <div className="mt-3 flex flex-col space-y-2">
                <p className="text-xs text-yellow-700">Bạn có thể:</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-white"
                  onClick={() => {
                    setActiveTab('url');
                  }}
                >
                  <LinkIcon className="mr-2 h-3 w-3" />
                  Sử dụng URL thay thế
                </Button>
                
                {file && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white"
                    onClick={async () => {
                      try {
                        // Sử dụng Data URL thay thế
                        const dataUrl = await newsService.getDataUrlFromFile(file);
                        editor.chain().focus().setImage({ src: dataUrl }).run();
                        setIsImageDialogOpen(false);
                        resetImageForm();
                      } catch (err) {
                        console.error('Lỗi khi tạo Data URL:', err);
                        setError('Không thể tạo Data URL từ hình ảnh này');
                      }
                    }}
                  >
                    <ImageIcon className="mr-2 h-3 w-3" />
                    Dùng ảnh trực tiếp (không lưu trữ)
                  </Button>
                )}
                
                <Separator className="my-1" />
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-white"
                  onClick={() => {
                    setIsTestDialogOpen(true);
                  }}
                >
                  <Database className="mr-2 h-3 w-3" />
                  Kiểm tra kết nối Storage
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
              
              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
              
              <Button 
                className="w-full mt-4" 
                onClick={handleUpload}
                disabled={!file || isUploading}
              >
                {isUploading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Đang tải lên...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Upload className="mr-2 h-4 w-4" />
                    Tải lên
                  </span>
                )}
              </Button>
            </TabsContent>
            
            <TabsContent value="url" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-url">URL hình ảnh</Label>
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={handleUrlChange}
                  />
                </div>
                
                {imageUrl && (
                  <div className="border rounded-md p-2">
                    <img 
                      src={imageUrl} 
                      alt="Xem trước từ URL" 
                      className="max-h-48 mx-auto"
                      onError={() => setError('Không thể tải hình ảnh từ URL này')}
                    />
                  </div>
                )}
                
                {error && <p className="text-sm text-red-500">{error}</p>}
                
                <Button 
                  className="w-full" 
                  onClick={handleUrlSubmit}
                  disabled={!imageUrl}
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Sử dụng URL này
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TiptapToolbar;