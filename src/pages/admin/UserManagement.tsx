
import React, { useState, useEffect } from 'react';
import { Trash2, Plus, UserPlus, UserX, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

type AdminUser = {
  id: string;
  user_id: string;
  email: string;
  created_at: string;
  role: string;
  name?: string;
};

const UserManagement = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Fetch admin users
      const { data: adminUsers, error: adminError } = await supabase
        .from('admin_users')
        .select('*');

      if (adminError) throw adminError;

      // Create a more detailed user list by fetching email from auth
      const enhancedUsers = await Promise.all(
        (adminUsers || []).map(async (admin) => {
          // In a real implementation, you would fetch user details from Supabase Auth
          // For demo purposes, we'll simulate this
          return {
            ...admin,
            email: admin.email || `user-${admin.user_id.substring(0, 5)}@example.com`,
            role: admin.role || 'admin'
          };
        })
      );

      setUsers(enhancedUsers);
    } catch (error: any) {
      toast({
        title: 'Lỗi khi tải dữ liệu',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEmail('');
    setPassword('');
    setName('');
    setDialogOpen(true);
  };

  const confirmDelete = (user: AdminUser) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', userToDelete.id);

      if (error) throw error;

      // In a real implementation, you might also want to delete or disable the user in Auth
      
      setUsers(users.filter(user => user.id !== userToDelete.id));
      toast({
        title: 'Xóa thành công',
        description: 'Người dùng quản trị đã được xóa',
      });
    } catch (error: any) {
      toast({
        title: 'Lỗi khi xóa',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleCreateUser = async () => {
    try {
      if (!email || !password) {
        throw new Error('Email và mật khẩu không được để trống');
      }

      // In a real implementation, you would:
      // 1. Create a user in Supabase Auth
      // 2. Then add the user to admin_users table

      // First, create user in Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('Không thể tạo người dùng trong hệ thống xác thực');
      }

      // Then add to admin_users
      const { data, error } = await supabase
        .from('admin_users')
        .insert({
          user_id: authData.user.id,
          email: email,
          name: name,
          role: 'admin',
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      
      // Add the new user to the list
      setUsers([...users, {
        ...data,
        email: email,
        role: 'admin'
      }]);

      toast({
        title: 'Tạo thành công',
        description: 'Người dùng quản trị mới đã được tạo',
      });

      setDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Quản lý Người dùng</h1>
          <Button onClick={openCreateDialog}>
            <UserPlus className="mr-2 h-4 w-4" />
            Thêm người dùng quản trị
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gaet-600"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center p-8 border rounded-lg bg-gray-50">
            <p className="text-gray-500">Chưa có người dùng quản trị nào. Hãy thêm mới.</p>
          </div>
        ) : (
          <div className="border rounded-md overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.name || '-'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {user.role || 'admin'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => confirmDelete(user)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Create User Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm người dùng quản trị mới</DialogTitle>
            <DialogDescription>
              Tạo tài khoản quản trị mới cho hệ thống.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Tên người dùng</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên người dùng" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input 
                id="password" 
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu" 
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Hủy</Button>
            <Button onClick={handleCreateUser}>Tạo người dùng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa người dùng quản trị "{userToDelete?.email}"? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xóa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default UserManagement;
