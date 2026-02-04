import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, X, Send, Loader2, Sparkles, Bot } from 'lucide-react';
import { chatService, ChatMessage } from '@/services/chatService';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

const DigitalAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // 初始化欢迎语
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: '你好！我是**华如锦**的数字分身。\n\n我对 **AI编程实践**、**痛点挖掘** 和 **产品落地** 颇有心得。你可以问我关于 **ERP AI系统**、**JSON工具** 或我的 **学习路径** 的问题，我会尽力结合我的真实实践为你解答！',
          createdAt: Date.now()
        }
      ]);
    }
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isOpen]);

  // 聚焦输入框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      createdAt: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await chatService.sendMessage(userMessage.content);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        createdAt: Date.now()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "发送失败",
        description: "数字分身暂时无法连接，请稍后再试。",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* 聊天窗口 */}
      <div 
        className={cn(
          "mb-4 w-[350px] md:w-[400px] transition-all duration-300 ease-in-out origin-bottom-right shadow-2xl rounded-xl overflow-hidden border border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4 pointer-events-none h-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary/5">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Avatar className="h-8 w-8 border border-primary/20">
                <AvatarImage src="/avatar-placeholder.png" />
                <AvatarFallback className="bg-primary/10 text-primary">华</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background"></span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">华如锦</h3>
              <p className="text-xs text-muted-foreground flex items-center">
                <Sparkles className="w-3 h-3 mr-1 text-yellow-500" /> 数字分身在线
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2 max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                  {msg.role === 'assistant' ? (
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">华</AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">Me</AvatarFallback>
                  )}
                </Avatar>
                <div
                  className={cn(
                    "rounded-lg p-3 text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted/80 text-foreground border border-border/50"
                  )}
                >
                  <div className="whitespace-pre-wrap markdown-body">
                    {/* 简单的 Markdown 渲染处理: 加粗 */}
                    {msg.content.split(/(\*\*.*?\*\*)/).map((part, i) => 
                      part.startsWith('**') && part.endsWith('**') ? (
                        <strong key={i}>{part.slice(2, -2)}</strong>
                      ) : (
                        part
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 mr-auto max-w-[85%]">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">华</AvatarFallback>
                </Avatar>
                <div className="bg-muted/50 rounded-lg p-3 flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground ml-2">思考中...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-3 border-t bg-background/50 flex gap-2">
          <Input
            ref={inputRef}
            placeholder="问我关于AI编程的问题..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-background/50 focus-visible:ring-primary/20"
            disabled={isLoading}
          />
          <Button 
            size="icon" 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            className={cn("transition-all", input.trim() ? "bg-primary" : "bg-muted text-muted-foreground")}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 悬浮按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative group flex items-center justify-center w-14 h-14 rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 active:scale-95",
          isOpen ? "bg-muted text-foreground rotate-90 rounded-full" : "bg-gradient-to-br from-primary to-blue-600 text-white"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-300 -rotate-90" />
        ) : (
          <>
            <Bot className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-background"></span>
          </>
        )}
        
        {/* 悬浮提示 */}
        {!isOpen && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-popover text-popover-foreground text-xs font-medium rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border">
            点击对话数字分身
          </div>
        )}
      </button>
    </div>
  );
};

export default DigitalAvatar;
