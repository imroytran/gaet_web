import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { newsService } from '@/services/newsService';
import { Check, X, AlertTriangle, Loader2, Database } from 'lucide-react';

interface TestConnectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TestResults {
  connected: boolean;
  bucketExists: boolean;
  canList: boolean;
  canUpload: boolean;
  canDownload: boolean;
  canDelete: boolean;
  publicAccess: boolean;
  errors: string[];
  details: string[];
}

const TestConnectionDialog: React.FC<TestConnectionDialogProps> = ({ open, onOpenChange }) => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<TestResults | null>(null);

  const runTests = async () => {
    setTesting(true);
    try {
      const testResults = await newsService.testSupabaseConnection();
      setResults(testResults);
    } catch (error) {
      console.error('Error testing connection:', error);
    } finally {
      setTesting(false);
    }
  };

  useEffect(() => {
    if (open) {
      runTests();
    } else {
      setResults(null);
    }
  }, [open]);

  const ResultRow = ({ title, status }: { title: string; status: boolean | undefined }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium">{title}</span>
      <span className="flex items-center">
        {status === undefined ? (
          <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
        ) : status ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <X className="h-5 w-5 text-red-500" />
        )}
      </span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5" />
            Kiểm tra kết nối Supabase Storage
          </DialogTitle>
          <DialogDescription>
            Kiểm tra khả năng kết nối với bucket "newsimages" trong Supabase Storage
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {testing && !results && (
            <div className="flex flex-col items-center justify-center p-6">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
              <p className="text-sm text-gray-500">Đang kiểm tra kết nối...</p>
            </div>
          )}

          {results && (
            <div className="space-y-4">
              <div className="space-y-2">
                <ResultRow title="Kết nối đến Supabase" status={results.connected} />
                <ResultRow title="Bucket 'newsimages' tồn tại" status={results.bucketExists} />
                <ResultRow title="Quyền liệt kê (list)" status={results.canList} />
                <ResultRow title="Quyền tải lên (upload)" status={results.canUpload} />
                <ResultRow title="Truy cập công khai" status={results.publicAccess} />
                <ResultRow title="Quyền xóa" status={results.canDelete} />
              </div>

              <Separator />

              {results.errors.length > 0 && (
                <div className="bg-red-50 p-3 rounded-md border border-red-200 space-y-1">
                  <h4 className="text-sm font-medium text-red-800 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Lỗi được phát hiện:
                  </h4>
                  <ul className="text-xs text-red-700 list-disc pl-5 space-y-1">
                    {results.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-gray-50 p-3 rounded-md border border-gray-200 max-h-40 overflow-y-auto">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Chi tiết kiểm tra:</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  {results.details.map((detail, index) => (
                    <p key={index}>{detail}</p>
                  ))}
                </div>
              </div>

              {!results.errors.length && results.connected && results.bucketExists && results.canUpload && (
                <div className="bg-green-50 p-3 rounded-md border border-green-200">
                  <p className="text-sm text-green-700 flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    Kết nối thành công! Trình soạn thảo có thể tải hình ảnh lên bucket "newsimages".
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col gap-2">
          {results && !results.bucketExists && (
            <Button 
              onClick={async () => {
                setTesting(true);
                try {
                  const { data, error } = await supabase.storage.createBucket('newsimages', {
                    public: true
                  });
                  
                  if (error) {
                    alert(`Không thể tạo bucket: ${error.message}`);
                  } else {
                    alert('Đã tạo bucket newsimages thành công!');
                    // Chạy lại kiểm tra
                    runTests();
                  }
                } catch (e) {
                  alert(`Lỗi: ${e.message}`);
                } finally {
                  setTesting(false);
                }
              }}
              disabled={testing}
              variant="outline"
              className="w-full"
            >
              Tạo bucket newsimages
            </Button>
          )}
          
          {results && results.bucketExists && !results.canUpload && (
            <Button 
              onClick={() => {
                // Hiển thị hướng dẫn tạo policy
                alert(
                  'Hướng dẫn tạo RLS Policy:\n\n' +
                  '1. Truy cập Supabase Dashboard\n' +
                  '2. Vào phần Storage\n' +
                  '3. Chọn bucket "newsimages"\n' +
                  '4. Chọn tab "Policies"\n' +
                  '5. Nhấn "Add policies"\n' +
                  '6. Chọn "Create custom policy"\n' +
                  '7. Chọn action là "INSERT"\n' +
                  '8. Nhập policy là "true" (cho phép tất cả truy cập)\n' +
                  '9. Nhấn "Review" rồi "Save policy"\n\n' +
                  'Lặp lại với các actions SELECT và DELETE'
                );
              }}
              variant="outline"
              className="w-full"
            >
              Hướng dẫn cấu hình RLS Policies
            </Button>
          )}
          
          <Button 
            onClick={() => runTests()} 
            disabled={testing}
            className="w-full"
          >
            {testing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang kiểm tra...
              </>
            ) : (
              'Kiểm tra lại'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TestConnectionDialog;