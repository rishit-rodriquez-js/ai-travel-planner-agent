from langsmith import traceable

@traceable(name="classify_intent")
def classify_intent(query: str) -> str:
    q = query.lower().strip()

    # --------------------
    # Weather
    # --------------------
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

    # --------------------
    # Travel Planner
    # --------------------
    if any(k in q for k in [
        "plan",
        "planning",
        "itinerary",
        "trip",
        "travel",
        "vacation",
        "holiday",
        "tour",
        "days",
        "budget",
        "schedule",
        "pack",
        "packing"
    ]):
        return "planner"

    # --------------------
    # Destination / Country
    # --------------------
    if any(k in q for k in [
        "where",
        "located",
        "location",
        "country",
        "city",
        "capital",
        "currency",
        "population",
        "language",
        "timezone",
        "flag",
        "tourist",
        "tourism",
        "destination",
        "museum",
        "monument",
        "attraction",
        "attractions",
        "beach",
        "mountain",
        "culture",
        "history",
        "famous",
        "safe",
        "restaurant",
        "food",
        "hotel",
        "airport",
        "flight",
        "transport",
        "visa",
        "passport"
    ]):
        return "country"

    # --------------------
    # RAG
    # --------------------
    if any(k in q for k in [
        "pdf",
        "document",
        "guide",
        "uploaded",
        "file"
    ]):
        return "rag"

    # --------------------
    # General travel chat
    # --------------------
    return "chat"
