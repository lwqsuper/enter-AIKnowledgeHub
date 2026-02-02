import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAuthGuard } from "@/components/Admin/AdminAuthGuard";
import { ModuleEditor } from "@/components/Admin/ModuleEditor";
import { NewsManager } from "@/components/Admin/NewsManager";
import { LayoutDashboard, Newspaper, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <Settings className="mr-2" /> 管理控制台
            </h1>
            <Button variant="outline" asChild>
              <Link to="/">返回首页</Link>
            </Button>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="modules" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
              <TabsTrigger value="modules" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" /> 模块管理
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2">
                <Newspaper className="w-4 h-4" /> AI资讯
              </TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="border rounded-lg p-6 bg-card shadow-sm">
              <ModuleEditor />
            </TabsContent>

            <TabsContent value="news" className="border rounded-lg p-6 bg-card shadow-sm">
              <NewsManager />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AdminAuthGuard>
  );
};

export default AdminDashboard;
