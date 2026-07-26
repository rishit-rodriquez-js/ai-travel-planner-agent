from fastapi import APIRouter, UploadFile, File, HTTPException
from models.schemas import DocumentUploadResponse
from rag.loader import process_and_split_file
from rag.store import vector_store

router = APIRouter(prefix="/api/rag", tags=["RAG"])

@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        chunks = process_and_split_file(contents, file.filename)
        vector_store.add_documents(chunks)
        return DocumentUploadResponse(
            filename=file.filename,
            chunks_created=len(chunks),
            message=f"Successfully processed '{file.filename}' into {len(chunks)} searchable chunks in ChromaDB RAG store."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process file: {str(e)}")

@router.get("/documents")
async def list_documents():
    return {"documents": vector_store.get_all_documents_metadata()}
