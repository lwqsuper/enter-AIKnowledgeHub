import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Search, FileSearch, Workflow } from "lucide-react";

const ragTopics = [
  {
    icon: Database,
    title: "向量数据库基础",
    description: "了解向量数据库的核心概念，学习Pinecone、Weaviate、Milvus等主流方案",
    level: "基础",
    techs: ["Pinecone", "Weaviate", "Milvus"],
  },
  {
    icon: FileSearch,
    title: "文档处理与切分",
    description: "掌握文档加载、文本切分策略和元数据提取的最佳实践",
    level: "基础",
    techs: ["LangChain", "LlamaIndex", "Unstructured"],
  },
  {
    icon: Search,
    title: "检索策略优化",
    description: "深入学习混合检索、重排序和查询优化等高级检索技术",
    level: "进阶",
    techs: ["Hybrid Search", "Reranking", "Query Expansion"],
  },
  {
    icon: Workflow,
    title: "RAG系统架构",
    description: "设计生产级RAG系统，包括缓存、监控和性能优化",
    level: "高级",
    techs: ["系统设计", "性能优化", "生产部署"],
  },
];

const levelColors: Record<string, string> = {
  基础: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  进阶: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  高级: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const RAGTutorialSection = () => {
  return (
    <section id="rag" className="py-20 md:py-32 bg-secondary/20">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-primary">RAG</span>技术详解
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            深入理解检索增强生成(RAG)技术，构建知识增强的AI应用
          </p>
        </div>

        {/* RAG Learning Path */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ragTopics.map((topic, index) => (
            <Card
              key={index}
              className="glass-card glow-hover transition-all duration-300 hover:border-primary/30 group"
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-secondary text-primary">
                    <topic.icon className="w-6 h-6" />
                  </div>
                  <Badge className={levelColors[topic.level]}>{topic.level}</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {topic.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {topic.techs.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="outline"
                      className="text-xs text-muted-foreground border-border/50 hover:border-primary/50 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary hover:bg-primary/10 p-0 group/btn"
                >
                  深入学习
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block glass-card rounded-2xl p-8 glow-primary">
            <h3 className="text-2xl font-bold mb-4">准备好开始学习了吗？</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              加入我们，一起探索AI技术的无限可能，从入门到精通系统学习
            </p>
            <Button size="lg" className="glow-hover">
              立即开始
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RAGTutorialSection;
