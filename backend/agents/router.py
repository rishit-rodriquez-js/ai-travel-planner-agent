from typing import Tuple, List

def classify_intent(query: str) -> str:
    q = query.lower()
    
    # Planner intent
    if any(k in q for k in ["plan", "itinerary", "days", "budget", "schedule", "trip to", "tour"]):
        return "planner"
        
    # Weather intent
    if any(k in q for k in ["weather", "temperature", "rain", "forecast", "climate", "hot", "cold"]):
        return "weather"
        
    # Country / Destination info intent
    if any(k in q for k in ["capital", "population", "currency", "language", "timezone", "country details", "flag"]):
        return "country"
        
    # RAG / Document intent
    if any(k in q for k in ["pdf", "guide", "document", "uploaded", "file", "textbook"]):
        return "rag"
        
    return "chat"
