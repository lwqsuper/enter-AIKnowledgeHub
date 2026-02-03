import { useQuery } from '@tanstack/react-query';
import { newsService } from '@/services/newsService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, ExternalLink, ArrowRight, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AINewsSection = () => {
  const navigate = useNavigate();
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
        <div className="text-center mb-12 relative">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" /> AI 严选资讯
          </Badge>
          <h2 className="text-3xl font-bold mb-4">最新 AI 动态速递</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            由 AI 智能筛选并生成的简化版资讯，助你轻松跟进前沿技术动态
          </p>
          
          <Button 
            variant="outline" 
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => navigate('/news')}
          >
            查看更多 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayNews.map((item) => (
              <Card key={item.id} className="h-full hover:shadow-lg transition-all duration-300 border-primary/10 flex flex-col group">
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
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {item.original_title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground line-clamp-4 mb-4 flex-1">
                    {item.summary}
                  </p>
                  <div className="flex gap-2 pt-2 border-t border-border/50">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1 text-primary hover:text-primary hover:bg-primary/5 pl-0 justify-start"
                      onClick={() => navigate(`/detail/news/${item.id}`)}
                    >
                      <FileText className="mr-2 h-3 w-3" /> 查看全文
                    </Button>
                    {item.source_url && (
                      <a 
                        href={item.source_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center px-3"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/news')}
          >
            查看更多 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AINewsSection;
