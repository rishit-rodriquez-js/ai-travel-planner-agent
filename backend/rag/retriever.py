from typing import Tuple, List
from rag.store import vector_store
from langchain_core.documents import Document
from langsmith import traceable

@traceable(name="retrieve_context_for_query")
def retrieve_context_for_query(query: str) -> Tuple[str, bool, List[str]]:
    docs: List[Document] = vector_store.similarity_search(query, k=3)
    if not docs:
        return "", False, []
        
    context_chunks = []
    sources = set()
    for d in docs:
        src = d.metadata.get("source", "Uploaded Document")
        sources.add(src)
        context_chunks.append(f"--- Document Source: {src} ---\n{d.page_content}")
        
    full_context = "\n\n".join(context_chunks)
    return full_context, True, list(sources)
