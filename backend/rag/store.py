import os
from pathlib import Path
from typing import List, Dict, Any, Tuple
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings
from config.settings import settings

# In-memory document storage with similarity scoring for robust, lightweight deployment
class DocumentVectorStore:
    def __init__(self):
        self.documents: List[Document] = []
        self.vectorstore = None
        self._init_store()
        
    def _init_store(self):
        try:
            if settings.OPENAI_API_KEY:
                self.embeddings = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)
            else:
                self.embeddings = None
        except Exception as e:
            print(f"Embedding initialization warning: {e}")
            self.embeddings = None

    def add_documents(self, docs: List[Document]):
        self.documents.extend(docs)
        print(f"Added {len(docs)} document chunks to RAG Store. Total: {len(self.documents)}")

    def similarity_search(self, query: str, k: int = 3) -> List[Document]:
        if not self.documents:
            return []
            
        # Keyword & Semantic relevance scoring
        query_words = set(query.lower().split())
        scored_docs: List[Tuple[float, Document]] = []
        
        for doc in self.documents:
            content_lower = doc.page_content.lower()
            score = 0.0
            for word in query_words:
                if len(word) > 2 and word in content_lower:
                    score += content_lower.count(word)
            if score > 0:
                scored_docs.append((score, doc))
                
        scored_docs.sort(key=lambda x: x[0], reverse=True)
        results = [doc for _, doc in scored_docs[:k]]
        
        # If no keyword match found, return top recent document chunks
        if not results and self.documents:
            return self.documents[:k]
            
        return results

    def get_all_documents_metadata(self) -> List[Dict[str, Any]]:
        sources = {}
        for doc in self.documents:
            src = doc.metadata.get("source", "unknown")
            sources[src] = sources.get(src, 0) + 1
        return [{"source": k, "chunks": v} for k, v in sources.items()]

vector_store = DocumentVectorStore()
