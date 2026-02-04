import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { newsService } from '@/services/newsService';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Languages, Calendar, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import Layout from "@/components/Layout";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isTranslating, setIsTranslating] = useState(false);

  const { data: news, isLoading } = useQuery({
    queryKey: ['ai_news', id],
    queryFn: () => newsService.getById(id!),
    enabled: !!id
  });

  const updateMutation = useMutation({
    mutationFn: (variables: { id: string, content: string }) => newsService.update(variables.id, { content: variables.content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai_news', id] });
      toast.success('翻译已保存');
    },
    onError: (error) => toast.error('保存翻译失败: ' + error.message)
  });

  const handleTranslate = async () => {
    if (!news?.content) return;
    
    setIsTranslating(true);
    try {
      const translatedContent = await newsService.translateText(news.content);
      
      // Persist to database immediately
      await updateMutation.mutateAsync({ 
        id: news.id, 
        content: translatedContent 
      });

      // Optimistically update cache to show result immediately
      queryClient.setQueryData(['ai_news', id], (old: any) => ({
        ...old,
        content: translatedContent
      }));

    } catch (error: any) {
      toast.error('翻译失败: ' + error.message);
    } finally {
      setIsTranslating(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]"><Loader2 className="animate-spin h-8 w-8" /></div>
      </Layout>
    );
  }

  if (!news) {
    return (
      <Layout>
        <div className="text-center py-12">未找到该资讯</div>
      </Layout>
    );
  }

  // Process content to replace image URLs with proxy URLs
  const processedContent = news.content?.replace(
    /src="(https?:\/\/[^"]+)"/g, 
    (match, url) => `src="/api/image-proxy?url=${encodeURIComponent(url)}"`
  ) || '';

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 hover:bg-transparent pl-0 -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回列表
        </Button>

        <article className="space-y-6">
          <header className="space-y-4 border-b pb-6">
            <div className="flex gap-2 flex-wrap">
              <Badge variant={
                news.difficulty_level === 'beginner' ? 'secondary' : 
                news.difficulty_level === 'intermediate' ? 'default' : 'destructive'
              }>
                {news.difficulty_level === 'beginner' ? '初学者' : 
                 news.difficulty_level === 'intermediate' ? '进阶' : '专家'}
              </Badge>
              {news.tags?.map((tag: string) => (
                <Badge key={tag} variant="outline" className="flex items-center">
                  <Tag className="mr-1 h-3 w-3" /> {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
              {news.original_title}
            </h1>
            
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              {new Date(news.created_at).toLocaleDateString()} 
              <span className="mx-2">•</span>
              {new Date(news.created_at).toLocaleTimeString()}
            </div>
          </header>

          <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
            <h3 className="font-semibold mb-3 flex items-center text-lg">
               ✨ AI 智能摘要
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {news.summary}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center sticky top-0 bg-background/95 backdrop-blur py-4 border-b z-10">
              <h2 className="text-xl font-semibold">详细内容</h2>
              <div className="flex gap-2">
                {news.source_url && news.source_url !== '#local-content' && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={news.source_url} target="_blank" rel="noreferrer">
                      查看原文
                    </a>
                  </Button>
                )}
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleTranslate}
                  disabled={isTranslating}
                >
                  {isTranslating ? (
                    <><Loader2 className="mr-2 h-3 w-3 animate-spin" /> 翻译中...</>
                  ) : (
                    <><Languages className="mr-2 h-3 w-3" /> 翻译全文</>
                  )}
                </Button>
              </div>
            </div>
            
            <div 
              className="prose dark:prose-invert max-w-none text-lg leading-relaxed pb-20"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default NewsDetail;
