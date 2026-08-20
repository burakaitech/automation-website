import os
import json
import httpx
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

app = FastAPI(title="Automation Website Dashboard")

N8N_WEBHOOK_URL = os.environ.get(
    "N8N_WEBHOOK_URL",
    "https://n8n-production-dd18.up.railway.app/webhook/test-webhook"
)

class TriggerPayload(BaseModel):
    message: str = "Hello from the Website Dashboard!"

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Burak AI Automation Hub</title>
    <!-- React & ReactDOM -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    <!-- Babel for JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://unpkg.com/lucide-react@latest"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center justify-center p-4 font-sans antialiased selection:bg-blue-500 selection:text-white">
    <div id="root" class="w-full max-w-xl"></div>

    <script type="text/babel">
        function App() {
            const [message, setMessage] = React.useState('Automated trigger from website dashboard');
            const [loading, setLoading] = React.useState(false);
            const [response, setResponse] = React.useState(null);
            const [error, setError] = React.useState(null);
            const [logs, setLogs] = React.useState([
                { time: new Date().toLocaleTimeString(), text: 'Dashboard initialized and ready' }
            ]);

            const addLog = (text) => {
                setLogs(prev => [{ time: new Date().toLocaleTimeString(), text }, ...prev].slice(0, 10));
            };

            const handleTrigger = async () => {
                setLoading(true);
                setError(null);
                setResponse(null);
                addLog('Dispatching trigger to n8n workflow...');

                try {
                    const res = await fetch('/api/trigger', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message })
                    });
                    
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.detail || 'Failed to trigger automation');

                    setResponse(data);
                    addLog('Automation succeeded! Received response from backend pipeline.');
                } catch (err) {
                    setError(err.message);
                    addLog('Error: ' + err.message);
                } finally {
                    setLoading(false);
                }
            };

            return (
                <div className="bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl p-6 sm:p-8 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white tracking-tight">Automation Webhook Hub</h1>
                                <p className="text-xs text-slate-400">React + FastAPI + n8n + Railway</p>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Live
                        </span>
                    </div>

                    {/* Input Field */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                            Payload Message
                        </label>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter a custom message..."
                            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition"
                        />
                    </div>

                    {/* Trigger Button */}
                    <button
                        onClick={handleTrigger}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-center space-x-2 transition duration-150 cursor-pointer disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Running Automation...</span>
                            </>
                        ) : (
                            <>
                                <span>Trigger Webhook</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </button>

                    {/* Result Display */}
                    {response && (
                        <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-4 space-y-2">
                            <div className="flex items-center text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                                Response Payload
                            </div>
                            <pre className="text-xs font-mono text-emerald-200 bg-slate-950/70 p-3 rounded-lg overflow-x-auto border border-emerald-900/50">
                                {JSON.stringify(response, null, 2)}
                            </pre>
                        </div>
                    )}

                    {error && (
                        <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-4 text-xs text-rose-300 font-mono">
                            {error}
                        </div>
                    )}

                    {/* Live Execution Logs */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Activity Log
                        </div>
                        <div className="bg-slate-950 rounded-xl p-3 border border-slate-800/80 max-h-36 overflow-y-auto font-mono text-[11px] space-y-1">
                            {logs.map((log, i) => (
                                <div key={i} className="text-slate-400 flex items-start space-x-2">
                                    <span className="text-slate-600">[{log.time}]</span>
                                    <span className={i === 0 ? "text-blue-400" : "text-slate-400"}>{log.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>"""

@app.get("/", response_class=HTMLResponse)
async def serve_dashboard():
    return HTMLResponse(content=HTML_TEMPLATE)

@app.post("/api/trigger")
async def trigger_automation(payload: TriggerPayload):
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.get(N8N_WEBHOOK_URL)
            if res.status_code != 200:
                raise HTTPException(
                    status_code=res.status_code,
                    detail=f"n8n webhook returned status {res.status_code}: {res.text}"
                )
            try:
                return res.json()
            except Exception:
                return {"raw_response": res.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
