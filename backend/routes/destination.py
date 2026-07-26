from fastapi import APIRouter
from models.schemas import FullDestinationResponse
from services.country_service import fetch_country_info
from services.weather_service import fetch_weather_info

router = APIRouter(prefix="/api/destination", tags=["Destination"])

@router.get("/{query}", response_model=FullDestinationResponse)
async def get_destination_details(query: str):
    country = await fetch_country_info(query)
    weather = await fetch_weather_info(query)
    return FullDestinationResponse(
        country=country,
        weather=weather
    )
