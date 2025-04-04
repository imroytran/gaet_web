
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Check, X, Eye, ImageIcon } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

type BusinessArea = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

const BusinessAreaManagement = () => {
  const [areas, setAreas] = useState<BusinessArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentArea, setCurrentArea] = useState<BusinessArea | null>(null);
  const [isNewArea, setIsNewArea] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [color, setColor] = useState('#3b82f6');
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBusinessAreas();
  }, []);

  const fetchBusinessAreas = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_areas')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setAreas(data || []);
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
    setCurrentArea(null);
    setName('');
    setDescription('');
    setIcon('');
    setColor('#3b82f6');
    setIsActive(true);
    setSortOrder(areas.length + 1);
    setIsNewArea(true);
    setDialogOpen(true);
  };

  const openEditDialog = (area: BusinessArea) => {
    setCurrentArea(area);
    setName(area.name);
    setDescription(area.description);
    setIcon(area.icon);
    setColor(area.color);
    setIsActive(area.is_active);
    setSortOrder(area.sort_order);
    setIsNewArea(false);
    setDialogOpen(true);
  };

  const confirmDelete = (area: BusinessArea) => {
    setCurrentArea(area);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!currentArea) return;

    try {
      const { error } = await supabase
        .from('business_areas')
        .delete()
        .eq('id', currentArea.id);

      if (error) throw error;

      setAreas(areas.filter(area => area.id !== currentArea.id));
      toast({
        title: 'Xóa thành công',
        description: 'Lĩnh vực kinh doanh đã được xóa',
      });
    } catch (error: any) {
      toast({
        title: 'Lỗi khi xóa',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setCurrentArea(null);
    }
  };

  const handleSave = async () => {
    try {
      if (!name) {
        throw new Error('Tên lĩnh vực không được để trống');
      }

      const areaData = {
        name,
        description,
        icon,
        color,
        is_active: isActive,
        sort_order: sortOrder,
        updated_at: new Date().toISOString(),
      };

      if (isNewArea) {
        // Create new area
        const { data, error } = await supabase
          .from('business_areas')
          .insert({ ...areaData, created_at: new Date().toISOString() })
          .select()
          .single();

        if (error) throw error;
        
        setAreas([...areas, data]);
        toast({
          title: 'Tạo thành công',
          description: 'Lĩnh vực kinh doanh mới đã được tạo',
        });
      } else if (currentArea) {
        // Update existing area
        const { data, error } = await supabase
          .from('business_areas')
          .update(areaData)
          .eq('id', currentArea.id)
          .select()
          .single();

        if (error) throw error;
        
        setAreas(areas.map(area => area.id === currentArea.id ? data : area));
        toast({
          title: 'Cập nhật thành công',
          description: 'Lĩnh vực kinh doanh đã được cập nhật',
        });
      }

      setDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleActiveStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('business_areas')
        .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setAreas(
        areas.map(area =>
          area.id === id ? { ...area, is_active: !currentStatus } : area
        )
      );

      toast({
        title: 'Cập nhật thành công',
        description: `Lĩnh vực đã được ${!currentStatus ? 'kích hoạt' : 'vô hiệu hóa'}`,
      });
    } catch (error: any) {
      toast({
        title: 'Lỗi khi cập nhật',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Quản lý Lĩnh vực Kinh doanh</h1>
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm mới
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gaet-600"></div>
          </div>
        ) : areas.length === 0 ? (
          <div className="text-center p-8 border rounded-lg bg-gray-50">
            <p className="text-gray-500">Chưa có lĩnh vực kinh doanh nào. Hãy thêm mới.</p>
          </div>
        ) : (
          <div className="border rounded-md overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">STT</TableHead>
                  <TableHead>Tên lĩnh vực</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {areas.map((area) => (
                  <TableRow key={area.id}>
                    <TableCell>{area.sort_order}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: area.color }}
                        />
                        {area.name}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{area.description}</TableCell>
                    <TableCell>{area.icon}</TableCell>
                    <TableCell>
                      <Badge variant={area.is_active ? 'default' : 'outline'}>
                        {area.is_active ? 'Đang hoạt động' : 'Vô hiệu hóa'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => toggleActiveStatus(area.id, area.is_active)}
                      >
                        {area.is_active ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/${area.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/admin/business-areas/${area.id}/gallery`)}
                        title="Manage Gallery Images"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(area)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => confirmDelete(area)}
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

      {/* Edit/Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isNewArea ? 'Thêm lĩnh vực kinh doanh mới' : 'Chỉnh sửa lĩnh vực kinh doanh'}
            </DialogTitle>
            <DialogDescription>
              Điền thông tin chi tiết về lĩnh vực kinh doanh.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên lĩnh vực</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên lĩnh vực" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả ngắn gọn" 
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Input 
                  id="icon" 
                  value={icon} 
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="Ví dụ: building" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color">Màu sắc</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="color" 
                    type="color"
                    value={color} 
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 p-1 h-10"
                  />
                  <Input 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="#hex" 
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sort-order">Thứ tự hiển thị</Label>
                <Input 
                  id="sort-order" 
                  type="number"
                  min="1"
                  value={sortOrder} 
                  onChange={(e) => setSortOrder(parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="is-active">Trạng thái</Label>
                <div className="flex items-center justify-between">
                  <span>{isActive ? 'Đang hoạt động' : 'Vô hiệu hóa'}</span>
                  <Switch
                    id="is-active"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Hủy</Button>
            <Button onClick={handleSave}>
              {isNewArea ? 'Tạo mới' : 'Lưu thay đổi'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa lĩnh vực kinh doanh "{currentArea?.name}"? Hành động này không thể hoàn tác.
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

export default BusinessAreaManagement;
