-- Tạo bảng business_areas nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS business_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(50) DEFAULT '#3b82f6',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Thêm dữ liệu cho business_areas
INSERT INTO business_areas (name, description, icon, color, is_active, sort_order) VALUES
('HOẠT ĐỘNG THƯƠNG MẠI QUÂN SỰ', 'GAET là doanh nghiệp Quốc phòng - An ninh hàng đầu của Bộ Quốc phòng Việt Nam có chức năng kinh doanh thương mại quân sự, với nhiều năm kinh nghiệm trong lĩnh vực xuất nhập khẩu các mặt hàng quân sự. Trong đó, GAET tập trung vào 3 lĩnh vực chính.', 'shield', '#B91C1C', true, 1),
('KINH DOANH VẬT LIỆU NỔ CÔNG NGHIỆP', 'GAET được biết đến là đầu mối duy nhất của Bộ Quốc phòng Việt Nam được phép kinh doanh Vật liệu nổ công nghiệp phục vụ nền kinh tế quốc dân. Nhiều năm liền, GAET luôn là điểm sáng của toàn quân trong thực hiện nhiệm vụ kinh tế.', 'zap', '#D97706', true, 2),
('HOẠT ĐỘNG ĐỐI NGOẠI QUỐC PHÒNG', 'GAET được BQP và Tổng cục Công nghiệp quốc phòng giao nhiệm vụ tham gia thực hiện nhiều hoạt động Đối ngoại Quốc phòng.', 'globe', '#0284C7', true, 3),
('XUẤT NHẬP KHẨU VÀ KINH DOANH CÁC MẶT HÀNG KINH TẾ', 'GAET tự hào khẳng định lợi thế cạnh tranh khác biệt và được đối tác đánh giá cao các hoạt động cung cấp dịch vụ, chuyên xử lý các đơn hàng với số lượng lớn trong thời gian ngắn nhất trên thị trường.', 'package', '#047857', true, 4),
('DỊCH VỤ', 'GAET cung cấp nhiều dịch vụ đa dạng từ Khoan nổ mìn trọn gói, Rà phá bom mìn, Dịch vụ dầu khí đến Đào tạo nghề, Sản xuất cơ khí, và Sản xuất hòm hộp.', 'layers', '#6D28D9', true, 5);

-- Tạo bảng news nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  date DATE,
  excerpt TEXT,
  content TEXT,
  image_url VARCHAR(255),
  published BOOLEAN DEFAULT FALSE,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Thêm dữ liệu cho news
INSERT INTO news (title, category, date, excerpt, content, image_url, published) VALUES
(
  'Đoàn cơ sở GAET tổ chức Giải Pickleball mở rộng năm 2025 chào mừng kỷ niệm 94 năm Ngày thành lập Đoàn TNCS Hồ Chí Minh (26/3/1931 - 26/3/2025)',
  'Tin tức nội bộ, Tin hoạt động',
  '2025-03-26',
  'Ngày 25/3/2025 tại Hà Nội, Đoàn Cơ sở Tổng công ty GAET đã tổ chức thành công giải Pickleball mở rộng nhân dịp kỷ niệm 94 năm ngày thành lập Đoàn TNCS Hồ Chí Minh (26/3/1931- 26/3/2025) và chào mừng Đại hội đảng các cấp trong Đảng bộ, tiến tới Đại hội đại biểu Đảng bộ Tổng công ty lần thứ VI, nhiệm kỳ 2025 – 2030.',
  'Ngày 25/3/2025 tại Hà Nội, Đoàn Cơ sở Tổng công ty GAET đã tổ chức thành công giải Pickleball mở rộng nhân dịp kỷ niệm 94 năm ngày thành lập Đoàn TNCS Hồ Chí Minh (26/3/1931- 26/3/2025) và chào mừng Đại hội đảng các cấp trong Đảng bộ, tiến tới Đại hội đại biểu Đảng bộ Tổng công ty lần thứ VI, nhiệm kỳ 2025 – 2030.

Tham dự giải có các đồng chí trong Ban Chấp hành Đảng ủy, lãnh đạo Tổng công ty và đông đảo cán bộ, đoàn viên thanh niên đến từ các đơn vị trực thuộc.

Giải đấu được chia thành 4 bảng với 16 đội tham gia, thi đấu theo thể thức vòng tròn một lượt để chọn ra các đội xuất sắc nhất bước vào vòng bán kết và chung kết. Các trận đấu diễn ra sôi nổi, hấp dẫn với tinh thần thi đấu nhiệt tình, fair-play của các vận động viên.

Kết thúc giải đấu, Ban tổ chức đã trao giải Nhất cho đội Văn phòng Tổng công ty, giải Nhì thuộc về đội Chi nhánh miền Nam, đồng giải Ba thuộc về đội Công ty Vật liệu nổ công nghiệp và đội Xí nghiệp Lam Kinh.

Ngoài việc tạo sân chơi lành mạnh, bổ ích, giải đấu còn góp phần tăng cường đoàn kết, giao lưu giữa các đơn vị trong Tổng công ty, đồng thời phát huy tinh thần xung kích, sáng tạo của tuổi trẻ GAET trong công tác và học tập.',
  '/assets/images/news/pickleball-tournament.jpg',
  TRUE
),
(
  'Thanh niên GAET hưởng ứng Ngày hội hiến máu tình nguyện năm 2025',
  'Tin hoạt động, Tin tức nội bộ, Tin tức nổi bật',
  '2025-03-24',
  'Hưởng ứng lời kêu gọi hiến máu cứu người của Ban Chỉ đạo Vận động hiến máu tình nguyện Thành phố Hà Nội và Tổng cục Công nghiệp Quốc phòng, hàng chục cán bộ, đoàn viên thanh niên của Tổng công ty GAET đã tham gia Ngày hội hiến máu tình nguyện năm 2025.',
  'Hưởng ứng lời kêu gọi hiến máu cứu người của Ban Chỉ đạo Vận động hiến máu tình nguyện Thành phố Hà Nội và Tổng cục Công nghiệp Quốc phòng, hàng chục cán bộ, đoàn viên thanh niên của Tổng công ty GAET đã tham gia Ngày hội hiến máu tình nguyện năm 2025.

Trong những năm qua, phong trào hiến máu tình nguyện trong Tổng công ty GAET luôn được duy trì thường xuyên, thu hút đông đảo cán bộ, công nhân viên, người lao động tham gia. Đây không chỉ là hoạt động mang ý nghĩa nhân văn sâu sắc, thể hiện tinh thần "tương thân tương ái" mà còn góp phần nâng cao ý thức trách nhiệm của mỗi cá nhân đối với cộng đồng.

Bên cạnh việc hiến máu, các đoàn viên thanh niên còn tham gia tư vấn, vận động người dân hiểu rõ hơn về ý nghĩa của việc hiến máu tình nguyện, từ đó thu hút thêm nhiều người tham gia vào phong trào này.

Thông qua hoạt động hiến máu tình nguyện, tuổi trẻ GAET đã thể hiện tinh thần xung kích, tình nguyện vì cộng đồng, góp phần xây dựng hình ảnh người quân nhân cách mạng "vừa hồng, vừa chuyên" trong thời kỳ mới.',
  '/assets/images/news/blood-donation.jpg',
  TRUE
),
(
  'GAET sôi nổi các hoạt động chào mừng kỷ niệm 115 năm Ngày Quốc tế Phụ nữ 8/3',
  'Tin tức nội bộ, Tin hoạt động, Tin tức nổi bật',
  '2025-03-07',
  'Nhân dịp kỷ niệm 115 năm Ngày Quốc tế Phụ nữ (8/3/1910 - 8/3/2025), Tổng công ty GAET đã tổ chức nhiều hoạt động ý nghĩa để chào mừng và tôn vinh phụ nữ, nữ cán bộ, người lao động trong toàn Tổng công ty.',
  'Nhân dịp kỷ niệm 115 năm Ngày Quốc tế Phụ nữ (8/3/1910 - 8/3/2025), Tổng công ty GAET đã tổ chức nhiều hoạt động ý nghĩa để chào mừng và tôn vinh phụ nữ, nữ cán bộ, người lao động trong toàn Tổng công ty.

Tại buổi lễ kỷ niệm, đồng chí Chủ tịch Hội đồng thành viên đã gửi lời chúc mừng tới toàn thể cán bộ, nhân viên nữ và biểu dương những đóng góp tích cực của chị em trong các hoạt động sản xuất kinh doanh của Tổng công ty. Trong năm qua, nhiều nữ cán bộ, nhân viên đã nêu cao tinh thần trách nhiệm, năng động, sáng tạo, hoàn thành xuất sắc nhiệm vụ được giao, góp phần quan trọng vào thành tích chung của Tổng công ty.

Trong khuôn khổ các hoạt động chào mừng, Công đoàn Tổng công ty đã tổ chức Hội thi nấu ăn với chủ đề "Hương vị gia đình", thu hút đông đảo các chị em tham gia. Hội thi không chỉ giúp chị em thể hiện tài năng nấu nướng mà còn là dịp để giao lưu, học hỏi, tăng cường đoàn kết nội bộ. 

Ngoài ra, các đơn vị thành viên trong Tổng công ty cũng đã tổ chức nhiều hoạt động phong phú như: tham quan di tích lịch sử, giao lưu văn nghệ, thể thao và tặng quà cho nữ cán bộ, nhân viên.

Thông qua các hoạt động này, Tổng công ty mong muốn động viên, khích lệ chị em phát huy hơn nữa vai trò, vị thế của mình trong công việc và cuộc sống, góp phần xây dựng Tổng công ty ngày càng phát triển.',
  '/assets/images/news/womens-day.jpg',
  TRUE
),
(
  'GAET: Quán triệt, triển khai Nghị quyết của Quân ủy Trung ương về đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số trong Quân đội',
  'Tin hoạt động, Tin tức nổi bật, Tin tức nội bộ',
  '2025-02-28',
  'Ngày 27/02/2025, Tổng công ty GAET đã tổ chức Hội nghị quán triệt, triển khai Nghị quyết của Quân ủy Trung ương về đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số trong Quân đội.',
  'Ngày 27/02/2025, Tổng công ty GAET đã tổ chức Hội nghị quán triệt, triển khai Nghị quyết của Quân ủy Trung ương về đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số trong Quân đội.

Hội nghị đã được nghe các báo cáo viên trình bày về nội dung cơ bản của Nghị quyết, phân tích các quan điểm, mục tiêu, nhiệm vụ và giải pháp chủ yếu để đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số trong Quân đội đến năm 2030, tầm nhìn đến năm 2045.

Phát biểu tại Hội nghị, đồng chí Chủ tịch Hội đồng thành viên Tổng công ty nhấn mạnh tầm quan trọng của việc đẩy mạnh ứng dụng khoa học, công nghệ và chuyển đổi số trong hoạt động sản xuất kinh doanh của Tổng công ty. Đồng chí yêu cầu các đơn vị khẩn trương xây dựng kế hoạch cụ thể để triển khai thực hiện Nghị quyết, trong đó tập trung vào các nhiệm vụ trọng tâm như: đẩy mạnh nghiên cứu, ứng dụng công nghệ mới vào sản xuất; nâng cao chất lượng nguồn nhân lực về khoa học công nghệ; tăng cường đầu tư cơ sở vật chất, trang thiết bị hiện đại; đẩy nhanh quá trình chuyển đổi số trong quản lý, điều hành và sản xuất kinh doanh.

Hội nghị đã thảo luận sôi nổi về các giải pháp cụ thể để thực hiện hiệu quả Nghị quyết tại các đơn vị, đồng thời đề xuất một số kiến nghị để tháo gỡ khó khăn, vướng mắc trong quá trình triển khai.

Kết thúc Hội nghị, Ban Tổ chức đã phát động phong trào thi đua "Đẩy mạnh ứng dụng khoa học công nghệ, đổi mới sáng tạo và chuyển đổi số" trong toàn Tổng công ty, với mục tiêu xây dựng GAET trở thành doanh nghiệp tiên phong trong lĩnh vực ứng dụng khoa học công nghệ và chuyển đổi số trong Quân đội.',
  '/assets/images/news/resolution-deployment.jpg',
  TRUE
);

-- Tạo bảng settings nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name VARCHAR(255) DEFAULT 'GAET Business Hub',
  site_description TEXT DEFAULT 'Trung tâm thông tin về các lĩnh vực kinh doanh của tập đoàn GAET',
  contact_email VARCHAR(255) DEFAULT 'contact@gaet.com.vn',
  contact_phone VARCHAR(100) DEFAULT '+84 243 832 5377',
  address TEXT DEFAULT '102 Kim Mã Thượng, Ba Đình, Hà Nội, Việt Nam',
  social_facebook VARCHAR(255) DEFAULT 'https://facebook.com/gaet',
  social_twitter VARCHAR(255) DEFAULT 'https://twitter.com/gaet',
  social_linkedin VARCHAR(255) DEFAULT 'https://linkedin.com/company/gaet',
  social_youtube VARCHAR(255) DEFAULT 'https://youtube.com/gaet',
  maintenance_mode BOOLEAN DEFAULT FALSE,
  logo_url VARCHAR(255) DEFAULT '/assets/logos/logo_GAET_transparent.png',
  favicon_url VARCHAR(255) DEFAULT '/assets/icons/favicon.ico',
  footer_text VARCHAR(255) DEFAULT '© 2025 GAET Group. Tất cả các quyền được bảo lưu.',
  meta_keywords TEXT DEFAULT 'gaet, business hub, tập đoàn, đầu tư, kinh doanh, công nghệ, quốc phòng, vật liệu nổ công nghiệp'
);

-- Đảm bảo có ít nhất một bản ghi trong bảng settings
INSERT INTO settings (id)
SELECT gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM settings);
