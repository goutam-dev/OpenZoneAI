from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import google.generativeai as genai

# Define the router
router = APIRouter()

# Request model
class IdeaRequest(BaseModel):
    business: str

# Response model
class IdeaResponse(BaseModel):
    ideas: list[str]

@router.post("/generate", response_model=IdeaResponse)
async def generate_ideas(request: IdeaRequest):
    """Generate AI-powered ideas for a business"""
    try:
        business_description = request.business

        if not business_description or len(business_description.strip()) < 10:
            raise HTTPException(status_code=400, detail="Business description must be at least 10 characters long")

        # Configure Gemini API
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="Gemini API key not configured")

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-flash-latest')

        # Create prompt for AI idea generation
        prompt = f"""You are an AI business consultant. Based on the following business description, suggest 3-5 innovative AI-powered solutions that can help improve their business.

Business Description: {business_description}

Provide your suggestions in plain text without any special characters like ##, *, or markdown formatting. Provide your suggestions in a concise, actionable format. Each suggestion should:
Focus on practical AI solutions include just 3 ideas with just detail of 3 ideas no heading etc just 3 paragraphs"""

        # Generate ideas
        response = model.generate_content(prompt)
        ideas_text = response.text.strip()
        ideas = [idea.strip() for idea in ideas_text.split('\n') if idea.strip()]

        # If no ideas generated, provide default suggestions
        if not ideas:
            ideas = [
                "AI chatbot for customer support automation",
                "Intelligent analytics dashboard for business insights",
                "Automated workflow management system"
            ]

        return {"ideas": ideas}

    except Exception as e:
        # Fallback to default ideas if API fails
        fallback_ideas = [
            "AI chatbot to handle customer queries 24/7",
            "Predictive analytics for business intelligence",
            "Automated process optimization system"
        ]
        return {"ideas": fallback_ideas}