from pydantic import BaseModel, Field
from typing import Optional, Any
from datetime import datetime

class TriggerRequest(BaseModel):
    message: str = Field(
        default="Automated trigger from Python React dashboard",
        description="Payload message to send through the automation pipeline"
    )

class TriggerResponse(BaseModel):
    status: str
    data: Any
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class AutomationTaskRequest(BaseModel):
    message: str = Field(..., description="Message received from n8n workflow")

class AutomationTaskResponse(BaseModel):
    reply: str
    processed: bool = True
    service: str = "automation-website-python-backend"
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
