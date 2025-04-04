// src/services/seoService.ts

export interface SeoMetadata {
  id?: string;
  page_key: string;  // Khóa định danh cho trang (ví dụ: 'home', 'about', 'news')
  title: string;     // Tiêu đề SEO
  description: string; // Mô tả SEO
  keywords: string;  // Từ khóa SEO
  og_title?: string; // Open Graph title
  og_description?: string; // Open Graph description
  og_image?: string; // Open Graph image URL
  canonical_url?: string; // URL chuẩn hóa
  updated_at?: string; // Ngày cập nhật
  lang: 'vi' | 'en'; // Ngôn ngữ
}

export const seoService = {
  // Tạo slug chuẩn SEO từ text
  createSlug(text: string): string {
    // Nếu không có text, trả về chuỗi rỗng
    if (!text) return '';
    
    return text
      .toLowerCase()
      .normalize('NFD') // Tách dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
      .replace(/đ/g, 'd') // Thay đổi đ thành d
      .replace(/đ/g, 'd') // Thay đổi Đ thành d
      .replace(/[^a-z0-9\s-]/g, '') // Chỉ giữ lại chữ cái, số và khoảng trắng
      .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
      .replace(/-+/g, '-') // Loại bỏ nhiều dấu gạch ngang liên tiếp
      .replace(/^-+|-+$/g, '') // Loại bỏ dấu gạch ngang ở đầu và cuối
      .trim(); // Loại bỏ khoảng trắng đầu cuối
  },
  
  // Tạo canonical URL
  createCanonicalUrl(path: string): string {
    const baseUrl = 'https://gaet.com.vn'; // Thay đổi thành domain thực tế của bạn
    return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }
};
