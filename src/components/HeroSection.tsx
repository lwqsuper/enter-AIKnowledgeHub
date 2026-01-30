import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // 模拟刷新数据
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "更新成功",
      description: "已获取最新的AI资讯和教程内容",
    });
    
    setIsRefreshing(false);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background gradient decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">探索AI世界的无限可能</span>
          </div>

          {/* Main title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">FUSE_TECH</span>
            <br />
            <span className="gradient-text">华如锦</span>
            <span className="text-primary">.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            探索AI前沿，分享技术精华
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground/80 mb-8 max-w-xl leading-relaxed">
            专注于收集最新的AI相关知识与工具，分享AGENT和RAG等前沿技术开发教程，
            帮助你快速掌握人工智能领域的核心技术。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="group glow-hover transition-all duration-300"
              onClick={() => {
                const element = document.querySelector("#knowledge");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              开始探索
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/50 hover:border-primary/50 hover:bg-primary/5"
              onClick={() => {
                const element = document.querySelector("#tools");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              查看工具推荐
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="group"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "更新中..." : "更新资讯"}
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-border/30">
            <div>
              <div className="text-3xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">精选文章</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">30+</div>
              <div className="text-sm text-muted-foreground">AI工具</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">20+</div>
              <div className="text-sm text-muted-foreground">开发教程</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
