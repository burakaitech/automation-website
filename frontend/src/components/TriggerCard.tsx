"use client";

import React, { useState } from "react";
import { Zap, Send, Loader2, CheckCircle, Activity, Terminal, AlertCircle } from "lucide-react";

export function TriggerCard() {
  const [message, setMessage] = useState("Direct trigger from Next.js to FastAPI");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<Array<{ id: string; time: string; text: string }>>([
    {
      id: "init",
      time: new Date().toLocaleTimeString(),
      text: "Next.js UI & FastAPI Python backend initialized (n8n removed).",
    },
  ]);

  const addLog = (text: string) => {
    setLogs((prev) => [
      {
        id: Math.random().toString(36).substring(2, 9),
        time: new Date().toLocaleTimeString(),
        text,
      },
      ...prev.slice(0, 15),
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setResponse(null);
    addLog(`Sending trigger to /api/py/process with payload: "${message}"`);

    try {
      // Direct call to the Python FastAPI backend!
      const res = await fetch("/api/py/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.detail || "Automation execution failed");

      setResponse(data);
      addLog("Success! Python backend processed the request instantly.");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      addLog(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Direct Automation Hub
            </h1>
            <p className="text-xs text-slate-400 font-medium">Next.js 14 • React 18 • Python FastAPI (Direct)</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>Live</span>
        </div>
      </div>

      {/* Trigger Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="payload" className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex justify-between">
            <span>Payload Message</span>
            <span className="text-[10px] text-slate-500 font-mono">POST /api/py/process</span>
          </label>
          <input
            id="payload"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message to pass to Python..."
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition duration-150"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 active:scale-[0.99] disabled:opacity-50 text-white font-semibold py-3.5 px-5 rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 transition duration-150 cursor-pointer disabled:cursor-not-allowed text-sm"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing in Python...</span>
            </>
          ) : (
            <>
              <span>Call Python Backend</span>
              <Send className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div className="bg-rose-950/30 border border-rose-800/50 rounded-2xl p-4 flex items-start space-x-3 text-xs text-rose-300 font-mono">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Response Viewer */}
      {response && (
        <div className="bg-emerald-950/25 border border-emerald-800/40 rounded-2xl p-4.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Python Backend Response</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400/80 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/40">
              200 OK
            </span>
          </div>
          <pre className="text-xs font-mono text-emerald-200 bg-slate-950/90 p-4 rounded-xl overflow-x-auto border border-slate-800/80 leading-relaxed shadow-inner">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {/* Real-time Activity Log */}
      <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span>Activity Log</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">{logs.length} events</span>
        </div>
        <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800/80 max-h-36 overflow-y-auto font-mono text-[11px] space-y-1.5 scrollbar-thin">
          {logs.map((log, index) => (
            <div key={log.id} className="flex items-start space-x-2 text-slate-400">
              <span className="text-slate-600 flex-shrink-0">[{log.time}]</span>
              <span className={index === 0 ? "text-blue-400 font-medium" : "text-slate-400"}>
                {log.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
