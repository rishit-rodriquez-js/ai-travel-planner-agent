from fastapi import APIRouter, HTTPException
from models.schemas import ChatRequest, ChatResponse
from agents.graph_agent import process_agent_chat

router = APIRouter(prefix="/api/chat", tags=["Chat"])

@router.post("", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    try:
        response_text, rag_used, sources, steps = await process_agent_chat(req.query, req.history)
        return ChatResponse(
            response=response_text,
            rag_used=rag_used,
            source_documents=sources,
            execution_steps=steps
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
