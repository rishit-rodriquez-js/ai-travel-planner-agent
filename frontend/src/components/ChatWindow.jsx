import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, FileText, Loader2, Cpu } from 'lucide-react';

export default function ChatWindow({ messages = [], onSendMessage, isLoading, currentSteps = [] }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const samplePrompts = [
    "What are top cultural etiquette tips for visiting Japan?",
    "What should I pack for a 5-day summer trip to Europe?",
    "Tell me about public transport and safety in Singapore.",
    "What does my uploaded travel PDF say about local street food?"
  ];

  return (
    <div className="flex flex-col h-[650px] glass-card border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">AI Travel Assistant</h3>
            <span className="text-[11px] text-cyan-400 font-medium">Powered by LangGraph & RAG Vector Search</span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 border border-cyan-500/20">
              <Sparkles className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-200 mb-1">How can I assist your travels?</h4>
            <p className="text-xs text-slate-400 max-w-sm mb-6">
              Ask about tourist attractions, packing advice, local food, culture, safety, or query uploaded travel documents!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl text-left">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onSendMessage(prompt)}
                  className="text-xs text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 p-3 rounded-xl transition-all hover:border-cyan-500/30 text-left"
                >
                  💡 "{prompt}"
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={index}
                className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gradient-to-tr from-cyan-500 to-sky-600 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[80%] space-y-2`}>
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-wrap'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* RAG Source Indicator */}
                  {msg.rag_used && msg.source_documents && (
                    <div className="flex items-center gap-1.5 text-[11px] text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20 w-fit">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Retrieved from: <strong>{msg.source_documents.join(', ')}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}

        {isLoading && (
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-900 border border-slate-800 text-slate-400 text-xs px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>LangGraph agent processing query & fetching tools...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-4 bg-slate-900/90 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your destination or uploaded guides..."
            className="flex-1 glass-input py-2.5 text-sm"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="gradient-button p-3 rounded-xl disabled:opacity-50 flex items-center justify-center shrink-0"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </div>
  );
}
