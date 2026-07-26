from fastapi import APIRouter, HTTPException
from models.schemas import PlannerRequest, PlannerResponse
from tools.planner_tool import generate_itinerary_tool

router = APIRouter(prefix="/api/planner", tags=["Planner"])

@router.post("/generate", response_model=PlannerResponse)
async def generate_itinerary(req: PlannerRequest):
    try:
        res, steps = await generate_itinerary_tool(req)
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
