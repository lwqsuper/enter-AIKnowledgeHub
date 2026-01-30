import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

const agentTutorials = [
  {
    title: "Agent开发入门指南",
    description: "从零开始理解AI Agent的概念、架构设计和核心组件",
    difficulty: "入门",
    duration: "30分钟",
    topics: ["Agent概念", "架构设计", "工具调用"],
  },
  {
    title: "LangChain Agent实战",
    description: "使用LangChain框架构建功能强大的AI Agent应用",
    difficulty: "中级",
    duration: "45分钟",
    topics: ["LangChain", "ReAct", "工具集成"],
  },
  {
    title: "AutoGPT原理解析",
    description: "深入分析AutoGPT的自主决策机制和任务分解策略",
    difficulty: "高级",
    duration: "60分钟",
    topics: ["自主决策", "任务规划", "记忆管理"],
  },
  {
    title: "Multi-Agent系统设计",
    description: "学习多Agent协作系统的设计模式和实现方法",
    difficulty: "高级",
    duration: "90分钟",
    topics: ["多Agent", "协作模式", "分布式"],
  },
];

const difficultyColors: Record<string, string> = {
  入门: "bg-green-500/20 text-green-400 border-green-500/30",
  中级: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  高级: "bg-red-500/20 text-red-400 border-red-500/30",
};

const AgentTutorialSection = () => {
  return (
    <section id="agent" className="py-20 md:py-32">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-primary">AGENT</span>开发实战
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            从基础概念到高级应用，系统学习AI Agent开发的完整知识体系
          </p>
        </div>

        {/* Tutorials List */}
        <div className="space-y-4">
          {agentTutorials.map((tutorial, index) => (
            <Card
              key={index}
              className="glass-card glow-hover transition-all duration-300 hover:border-primary/30 group"
            >
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-secondary text-primary font-bold text-lg">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                        {tutorial.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {tutorial.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <Badge className={difficultyColors[tutorial.difficulty]}>
                      {tutorial.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      {tutorial.duration}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {tutorial.topics.map((topic, topicIndex) => (
                      <Badge
                        key={topicIndex}
                        variant="secondary"
                        className="bg-secondary/50 text-muted-foreground"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary hover:bg-primary/10 w-fit"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    开始学习
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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

export default AgentTutorialSection;
