import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.settings import settings
from routes.planner import router as planner_router
from routes.chat import router as chat_router
from routes.rag import router as rag_router
from routes.destination import router as destination_router

app = FastAPI(
    title="AI Travel Planner Agent API",
    description="Full-stack Agentic AI travel assistant API with LangGraph, LangChain, RAG, OpenWeather, and REST Countries.",
    version="1.0.0"
)

# CORS Middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(planner_router)
app.include_router(chat_router)
app.include_router(rag_router)
app.include_router(destination_router)

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "AI Travel Planner Agent API",
        "openai_key_configured": bool(settings.OPENAI_API_KEY)
    }

if __name__ == "__main__":
    uvicorn.run("app:app", host=settings.HOST, port=settings.PORT, reload=True)
