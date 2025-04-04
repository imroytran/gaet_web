@echo off
echo ===== Triển khai GAET Business Hub lên Netlify =====

REM Kiểm tra xem đã cài đặt Netlify CLI chưa
netlify --version
if %ERRORLEVEL% NEQ 0 (
  echo Netlify CLI chưa được cài đặt. Đang cài đặt...
  npm install -g netlify-cli
)

REM Đăng nhập vào Netlify (nếu chưa đăng nhập)
echo Đăng nhập vào Netlify (bỏ qua nếu đã đăng nhập)...
netlify login

REM Triển khai dự án lên Netlify
echo Triển khai dự án...
netlify deploy --prod

echo ===== Hoàn tất triển khai! =====
pause
