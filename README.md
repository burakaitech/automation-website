# Burak AI - Automation Website (Next.js + React + Python FastAPI)

A clean, beginner-friendly fullstack repository showcasing **React 18**, **Next.js 14**, and **Python FastAPI**.

---

## 📁 Repository Overview (~8 Essential Files)

```
automation-website/
├── api/
│   ├── main.py                   # 🐍 Python FastAPI backend (FastAPI routes & Pydantic models)
│   └── requirements.txt          # 📦 Python dependencies (FastAPI, Uvicorn, HTTPX, Pydantic)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── trigger/route.ts         # ⚡ Next.js API Route for triggering n8n webhook
│   │   │   └── test-automation/route.ts # ⚡ Next.js API Route for custom automation logic
│   │   ├── globals.css           # 🎨 Tailwind CSS styles
│   │   ├── layout.tsx            # 📄 Next.js Root Layout
│   │   └── page.tsx              # 📄 Next.js Main Dashboard Page
│   └── components/
│       └── TriggerCard.tsx       # ⚛️ React 18 Interactive UI Component
├── package.json                  # 📦 Node dependencies (Next.js, React, Tailwind, Lucide)
├── tsconfig.json                 # ⚙️ TypeScript configuration
├── tailwind.config.ts            # 🎨 Tailwind CSS configuration
├── next.config.mjs               # ⚡ Next.js configuration
└── README.md                     # 📖 Documentation
```

---

## 🔍 How It Works

1. **React 18 & Next.js 14 (`src/app/page.tsx`, `src/components/TriggerCard.tsx`)**:
   - Modern React component with interactive state (`useState`).
   - Clean Tailwind CSS dark mode styling.
   - Dispatches triggers to the backend and renders live activity logs and JSON output.

2. **Python FastAPI Backend (`api/main.py`)**:
   - Python FastAPI server with Pydantic validation.
   - Provides endpoints for custom Python code execution and n8n webhook interaction.

3. **n8n Automation Pipeline**:
   - Connects the frontend trigger with the backend automation logic in real-time.

---

## 🚀 Running Locally

### Run Next.js Frontend & API:
```bash
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### Run Python FastAPI Server:
```bash
pip install -r api/requirements.txt
python api/main.py
```
Open **`http://localhost:8080/docs`** for interactive Swagger documentation.
