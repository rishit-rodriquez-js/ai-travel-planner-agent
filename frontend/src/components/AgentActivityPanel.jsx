import React from 'react';
import { Activity, CheckCircle2, Cpu, Sparkles } from 'lucide-react';

export default function AgentActivityPanel({ steps = [], title = "Agent Reasoning Trace" }) {
  if (!steps || steps.length === 0) {
    return (
      <div className="glass-card p-4 text-center text-slate-500 text-xs">
        <Activity className="w-5 h-5 mx-auto mb-1 text-slate-600 animate-pulse" />
        Agent idle. Submit a query or plan to view live execution graph steps.
      </div>
    );
  }

  return (
    <div className="glass-card p-5 border-cyan-500/20 shadow-cyan-500/5">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">{title}</h4>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-mono">
          <Sparkles className="w-3 h-3" /> Real-time LangGraph
        </span>
      </div>

      <div className="space-y-2">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 text-xs font-mono text-slate-300 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
