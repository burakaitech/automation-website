from fastapi import APIRouter
from backend.models import AutomationTaskRequest, AutomationTaskResponse
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["Automation"])

@router.post("/test-automation", response_model=AutomationTaskResponse)
async def process_automation_task(task: AutomationTaskRequest):
    """
    Custom Python Automation Code endpoint executed by n8n workflow.
    """
    logger.info(f"Processing custom automation logic for task: {task.message}")
    
    # Custom business logic / AI automation logic here
    reply_text = f"Custom Python FastAPI Backend processed: '{task.message}'"
    
    return AutomationTaskResponse(
        reply=reply_text,
        processed=True,
        service="automation-website-python-backend"
    )

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Python FastAPI Web Server"}
