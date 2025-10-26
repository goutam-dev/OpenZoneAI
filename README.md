# OpenZoneAI

A modern, responsive web application built with FastAPI for AI-powered automation tools and intelligent software solutions.

## Features

- 🚀 Modern, responsive design with smooth animations
- 🎨 Clean separation of HTML, CSS, and JavaScript
- 📱 Fully mobile-responsive layout
- 🔥 FastAPI backend with Jinja2 templating
- 🤖 AI-powered chat and idea generation tools
- 📂 Best practices folder structure

## Tech Stack

- **Backend**: FastAPI, Python
- **Templating**: Jinja2
- **Frontend**: HTML5, CSS3, JavaScript
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)

## Project Structure

```
OpenZoneAI/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── routes/              # API route modules
│   │   ├── __init__.py
│   │   ├── chat.py          # Chat endpoint logic
│   │   └── ideas.py         # AI idea generator logic
│   ├── templates/           # HTML templates
│   │   ├── index.html
│   │   ├── about.html
│   │   └── ai.html
│   └── static/              # Static files
│       ├── css/
│       │   └── styles.css
│       └── js/
│           └── main.js
├── requirements.txt
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd OpenZoneAI
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:

On Windows:
```bash
venv\Scripts\activate
```

On macOS/Linux:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```
## Environment Configuration

The project uses a `.env` file to store sensitive configurations. Ensure the following key is set:

```
GEMINI_API_KEY=<your-api-key>
```

If the `.env` file is missing or the API key is not configured, the application will raise an error.

## Running the Application

Start the development server:

```bash
uvicorn app.main:app --reload
```

The application will be available at `http://localhost:8000` or `http://127.0.0.1:8000`

## Quick Overview

- **Backend Framework**: The project is built using FastAPI, a modern Python web framework for building APIs.
- **How to Run**: Follow the installation steps to set up the environment, then start the development server using `uvicorn app.main:app --reload`.
- **AI Features**:
  - AI-powered chat endpoint (`/chat`) for generating practical advice based on user input.
  - AI idea generator (`/generate`) for creating innovative business solutions based on descriptions.

## Demo

Check out the demo of OpenZoneAI in action! Click on the thumbnail below to watch the video:

[![OpenZoneAI Demo](https://res.cloudinary.com/damlr67d9/image/upload/v1761505701/Preview_Openzone_yiq45i.png)](https://drive.google.com/file/d/1hZuKYtmUnfxqHVeDeVkCy97IoNjCrQ0s/view?usp=sharing)

## Routes

- `/` - Homepage
- `/about` - About page
- `/ai` - AI Idea Generator page
- `/chat` - Chat endpoint for AI-generated advice
- `/generate` - AI-powered business idea generator

### Route Details

#### `/chat`
- **Method**: POST
- **Description**: Accepts user messages and provides AI-generated advice.
- **Input**: JSON object with a `message` field (string).
- **Output**: JSON object with a `response` field (string).
- **Fallback**: Returns a default error message if the AI service fails.

#### `/generate`
- **Method**: POST
- **Description**: Generates innovative AI-powered business ideas based on user input.
- **Input**: JSON object with a `business` field (string, minimum 10 characters).
- **Output**: JSON object with an `ideas` field (list of strings).
- **Fallback**: Provides default business ideas if the AI service fails.


## Development

### Adding New Routes

Edit `app/main.py` to add new routes:

```python
@app.get("/new-route", response_class=HTMLResponse)
async def new_route(request: Request):
    return templates.TemplateResponse("new_template.html", {"request": request})
```

### Adding Static Files

Place CSS files in `app/static/css/` and JavaScript files in `app/static/js/`

Reference them in templates using:
```html
<link rel="stylesheet" href="{{ url_for('static', path='/css/your-file.css') }}">
<script src="{{ url_for('static', path='/js/your-file.js') }}"></script>
```



## License

© 2025 OpenZoneAI. All rights reserved.
