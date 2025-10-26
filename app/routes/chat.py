from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import random
import os
import google.generativeai as genai
from dotenv import load_dotenv, find_dotenv


# Define the router
router = APIRouter()

# Configure Gemini API
dotenv_path = find_dotenv()
if not dotenv_path:
    print(".env file not found")
else:
    print(f"Loading .env file from: {dotenv_path}")
load_dotenv(dotenv_path)
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise HTTPException(status_code=500, detail="Gemini API key not configured")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-flash-latest')

# Mock AI responses
mock_responses = [
    "That sounds like a great idea! You could explore automation with AI tools.",
    "Try focusing on customer engagement through data-driven insights.",
    "AI can definitely help streamline your business processes.",
    "Consider integrating predictive analytics for better decision making."
]

# Request model
class ChatRequest(BaseModel):
    message: str

# Response model
class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Handle chat messages and return AI responses."""
    user_message = request.message
    print(user_message)

    # Update the prompt to request plain text responses
    prompt = f"""You are an AI business consultant. Based on the following user input, provide advice:

User Input: {user_message}

Provide your response in plain text without any special characters like ##, *, or markdown formatting. It should be clear and concise and practical."""

    # Generate response
    try:
        response = model.generate_content(prompt)
        ai_response = response.text.strip()
        # Clean and format the AI response to remove unwanted characters
        ai_response = ''.join(c for c in ai_response if c.isalnum() or c.isspace())
    except Exception as e:
        ai_response = "Sorry, I couldn't process your request. Please try again later."

    return {"response": ai_response}