import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { knowledgeItems } from "@/data/content";

const AIKnowledgeSection = () => {
  const navigate = useNavigate();

  return (
    <section id="knowledge" className="py-20 md:py-32">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            最新<span className="text-primary">AI知识</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            紧跟AI技术发展，精选前沿知识内容，帮助你建立系统的AI知识体系
          </p>
        </div>

        {/* Knowledge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {knowledgeItems.map((item) => (
            <Card
              key={item.id}
              className="glass-card glow-hover transition-all duration-300 hover:border-primary/30 cursor-pointer group"
              onClick={() => navigate(`/detail/knowledge/${item.id}`)}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-secondary ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="bg-secondary/50 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3 text-xs text-muted-foreground/60">
                  更新于 {item.updatedAt}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIKnowledgeSection;
