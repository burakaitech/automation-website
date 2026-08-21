import os

class Settings:
    PROJECT_NAME: str = "Burak AI Automation Website"
    VERSION: str = "1.0.0"
    N8N_WEBHOOK_URL: str = os.environ.get(
        "N8N_WEBHOOK_URL",
        "https://n8n-production-dd18.up.railway.app/webhook/test-webhook"
    )
    PORT: int = int(os.environ.get("PORT", 8080))
    HOST: str = "0.0.0.0"

settings = Settings()
