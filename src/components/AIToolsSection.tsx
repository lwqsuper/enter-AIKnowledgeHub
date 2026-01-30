import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap } from "lucide-react";
import { toolItems } from "@/data/content";

const AIToolsSection = () => {
  const navigate = useNavigate();

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
          {toolItems.map((tool) => (
            <Card
              key={tool.id}
              className="glass-card glow-hover transition-all duration-300 hover:border-primary/30 group relative overflow-hidden cursor-pointer"
              onClick={() => navigate(`/detail/tool/${tool.id}`)}
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
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-fit text-primary hover:text-primary hover:bg-primary/10 p-0"
                    >
                      了解更多
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <span className="text-xs text-muted-foreground/60">
                      {tool.updatedAt}
                    </span>
                  </div>
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
