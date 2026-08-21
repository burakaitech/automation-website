import os
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel

# 1. Initialize FastAPI Application
app = FastAPI(
    title="Burak AI - Automation Website",
    description="Minimalist Fullstack Website with Python FastAPI backend and React frontend",
    version="1.0.0"
)

# 2. Configuration
N8N_WEBHOOK_URL = os.environ.get(
    "N8N_WEBHOOK_URL",
    "https://n8n-production-dd18.up.railway.app/webhook/test-webhook"
)
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# 3. Pydantic Models (Data Validation)
class TriggerPayload(BaseModel):
    message: str = "Hello from Python + React Website!"

class AutomationPayload(BaseModel):
    message: str

# 4. Route: Serve Frontend (React UI)
@app.get("/")
async def serve_frontend():
    """Serves the React dashboard (index.html)."""
    index_file = os.path.join(CURRENT_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"message": "Welcome to Burak AI Automation Hub - API Online", "docs": "/docs"}

# 5. Route: Trigger n8n Webhook Pipeline
@app.post("/api/trigger")
async def trigger_pipeline(payload: TriggerPayload):
    """
    Called by the React Frontend when the user clicks 'Trigger Webhook'.
    Forwards the trigger to the n8n webhook on Railway.
    """
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.get(N8N_WEBHOOK_URL)
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"n8n webhook error ({response.status_code}): {response.text}"
                )
            try:
                return response.json()
            except Exception:
                return {"raw": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 6. Route: Custom Python Automation Logic (Executed by n8n)
@app.post("/api/test-automation")
async def process_automation_task(payload: AutomationPayload):
    """
    Called by the n8n workflow during execution to run custom Python code.
    """
    # Write custom AI or automation logic here:
    processed_message = f"Custom Python FastAPI Backend processed: '{payload.message}'"
    
    return {
        "reply": processed_message,
        "processed": True,
        "service": "automation-website-backend"
    }

# 7. Health Check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Python FastAPI"}

# 8. Local Server Runner
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
