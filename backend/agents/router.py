from langsmith import traceable


@traceable(name="classify_intent")
def classify_intent(query: str) -> str:
    q = query.lower().strip()

    # Weather
    if any(k in q for k in [
        "weather",
        "temperature",
        "forecast",
        "rain",
        "snow",
        "humidity",
        "wind",
        "climate",
        "hot",
        "cold"
    ]):
        return "weather"

    # Planner
    if any(k in q for k in [
        "plan",
        "planning",
        "trip",
        "travel",
        "vacation",
        "holiday",
        "tour",
        "itinerary",
        "days",
        "budget",
        "schedule",
        "pack",
        "packing"
    ]):
        return "planner"

    # Country / Destination
    if any(k in q for k in [
        "country",
        "city",
        "capital",
        "currency",
        "population",
        "language",
        "timezone",
        "flag",
        "where",
        "located",
        "location",
        "destination",
        "tourist",
        "tourism",
        "museum",
        "monument",
        "beach",
        "mountain",
        "culture",
        "history",
        "restaurant",
        "food",
        "hotel",
        "airport",
        "flight",
        "transport",
        "visa",
        "passport",
        "safe",
        "famous",
        "best city",
        "best place",
        "attractions"
    ]):
        return "country"

    # Uploaded documents (RAG)
    if any(k in q for k in [
        "pdf",
        "document",
        "guide",
        "uploaded",
        "file"
    ]):
        return "rag"

    # Default
    return "chat"
