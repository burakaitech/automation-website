# Burak AI - Automation Website (Python + React)

A fullstack web application combining a **Python FastAPI** backend with a modern **React (TypeScript + Tailwind CSS)** user interface.

## Tech Stack
- **Backend:** Python 3.10+, [FastAPI](https://fastapi.tiangolo.com/), [Uvicorn](https://www.uvicorn.org/), [Pydantic](https://docs.pydantic.dev/), [HTTPX](https://www.python-httpx.org/)
- **Frontend:** [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [Vite](https://vitejs.dev/), [Lucide Icons](https://lucide.dev/)
- **Automation Pipeline:** [n8n](https://n8n.io/)
- **Hosting:** [Railway](https://railway.app/)

## Project Structure
```
automation-website/
├── backend/
│   ├── routes/
│   │   ├── trigger.py            # POST /api/trigger -> dispatches to n8n webhook
│   │   └── automation.py         # POST /api/test-automation -> custom Python code executed by n8n
│   ├── services/
│   │   └── webhook_client.py     # Asynchronous HTTP client for webhook calls
│   ├── config.py                 # Application configuration & env vars
│   └── models.py                 # Pydantic schemas for requests & responses
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx        # Dashboard header with live status
│   │   │   ├── TriggerForm.tsx   # Interactive trigger input & submit button
│   │   │   ├── ResponseViewer.tsx# JSON payload viewer
│   │   │   └── ActivityLog.tsx   # Real-time event logger
│   │   ├── App.tsx               # Main application component
│   │   └── main.tsx              # React DOM mounting
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── static/                       # Compiled production frontend served by FastAPI
│   ├── index.html
│   └── assets/
├── main.py                       # FastAPI entrypoint mounting APIs & Static React UI
├── requirements.txt              # Python dependencies
└── README.md
```

## Running Locally

### 1. Run Python Backend
```bash
pip install -r requirements.txt
python main.py
```
Visit `http://localhost:8080` to access the website and `http://localhost:8080/docs` for the interactive Swagger API documentation.

### 2. Develop Frontend (Optional)
```bash
cd frontend
npm install
npm run dev
```
