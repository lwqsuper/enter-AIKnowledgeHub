import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Brain, Code, Rocket, Sparkles, Database, Layout, GitBranch, Lightbulb } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AILearningPath = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="mb-4 pl-0 hover:bg-transparent text-muted-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                从痛点到产品 —— AI 编程学习实践全记录
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                探索 FUSE TECH 华如锦 AI 编程课程毕业设计与学习路径复盘
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>作者：刘伟奇</span>
              <span className="mx-2">|</span>
              <span>更新时间：2026-02-03</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="projects" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="projects">项目路演</TabsTrigger>
            <TabsTrigger value="learning">学习复盘</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Rocket className="mr-2 h-6 w-6 text-primary" />
                从痛点挖掘到 MVP 落地
              </h2>
              <p className="text-muted-foreground mb-8">
                遵循“痛点→需求→方案→落地”的四步法则，挖掘核心痛点并落地 MVP 产品。
              </p>

              <div className="grid gap-6 md:grid-cols-3">
                {/* Product 1 */}
                <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">痛点 1：效率低</Badge>
                    <CardTitle>ERP AI 智能化系统</CardTitle>
                    <CardDescription>解决传统 ERP 数据录入效率低、易出错问题</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-sm">
                        <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" /> 核心功能
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        支持语音+键盘双输入模式，智能匹配采购商品价格、数量；退货自动推荐。
                      </p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-sm">
                        <Code className="w-4 h-4 mr-2 text-blue-500" /> 技术选型
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Supabase</Badge>
                        <Badge variant="secondary">AI 语音转文字</Badge>
                        <Badge variant="secondary">大模型匹配</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Product 2 */}
                <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">痛点 2：操作繁</Badge>
                    <CardTitle>JSON 数据提取工具</CardTitle>
                    <CardDescription>解决多层嵌套 JSON 数据提取耗时繁琐问题</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-sm">
                        <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" /> 核心功能
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        一键提取 datas 字段内的数组元素，基于 Qwen3-Max 输出结构化 JSON。
                      </p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-sm">
                        <Code className="w-4 h-4 mr-2 text-blue-500" /> 技术选型
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Qwen3-Max</Badge>
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">数据解析</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Product 3 */}
                <Card className="hover:shadow-lg transition-all duration-300 border-primary/10">
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="outline">痛点 3：管控难</Badge>
                    <CardTitle>AI 知识个人主页</CardTitle>
                    <CardDescription>解决 AI 资讯获取成本高、缺乏分级管控问题</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-sm">
                        <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" /> 核心功能
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        展示 AI 知识与工具；管理员后台管控资讯获取，按用户等级展示分级内容。
                      </p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-sm">
                        <Code className="w-4 h-4 mr-2 text-blue-500" /> 技术选型
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Vercel</Badge>
                        <Badge variant="secondary">Github</Badge>
                        <Badge variant="secondary">AI Design</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="learning" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Brain className="mr-2 h-6 w-6 text-primary" />
                  AI 编程心得
                </h2>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">1. 流程设计越细致，AI 产出返工越少</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        明确页面模块、功能需求、设计风格后再生成，效率提升 50% 以上。
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">2. AI 是“协作工具”，而非“替代者”</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        AI 负责重复性工作（代码生成、数据提取），人负责核心逻辑与痛点挖掘。
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">3. “从 0 到 1” 比 “从 1 到 10” 更重要</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        优先落地 MVP 验证价值，而非追求功能完美。先实现，再优化。
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <GitBranch className="mr-2 h-6 w-6 text-primary" />
                  通用 AI 学习路径
                </h2>
                <div className="relative border-l border-primary/20 ml-3 space-y-8 pl-8 py-2">
                  <div className="relative">
                    <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">1</span>
                    <h3 className="font-bold text-lg mb-2">阶段 1：基础工具认知（1-2 天）</h3>
                    <p className="text-muted-foreground mb-2">掌握核心工具：Github、Vercel、阿里云百炼。</p>
                    <Badge variant="secondary">目标：完成代码托管与网页部署</Badge>
                  </div>
                  
                  <div className="relative">
                    <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">2</span>
                    <h3 className="font-bold text-lg mb-2">阶段 2：痛点挖掘与 MVP 设计（2-3 天）</h3>
                    <p className="text-muted-foreground mb-2">练习产品思维，绘制 MVP 产品架构图。</p>
                    <Badge variant="secondary">目标：明确技术选型和功能清单</Badge>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">3</span>
                    <h3 className="font-bold text-lg mb-2">阶段 3：AI 辅助开发与部署（3-4 天）</h3>
                    <p className="text-muted-foreground mb-2">用 AI 生成代码、设计图；学习智能体开发逻辑。</p>
                    <Badge variant="secondary">目标：上线 1 个小工具或网页</Badge>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[41px] top-1 h-6 w-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">4</span>
                    <h3 className="font-bold text-lg mb-2">阶段 4：优化与进阶（长期）</h3>
                    <p className="text-muted-foreground mb-2">根据反馈迭代功能；学习 RAG、Agent 进阶玩法。</p>
                    <Badge variant="secondary">目标：探索深度调用与成本管控</Badge>
                  </div>
                </div>
              </section>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AILearningPath;
