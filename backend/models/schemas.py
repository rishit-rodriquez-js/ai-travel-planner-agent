from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ItineraryDay(BaseModel):
    day: int
    title: str
    morning: str
    afternoon: str
    evening: str
    meals: List[str]
    estimated_cost: str

class BudgetBreakdown(BaseModel):
    accommodation: str
    food_and_dining: str
    transportation: str
    activities: str
    total_estimated: str

class PlannerRequest(BaseModel):
    destination: str
    budget: str
    days: int
    interests: Optional[str] = "sightseeing, food, culture"

class PlannerResponse(BaseModel):
    destination: str
    budget: str
    days: int
    itinerary: List[ItineraryDay]
    budget_breakdown: BudgetBreakdown
    attractions: List[str]
    food_suggestions: List[str]
    travel_tips: List[str]
    best_season: str
    execution_steps: List[str]

class ChatRequest(BaseModel):
    query: str
    session_id: Optional[str] = "default_session"
    history: Optional[List[Dict[str, str]]] = []

class ChatResponse(BaseModel):
    response: str
    rag_used: bool = False
    source_documents: Optional[List[str]] = []
    execution_steps: List[str] = []

class DocumentUploadResponse(BaseModel):
    filename: str
    chunks_created: int
    message: str

class DestinationInfoRequest(BaseModel):
    destination: str

class CountryInfo(BaseModel):
    name: str
    capital: str
    region: str
    subregion: str
    population: str
    currency: str
    languages: List[str]
    timezones: List[str]
    flag_emoji: str
    flag_url: str

class WeatherInfo(BaseModel):
    city: str
    temperature: str
    condition: str
    humidity: str
    wind_speed: str
    icon_url: str

class FullDestinationResponse(BaseModel):
    country: Optional[CountryInfo] = None
    weather: Optional[WeatherInfo] = None
    error: Optional[str] = None
