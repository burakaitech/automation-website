import os
import httpx
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(
    title="Automation API (Python FastAPI)",
    description="Python FastAPI backend powering custom code and n8n webhooks",
    version="1.0.0"
)

N8N_WEBHOOK_URL = os.environ.get(
    "N8N_WEBHOOK_URL",
    "https://n8n-production-dd18.up.railway.app/webhook/test-webhook"
)

# Pydantic Schemas
class TriggerRequest(BaseModel):
    message: str = "Automated trigger from Next.js + FastAPI Dashboard"

class AutomationRequest(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {
        "framework": "FastAPI (Python)",
        "status": "online",
        "endpoints": ["/api/trigger", "/api/test-automation", "/docs"]
    }

@app.post("/api/trigger")
async def trigger_webhook(req: TriggerRequest):
    """Dispatches request to n8n webhook."""
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.get(N8N_WEBHOOK_URL)
            if res.status_code != 200:
                raise HTTPException(status_code=res.status_code, detail=res.text)
            try:
                return res.json()
            except Exception:
                return {"raw": res.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/test-automation")
def test_automation(req: AutomationRequest):
    """Custom Python code executed by n8n workflow."""
    return {
        "reply": f"Custom Python FastAPI Backend processed: '{req.message}'",
        "processed": True,
        "service": "FastAPI Python Backend"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "runtime": "Python FastAPI"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
