// src/services/newsService.ts

import { supabase } from '@/integrations/supabase/client';
import { seoService } from './seoService';
import { v4 as uuidv4 } from 'uuid';

export interface NewsItem {
  id: string;
  title: string;
  slug?: string; // URL slug cho bài viết
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image_url: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string | null;
  meta_title?: string; // Tiêu đề SEO tùy chỉnh
  meta_description?: string; // Mô tả SEO tùy chỉnh
  meta_keywords?: string; // Từ khóa SEO
  og_image?: string; // Hình ảnh Open Graph
  focus_keyword?: string; // Từ khóa chính cho SEO
}

export const newsService = {
  // Lấy tất cả tin tức đã công bố
  async getPublishedNews(limit?: number) {
    const query = supabase
      .from('news')
      .select('id, title, slug, category, date, excerpt, image_url, created_at')
      .eq('published', true)
      .order('date', { ascending: false });

    if (limit) {
      query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // Lấy tin tức theo ID
  async getNewsById(id: string) {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Lấy tin tức theo slug (URL thân thiện)
  async getNewsBySlug(slug: string) {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching news by slug:', error);
      return null;
    }
    return data;
  },

  // Lấy tất cả tin tức (bao gồm cả bản nháp) - dùng trong admin
  async getAllNews() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Lấy tin tức phân trang
  async getPublishedNewsWithPagination(page: number = 0, pageSize: number = 9) {
    const from = page * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await supabase
      .from('news')
      .select('id, title, slug, category, date, excerpt, image_url, created_at', { count: 'exact' })
      .eq('published', true)
      .order('date', { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { 
      data: data || [], 
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize)
    };
  },

  // Tạo tin tức mới
  async createNews(newsData: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>) {
    // Tạo slug từ tiêu đề nếu chưa có
    if (!newsData.slug) {
      newsData.slug = seoService.createSlug(newsData.title);
    }

    // Đảm bảo slug là duy nhất
    newsData.slug = await this.ensureUniqueSlug(newsData.slug);

    const { data, error } = await supabase
      .from('news')
      .insert({
        ...newsData,
        updated_at: new Date().toISOString(),
      })
      .select();

    if (error) throw error;
    return data?.[0];
  },

  // Cập nhật tin tức
  async updateNews(id: string, newsData: Partial<Omit<NewsItem, 'id' | 'created_at'>>) {
    // Cập nhật slug nếu tiêu đề thay đổi và không có slug tùy chỉnh
    if (newsData.title && !newsData.slug) {
      newsData.slug = seoService.createSlug(newsData.title);
      // Đảm bảo slug là duy nhất
      newsData.slug = await this.ensureUniqueSlug(newsData.slug, id);
    } else if (newsData.slug) {
      // Nếu slug được cung cấp, cũng cần đảm bảo nó là duy nhất
      newsData.slug = await this.ensureUniqueSlug(newsData.slug, id);
    }

    const { data, error } = await supabase
      .from('news')
      .update({
        ...newsData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data?.[0];
  },

  // Đảm bảo slug là duy nhất
  async ensureUniqueSlug(slug: string, excludeId?: string): Promise<string> {
    let query = supabase
      .from('news')
      .select('slug')
      .eq('slug', slug);
    
    if (excludeId) {
      query = query.neq('id', excludeId);
    }
    
    const { data } = await query;
    
    if (!data || data.length === 0) {
      return slug; // Slug là duy nhất
    }
    
    // Nếu slug đã tồn tại, thêm số vào cuối
    let counter = 1;
    let newSlug = `${slug}-${counter}`;
    
    while (true) {
      query = supabase
        .from('news')
        .select('slug')
        .eq('slug', newSlug);
      
      if (excludeId) {
        query = query.neq('id', excludeId);
      }
      
      const { data } = await query;
      
      if (!data || data.length === 0) {
        return newSlug; // Slug mới là duy nhất
      }
      
      counter++;
      newSlug = `${slug}-${counter}`;
    }
  },

  // Xóa tin tức
  async deleteNews(id: string) {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // Thay đổi trạng thái công bố
  async togglePublishStatus(id: string, currentStatus: boolean) {
    const { data, error } = await supabase
      .from('news')
      .update({ 
        published: !currentStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data?.[0];
  },

  // Tải ảnh lên Supabase Storage
  async uploadImage(file: File, folder: string = 'editor', useDataUrlFallback: boolean = false, bucketName: string = 'newsimages') {
    // Tạo tên file duy nhất với uuid
    try {
      console.log('Bắt đầu quá trình tải hình ảnh lên:', file.name, file.size, file.type);
      
      // Kiểm tra và tạo bucket trước khi tải lên
      try {
        console.log(`Kiểm tra bucket ${bucketName}...`);
        await this.ensureImageBucketExists();
        console.log(`Bucket ${bucketName} sẵn sàng`);
      } catch (bucketError) {
        console.error('Lỗi kiểm tra bucket:', bucketError);
        
        // Nếu lỗi liên quan đến bucket không tồn tại và đã thử dùng 'newsimages'
        if (bucketName === 'newsimages' && bucketError.message && 
            (bucketError.message.includes('not found') || bucketError.message.includes('không tồn tại'))) {
          console.log('Thử tạo bucket với tên khác...');
          // Tạo tên ngẫu nhiên cho bucket
          const newBucketName = `news-images-${Date.now()}`;
          
          // Thử tạo bucket mới
          try {
            const { data, error } = await supabase.storage.createBucket(newBucketName, {
              public: true
            });
            
            if (error) {
              console.error(`Lỗi khi tạo bucket ${newBucketName}:`, error);
              throw error;
            }
            
            console.log(`Đã tạo bucket ${newBucketName} thành công!`);
            // Sử dụng bucket mới
            return this.uploadImage(file, folder, useDataUrlFallback, newBucketName);
          } catch (createError) {
            console.error('Lỗi khi tạo bucket mới:', createError);
            throw createError;
          }
        }
        
        throw bucketError;
      }
      
      // Tạo tên file
      const fileExt = file.name.split('.').pop();
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}-${uuidv4()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;
      console.log('Đường dẫn file sẽ tải lên:', filePath);
      
      // Tải lên hình ảnh
      console.log('Đang tải lên file...');
      const uploadResult = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // Sử dụng upsert=true để ghi đè nếu file đã tồn tại
        });
        
      console.log('Kết quả tải lên:', uploadResult);
      
      if (uploadResult.error) {
        console.error('Lỗi tải lên từ Supabase:', uploadResult.error);
        throw uploadResult.error;
      }

      // Lấy URL công khai
      console.log('Lấy URL công khai...');
      const { data: publicURL } = supabase.storage
        .from(bucketName)
        .getPublicUrl(uploadResult.data.path);
        
      console.log('URL công khai:', publicURL);

      return publicURL.publicUrl;
    } catch (error) {
      console.error('Lỗi chi tiết khi tải hình ảnh lên:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      
      // Nếu được yêu cầu sử dụng Data URL khi lỗi
      if (useDataUrlFallback) {
        console.warn('Đang sử dụng Data URL thay thế do lỗi Supabase Storage');
        return this.getDataUrlFromFile(file);
      }
      
      throw new Error(`Không thể tải lên hình ảnh [${error.code || 'unknown'}]: ${error.message}. ${error.details || ''}`);
    }
  },
  
  // Chuyển đổi File thành Data URL
  async getDataUrlFromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  },
  
  // Kiểm tra bucket và tự tạo nếu cần
  async ensureImageBucketExists() {
    try {
      console.log('Đang kiểm tra kết nối đến Supabase Storage...');
      
      // Thử lấy thông tin về các buckets
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Lỗi khi lấy danh sách buckets:', bucketsError);
        throw new Error(`Không thể kết nối đến Supabase Storage: ${bucketsError.message}`);
      }
      
      console.log('Danh sách tất cả buckets:', buckets.map(b => b.name));
      
      // Kiểm tra xem bucket newsimages có tồn tại không
      let bucketName = 'newsimages';
      let bucketExists = buckets.some(b => b.name === bucketName);
      console.log(`Bucket "${bucketName}" tồn tại:`, bucketExists);
      
      // Tìm bucket thay thế nếu không tìm thấy newsimages
      let alternativeBucket = null;
      if (!bucketExists) {
        // Tìm bucket tương tự nếu có
        const similarBucket = buckets.find(b => 
          b.name.toLowerCase().includes('news') || 
          b.name.toLowerCase().includes('image')
        );
        
        if (similarBucket) {
          console.log(`Tìm thấy bucket thay thế: ${similarBucket.name}`);
          alternativeBucket = similarBucket.name;
        } else {
          console.log('Không tìm thấy bucket thay thế, sẽ tạo mới');
        }
        
        // Thử tạo bucket nếu không tìm thấy bucket nào phù hợp
        if (!alternativeBucket) {
          console.log(`Đang tạo bucket "${bucketName}"...`);
          
          try {
            const { data, error: createError } = await supabase.storage.createBucket(bucketName, {
              public: true
            });
            
            if (createError) {
              console.error('Lỗi khi tạo bucket:', createError);
              
              // Thử với tên khác nếu có lỗi
              bucketName = `news-images-${Date.now()}`;
              console.log(`Thử tạo bucket với tên khác: ${bucketName}`);
              
              const { data: newData, error: newCreateError } = await supabase.storage.createBucket(bucketName, {
                public: true
              });
              
              if (newCreateError) {
                console.error('Lỗi khi tạo bucket với tên mới:', newCreateError);
                throw new Error(`Không thể tạo bucket: ${newCreateError.message}`);
              } else {
                console.log(`Đã tạo bucket "${bucketName}" thành công!`);
                bucketExists = true;
              }
            } else {
              console.log(`Đã tạo bucket "${bucketName}" thành công!`);
              bucketExists = true;
            }
          } catch (createBucketError) {
            console.error('Lỗi không xác định khi tạo bucket:', createBucketError);
            throw createBucketError;
          }
        } else {
          // Sử dụng bucket thay thế nếu có
          bucketName = alternativeBucket;
          bucketExists = true;
        }
      }
      
      // Kiểm tra nếu có thể truy cập bucket
      console.log(`Thử truy cập nội dung bucket "${bucketName}"...`);
      try {
        const { data, error } = await supabase.storage
          .from(bucketName)
          .list('', { limit: 1 });
        
        if (error) {
          console.error(`Lỗi khi truy cập bucket "${bucketName}":`, error);
          throw new Error(`Không thể truy cập bucket ${bucketName}: ${error.message}.`);
        }
        
        console.log(`Nội dung bucket "${bucketName}":`, data);
        console.log(`Đã truy cập bucket "${bucketName}" thành công!`);
        
        // Kiểm tra RLS policies bằng cách tạo test file
        console.log('Kiểm tra quyền truy cập...');
        const testFile = new Blob(['Kiểm tra quyền upload'], { type: 'text/plain' });
        const testFilePath = `test/test-${Date.now()}.txt`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(testFilePath, testFile, { upsert: true });
        
        if (uploadError) {
          console.error('Lỗi khi kiểm tra quyền upload:', uploadError);
          
          // Nếu lỗi liên quan đến RLS policy, thử cập nhật policy
          if (uploadError.message.includes('policy') || uploadError.message.includes('permission')) {
            console.log('Lỗi quyền truy cập, thử sử dụng bucket khác...');
            throw new Error(`Không có quyền upload vào bucket ${bucketName}: ${uploadError.message}`);
          } else {
            throw uploadError;
          }
        }
        
        console.log('Đã upload file kiểm tra thành công:', uploadData);
        
        // Xóa file test
        try {
          const { error: deleteError } = await supabase.storage
            .from(bucketName)
            .remove([testFilePath]);
          
          if (deleteError) {
            console.warn('Không thể xóa file kiểm tra:', deleteError);
          } else {
            console.log('Đã xóa file kiểm tra');
          }
        } catch (deleteError) {
          console.warn('Lỗi khi xóa file kiểm tra:', deleteError);
        }
        
        // Cập nhật lại các tham chiếu đến tên bucket nếu khác 'newsimages'
        if (bucketName !== 'newsimages') {
          console.log(`Đang sử dụng bucket "${bucketName}" thay cho "newsimages"`);
          // Đây là nơi bạn có thể thêm code để lưu trữ tên bucket hiện tại
        }
        
        return true;
      } catch (accessError) {
        console.error(`Lỗi khi truy cập bucket "${bucketName}":`, accessError);
        throw accessError;
      }
    } catch (error) {
      console.error('Lỗi tổng thể khi kiểm tra bucket:', error);
      throw new Error(`Không thể đảm bảo bucket tồn tại: ${error.message}`);
    }
  },
  
  // Xóa ảnh khỏi Supabase Storage
  async deleteImage(url: string) {
    try {
      // Đảm bảo bucket tồn tại trước khi xóa
      await this.ensureImageBucketExists();
      
      // Trích xuất đường dẫn từ URL
      const baseUrl = supabase.storage.from('newsimages').getPublicUrl('').data.publicUrl;
      let filePath = url.replace(baseUrl, '');
      
      // Đảm bảo đường dẫn không bắt đầu bằng dấu /
      if (filePath.startsWith('/')) {
        filePath = filePath.substring(1);
      }
      
      if (!filePath) {
        throw new Error('URL không hợp lệ');
      }

      console.log('Xóa file:', filePath);
      
      const { error } = await supabase.storage
        .from('newsimages')
        .remove([filePath]);

      if (error) {
        console.error('Lỗi khi xóa file:', error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('Lỗi khi xóa hình ảnh:', error);
      return false;
    }
  },
  
  // Kiểm tra xem URL có phải từ Supabase Storage không
  isSupabaseStorageUrl(url: string) {
    if (!url) return false;
    const baseUrl = supabase.storage.from('newsimages').getPublicUrl('').data.publicUrl;
    return url.startsWith(baseUrl);
  },
  
  // Kiểm tra kết nối đến Supabase Storage và bucket
  async testSupabaseConnection() {
    const results = {
      connected: false,
      bucketExists: false,
      canList: false,
      canUpload: false,
      canDownload: false,
      canDelete: false,
      publicAccess: false,
      errors: [] as string[],
      details: [] as string[]
    };
    
    try {
      // 1. Kiểm tra kết nối cơ bản
      results.details.push('1. Kiểm tra kết nối cơ bản đến Supabase...');
      
      try {
        const { data: buckets, error } = await supabase.storage.listBuckets();
        
        if (error) {
          results.errors.push(`Không thể kết nối đến Supabase: ${error.message}`);
          return results;
        }
        
        results.connected = true;
        results.details.push('✓ Đã kết nối thành công đến Supabase');
        results.details.push(`Tìm thấy ${buckets.length} buckets: ${buckets.map(b => b.name).join(', ')}`);
        
        // 2. Kiểm tra bucket newsimages
        results.details.push('2. Kiểm tra bucket newsimages...');
        
        // In danh sách chi tiết các buckets để debug
        buckets.forEach(bucket => {
          results.details.push(`   - Bucket: ${bucket.name} (ID: ${bucket.id})`);
        });
        
        // Tìm bucket theo tên chính xác
        const bucketExists = buckets.some(b => b.name === 'newsimages');
        
        // Tìm các bucket có tên tương tự
        const similarBuckets = buckets.filter(b => 
          b.name.toLowerCase().includes('news') || 
          b.name.toLowerCase().includes('image')
        );
        
        if (similarBuckets.length > 0) {
          results.details.push(`Tìm thấy bucket tương tự: ${similarBuckets.map(b => b.name).join(', ')}`);
        }
        
        results.bucketExists = bucketExists;
        
        if (!bucketExists) {
          results.details.push('Bucket newsimages không tồn tại, đang thử tạo mới...');
          
          try {
            // Thử tạo bucket mới
            const { data: newBucket, error: createError } = await supabase.storage.createBucket('newsimages', {
              public: true
            });
            
            if (createError) {
              results.details.push(`Lỗi khi tạo bucket: ${createError.message}`);
              results.errors.push(`Không thể tạo bucket newsimages: ${createError.message}`);
              
              // Chỉ trả về lỗi nếu không có bucket tương tự nào để sử dụng
              if (similarBuckets.length === 0) {
                return results;
              } else {
                // Sử dụng bucket tương tự đầu tiên nếu có
                results.details.push(`Thử sử dụng bucket thay thế: ${similarBuckets[0].name}`);
                results.bucketExists = true;
              }
            } else {
              results.details.push('✓ Đã tạo bucket newsimages thành công!');
              results.bucketExists = true;
            }
          } catch (e) {
            results.details.push(`Lỗi không xác định khi tạo bucket: ${e.message}`);
            results.errors.push(`Không thể tạo bucket newsimages: ${e.message}`);
            
            // Chỉ trả về lỗi nếu không có bucket tương tự nào để sử dụng
            if (similarBuckets.length === 0) {
              return results;
            } else {
              // Sử dụng bucket tương tự đầu tiên nếu có
              results.details.push(`Thử sử dụng bucket thay thế: ${similarBuckets[0].name}`);
              results.bucketExists = true;
            }
          }
        } else {
          results.details.push('✓ Bucket newsimages tồn tại');
        }
        
        results.details.push('✓ Bucket newsimages tồn tại');
        
        // 3. Kiểm tra quyền liệt kê (list)
        results.details.push('3. Kiểm tra quyền liệt kê (list)...');
        const { data: files, error: listError } = await supabase.storage
          .from('newsimages')
          .list('');
        
        if (listError) {
          results.errors.push(`Không thể liệt kê nội dung bucket: ${listError.message}`);
          return results;
        }
        
        results.canList = true;
        results.details.push(`✓ Có thể liệt kê nội dung bucket (${files.length} files)`);
        
        // 4. Kiểm tra quyền upload
        results.details.push('4. Kiểm tra quyền upload...');
        const testFile = new Blob(['test-connect'], { type: 'text/plain' });
        const testPath = `test/connection-test-${Date.now()}.txt`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('newsimages')
          .upload(testPath, testFile, { upsert: true });
        
        if (uploadError) {
          results.errors.push(`Không thể upload file: ${uploadError.message}`);
          return results;
        }
        
        results.canUpload = true;
        results.details.push('✓ Có thể upload file');
        
        // 5. Kiểm tra URL công khai
        results.details.push('5. Kiểm tra truy cập công khai...');
        const { data: urlData } = supabase.storage
          .from('newsimages')
          .getPublicUrl(testPath);
        
        const publicUrl = urlData.publicUrl;
        results.details.push(`URL công khai: ${publicUrl}`);
        
        try {
          const response = await fetch(publicUrl, { method: 'HEAD' });
          results.publicAccess = response.ok;
          results.details.push(`✓ Truy cập công khai ${response.ok ? 'thành công' : 'thất bại'} (Status: ${response.status})`);
        } catch (e) {
          results.errors.push(`Không thể truy cập URL công khai: ${e.message}`);
        }
        
        // 6. Kiểm tra quyền xóa
        results.details.push('6. Kiểm tra quyền xóa...');
        const { error: deleteError } = await supabase.storage
          .from('newsimages')
          .remove([testPath]);
        
        if (deleteError) {
          results.errors.push(`Không thể xóa file: ${deleteError.message}`);
          return results;
        }
        
        results.canDelete = true;
        results.details.push('✓ Có thể xóa file');
        
        // Kết luận
        if (results.connected && results.bucketExists && results.canList && 
            results.canUpload && results.publicAccess && results.canDelete) {
          results.details.push('✓ Tất cả kiểm tra đều thành công! Bucket newsimages đã sẵn sàng sử dụng.');
        } else {
          results.details.push('⚠ Một số kiểm tra thất bại, vui lòng kiểm tra lại cấu hình.');
        }
        
      } catch (error) {
        results.errors.push(`Lỗi không xác định: ${error.message}`);
      }
      
      return results;
    } catch (error) {
      results.errors.push(`Lỗi khi kiểm tra: ${error.message}`);
      return results;
    }
  },
  
  // Lấy danh sách tất cả hình ảnh đã tải lên
  async listUploadedImages(folder = '') {
    try {
      // Đảm bảo bucket tồn tại
      await this.ensureImageBucketExists();
      
      const { data, error } = await supabase.storage
        .from('newsimages')
        .list(folder, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;
      
      // Chuyển đổi danh sách thành mảng URL
      const imageUrls = data.filter(item => !item.id.endsWith('/')).map(item => {
        const path = folder ? `${folder}/${item.name}` : item.name;
        const { data: publicURL } = supabase.storage
          .from('newsimages')
          .getPublicUrl(path);
        
        return {
          name: item.name,
          url: publicURL.publicUrl,
          size: item.metadata?.size || 0,
          created: item.created_at,
          contentType: item.metadata?.mimetype || '',
        };
      });

      return imageUrls;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách hình ảnh:', error);
      throw new Error(`Không thể lấy danh sách hình ảnh: ${error.message}`);
    }
  },

  // Tìm kiếm tin tức
  async searchNews(query: string, limit: number = 10) {
    // Tìm kiếm trong tiêu đề, trích đoạn, nội dung
    const { data, error } = await supabase
      .from('news')
      .select('id, title, slug, category, date, excerpt, image_url')
      .eq('published', true)
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
      .order('date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Lấy tin tức theo danh mục
  async getNewsByCategory(category: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('news')
      .select('id, title, slug, category, date, excerpt, image_url')
      .eq('published', true)
      .eq('category', category)
      .order('date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Lấy các danh mục tin tức
  async getNewsCategories() {
    const { data, error } = await supabase
      .from('news')
      .select('category')
      .eq('published', true);

    if (error) throw error;
    
    // Lọc và đếm số lượng theo từng danh mục
    const categories: Record<string, number> = {};
    data?.forEach(item => {
      const cats = item.category.split(',').map((c: string) => c.trim());
      cats.forEach((cat: string) => {
        categories[cat] = (categories[cat] || 0) + 1;
      });
    });
    
    return Object.entries(categories).map(([name, count]) => ({ name, count }));
  },

  // Lấy tin tức liên quan
  async getRelatedNews(newsId: string, category: string, limit: number = 4) {
    const { data, error } = await supabase
      .from('news')
      .select('id, title, slug, category, date, excerpt, image_url')
      .eq('published', true)
      .neq('id', newsId) // Loại trừ bài viết hiện tại
      .like('category', `%${category}%`) // Lọc theo danh mục
      .order('date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
};
