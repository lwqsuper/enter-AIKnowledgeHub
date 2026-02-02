import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { newsService } from '@/services/newsService';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, RefreshCw, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export const NewsManager = () => {
  const queryClient = useQueryClient();

  const { data: newsList, isLoading } = useQuery({
    queryKey: ['ai_news'],
    queryFn: newsService.getAll
  });

  const fetchMutation = useMutation({
    mutationFn: newsService.fetchLatestNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai_news'] });
      toast.success('AI资讯获取并处理完成');
    },
    onError: (error) => toast.error('获取失败: ' + error.message)
  });

  const deleteMutation = useMutation({
    mutationFn: newsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai_news'] });
      toast.success('已删除');
    },
    onError: (error) => toast.error('删除失败: ' + error.message)
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">AI资讯智能处理中心</h2>
          <p className="text-sm text-muted-foreground mt-1">
            系统将自动从第三方API获取最新资讯，并进行摘要和难度分级。
          </p>
        </div>
        <Button 
          onClick={() => fetchMutation.mutate()} 
          disabled={fetchMutation.isPending}
        >
          {fetchMutation.isPending ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> AI处理中...</>
          ) : (
            <><RefreshCw className="mr-2 h-4 w-4" /> 获取最新资讯</>
          )}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {newsList?.map((item) => (
            <Card key={item.id} className="relative group hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant={
                    item.difficulty_level === 'beginner' ? 'secondary' : 
                    item.difficulty_level === 'intermediate' ? 'default' : 'destructive'
                  }>
                    {item.difficulty_level === 'beginner' ? '初学者' : 
                     item.difficulty_level === 'intermediate' ? '进阶' : '专家'}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-red-500"
                    onClick={() => deleteMutation.mutate(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg mt-2 line-clamp-2" title={item.original_title}>
                  {item.original_title}
                </CardTitle>
                <CardDescription className="text-xs">
                  {new Date(item.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-3 rounded-md mb-3">
                  <p className="text-sm font-medium text-primary mb-1">AI 摘要</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.summary}
                  </p>
                </div>
                {item.source_url && (
                  <a 
                    href={item.source_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-blue-500 hover:underline flex items-center"
                  >
                    查看原文 <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
          {newsList?.length === 0 && (
            <div className="col-span-2 text-center py-12 text-muted-foreground border rounded-lg border-dashed">
              暂无资讯数据，请点击右上角获取
            </div>
          )}
        </div>
      )}
    </div>
  );
};
