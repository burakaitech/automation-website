from fastapi import FastAPI
from pydantic import BaseModel
import time

app = FastAPI(
    title="Automation API (Python FastAPI)",
    description="Python FastAPI backend handling automation requests directly from Next.js",
    version="1.0.0"
)

# Pydantic Schema for the incoming JSON package
class ProcessRequest(BaseModel):
    message: str

@app.get("/api/py/health")
def health_check():
    return {"status": "healthy", "runtime": "Python FastAPI"}

# This is the "Doorbell" that Next.js will ring directly!
@app.post("/api/py/process")
def process_data(req: ProcessRequest):
    """Custom Python code executed directly by the Next.js frontend."""
    
    # 1. Read the incoming message
    original_message = req.message
    
    # 2. Do some "complex" Python logic (e.g., convert to uppercase, add a timestamp)
    processed_message = f"Python says: I received '{original_message}' and processed it instantly!"
    
    # 3. Hand the JSON package back to the Next.js frontend
    return {
        "reply": processed_message,
        "processed": True,
        "service": "FastAPI Python Backend",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
