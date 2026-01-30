import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Zap, Palette, Code, FileText, Video, Bot } from "lucide-react";

const tools = [
  {
    name: "ChatGPT",
    description: "OpenAI出品的强大对话AI，支持多种任务场景",
    category: "对话AI",
    icon: Bot,
    featured: true,
  },
  {
    name: "Claude",
    description: "Anthropic打造的智能助手，擅长长文本处理和分析",
    category: "对话AI",
    icon: Bot,
    featured: true,
  },
  {
    name: "Midjourney",
    description: "顶级AI图像生成工具，创作令人惊艳的艺术作品",
    category: "图像生成",
    icon: Palette,
    featured: false,
  },
  {
    name: "Cursor",
    description: "AI驱动的代码编辑器，大幅提升编程效率",
    category: "编程助手",
    icon: Code,
    featured: true,
  },
  {
    name: "Notion AI",
    description: "集成AI的全能笔记工具，智能写作和总结",
    category: "效率工具",
    icon: FileText,
    featured: false,
  },
  {
    name: "Runway",
    description: "创意视频生成和编辑平台，AI视频制作利器",
    category: "视频生成",
    icon: Video,
    featured: false,
  },
];

const AIToolsSection = () => {
  return (
    <section id="tools" className="py-20 md:py-32 bg-secondary/20">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            精选<span className="text-primary">AI工具</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            精心挑选的AI工具集合，覆盖对话、图像、视频、编程等多个领域
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="glass-card glow-hover transition-all duration-300 hover:border-primary/30 group relative overflow-hidden"
            >
              {tool.featured && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    <Zap className="w-3 h-3 mr-1" />
                    推荐
                  </Badge>
                </div>
              )}
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <div className="p-3 rounded-xl bg-secondary w-fit mb-4">
                    <tool.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className="w-fit mb-3 text-xs text-muted-foreground border-border/50"
                  >
                    {tool.category}
                  </Badge>
                  <p className="text-muted-foreground text-sm flex-1 mb-4">
                    {tool.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-fit text-primary hover:text-primary hover:bg-primary/10 p-0"
                  >
                    了解更多
                    <ExternalLink className="w-3 h-3 ml-1" />
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

export default AIToolsSection;
