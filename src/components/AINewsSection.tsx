import { useQuery } from '@tanstack/react-query';
import { newsService } from '@/services/newsService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, ExternalLink } from 'lucide-react';

const AINewsSection = () => {
  const { data: newsList, isLoading } = useQuery({
    queryKey: ['ai_news_public'],
    queryFn: newsService.getAll
  });

  // Only show published news, limit to latest 6
  const displayNews = newsList?.filter(item => item.is_published).slice(0, 6);

  if (!displayNews || displayNews.length === 0) {
    // Hide section if no news available to keep UI clean
    return null;
  }

  return (
    <section className="py-16 bg-muted/30" id="ai-news">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" /> AI 严选资讯
          </Badge>
          <h2 className="text-3xl font-bold mb-4">最新 AI 动态速递</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            由 AI 智能筛选并生成的简化版资讯，助你轻松跟进前沿技术动态
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayNews.map((item) => (
              <Card key={item.id} className="h-full hover:shadow-lg transition-shadow border-primary/10">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={
                      item.difficulty_level === 'beginner' ? 'text-green-500 border-green-200 bg-green-50' : 
                      item.difficulty_level === 'intermediate' ? 'text-blue-500 border-blue-200 bg-blue-50' : 'text-orange-500 border-orange-200 bg-orange-50'
                    }>
                      {item.difficulty_level === 'beginner' ? '入门' : 
                       item.difficulty_level === 'intermediate' ? '进阶' : '硬核'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{item.original_title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-4 mb-4">
                    {item.summary}
                  </p>
                  {item.source_url && (
                    <a 
                      href={item.source_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-sm font-medium text-primary hover:underline flex items-center mt-auto"
                    >
                      阅读原文 <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AINewsSection;
