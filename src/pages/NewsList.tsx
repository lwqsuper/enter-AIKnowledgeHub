import { useQuery } from '@tanstack/react-query';
import { newsService } from '@/services/newsService';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ExternalLink, FileText, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from "@/components/Layout";

const NewsList = () => {
  const navigate = useNavigate();
  const { data: newsList, isLoading } = useQuery({
    queryKey: ['ai_news_public'],
    queryFn: newsService.getAll
  });

  const displayNews = newsList?.filter(item => item.is_published) || [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')} 
              className="mb-2 pl-0 hover:bg-transparent text-muted-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
            </Button>
            <h1 className="text-3xl font-bold">AI 前沿资讯</h1>
            <p className="text-muted-foreground mt-2">
              实时追踪全球 AI 技术动态，为您提供经过智能筛选与摘要的高价值信息
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="h-8 px-3">
              共 {displayNews.length} 条资讯
            </Badge>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayNews.map((item) => (
              <Card key={item.id} className="h-full hover:shadow-lg transition-all duration-300 border-primary/10 flex flex-col group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className={
                      item.difficulty_level === 'beginner' ? 'text-green-600 border-green-200 bg-green-50' : 
                      item.difficulty_level === 'intermediate' ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-orange-600 border-orange-200 bg-orange-50'
                    }>
                      {item.difficulty_level === 'beginner' ? '入门' : 
                       item.difficulty_level === 'intermediate' ? '进阶' : '硬核'}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center bg-muted/50 px-2 py-1 rounded">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {item.original_title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="bg-muted/30 p-3 rounded-md mb-4 flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {item.summary}
                    </p>
                  </div>
                  <div className="flex gap-3 pt-2 mt-auto border-t border-border/50">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/detail/news/${item.id}`)}
                    >
                      <FileText className="mr-2 h-3 w-3" /> 查看全文
                    </Button>
                    {item.source_url && item.source_url !== '#local-content' && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={item.source_url} target="_blank" rel="noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NewsList;
