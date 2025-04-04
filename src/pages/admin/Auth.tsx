
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        
        toast({
          title: 'Đăng ký thành công',
          description: 'Vui lòng kiểm tra email để xác nhận tài khoản.',
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .single();

        if (adminError && adminError.code !== 'PGRST116') {
          // Not found error is expected for non-admins
          throw adminError;
        }

        if (!adminData) {
          // User is not an admin
          await supabase.auth.signOut();
          throw new Error('Tài khoản không có quyền quản trị.');
        }

        toast({
          title: 'Đăng nhập thành công',
          description: 'Chào mừng bạn đến trang quản trị.',
        });
        
        navigate('/admin/dashboard');
      }
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message || 'Đã xảy ra lỗi. Vui lòng thử lại.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? 'Đăng ký tài khoản' : 'Đăng nhập hệ thống'}</CardTitle>
          <CardDescription>
            {isSignUp 
              ? 'Tạo tài khoản quản trị viên mới' 
              : 'Đăng nhập với tư cách quản trị viên'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading 
                ? 'Đang xử lý...' 
                : isSignUp ? 'Đăng ký' : 'Đăng nhập'}
            </Button>
            <p className="text-sm text-center mt-2">
              {isSignUp ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Đăng nhập' : 'Đăng ký'}
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
