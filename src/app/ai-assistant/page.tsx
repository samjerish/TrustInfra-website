'use client';

import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Bot,
  Send,
  Sparkles,
  Building2,
  Calculator,
  AlertTriangle,
  Clock,
  Lightbulb,
  BarChart3,
  FileText,
  Zap,
  ChevronRight,
  Paperclip,
  Image as ImageIcon,
  Mic,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  Shield,
  Leaf,
  Package,
} from 'lucide-react';

const quickActions = [
  {
    icon: Calculator,
    label: 'Cost Estimation',
    prompt: 'Estimate the total construction cost for my project',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: FileText,
    label: 'Generate BOQ',
    prompt: 'Generate a Bill of Quantities for a 2BHK apartment',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: AlertTriangle,
    label: 'Risk Analysis',
    prompt: 'Analyze potential risks in my current project',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Clock,
    label: 'Timeline Prediction',
    prompt: 'Predict the total construction duration',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: Package,
    label: 'Material Optimization',
    prompt: 'Suggest ways to optimize material usage',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Leaf,
    label: 'Green Building',
    prompt: 'Give green building recommendations for my project',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Shield,
    label: 'Safety Check',
    prompt: 'Provide safety recommendations for current phase',
    color: 'from-red-500 to-rose-600',
  },
  {
    icon: TrendingUp,
    label: 'Budget Optimization',
    prompt: 'How can I optimize the budget without compromising quality?',
    color: 'from-violet-500 to-purple-600',
  },
];

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isTyping?: boolean;
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: `Hello! I'm **Trust Infra AI** — your intelligent construction assistant. 🏗️\n\nI can help you with:\n- 📊 **Cost & Material Estimation**\n- 📋 **BOQ Generation**\n- ⚠️ **Risk Analysis & Delay Prediction**\n- 💰 **Budget Optimization**\n- 🏗️ **Structural Suggestions**\n- 🌿 **Green Building Recommendations**\n- 🔄 **Supplier Comparison**\n\nI have context about your **Green Valley Residency** project. Ask me anything!`,
    timestamp: new Date().toISOString(),
  },
];

const sampleConversation: ChatMessage[] = [
  ...initialMessages,
  {
    id: '2',
    role: 'user',
    content: 'How much cement is required for my Green Valley project?',
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: '3',
    role: 'assistant',
    content: `Based on my analysis of your **Green Valley Residency** project (2,400 sq.ft, G+2 floors), here's the cement estimation:\n\n### 🧱 Cement Requirement Breakdown\n\n| Component | Grade | Quantity (bags) | Cost (₹) |\n|-----------|-------|-----------------|----------|\n| Foundation | OPC 53 | 320 | 1,21,600 |\n| Columns & Beams | OPC 53 | 480 | 1,82,400 |\n| Slab Work | OPC 53 | 560 | 2,12,800 |\n| Brick Work | OPC 43 | 380 | 1,33,000 |\n| Plastering | PPC | 420 | 1,42,800 |\n| Flooring | OPC 43 | 180 | 63,000 |\n| **Total** | | **2,340 bags** | **₹8,55,600** |\n\n### 💡 Recommendations:\n- Consider **PPC cement** for plastering — it's 8% cheaper and better for surface finish\n- Buy in bulk (500+ bags) from **Shree Ultra Dealers** for 5% discount\n- Current market rate: ₹380/bag (OPC 53), ₹350/bag (PPC)\n\n*Confidence: 92% — based on IS 456:2000 standards and your approved floor plans.*`,
    timestamp: new Date(Date.now() - 30000).toISOString(),
  },
  {
    id: '4',
    role: 'user',
    content: 'Compare Dealer A (ABC Steel) and Dealer B (XYZ Steel) for TMT bars',
    timestamp: new Date(Date.now() - 20000).toISOString(),
  },
  {
    id: '5',
    role: 'assistant',
    content: `### 📊 Dealer Comparison: TMT Steel Bars Fe500D\n\n| Parameter | ABC Steel | XYZ Steel | Winner |\n|-----------|-----------|-----------|--------|\n| **Price (12mm)** | ₹72/kg | ₹68/kg | 🏆 XYZ |\n| **Price (16mm)** | ₹74/kg | ₹71/kg | 🏆 XYZ |\n| **Delivery Time** | 2 days | 4 days | 🏆 ABC |\n| **Quality Rating** | 4.8/5 ⭐ | 4.5/5 ⭐ | 🏆 ABC |\n| **Test Certificate** | ISI + NABL | ISI only | 🏆 ABC |\n| **Credit Terms** | 30 days | 15 days | 🏆 ABC |\n| **Min Order** | 500 kg | 1000 kg | 🏆 ABC |\n| **Past Issues** | None | 1 quality complaint | 🏆 ABC |\n\n### 🎯 AI Recommendation:\n**ABC Steel** is the better choice for your project despite being ~5% costlier because:\n1. Superior quality with NABL certification\n2. Faster delivery reduces project delays\n3. Better credit terms improve cash flow\n4. Zero quality complaints in past orders\n\n**Estimated savings with XYZ:** ₹32,000\n**Risk cost of XYZ (potential delays):** ₹85,000\n\n**Net benefit of choosing ABC: ₹53,000** ✅`,
    timestamp: new Date(Date.now() - 10000).toISOString(),
  },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleConversation);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand your question about "${input.slice(0, 50)}..."\n\nBased on your **Green Valley Residency** project data, here's my analysis:\n\n- This requires further evaluation of the current project parameters\n- I'm cross-referencing with IS standards and your approved plans\n- I'll provide detailed recommendations shortly\n\n*Processing with project context from your uploaded documents and BOQ...*\n\n> 💡 **Tip:** For more accurate results, make sure your latest site photos and progress reports are uploaded.`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)] flex-col">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-glow">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-surface-900 dark:text-white">
                AI Smart Assistant
              </h1>
              <p className="flex items-center gap-1 text-xs text-surface-500 dark:text-surface-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Online • Green Valley Residency context loaded
              </p>
            </div>
          </div>
          <button className="btn-ghost text-sm">
            <RotateCcw className="h-4 w-4" /> New Chat
          </button>
        </div>

        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* Chat Area */}
          <div className="premium-card flex flex-1 flex-col overflow-hidden">
            {/* Messages */}
            <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                      msg.role === 'assistant'
                        ? 'gradient-primary'
                        : 'bg-surface-200 dark:bg-surface-700'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <Sparkles className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-xs font-bold text-surface-600 dark:text-surface-300">
                        RK
                      </span>
                    )}
                  </div>
                  <div className={`max-w-[75%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                    <div
                      className={`inline-block rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'rounded-br-md bg-brand-500 text-white'
                          : 'rounded-bl-md bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-200'
                      }`}
                    >
                      <div
                        className="whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                          __html: msg.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(
                              /### (.*)/g,
                              '<h4 class="font-bold text-base mt-3 mb-2">$1</h4>'
                            )
                            .replace(
                              /\| (.*) \|/g,
                              (match) =>
                                `<div class="font-mono text-xs overflow-x-auto">${match}</div>`
                            )
                            .replace(/- (.*)/g, '<li class="ml-4 list-disc">$1</li>')
                            .replace(
                              /> (.*)/g,
                              '<blockquote class="border-l-2 border-brand-500 pl-3 my-2 text-xs opacity-80">$1</blockquote>'
                            )
                            .replace(/\n/g, '<br/>'),
                        }}
                      />
                    </div>
                    {msg.role === 'assistant' && (
                      <div className="ml-1 mt-1.5 flex items-center gap-2">
                        <button className="rounded p-1 text-surface-400 hover:bg-surface-100 hover:text-surface-600 dark:hover:bg-surface-800">
                          <Copy className="h-3 w-3" />
                        </button>
                        <button className="rounded p-1 text-surface-400 hover:bg-surface-100 hover:text-emerald-500 dark:hover:bg-surface-800">
                          <ThumbsUp className="h-3 w-3" />
                        </button>
                        <button className="rounded p-1 text-surface-400 hover:bg-surface-100 hover:text-red-500 dark:hover:bg-surface-800">
                          <ThumbsDown className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-surface-100 px-4 py-3 dark:bg-surface-800">
                    <div className="flex gap-1">
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-surface-400"
                        style={{ animationDelay: '0ms' }}
                      />
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-surface-400"
                        style={{ animationDelay: '150ms' }}
                      />
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-surface-400"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-surface-200 p-4 dark:border-surface-800">
              <div className="flex items-end gap-2">
                <div className="relative flex-1">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask about costs, materials, timelines, risks..."
                    rows={1}
                    className="input-field resize-none pr-24"
                  />
                  <div className="absolute bottom-2 right-2 flex items-center gap-1">
                    <button className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700">
                      <Paperclip className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700">
                      <ImageIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="btn-primary p-3 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-2xs text-surface-400">
                AI responses are estimates based on available project data. Always verify with
                qualified professionals.
              </p>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="hidden w-64 space-y-3 xl:block">
            <p className="px-1 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">
              Quick Actions
            </p>
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="group flex w-full items-center gap-3 rounded-xl border border-surface-200 bg-white p-3 text-left transition-all hover:border-brand-200 dark:border-surface-800 dark:bg-surface-900 dark:hover:border-brand-800"
                >
                  <div
                    className={`h-8 w-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center transition-transform group-hover:scale-110`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-surface-700 dark:text-surface-300">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
