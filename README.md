# Burak AI - Automation Website (Python + React)

An ultra-clean, minimalist fullstack website combining **Python FastAPI** and **React**.

## 📁 Repository Structure (Only 3 Files!)

```
automation-website/
├── main.py            # 🐍 Python FastAPI backend (API endpoints & server)
├── index.html         # ⚛️ Modern React 18 frontend (interactive dashboard UI)
├── requirements.txt   # 📦 Python dependencies
└── README.md          # 📖 Documentation
```

---

## 🔍 How It Works

1. **`index.html` (React Frontend)**:
   - Uses modern **React 18** and **Tailwind CSS**.
   - Contains an interactive UI with a payload input, a **Trigger Webhook** button, live activity logs, and real-time JSON response viewer.
   - When the button is clicked, it calls `POST /api/trigger`.

2. **`main.py` (Python FastAPI Backend)**:
   - Serves `index.html` at `http://localhost:8080/`.
   - **`POST /api/trigger`**: Dispatches the automation trigger to the **n8n webhook**.
   - **`POST /api/test-automation`**: Custom Python code executed by n8n.
   - Interactive Swagger API documentation at `/docs`.

---

## 🚀 Running Locally

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the server:**
   ```bash
   python main.py
   ```

3. Open your browser at:
   - Website: **`http://localhost:8080/`**
   - API Docs: **`http://localhost:8080/docs`**
