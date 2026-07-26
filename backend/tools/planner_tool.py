import json
from typing import Tuple, List
from openai import AsyncOpenAI
from config.settings import settings
from models.schemas import PlannerRequest, PlannerResponse, ItineraryDay, BudgetBreakdown

async def generate_itinerary_tool(req: PlannerRequest) -> Tuple[PlannerResponse, List[str]]:
    steps = [
        "✓ Query Received: Travel Planner requested",
        f"✓ Parameters: Destination={req.destination}, Budget={req.budget}, Days={req.days}",
        "✓ Travel Planner Tool Executing"
    ]
    
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None
    
    prompt = f"""
    Act as an expert AI Travel Planner. Generate a comprehensive JSON itinerary for a trip to:
    Destination: {req.destination}
    Budget Level/Total: {req.budget}
    Trip Duration: {req.days} days
    Interests: {req.interests}

    Return ONLY a valid JSON object matching this exact structure:
    {{
      "destination": "{req.destination}",
      "budget": "{req.budget}",
      "days": {req.days},
      "best_season": "Spring (March - May) & Autumn (September - November)",
      "budget_breakdown": {{
        "accommodation": "$... estimated",
        "food_and_dining": "$... estimated",
        "transportation": "$... estimated",
        "activities": "$... estimated",
        "total_estimated": "$... total"
      }},
      "attractions": ["Attraction 1", "Attraction 2", "Attraction 3", "Attraction 4", "Attraction 5"],
      "food_suggestions": ["Dish 1", "Dish 2", "Dish 3", "Dish 4"],
      "travel_tips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4"],
      "itinerary": [
        {{
          "day": 1,
          "title": "Arrival & City Highlights",
          "morning": "Morning activity details...",
          "afternoon": "Afternoon activity details...",
          "evening": "Evening activity details...",
          "meals": ["Breakfast suggestion", "Lunch suggestion", "Dinner suggestion"],
          "estimated_cost": "$50 - $80"
        }}
        // Include entries for all {req.days} days
      ]
    }}
    """
    
    if client:
        try:
            steps.append("✓ OpenAI API invoked for Itinerary Synthesis")
            response = await client.chat.completions.create(
                model=settings.MODEL_NAME,
                messages=[
                    {"role": "system", "content": "You are a professional travel planner system. Respond ONLY in valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            raw_json = response.choices[0].message.content
            data = json.loads(raw_json)
            
            steps.append("✓ Itinerary Successfully Synthesized & Formatted")
            
            # Format Pydantic objects
            days_list = [ItineraryDay(**d) for d in data.get("itinerary", [])]
            budget_obj = BudgetBreakdown(**data.get("budget_breakdown", {
                "accommodation": "$400", "food_and_dining": "$250", "transportation": "$150", "activities": "$100", "total_estimated": "$900"
            }))
            
            res = PlannerResponse(
                destination=data.get("destination", req.destination),
                budget=data.get("budget", req.budget),
                days=data.get("days", req.days),
                itinerary=days_list,
                budget_breakdown=budget_obj,
                attractions=data.get("attractions", []),
                food_suggestions=data.get("food_suggestions", []),
                travel_tips=data.get("travel_tips", []),
                best_season=data.get("best_season", "Spring to Autumn"),
                execution_steps=steps
            )
            return res, steps
        except Exception as e:
            print(f"OpenAI Generation Exception: {e}")
            steps.append(f"⚠️ OpenAI call fallback used: {e}")

    # Rich Fallback Generator if OpenAI key fails or is invalid
    steps.append("✓ Built-in Smart Itinerary Generator executed")
    days_list = []
    for d in range(1, req.days + 1):
        days_list.append(ItineraryDay(
            day=d,
            title=f"Day {d}: Exploring {req.destination} Highlights",
            morning=f"Visit top iconic landmark & morning heritage tour in {req.destination}.",
            afternoon="Enjoy authentic local lunch followed by cultural museum exploration.",
            evening="Scenic sunset view, local street market stroll, and gourmet dining.",
            meals=["Café Breakfast", "Traditional Local Lunch", "Signature Dinner"],
            estimated_cost=f"${40 + (d * 5)} - ${70 + (d * 10)}"
        ))
        
    budget_obj = BudgetBreakdown(
        accommodation=f"${req.days * 80}",
        food_and_dining=f"${req.days * 45}",
        transportation=f"${req.days * 20}",
        activities=f"${req.days * 35}",
        total_estimated=f"${req.days * 180}"
    )
    
    res = PlannerResponse(
        destination=req.destination,
        budget=req.budget,
        days=req.days,
        itinerary=days_list,
        budget_breakdown=budget_obj,
        attractions=[f"Historic Center of {req.destination}", "Central Cultural Park", "Panoramic Observation Deck", "Famous Local Market", "National Museum"],
        food_suggestions=["Signature Local Specialty", "Artisanal Pastries", "Street Food Delicacy", "Regional Craft Beverage"],
        travel_tips=["Keep local currency handy for small vendors", "Use public transit day-passes for easy travel", "Book attraction tickets online in advance", "Respect local cultural etiquette"],
        best_season="March - May & September - November",
        execution_steps=steps
    )
    return res, steps
