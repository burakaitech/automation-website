import httpx
from backend.config import settings
from typing import Dict, Any

class WebhookClient:
    def __init__(self, webhook_url: str = settings.N8N_WEBHOOK_URL):
        self.webhook_url = webhook_url

    async def trigger(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Dispatches an async HTTP call to n8n webhook."""
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.get(self.webhook_url)
            response.raise_for_status()
            try:
                return response.json()
            except Exception:
                return {"raw": response.text}

webhook_client = WebhookClient()
