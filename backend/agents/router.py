from langsmith import traceable

@traceable(name="classify_intent")
def classify_intent(query: str) -> str:
    q = query.lower()

    # Planner
    if any(k in q for k in [
        "plan", "itinerary", "days", "budget",
        "schedule", "trip", "travel",
        "vacation", "holiday", "tour"
    ]):
        return "planner"

    # Weather
    if any(k in q for k in [
        "weather", "temperature", "rain",
        "forecast", "climate", "hot", "cold"
    ]):
        return "weather"

    # Country
    if any(k in q for k in [
        "capital", "population", "currency",
        "language", "timezone",
        "flag", "country"
    ]):
        return "country"

    # RAG
    if any(k in q for k in [
        "pdf", "guide", "document",
        "uploaded", "file"
    ]):
        return "rag"

    # Travel Chat
    if any(k in q for k in [
        "hotel",
        "restaurant",
        "food",
        "transport",
        "visa",
        "passport",
        "airport",
        "flight",
        "tourist",
        "destination",
        "museum",
        "beach",
        "packing",
        "culture"
    ]):
        return "chat"

    # Everything else
    return "other"
