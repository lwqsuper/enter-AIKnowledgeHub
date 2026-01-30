import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, GraduationCap, BookOpen, Video, FileCode, Globe, Newspaper } from "lucide-react";

const resources = [
  {
    name: "OpenAI官方文档",
    description: "OpenAI API官方文档，学习GPT、DALL-E等模型的最佳资源",
    url: "https://platform.openai.com/docs",
    category: "官方文档",
    icon: FileCode,
  },
  {
    name: "Hugging Face",
    description: "开源AI模型和数据集平台，海量预训练模型可用",
    url: "https://huggingface.co",
    category: "模型平台",
    icon: Globe,
  },
  {
    name: "LangChain文档",
    description: "LangChain框架官方文档，学习构建LLM应用的必备资源",
    url: "https://python.langchain.com/docs",
    category: "开发框架",
    icon: FileCode,
  },
  {
    name: "DeepLearning.AI",
    description: "吴恩达创办的AI教育平台，高质量AI课程资源",
    url: "https://www.deeplearning.ai",
    category: "在线课程",
    icon: GraduationCap,
  },
  {
    name: "Papers With Code",
    description: "AI论文与代码实现的聚合平台，追踪最新研究进展",
    url: "https://paperswithcode.com",
    category: "学术资源",
    icon: BookOpen,
  },
  {
    name: "B站AI学习",
    description: "国内优质AI视频教程聚集地，适合中文学习者",
    url: "https://www.bilibili.com",
    category: "视频教程",
    icon: Video,
  },
  {
    name: "AI研习社",
    description: "中文AI技术社区，分享最新AI资讯和技术文章",
    url: "https://www.yanxishe.com",
    category: "技术社区",
    icon: Newspaper,
  },
  {
    name: "Anthropic文档",
    description: "Claude API官方文档，学习安全AI开发的优质资源",
    url: "https://docs.anthropic.com",
    category: "官方文档",
    icon: FileCode,
  },
];

const categoryColors: Record<string, string> = {
  "官方文档": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "模型平台": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "开发框架": "bg-green-500/20 text-green-400 border-green-500/30",
  "在线课程": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "学术资源": "bg-red-500/20 text-red-400 border-red-500/30",
  "视频教程": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "技术社区": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

const AIResourcesSection = () => {
  return (
    <section id="resources" className="py-20 md:py-32">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            优质<span className="text-primary">学习资源</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            精选AI学习网站和平台，助你高效学习人工智能技术
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <Card
              key={index}
              className="glass-card glow-hover transition-all duration-300 hover:border-primary/30 group cursor-pointer"
              onClick={() => window.open(resource.url, "_blank", "noopener,noreferrer")}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-secondary">
                      <resource.icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge className={categoryColors[resource.category] || "bg-secondary"}>
                      {resource.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {resource.name}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-1 mb-4 leading-relaxed">
                    {resource.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-fit text-primary hover:text-primary hover:bg-primary/10 p-0"
                  >
                    访问网站
                    <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIResourcesSection;
