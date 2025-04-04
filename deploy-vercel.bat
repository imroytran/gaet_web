@echo off
echo ===== Triển khai GAET Business Hub lên Vercel =====

REM Kiểm tra xem đã cài đặt Vercel CLI chưa
vercel --version
if %ERRORLEVEL% NEQ 0 (
  echo Vercel CLI chưa được cài đặt. Đang cài đặt...
  npm install -g vercel
)

REM Đăng nhập vào Vercel (nếu chưa đăng nhập)
echo Đăng nhập vào Vercel (bỏ qua nếu đã đăng nhập)...
vercel login

REM Triển khai dự án lên Vercel
echo Triển khai dự án...
vercel --prod

echo ===== Hoàn tất triển khai! =====
pause
