import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { moduleService } from '@/services/moduleService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from 'sonner';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';

export const ModuleEditor = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'knowledge',
    sort_order: 0,
    is_active: true
  });

  const { data: modules, isLoading } = useQuery({
    queryKey: ['modules'],
    queryFn: moduleService.getAll
  });

  const createMutation = useMutation({
    mutationFn: moduleService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      setIsDialogOpen(false);
      resetForm();
      toast.success('模块添加成功');
    },
    onError: (error) => toast.error('添加失败: ' + error.message)
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => moduleService.update(editingModule.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      setIsDialogOpen(false);
      resetForm();
      toast.success('模块更新成功');
    },
    onError: (error) => toast.error('更新失败: ' + error.message)
  });

  const deleteMutation = useMutation({
    mutationFn: moduleService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      toast.success('模块删除成功');
    },
    onError: (error) => toast.error('删除失败: ' + error.message)
  });

  const resetForm = () => {
    setEditingModule(null);
    setFormData({
      title: '',
      content: '',
      type: 'knowledge',
      sort_order: 0,
      is_active: true
    });
  };

  const handleEdit = (module: any) => {
    setEditingModule(module);
    setFormData({
      title: module.title,
      content: module.content || '',
      type: module.type,
      sort_order: module.sort_order,
      is_active: module.is_active
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingModule) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">首页模块管理</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> 新增模块</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingModule ? '编辑模块' : '新增模块'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">标题</Label>
                <Input 
                  id="title" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">类型</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={val => setFormData({...formData, type: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="knowledge">AI知识体系</SelectItem>
                    <SelectItem value="tool">AI工具库</SelectItem>
                    <SelectItem value="tutorial">教程资源</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sort_order">排序权重 (越小越靠前)</Label>
                <Input 
                  id="sort_order" 
                  type="number" 
                  value={formData.sort_order} 
                  onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value)})} 
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="is_active" 
                  checked={formData.is_active}
                  onCheckedChange={checked => setFormData({...formData, is_active: checked})}
                />
                <Label htmlFor="is_active">显示状态</Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">内容详情 (支持Markdown)</Label>
                <Textarea 
                  id="content" 
                  className="h-32"
                  value={formData.content} 
                  onChange={e => setFormData({...formData, content: e.target.value})} 
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>取消</Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingModule ? '保存修改' : '确认添加'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>排序</TableHead>
              <TableHead>标题</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modules?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  暂无数据，请点击右上角添加
                </TableCell>
              </TableRow>
            )}
            {modules?.map((module) => (
              <TableRow key={module.id}>
                <TableCell>{module.sort_order}</TableCell>
                <TableCell className="font-medium">{module.title}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full bg-secondary text-xs">
                    {module.type}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`w-2 h-2 rounded-full inline-block mr-2 ${module.is_active ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  {module.is_active ? '已启用' : '已禁用'}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(module)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => {
                      if (confirm('确定要删除该模块吗？')) deleteMutation.mutate(module.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
