
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Chào mừng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Xin chào, {user?.email}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Bạn đang đăng nhập với quyền quản trị viên
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tin tức & Sự kiện
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Quản lý nội dung</div>
              <p className="text-xs text-muted-foreground mt-2">
                Bạn có thể thêm, sửa, xóa tin tức và sự kiện
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
