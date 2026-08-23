# main.py
# Welcome to the Backend! (The "Kitchen")

# We import the tools we need to build the API.
# FastAPI is the framework that lets us build the kitchen.
from fastapi import FastAPI
# Pydantic is a tool that helps us check if the data sent to us is correct (like checking if an order ticket is readable).
from pydantic import BaseModel
import time

# =====================================================================
# 1. CREATE THE APP (Building the Kitchen)
# =====================================================================
# Here we literally create the FastAPI application.
# We give it a title and description. You won't usually see this unless you look at the automatic documentation.
app = FastAPI(
    title="Automation API (Python FastAPI)",
    description="Python FastAPI backend handling automation requests directly from Next.js",
    version="1.0.0"
)

# =====================================================================
# 2. DATA BLUEPRINTS (The Order Ticket)
# =====================================================================
# A 'Class' in Python is like a blueprint. 
# A 'BaseModel' specifically tells FastAPI: "Hey, when the frontend sends us data, it MUST look exactly like this."
# In this case, we expect a JSON package that has exactly one thing inside it: a text string called 'message'.
class ProcessRequest(BaseModel):
    message: str

# =====================================================================
# 3. ROUTES (The Ordering Windows)
# =====================================================================

# Route 1: The Health Check
# The @app.get means: "If someone visits this URL in their browser, run the function below."
@app.get("/api/py/health")
def health_check():
    """This is a simple heartbeat check to make sure the server is alive and running."""
    return {"status": "healthy", "runtime": "Python FastAPI"}


# Route 2: The Main Processor
# The @app.post means: "We are receiving data (a POST request) at this URL."
@app.post("/api/py/process")
def process_data(req: ProcessRequest):
    """
    This is the "Doorbell" that the Next.js frontend will ring.
    The 'req: ProcessRequest' part means it will automatically grab the JSON message the frontend sent!
    """
    
    # Step 1: We extract the message the user typed in the frontend.
    original_message = req.message
    
    # Step 2: We do our "backend processing". (Here, we just add some text to it).
    processed_message = f"Python says: I received '{original_message}' and processed it instantly!"
    
    # Step 3: We hand the data back to the frontend.
    # When we 'return' a dictionary in FastAPI, it automatically converts it to JSON so the frontend can read it!
    return {
        "reply": processed_message,
        "processed": True,
        "service": "FastAPI Python Backend",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    }

# =====================================================================
# 4. RUN THE SERVER
# =====================================================================
# This just says: "If this file is run directly, start the uvicorn server on port 8000."
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
