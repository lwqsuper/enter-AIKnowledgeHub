import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase';
import OpenAI from 'openai';

type NewsItem = Database['public']['Tables']['ai_news']['Row'];
type NewNewsItem = Database['public']['Tables']['ai_news']['Insert'];

// Initialize OpenRouter client (using OpenAI SDK)
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return `${window.location.origin}/api/openrouter`;
  return "https://openrouter.ai/api/v1";
};

const kimiClient = new OpenAI({
  apiKey: import.meta.env.VITE_KIMI_API_KEY,
  baseURL: getBaseUrl(), // Use local proxy to avoid CORS
  dangerouslyAllowBrowser: true, // Note: In production, API calls should be server-side
  defaultHeaders: {
    "HTTP-Referer": typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8080', // Required for OpenRouter
    "X-Title": "AIKnowledgeHub", // Optional, for OpenRouter rankings
  }
});

import { toast } from 'sonner';

// Function to process content using Kimi AI
export const processWithKimiAI = async (rawTitle: string, rawContent: string) => {
  try {
    const prompt = `
    请对以下AI资讯内容进行处理，返回一个JSON格式的结果。
    内容标题：${rawTitle}
    内容正文：${rawContent}

    要求：
    1. summary: 生成一段适合初学者阅读的简短摘要（100字以内），通俗易懂。
    2. difficulty_level: 判断难度等级，仅返回 'beginner', 'intermediate', 'advanced' 三者之一。
    3. tags: 提取3-5个关键标签。
    
    返回格式示例：
    {
      "summary": "...",
      "difficulty_level": "beginner",
      "tags": ["tag1", "tag2"]
    }
    `;

    const completion = await kimiClient.chat.completions.create({
      // Check if user is using a "free" API key (like sk-or-...) which might not support specific models
      // or if OpenRouter requires a different model ID for free tier
      model: "openchat/openchat-3.5-128k",
      // Remove reasoning parameter as it's not supported by OpenChat
      messages: [
        { role: "system", content: "你是一个专业的AI资讯编辑，擅长将复杂的技术内容转化为通俗易懂的知识。" },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const resultText = completion.choices[0].message.content;
    if (!resultText) throw new Error("Empty response from Kimi AI");

    const result = JSON.parse(resultText);

    return {
      original_title: rawTitle,
      summary: `[Kimi智能摘要] ${result.summary}`,
      content: rawContent,
      difficulty_level: result.difficulty_level as 'beginner' | 'intermediate' | 'advanced',
      tags: result.tags,
      is_published: true
    };
  } catch (error: any) {
    console.error("Kimi AI processing failed:", error);
    
    // Check for Rate Limit (Insufficient Balance)
    if (error?.status === 429 || error?.code === 'rate_limit_exceeded' || error?.message?.includes('429')) {
      toast.error('API 余额不足，已自动切换为本地模拟模式', {
        duration: 5000,
      });
    } else if (error?.status === 402 || error?.code === 'insufficient_quota' || error?.message?.includes('402')) {
      toast.error('API 余额不足 (402)，已自动切换为本地模拟模式', {
        duration: 5000,
      });
    } else if (error?.status === 400 || error?.code === 'BadRequestError') {
      toast.error(`模型请求错误: ${error.message}，已切换为本地模拟模式`, {
        duration: 5000,
      });
    } else {
      toast.warning(`AI 服务异常 (${error.status || 'unknown'})，已切换为本地模拟模式`);
    }

    // Fallback to simple processing if AI fails
    return simulateAIProcessing(rawTitle, rawContent);
  }
};

// Fallback function (original simulation)
export const simulateAIProcessing = (rawTitle: string, rawContent: string) => {
  const summary = rawContent.length > 100 
    ? rawContent.substring(0, 97) + '...' 
    : rawContent;
  
  let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
  const advancedKeywords = ['transformer', 'backpropagation', 'gradient', 'quantization', 'lora'];
  const intermediateKeywords = ['api', 'deployment', 'fine-tuning', 'rag'];
  
  const lowerContent = rawContent.toLowerCase();
  if (advancedKeywords.some(k => lowerContent.includes(k))) {
    difficulty = 'advanced';
  } else if (intermediateKeywords.some(k => lowerContent.includes(k))) {
    difficulty = 'intermediate';
  }

  return {
    original_title: rawTitle,
    summary: `[本地摘要] ${summary}`,
    content: rawContent,
    difficulty_level: difficulty,
    tags: ['AI', 'Tech', difficulty],
    is_published: true
  };
};

export const newsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('ai_news')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async fetchLatestNews() {
    // MOCK: Still simulating fetching from an external source
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockExternalData = [
      {
        title: "DeepSeek开源MoE模型技术详解",
        content: "DeepSeek团队最新开源了其混合专家模型（Mixture-of-Experts, MoE）的详细技术报告。报告深入探讨了如何在保持高性能的同时大幅降低推理成本。通过创新的负载均衡策略和专家路由算法，DeepSeek MoE在多个基准测试中超越了同量级的LLaMA模型。这对于资源受限的开发者来说是一个重大利好，意味着可以在消费级显卡上运行更强大的模型。",
        url: "https://example.com/deepseek-moe"
      },
      {
        title: "Python 3.13 发布，移除 GIL 迈出重要一步",
        content: "Python 3.13 正式发布，最引人注目的特性是实验性地支持移除全局解释器锁（GIL）。这将允许 Python 真正利用多核处理器的能力，大幅提升多线程程序的性能。这对于AI数据处理 pipeline 和高并发服务来说是一个巨大的性能提升机会。",
        url: "https://example.com/python-313"
      },
      {
        title: "如何使用 Prompt 优化你的简历",
        content: "还在为写简历发愁吗？本文教你如何使用 ChatGPT 或 Claude 来优化你的简历。通过提供具体的 Prompt 模板，你可以让 AI 帮你润色工作经历、提炼核心技能，甚至模拟面试官进行模拟面试。适合所有正在求职的毕业生和转行者。",
        url: "https://example.com/resume-prompt"
      }
    ];

    // Process each item using Kimi AI
    // Using Promise.all to process in parallel
    const processedItems = await Promise.all(mockExternalData.map(async (item) => {
      const processed = await processWithKimiAI(item.title, item.content);
      return {
        ...processed,
        source_url: item.url
      };
    }));

    // Save to Supabase
    const { data, error } = await supabase
      .from('ai_news')
      .insert(processedItems)
      .select();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('ai_news')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
