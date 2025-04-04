
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Newspaper, LogOut, LayoutDashboard, Users, Settings as SettingsIcon, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/auth');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white">
        <div className="p-4 h-16 flex items-center border-b border-gray-800">
          <div className="flex items-center">
            <img src="/assets/logos/logo_GAET_transparent.png" alt="GAET Logo" className="h-8 mr-2" />
            <h1 className="text-xl font-bold">Admin</h1>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <p className="text-gray-400 text-sm">Đăng nhập với</p>
            <p className="font-medium truncate">{user?.email}</p>
          </div>
          
          <nav className="space-y-1">
            <NavLink 
              to="/admin/dashboard" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <LayoutDashboard className="mr-3 h-4 w-4" />
              Dashboard
            </NavLink>
            
            <NavLink 
              to="/admin/news" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Newspaper className="mr-3 h-4 w-4" />
              Tin tức & Sự kiện
            </NavLink>

            <NavLink 
              to="/admin/business-areas" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Building className="mr-3 h-4 w-4" />
              Lĩnh vực kinh doanh
            </NavLink>

            <NavLink 
              to="/admin/users" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Users className="mr-3 h-4 w-4" />
              Quản lý người dùng
            </NavLink>

            <NavLink 
              to="/admin/settings" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-sm ${
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <SettingsIcon className="mr-3 h-4 w-4" />
              Cài đặt hệ thống
            </NavLink>
          </nav>
        </div>
        
        <div className="mt-auto p-4 border-t border-gray-800">
          <Button 
            variant="outline" 
            className="w-full justify-start text-gray-300 hover:text-white border-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Đăng xuất
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
