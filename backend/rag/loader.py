import os
from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from typing import List

TEMP_UPLOAD_DIR = Path(__file__).resolve().parent.parent / "uploads"
TEMP_UPLOAD_DIR.mkdir(exist_ok=True)

def process_and_split_file(file_bytes: bytes, filename: str) -> List[Document]:
    save_path = TEMP_UPLOAD_DIR / filename
    with open(save_path, "wb") as f:
        f.write(file_bytes)
        
    ext = save_path.suffix.lower()
    documents = []
    
    if ext == ".pdf":
        loader = PyPDFLoader(str(save_path))
        documents = loader.load()
    elif ext in [".txt", ".md"]:
        loader = TextLoader(str(save_path), encoding="utf-8")
        documents = loader.load()
    else:
        text = file_bytes.decode("utf-8", errors="ignore")
        documents = [Document(page_content=text, metadata={"source": filename})]

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150
    )
    
    chunks = text_splitter.split_documents(documents)
    for c in chunks:
        c.metadata["source"] = filename
    return chunks
