import React from 'react';
import { NavLink } from 'react-router-dom';
import { Plane, Bot, FileText, Globe, Sparkles, ArrowRight, ShieldCheck, Cpu, Zap } from 'lucide-react';

export default function Home() {
  const features = [
    {
      title: 'AI Travel Planner',
      desc: 'Generate complete day-by-day itineraries with timeline cards, estimated budget breakdowns, attractions & dining tips.',
      path: '/planner',
      icon: Plane,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'AI Chat Assistant',
      desc: 'Conversational assistant powered by LangGraph to answer follow-up queries on safety, culture, transit & packing.',
      path: '/chat',
      icon: Bot,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      title: 'Document-Based RAG',
      desc: 'Upload custom PDF or TXT travel guides. Embed into ChromaDB to query relevant document knowledge with source attribution.',
      path: '/documents',
      icon: FileText,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Live Destination Info',
      desc: 'Real-time weather telemetry and country metadata via REST Countries and OpenWeather APIs.',
      path: '/destination',
      icon: Globe,
      color: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>Next-Gen Agentic AI Travel System</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Smart Travel Planning, Powered by{' '}
          <span className="gradient-text">LangGraph & RAG</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          An end-to-end intelligent travel agent combining Generative AI, ChromaDB semantic vector retrieval, live weather telemetry, and real-time reasoning visualization.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <NavLink
            to="/planner"
            className="gradient-button px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2"
          >
            <span>Start Travel Planner</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
          <NavLink
            to="/chat"
            className="glass-card hover:bg-slate-800/80 px-8 py-3.5 rounded-2xl font-bold text-sm text-slate-200 border-slate-700 flex items-center gap-2 transition-colors"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Chat Assistant</span>
          </NavLink>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <NavLink
              key={i}
              to={f.path}
              className="glass-card glass-card-hover p-6 border-slate-800 flex flex-col justify-between group"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>

              <div className="pt-6 flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Explore Feature</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </NavLink>
          );
        })}
      </section>

      {/* Tech Architecture Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-card p-8 border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> LangGraph Autonomous Workflow
              </span>
              <h2 className="text-2xl font-bold text-slate-100">
                Automatic Intent Classification & Multi-Tool Routing
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Queries are processed through an autonomous LangGraph agent node. Depending on intent, execution routes dynamically between Document RAG, Live Weather, Country Meta APIs, or OpenAI GPT-4o-mini synthesis.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs w-full lg:w-auto">
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>FastAPI Backend</span>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-slate-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>ChromaDB Vector Store</span>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-slate-300 flex items-center gap-2">
                <Bot className="w-4 h-4 text-indigo-400" />
                <span>OpenAI / LangChain</span>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-slate-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>REST & Weather APIs</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
