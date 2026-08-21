from fastapi import APIRouter, HTTPException
from backend.models import TriggerRequest, TriggerResponse
from backend.services.webhook_client import webhook_client
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["Trigger"])

@router.post("/trigger", response_model=TriggerResponse)
async def trigger_pipeline(payload: TriggerRequest):
    """
    Endpoint called by the React Frontend to initiate the n8n automation pipeline.
    """
    try:
        logger.info(f"Triggering n8n pipeline with payload: {payload.message}")
        result = await webhook_client.trigger(payload.model_dump())
        return TriggerResponse(status="success", data=result)
    except Exception as e:
        logger.error(f"Pipeline error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Webhook execution failed: {str(e)}")
