import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Database } from 'lucide-react';
import { uploadRAGDocument, fetchRAGDocuments } from '../services/api';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  const loadDocs = async () => {
    setLoadingDocs(true);
    try {
      const res = await fetchRAGDocuments();
      setDocuments(res.documents || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingDocs(false);
    }
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await uploadRAGDocument(formData);
      setStatus({ type: 'success', message: res.message });
      setFile(null);
      loadDocs();
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.detail || 'Failed to upload document. Please check file format.'
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Box */}
      <div className="glass-card p-6 border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Upload Travel Guide (PDF or TXT)</h3>
            <p className="text-xs text-slate-400">
              Chunked & embedded into ChromaDB Vector Store for RAG-enhanced query answering
            </p>
          </div>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 text-center bg-slate-950/40 transition-colors cursor-pointer relative">
            <input
              type="file"
              accept=".pdf,.txt,.md"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <FileText className="w-10 h-10 mx-auto mb-2 text-cyan-400 opacity-80" />
            <p className="text-sm font-medium text-slate-200">
              {file ? file.name : "Click or drag & drop travel guide file (.pdf, .txt)"}
            </p>
            <span className="text-[11px] text-slate-500 block mt-1">Maximum recommended file size: 10MB</span>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!file || uploading}
              className="gradient-button px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Embedding Document...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload & Index RAG
                </>
              )}
            </button>
          </div>
        </form>

        {status && (
          <div
            className={`mt-4 p-4 rounded-xl text-xs flex items-center gap-2 border ${
              status.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{status.message}</span>
          </div>
        )}
      </div>

      {/* Indexed Documents List */}
      <div className="glass-card p-6 border-slate-800">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              ChromaDB Indexed Documents ({documents.length})
            </h4>
          </div>
          {loadingDocs && <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />}
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">
            No documents uploaded yet. Upload a PDF/TXT guide above to enable document semantic search!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs font-medium text-slate-200 truncate">{doc.source}</span>
                </div>
                <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-md border border-cyan-500/20 shrink-0">
                  {doc.chunks} Chunks
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
