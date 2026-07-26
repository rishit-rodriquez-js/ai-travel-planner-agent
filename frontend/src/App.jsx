import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TravelPlanner from './pages/TravelPlanner';
import ChatPage from './pages/ChatPage';
import DocumentRAG from './pages/DocumentRAG';
import DestinationInfo from './pages/DestinationInfo';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<TravelPlanner />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/documents" element={<DocumentRAG />} />
            <Route path="/destination" element={<DestinationInfo />} />
          </Routes>
        </main>

        <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>© 2026 AI Travel Planner Agent. Built with LangGraph, LangChain, RAG & FastAPI.</span>
            <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
              <span>FastAPI Port: 8000</span>
              <span>•</span>
              <span>React Port: 5173</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
