import { Brain, MessageSquare, Image, Layers, Bot, Palette, Code, FileText, Video, Database, Search, FileSearch, Workflow } from "lucide-react";

export interface KnowledgeItem {
  id: string;
  icon: typeof Brain;
  title: string;
  description: string;
  tags: string[];
  color: string;
  content: string;
  updatedAt: string;
}

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: typeof Bot;
  featured: boolean;
  content: string;
  features: string[];
  link?: string;
  updatedAt: string;
}

export interface TutorialItem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  topics: string[];
  content: string;
  chapters: { title: string; duration: string }[];
  type: "agent" | "rag";
  updatedAt: string;
  icon?: typeof Database;
  techs?: string[];
}

export const knowledgeItems: KnowledgeItem[] = [
  {
    id: "llm-basics",
    icon: Brain,
    title: "大语言模型 (LLM)",
    description: "深入了解GPT、Claude、Llama等主流大语言模型的原理、架构和应用场景",
    tags: ["GPT-4", "Claude", "Llama"],
    color: "text-blue-400",
    updatedAt: "2025-01-28",
    content: `
## 什么是大语言模型？

大语言模型（Large Language Model, LLM）是一种基于深度学习的人工智能模型，通过在海量文本数据上进行训练，能够理解和生成自然语言文本。

### 核心技术原理

1. **Transformer架构**：LLM的基础架构，采用自注意力机制处理序列数据
2. **预训练与微调**：先在大规模语料上预训练，再针对特定任务微调
3. **上下文学习**：模型能够根据提供的示例进行学习和推理

### 主流模型对比

| 模型 | 开发商 | 特点 |
|------|--------|------|
| GPT-4 | OpenAI | 多模态、强推理能力 |
| Claude | Anthropic | 长上下文、安全性强 |
| Llama | Meta | 开源、可本地部署 |

### 应用场景

- 智能对话与客服
- 内容创作与写作辅助
- 代码生成与调试
- 数据分析与报告生成
    `,
  },
  {
    id: "prompt-engineering",
    icon: MessageSquare,
    title: "Prompt工程",
    description: "掌握提示词设计技巧，学会如何与AI高效沟通，获得更精准的输出结果",
    tags: ["提示词优化", "Few-shot", "CoT"],
    color: "text-green-400",
    updatedAt: "2025-01-27",
    content: `
## Prompt工程入门

Prompt工程是设计和优化输入提示词的技术，以获得AI模型更准确、更有用的输出。

### 核心技巧

1. **清晰明确**：提供具体、明确的指令
2. **提供上下文**：给出背景信息和约束条件
3. **分步思考**：使用Chain of Thought（CoT）引导推理

### 常用Prompt模式

\`\`\`
# Few-shot示例
请按照以下格式分类：
输入：苹果 -> 输出：水果
输入：胡萝卜 -> 输出：蔬菜
输入：香蕉 -> 输出：
\`\`\`

### 高级技巧

- **角色扮演**：让模型扮演特定角色
- **输出格式控制**：指定JSON、Markdown等格式
- **思维链提示**：让模型展示推理过程
    `,
  },
  {
    id: "multimodal-ai",
    icon: Image,
    title: "多模态AI",
    description: "探索图像、视频、音频等多模态AI技术，了解DALL-E、Stable Diffusion等应用",
    tags: ["图像生成", "视频AI", "语音识别"],
    color: "text-purple-400",
    updatedAt: "2025-01-26",
    content: `
## 多模态AI技术概览

多模态AI能够处理和生成多种类型的数据，包括文本、图像、音频和视频。

### 图像生成技术

1. **扩散模型**：Stable Diffusion、DALL-E 3
2. **GAN架构**：StyleGAN、BigGAN
3. **自回归模型**：Parti、Imagen

### 视频生成

- **Sora**：OpenAI的文本到视频模型
- **Runway Gen-2**：专业视频生成工具
- **Pika Labs**：简单易用的视频创作

### 音频与语音

- 文本转语音（TTS）
- 语音识别（ASR）
- 音乐生成
    `,
  },
  {
    id: "ai-app-dev",
    icon: Layers,
    title: "AI应用开发",
    description: "从零开始构建AI应用，包括API调用、模型部署和产品化最佳实践",
    tags: ["API集成", "微调", "部署"],
    color: "text-orange-400",
    updatedAt: "2025-01-25",
    content: `
## AI应用开发指南

学习如何将AI能力集成到实际应用中，构建生产级AI产品。

### API集成基础

\`\`\`python
import openai

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "你是一个助手"},
        {"role": "user", "content": "你好"}
    ]
)
\`\`\`

### 模型微调

1. 准备训练数据
2. 选择基础模型
3. 配置训练参数
4. 评估与迭代

### 生产部署

- 性能优化与缓存
- 错误处理与重试
- 监控与日志
- 成本控制
    `,
  },
];

export const toolItems: ToolItem[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI出品的强大对话AI，支持多种任务场景",
    category: "对话AI",
    icon: Bot,
    featured: true,
    updatedAt: "2025-01-28",
    link: "https://chat.openai.com",
    features: ["自然语言对话", "代码生成", "文本分析", "创意写作"],
    content: `
## ChatGPT 使用指南

ChatGPT是由OpenAI开发的大型语言模型，能够进行自然对话、回答问题、创作内容等。

### 主要功能

1. **智能对话**：自然流畅的多轮对话
2. **代码助手**：编写、调试、解释代码
3. **写作辅助**：文章、邮件、创意写作
4. **数据分析**：分析和解释数据

### 使用技巧

- 提供清晰的上下文
- 使用具体的指令
- 迭代优化提问
- 善用系统提示词

### 版本对比

| 版本 | 特点 | 适用场景 |
|------|------|----------|
| GPT-3.5 | 快速、免费 | 日常对话 |
| GPT-4 | 更强推理 | 复杂任务 |
| GPT-4o | 多模态 | 图像理解 |
    `,
  },
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic打造的智能助手，擅长长文本处理和分析",
    category: "对话AI",
    icon: Bot,
    featured: true,
    updatedAt: "2025-01-27",
    link: "https://claude.ai",
    features: ["长文本处理", "深度分析", "安全可靠", "多语言支持"],
    content: `
## Claude 使用指南

Claude是Anthropic开发的AI助手，以安全性和长文本处理能力著称。

### 核心优势

1. **超长上下文**：支持200K tokens上下文
2. **安全设计**：Constitutional AI方法
3. **深度分析**：复杂文档处理
4. **代码能力**：全栈开发支持

### 适用场景

- 长篇文档分析
- 研究报告撰写
- 代码审查
- 学术研究辅助
    `,
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "顶级AI图像生成工具，创作令人惊艳的艺术作品",
    category: "图像生成",
    icon: Palette,
    featured: false,
    updatedAt: "2025-01-26",
    features: ["艺术风格", "高质量输出", "风格多样", "社区分享"],
    content: `
## Midjourney 图像生成

Midjourney是一款强大的AI图像生成工具，能够根据文本描述创作高质量艺术图像。

### 基础命令

\`\`\`
/imagine prompt: [你的描述]
/upscale: 提升分辨率
/variation: 生成变体
\`\`\`

### Prompt技巧

- 描述主体和场景
- 指定艺术风格
- 添加光影效果
- 使用参数调整
    `,
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI驱动的代码编辑器，大幅提升编程效率",
    category: "编程助手",
    icon: Code,
    featured: true,
    updatedAt: "2025-01-25",
    link: "https://cursor.sh",
    features: ["智能补全", "代码重构", "Bug修复", "文档生成"],
    content: `
## Cursor AI编程助手

Cursor是一款集成AI的代码编辑器，基于VS Code，提供强大的AI辅助编程功能。

### 主要功能

1. **Tab补全**：智能代码补全
2. **Chat功能**：与AI对话解决问题
3. **Composer**：多文件编辑
4. **代码解释**：理解复杂代码

### 快捷键

- \`Ctrl+K\`: 快速编辑
- \`Ctrl+L\`: 打开聊天
- \`Tab\`: 接受补全
    `,
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    description: "集成AI的全能笔记工具，智能写作和总结",
    category: "效率工具",
    icon: FileText,
    featured: false,
    updatedAt: "2025-01-24",
    features: ["智能写作", "自动总结", "翻译", "头脑风暴"],
    content: `
## Notion AI 效率提升

Notion AI将AI能力无缝集成到笔记和协作工具中。

### 功能特点

- 自动生成内容
- 优化现有文本
- 翻译多种语言
- 提取关键信息
    `,
  },
  {
    id: "runway",
    name: "Runway",
    description: "创意视频生成和编辑平台，AI视频制作利器",
    category: "视频生成",
    icon: Video,
    featured: false,
    updatedAt: "2025-01-23",
    features: ["文字生成视频", "图像动画化", "视频编辑", "特效制作"],
    content: `
## Runway 视频创作

Runway是一个AI驱动的创意视频平台，提供文字生成视频等功能。

### Gen-2功能

- 文字描述生成视频
- 图像转视频动画
- 视频风格转换
- 智能抠像
    `,
  },
];

export const agentTutorials: TutorialItem[] = [
  {
    id: "agent-intro",
    title: "Agent开发入门指南",
    description: "从零开始理解AI Agent的概念、架构设计和核心组件",
    difficulty: "入门",
    duration: "30分钟",
    topics: ["Agent概念", "架构设计", "工具调用"],
    type: "agent",
    updatedAt: "2025-01-28",
    chapters: [
      { title: "什么是AI Agent", duration: "5分钟" },
      { title: "Agent核心组件", duration: "10分钟" },
      { title: "工具调用机制", duration: "10分钟" },
      { title: "实践练习", duration: "5分钟" },
    ],
    content: `
## AI Agent开发入门

### 什么是AI Agent？

AI Agent是一种能够自主感知环境、做出决策并采取行动的智能系统。与传统的LLM应用不同，Agent具有：

- **自主性**：能够独立完成任务
- **工具使用**：可以调用外部工具和API
- **记忆能力**：能够记住上下文和历史信息
- **规划能力**：可以分解复杂任务

### Agent架构组件

\`\`\`
┌─────────────────────────────────────┐
│              AI Agent               │
├──────────┬──────────┬───────────────┤
│   LLM    │  Memory  │    Tools      │
│  (大脑)  │  (记忆)  │   (工具箱)    │
└──────────┴──────────┴───────────────┘
\`\`\`

### 工具调用示例

\`\`\`python
from langchain.agents import Tool

search_tool = Tool(
    name="Search",
    func=search_function,
    description="用于搜索信息"
)
\`\`\`
    `,
  },
  {
    id: "langchain-agent",
    title: "LangChain Agent实战",
    description: "使用LangChain框架构建功能强大的AI Agent应用",
    difficulty: "中级",
    duration: "45分钟",
    topics: ["LangChain", "ReAct", "工具集成"],
    type: "agent",
    updatedAt: "2025-01-27",
    chapters: [
      { title: "LangChain基础", duration: "10分钟" },
      { title: "ReAct模式详解", duration: "15分钟" },
      { title: "自定义工具开发", duration: "15分钟" },
      { title: "项目实战", duration: "5分钟" },
    ],
    content: `
## LangChain Agent实战教程

### ReAct模式

ReAct (Reasoning + Acting) 是一种让Agent边思考边行动的模式：

1. **Thought**：思考当前状态
2. **Action**：选择并执行动作
3. **Observation**：观察执行结果
4. **循环**：直到任务完成

### 代码实现

\`\`\`python
from langchain.agents import create_react_agent
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4")
agent = create_react_agent(llm, tools, prompt)
\`\`\`
    `,
  },
  {
    id: "autogpt-analysis",
    title: "AutoGPT原理解析",
    description: "深入分析AutoGPT的自主决策机制和任务分解策略",
    difficulty: "高级",
    duration: "60分钟",
    topics: ["自主决策", "任务规划", "记忆管理"],
    type: "agent",
    updatedAt: "2025-01-26",
    chapters: [
      { title: "AutoGPT架构", duration: "15分钟" },
      { title: "自主循环机制", duration: "20分钟" },
      { title: "长期记忆设计", duration: "15分钟" },
      { title: "局限性与改进", duration: "10分钟" },
    ],
    content: `
## AutoGPT深度解析

### 自主循环

AutoGPT的核心是一个自主执行循环：

\`\`\`
while not task_complete:
    1. 分析当前状态
    2. 制定行动计划
    3. 选择最佳行动
    4. 执行并获取反馈
    5. 更新记忆
\`\`\`

### 记忆管理

- 短期记忆：当前对话上下文
- 长期记忆：向量数据库存储
- 工作记忆：当前任务状态
    `,
  },
  {
    id: "multi-agent",
    title: "Multi-Agent系统设计",
    description: "学习多Agent协作系统的设计模式和实现方法",
    difficulty: "高级",
    duration: "90分钟",
    topics: ["多Agent", "协作模式", "分布式"],
    type: "agent",
    updatedAt: "2025-01-25",
    chapters: [
      { title: "多Agent架构", duration: "20分钟" },
      { title: "通信协议设计", duration: "25分钟" },
      { title: "协作模式", duration: "25分钟" },
      { title: "实战案例", duration: "20分钟" },
    ],
    content: `
## Multi-Agent系统

### 协作模式

1. **层级模式**：Manager Agent协调Worker Agents
2. **对等模式**：Agents平等协作
3. **竞争模式**：多个Agent提供方案，选择最佳

### 实现框架

- AutoGen (Microsoft)
- CrewAI
- LangGraph
    `,
  },
];

export const ragTutorials: TutorialItem[] = [
  {
    id: "vector-db",
    icon: Database,
    title: "向量数据库基础",
    description: "了解向量数据库的核心概念，学习Pinecone、Weaviate、Milvus等主流方案",
    difficulty: "基础",
    duration: "40分钟",
    topics: ["向量数据库", "Embedding", "相似度搜索"],
    techs: ["Pinecone", "Weaviate", "Milvus"],
    type: "rag",
    updatedAt: "2025-01-28",
    chapters: [
      { title: "向量表示原理", duration: "10分钟" },
      { title: "Embedding模型", duration: "10分钟" },
      { title: "数据库选型", duration: "15分钟" },
      { title: "实践操作", duration: "5分钟" },
    ],
    content: `
## 向量数据库入门

### 什么是向量数据库？

向量数据库专门用于存储和检索高维向量数据，是RAG系统的核心组件。

### Embedding原理

\`\`\`python
from openai import OpenAI

client = OpenAI()
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="Hello World"
)
vector = response.data[0].embedding
\`\`\`

### 主流方案对比

| 数据库 | 特点 | 适用场景 |
|--------|------|----------|
| Pinecone | 托管服务 | 快速上手 |
| Milvus | 开源高性能 | 大规模部署 |
| Weaviate | GraphQL接口 | 灵活查询 |
    `,
  },
  {
    id: "doc-processing",
    icon: FileSearch,
    title: "文档处理与切分",
    description: "掌握文档加载、文本切分策略和元数据提取的最佳实践",
    difficulty: "基础",
    duration: "35分钟",
    topics: ["文档解析", "文本切分", "元数据"],
    techs: ["LangChain", "LlamaIndex", "Unstructured"],
    type: "rag",
    updatedAt: "2025-01-27",
    chapters: [
      { title: "文档加载方法", duration: "10分钟" },
      { title: "切分策略选择", duration: "15分钟" },
      { title: "元数据提取", duration: "10分钟" },
    ],
    content: `
## 文档处理最佳实践

### 文本切分策略

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\\n\\n", "\\n", "。", "，"]
)
\`\`\`

### 切分注意事项

- 保持语义完整性
- 适当的重叠区域
- 保留上下文信息
    `,
  },
  {
    id: "retrieval-optimization",
    icon: Search,
    title: "检索策略优化",
    description: "深入学习混合检索、重排序和查询优化等高级检索技术",
    difficulty: "进阶",
    duration: "50分钟",
    topics: ["混合检索", "重排序", "查询优化"],
    techs: ["Hybrid Search", "Reranking", "Query Expansion"],
    type: "rag",
    updatedAt: "2025-01-26",
    chapters: [
      { title: "检索方法对比", duration: "15分钟" },
      { title: "混合检索实现", duration: "15分钟" },
      { title: "重排序技术", duration: "15分钟" },
      { title: "性能调优", duration: "5分钟" },
    ],
    content: `
## 检索优化技术

### 混合检索

结合关键词检索和语义检索的优势：

\`\`\`python
# BM25 + Vector Search
hybrid_score = alpha * bm25_score + (1-alpha) * vector_score
\`\`\`

### 重排序

使用Cross-encoder对初步结果重新排序：

\`\`\`python
from sentence_transformers import CrossEncoder
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
\`\`\`
    `,
  },
  {
    id: "rag-architecture",
    icon: Workflow,
    title: "RAG系统架构",
    description: "设计生产级RAG系统，包括缓存、监控和性能优化",
    difficulty: "高级",
    duration: "70分钟",
    topics: ["系统设计", "性能优化", "监控"],
    techs: ["系统设计", "性能优化", "生产部署"],
    type: "rag",
    updatedAt: "2025-01-25",
    chapters: [
      { title: "架构设计原则", duration: "20分钟" },
      { title: "缓存策略", duration: "15分钟" },
      { title: "监控与可观测性", duration: "20分钟" },
      { title: "案例分析", duration: "15分钟" },
    ],
    content: `
## 生产级RAG架构

### 系统架构

\`\`\`
用户请求 -> 查询处理 -> 检索层 -> 重排序 -> LLM生成 -> 响应
              ↓           ↓
          查询缓存    结果缓存
\`\`\`

### 性能优化

1. 查询缓存减少重复计算
2. 批量处理提高吞吐
3. 异步处理提升响应
4. 模型量化降低延迟
    `,
  },
];

// 更新资讯时模拟数据刷新
export const refreshContent = () => {
  const now = new Date().toISOString().split('T')[0];
  return {
    knowledge: knowledgeItems.map(item => ({ ...item, updatedAt: now })),
    tools: toolItems.map(item => ({ ...item, updatedAt: now })),
    agentTutorials: agentTutorials.map(item => ({ ...item, updatedAt: now })),
    ragTutorials: ragTutorials.map(item => ({ ...item, updatedAt: now })),
  };
};
