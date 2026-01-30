import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, BookOpen, ExternalLink, Calendar, CheckCircle } from "lucide-react";
import { knowledgeItems, toolItems, agentTutorials, ragTutorials } from "@/data/content";
import ReactMarkdown from "react-markdown";

const DetailPage = () => {
  const { type, id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const getContent = () => {
    switch (type) {
      case "knowledge":
        return knowledgeItems.find((item) => item.id === id);
      case "tool":
        return toolItems.find((item) => item.id === id);
      case "agent":
        return agentTutorials.find((item) => item.id === id);
      case "rag":
        return ragTutorials.find((item) => item.id === id);
      default:
        return null;
    }
  };

  const content = getContent();

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">内容未找到</h1>
          <Button onClick={() => navigate("/")}>返回首页</Button>
        </div>
      </div>
    );
  }

  const isKnowledge = type === "knowledge";
  const isTool = type === "tool";
  const isTutorial = type === "agent" || type === "rag";

  const difficultyColors: Record<string, string> = {
    入门: "bg-green-500/20 text-green-400 border-green-500/30",
    中级: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    高级: "bg-red-500/20 text-red-400 border-red-500/30",
    基础: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    进阶: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card">
        <div className="section-container py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold truncate">
                {"title" in content ? content.title : "name" in content ? content.name : ""}
              </h1>
              <p className="text-sm text-muted-foreground">
                {type === "knowledge" && "AI知识"}
                {type === "tool" && "AI工具"}
                {type === "agent" && "AGENT教程"}
                {type === "rag" && "RAG教程"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section-container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Content Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {"difficulty" in content && (
                <Badge className={difficultyColors[content.difficulty] || ""}>
                  {content.difficulty}
                </Badge>
              )}
              {"category" in content && (
                <Badge variant="outline" className="text-muted-foreground">
                  {content.category}
                </Badge>
              )}
              {"featured" in content && content.featured && (
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  推荐
                </Badge>
              )}
              {"duration" in content && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {content.duration}
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {"title" in content ? content.title : "name" in content ? content.name : ""}
            </h1>

            <p className="text-lg text-muted-foreground mb-4">
              {content.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                更新于 {"updatedAt" in content ? content.updatedAt : ""}
              </div>
            </div>
          </div>

          {/* Tags */}
          {"tags" in content && (
            <div className="flex flex-wrap gap-2 mb-8">
              {content.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-secondary/50 text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {"topics" in content && (
            <div className="flex flex-wrap gap-2 mb-8">
              {content.topics.map((topic, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-secondary/50 text-muted-foreground"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          )}

          {"techs" in content && content.techs && (
            <div className="flex flex-wrap gap-2 mb-8">
              {content.techs.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-muted-foreground border-border/50"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          {/* Features (for tools) */}
          {"features" in content && (
            <Card className="glass-card mb-8">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">主要功能</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                {"link" in content && content.link && (
                  <Button className="mt-6" asChild>
                    <a href={content.link} target="_blank" rel="noopener noreferrer">
                      访问官网
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Chapters (for tutorials) */}
          {"chapters" in content && (
            <Card className="glass-card mb-8">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  课程章节
                </h3>
                <div className="space-y-3">
                  {content.chapters.map((chapter, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span>{chapter.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {chapter.duration}
                      </span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6" size="lg">
                  开始学习
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Main Content */}
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground first:mt-0">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-muted-foreground">{children}</li>
                    ),
                    code: ({ className, children }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code className="px-1.5 py-0.5 rounded bg-secondary text-primary text-sm">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className="block p-4 rounded-lg bg-secondary/50 text-sm overflow-x-auto my-4">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="p-4 rounded-lg bg-secondary/50 overflow-x-auto my-4">
                        {children}
                      </pre>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-4">
                        <table className="w-full text-sm border-collapse">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-border/50 px-4 py-2 text-left bg-secondary/30 font-medium">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-border/50 px-4 py-2 text-muted-foreground">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {content.content}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailPage;
