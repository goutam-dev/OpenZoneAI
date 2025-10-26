from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from pathlib import Path
import google.generativeai as genai
import os
from dotenv import load_dotenv, find_dotenv
from app.routes import chat, ideas

# Load environment variables from .env file
dotenv_path = find_dotenv()
if not dotenv_path:
    print(".env file not found")
else:
    print(f"Loading .env file from: {dotenv_path}")
load_dotenv(dotenv_path)

# Initialize FastAPI app
app = FastAPI(
    title="OpenZoneAI",
    description="AI-powered automation tools and intelligent software solutions",
    version="1.0.0"
)

# Get the base directory
BASE_DIR = Path(__file__).parent.parent

# Setup static files and templates
app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

# Register the chat and ideas routers
app.include_router(chat.router, prefix="/api")
app.include_router(ideas.router, prefix="/api")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Homepage route"""
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/about", response_class=HTMLResponse)
async def about(request: Request):
    """About page route"""
    return templates.TemplateResponse("about.html", {"request": request})


@app.get("/ai", response_class=HTMLResponse)
async def ai_idea_generator(request: Request):
    """AI Idea Generator page route"""
    return templates.TemplateResponse("ai.html", {"request": request})


@app.get("/contact", response_class=HTMLResponse)
async def contact(request: Request):
    """Contact page route"""
    return templates.TemplateResponse("contact.html", {"request": request})


@app.get("/chat", response_class=HTMLResponse)
async def chat_page(request: Request):
    """Chatbot page route"""
    return templates.TemplateResponse("chat.html", {"request": request})


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "OpenZoneAI"}


# Pydantic models for request validation
class BusinessRequest(BaseModel):
    business: str

class ContactRequest(BaseModel):
    firstName: str
    lastName: str
    email: str
    subject: str
    message: str




@app.post("/api/contact")
async def send_contact_message(request: ContactRequest):
    """Handle contact form submission"""
    try:
        # Validate input
        if not request.firstName or not request.lastName or not request.email or not request.subject or not request.message:
            raise HTTPException(status_code=400, detail="All fields are required")
        
        # Here you would typically send an email or save to database
        # For now, we'll just log it and return success
        print(f"New contact form submission:")
        print(f"Name: {request.firstName} {request.lastName}")
        print(f"Email: {request.email}")
        print(f"Subject: {request.subject}")
        print(f"Message: {request.message}")
        
        return {
            "message": "Thank you for contacting us! We'll get back to you soon.",
            "status": "success"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send message: {str(e)}")
