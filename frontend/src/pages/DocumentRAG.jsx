import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { sendChatMessage } from '../services/api';
import { FileText, Search, Sparkles, Loader2, Bot } from 'lucide-react';

export default function DocumentRAG() {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleTestSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    setSearchResult(null);
    try {
      const res = await sendChatMessage({ query: query.trim(), history: [] });
      setSearchResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <FileText className="w-8 h-8 text-cyan-400" />
            Document-Based RAG
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload custom travel guides (PDF or TXT). System embeds content into ChromaDB vector store for semantic retrieval.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload & Index Manager */}
        <div>
          <FileUpload />
        </div>

        {/* Semantic Search Tester */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">Test RAG Vector Search</h3>
                <p className="text-xs text-slate-400">
                  Ask a question to test if ChromaDB retrieves content from uploaded documents
                </p>
              </div>
            </div>

            <form onSubmit={handleTestSearch} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. What does the guide say about train passes?"
                  className="flex-1 glass-input text-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={searching}
                  className="gradient-button px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </button>
              </div>
            </form>

            {searchResult && (
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Search Result
                  </span>
                  {searchResult.rag_used ? (
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-mono">
                      ✓ RAG Knowledge Match Found
                    </span>
                  ) : (
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full font-mono">
                      General Knowledge Response
                    </span>
                  )}
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {searchResult.response}
                </div>

                {searchResult.source_documents && searchResult.source_documents.length > 0 && (
                  <div className="text-[11px] text-cyan-400 bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20 flex items-center gap-2">
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>Attributed Document Source: <strong>{searchResult.source_documents.join(', ')}</strong></span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
