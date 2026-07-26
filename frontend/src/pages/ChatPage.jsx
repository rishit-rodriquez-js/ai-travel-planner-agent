import React, { useState } from 'react';
import { sendChatMessage } from '../services/api';
import ChatWindow from '../components/ChatWindow';
import AgentActivityPanel from '../components/AgentActivityPanel';
import { Bot, Sparkles } from 'lucide-react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [latestSteps, setLatestSteps] = useState([]);

  const handleSendMessage = async (userQuery) => {
    const userMsg = { role: 'user', content: userQuery };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    // Initial reasoning step
    setLatestSteps(["✓ Query Received", "✓ Intent Classifier Routing..."]);

    try {
      // Build history payload
      const historyPayload = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await sendChatMessage({
        query: userQuery,
        history: historyPayload,
      });

      const assistantMsg = {
        role: 'assistant',
        content: res.response,
        rag_used: res.rag_used,
        source_documents: res.source_documents,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setLatestSteps(res.execution_steps || []);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, an error occurred while processing your request. Please ensure the backend is running.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-6 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Bot className="w-8 h-8 text-cyan-400" />
            AI Travel Assistant
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ask follow-up travel questions. Automatically retrieves knowledge from uploaded guides or live weather/country APIs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            currentSteps={latestSteps}
          />
        </div>

        <div className="space-y-6">
          <AgentActivityPanel steps={latestSteps} title="Agent Execution Flow" />

          <div className="glass-card p-5 border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Capabilities
            </h4>
            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
              <li><strong>LangGraph Router:</strong> Auto-detects tool intent (Weather, Country Stats, RAG).</li>
              <li><strong>RAG Attribution:</strong> Cites uploaded PDF/TXT files when using document knowledge.</li>
              <li><strong>Conversation Memory:</strong> Preserves session context across follow-ups.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
