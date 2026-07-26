import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Plane, Bot, FileText, Globe, Cpu } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { path: '/', label: 'Home', icon: Compass },
    { path: '/planner', label: 'Travel Planner', icon: Plane },
    { path: '/chat', label: 'AI Chat Assistant', icon: Bot },
    { path: '/documents', label: 'Upload Documents (RAG)', icon: FileText },
    { path: '/destination', label: 'Live Info', icon: Globe },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight gradient-text">
                AI Travel Planner
              </span>
              <span className="block text-[10px] font-semibold tracking-widest uppercase text-cyan-400">
                LangGraph & RAG Agent
              </span>
            </div>
          </NavLink>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Agent Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[11px]">LangGraph Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}
