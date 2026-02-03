import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase';
import OpenAI from 'openai';

type NewsItem = Database['public']['Tables']['ai_news']['Row'];
type NewNewsItem = Database['public']['Tables']['ai_news']['Insert'];

// Initialize Aliyun client (using OpenAI SDK compatible mode)
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return `${window.location.origin}/api/aliyun`;
  return "https://dashscope.aliyuncs.com/compatible-mode/v1";
};

const aliyunClient = new OpenAI({
  apiKey: import.meta.env.VITE_KIMI_API_KEY,
  baseURL: getBaseUrl(),
  dangerouslyAllowBrowser: true,
});

import { toast } from 'sonner';

// Function to process content using Aliyun AI
export const processWithAliyunAI = async (rawTitle: string, rawContent: string) => {
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

    const completion = await aliyunClient.chat.completions.create({
      model: "qwen-max",
      messages: [
        { role: "system", content: "你是一个专业的AI资讯编辑，擅长将复杂的技术内容转化为通俗易懂的知识。" },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const resultText = completion.choices[0].message.content;
    if (!resultText) throw new Error("Empty response from Aliyun AI");

    const result = JSON.parse(resultText);

    return {
      original_title: rawTitle,
      summary: `[智能摘要] ${result.summary}`,
      content: rawContent,
      difficulty_level: result.difficulty_level as 'beginner' | 'intermediate' | 'advanced',
      tags: result.tags,
      is_published: true
    };
  } catch (error: any) {
    console.error("Aliyun AI processing failed:", error);
    
    // Check for specific Aliyun errors if needed
    if (error?.status === 402 || error?.code === 'insufficient_quota') {
      toast.error('API 余额不足，已自动切换为本地模拟模式', {
        duration: 5000,
      });
    } else {
      toast.warning(`AI 服务异常 (${error.status || error.message || 'unknown'})，已切换为本地模拟模式`);
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
  async getById(id: string) {
    const { data, error } = await supabase
      .from('ai_news')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('ai_news')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async fetchLatestNews() {
    try {
      // 1. Fetch from RSS feeds
      const RSS_FEEDS = [
        // TechCrunch AI
        'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.feedburner.com%2FTechCrunch%2FArtificialIntelligence',
        // The Verge AI
        'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.theverge.com%2Frss%2Fartificial-intelligence%2Findex.xml',
        // MIT Technology Review (using a proxy if needed, or try direct via rss2json)
        'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.technologyreview.com%2Ftopic%2Fartificial-intelligence%2Ffeed',
      ];

      // Fetch all feeds in parallel
      const feedPromises = RSS_FEEDS.map(url => fetch(url).then(res => res.json()).catch(err => null));
      const feeds = await Promise.all(feedPromises);

      // Aggregate items
      let allItems: any[] = [];
      feeds.forEach((feed: any) => {
        if (feed && feed.status === 'ok' && Array.isArray(feed.items)) {
          allItems = [...allItems, ...feed.items];
        }
      });

      // Filter and take top 20 most recent
      allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
      const topItems = allItems.slice(0, 20);

      if (topItems.length === 0) throw new Error("No RSS items fetched");

      // 2. Prepare prompt for Qwen-Plus
      // Only send titles and descriptions to LLM to save tokens and avoid full text processing
      const itemsText = topItems.map((item, index) => `
        Item ${index + 1}:
        Title: ${item.title}
        Link: ${item.link}
        Description: ${item.description || item.content.substring(0, 200)}...
      `).join('\n---\n');

      const searchPrompt = `
      Here are the latest AI news items fetched from RSS feeds:
      ${itemsText}

      Please process ALL ${topItems.length} items. Do NOT filter them.
      For each item, generate:
      1. A translated title in Chinese (title_zh).
      2. A short summary in Chinese (translated from the description).
      3. Difficulty level ('beginner', 'intermediate', 'advanced').
      4. 3-5 tags.

      Return a STRICT JSON array where each item corresponds to the input items in the same order.
      
      Example format:
      [
        {
          "title_zh": "...",
          "summary": "...",
          "difficulty_level": "beginner",
          "tags": ["AI", "Tech"]
        }
      ]
      `;

      // 3. Call Qwen-Plus to process metadata
      const completion = await aliyunClient.chat.completions.create({
        model: "qwen-max", 
        messages: [
          { role: "system", content: "You are an expert AI news editor. You are helpful and strict with JSON output." },
          { role: "user", content: searchPrompt }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      });

      const resultText = completion.choices[0].message.content;
      if (!resultText) throw new Error("Empty response from Aliyun Qwen");

      // Parse the JSON response
      const jsonStr = resultText.replace(/```json\n?|\n?```/g, '').trim();
      let metaDataItems;
      try {
        metaDataItems = JSON.parse(jsonStr);
      } catch (e) {
        console.error("JSON parse failed, raw content:", resultText);
        throw new Error("Invalid JSON format from Aliyun Qwen");
      }

      if (!Array.isArray(metaDataItems)) throw new Error("Invalid JSON format from Aliyun Qwen (not an array)");

      // Map to our DB format, merging original content with generated metadata
      const processedItems = topItems.map((item: any, index: number) => {
        const meta = metaDataItems[index] || {};
        return {
          original_title: meta.title_zh || item.title, // Use translated title if available
          // Use generated summary, fallback to truncated description
          summary: meta.summary ? `[RSS] ${meta.summary}` : `[RSS] ${item.title}`, 
          // Store FULL original content
          content: item.content || item.description || "No content available",
          difficulty_level: meta.difficulty_level || 'beginner',
          source_url: item.link,
          tags: meta.tags || ['AI', 'News'],
          is_published: true
        };
      });

      // Save to Supabase
      const { data, error } = await supabase
        .from('ai_news')
        .insert(processedItems)
        .select();

      if (error) throw error;
      return data;

    } catch (error: any) {
      console.error("Failed to fetch real news:", error);
      
      toast.warning(`获取实时新闻失败 (${error.message})，已切换回模拟数据。请检查网络或 API Key。`);

      // Fallback to MOCK data if real fetching fails
      // MOCK: Still simulating fetching from an external source
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Use full content directly instead of external URLs
      const mockExternalData = [
        {
          title: "DeepSeek开源MoE模型技术详解",
          content: "DeepSeek团队最新开源了其混合专家模型（Mixture-of-Experts, MoE）的详细技术报告。报告深入探讨了如何在保持高性能的同时大幅降低推理成本。通过创新的负载均衡策略和专家路由算法，DeepSeek MoE在多个基准测试中超越了同量级的LLaMA模型。这对于资源受限的开发者来说是一个重大利好，意味着可以在消费级显卡上运行更强大的模型。此外，报告还详细介绍了训练过程中的数据配比和超参数设置，为社区复现提供了宝贵的参考。",
          // Use a local identifier or leave empty if we display content directly
          url: "#local-content" 
        },
        {
          title: "Python 3.13 发布，移除 GIL 迈出重要一步",
          content: "Python 3.13 正式发布，最引人注目的特性是实验性地支持移除全局解释器锁（GIL）。这将允许 Python 真正利用多核处理器的能力，大幅提升多线程程序的性能。这对于AI数据处理 pipeline 和高并发服务来说是一个巨大的性能提升机会。除了移除 GIL，新版本还改进了错误提示，优化了解释器性能，并移除了一些过时的标准库模块。开发者可以通过新的编译选项启用自由线程模式进行测试。",
          url: "#local-content"
        },
        {
          title: "如何使用 Prompt 优化你的简历",
          content: "还在为写简历发愁吗？本文教你如何使用 ChatGPT 或 Claude 来优化你的简历。通过提供具体的 Prompt 模板，你可以让 AI 帮你润色工作经历、提炼核心技能，甚至模拟面试官进行模拟面试。适合所有正在求职的毕业生和转行者。例如，你可以使用 STAR 法则（Situation, Task, Action, Result）来引导 AI 重写你的项目经历，使其更具说服力。同时，文章还警告了过度依赖 AI 可能带来的同质化风险，建议结合个人独特经历进行修改。",
          url: "#local-content"
        }
      ];

      // Process each item using Kimi AI (or just fallback processing)
      const processedItems = await Promise.all(mockExternalData.map(async (item) => {
         // Fallback to local processing if API is down/no credits
         return {
            original_title: item.title,
            summary: `[本地模拟] ${item.content.substring(0, 50)}...`,
            content: item.content,
            difficulty_level: 'beginner',
            tags: ['AI', 'Tech'],
            is_published: true,
            source_url: item.url
         };
      }));

      // Save to Supabase
      const { data, error: dbError } = await supabase
        .from('ai_news')
        .insert(processedItems)
        .select();

      if (dbError) throw dbError;
      return data;
    }
  },

  async update(id: string, updates: Partial<NewsItem>) {
    const { error } = await supabase
      .from('ai_news')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('ai_news')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async translateText(text: string) {
    try {
      const completion = await aliyunClient.chat.completions.create({
        model: "qwen-max",
        messages: [
          { 
            role: "system", 
            content: "You are a professional translator. Translate the following text to Chinese. Preserve all Markdown formatting, links, and structure. Do not add any explanations." 
          },
          { role: "user", content: text }
        ],
        temperature: 0.3,
      });

      const translatedText = completion.choices[0].message.content;
      if (!translatedText) throw new Error("Empty translation response");
      
      return translatedText;
    } catch (error: any) {
      console.error("Translation failed:", error);
      throw error;
    }
  }
};
