// TriggerCard.tsx
// This is the interactive "Lego Block" that contains the form and talks to the Python backend!

// "use client" tells Next.js that this file uses interactive browser features (like clicking buttons and storing data).
"use client";

import React, { useState } from "react";
// Lucide-react is just a library that gives us beautiful icons (like Zap, Send, etc.)
import { Zap, Send, Loader2, CheckCircle, Activity, Terminal, AlertCircle } from "lucide-react";

export function TriggerCard() {
  // =====================================================================
  // 1. STATE (The Component's Memory)
  // =====================================================================
  // useState is a React Hook. It lets the website "remember" things while you are looking at it.
  // Whenever one of these values changes (using 'setMessage' or 'setLoading'), React instantly updates the screen!
  
  // Remembers what the user typed in the input box
  const [message, setMessage] = useState("Direct trigger from Next.js to FastAPI");
  
  // Remembers if we are currently waiting for the Python backend to reply (shows the spinning wheel if true)
  const [loading, setLoading] = useState(false);
  
  // Remembers the JSON data the Python backend sent back to us
  const [response, setResponse] = useState<any>(null);
  
  // Remembers if an error happened
  const [error, setError] = useState<string | null>(null);
  
  // Remembers the list of text logs at the bottom of the card
  const [logs, setLogs] = useState<Array<{ id: string; time: string; text: string }>>([
    {
      id: "init",
      time: new Date().toLocaleTimeString(),
      text: "Next.js UI & FastAPI Python backend initialized.",
    },
  ]);

  // A small helper function that adds a new line of text to our logs memory.
  const addLog = (text: string) => {
    setLogs((prev) => [
      {
        id: Math.random().toString(36).substring(2, 9),
        time: new Date().toLocaleTimeString(),
        text,
      },
      ...prev.slice(0, 15), // Keeps only the 15 most recent logs so it doesn't get too long
    ]);
  };

  // =====================================================================
  // 2. THE SUBMIT FUNCTION (The Waiter)
  // =====================================================================
  // This function runs the exact moment the user clicks the "Call Python Backend" button.
  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault() stops the page from doing a hard refresh (which is what forms normally do)
    e.preventDefault();
    if (loading) return; // If we are already loading, do nothing.

    // 1. Prepare the screen (turn on the loading spinner, clear old errors)
    setLoading(true);
    setError(null);
    setResponse(null);
    addLog(`Sending trigger to /api/py/process with payload: "${message}"`);

    try {
      // 2. The Fetch Request! 
      // This is the Waiter taking the order to the Kitchen. We 'POST' the message to our Python URL.
      const res = await fetch("/api/py/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // We pack our 'message' state into a JSON string to send it over the internet.
        body: JSON.stringify({ message }), 
      });

      // 3. Read the JSON reply from Python
      const data = await res.json();
      
      // If Python sent an error code (like a 500 error), we throw an alert
      if (!res.ok) throw new Error(data.error || data.detail || "Automation execution failed");

      // 4. Success! Save the reply into our 'response' memory, which instantly updates the screen!
      setResponse(data);
      addLog("Success! Python backend processed the request instantly.");
      
    } catch (err: any) {
      // If anything broke, save the error so the screen can show a red warning box.
      setError(err.message || "An unexpected error occurred");
      addLog(`Error: ${err.message}`);
    } finally {
      // 5. Always turn off the loading spinner at the very end, whether it succeeded or failed.
      setLoading(false);
    }
  };

  // =====================================================================
  // 3. THE UI RENDERING (Drawing the Screen)
  // =====================================================================
  // Everything below here is JSX. It is the HTML-like code that draws the actual card.
  return (
    <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6">
      
      {/* --- SECTION: THE HEADER --- */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-3.5">
          {/* Blue icon box */}
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
      </div>

      {/* --- SECTION: THE FORM --- */}
      {/* When this form is submitted, it runs our handleSubmit function above! */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="payload" className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex justify-between">
            <span>Payload Message</span>
          </label>
          
          {/* The text input box. Notice that its 'value' is tied to our 'message' memory state! */}
          <input
            id="payload"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Every time you type a letter, it updates the memory.
            placeholder="Enter a message to pass to Python..."
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none"
          />
        </div>

        {/* The Submit Button. It changes its look depending on whether 'loading' is true or false. */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-semibold py-3.5 px-5 rounded-xl shadow-lg flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              {/* Shows a spinning icon if loading */}
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing in Python...</span>
            </>
          ) : (
            <>
              {/* Shows normal text if not loading */}
              <span>Call Python Backend</span>
              <Send className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </form>

      {/* --- SECTION: ERROR VIEWER --- */}
      {/* The `error && (...)` means: Only draw this red box if 'error' is not null! */}
      {error && (
        <div className="bg-rose-950/30 border border-rose-800/50 rounded-2xl p-4 flex items-start space-x-3 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* --- SECTION: SUCCESS VIEWER --- */}
      {/* Only draw this green box if Python actually sent back a 'response'! */}
      {response && (
        <div className="bg-emerald-950/25 border border-emerald-800/40 rounded-2xl p-4.5 space-y-2.5">
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Python Backend Response</span>
          </div>
          {/* JSON.stringify just turns the JSON dictionary into a readable text block. */}
          <pre className="text-xs font-mono text-emerald-200 bg-slate-950/90 p-4 rounded-xl overflow-x-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {/* --- SECTION: ACTIVITY LOG --- */}
      {/* This draws the black box at the bottom, mapping over every 'log' in our memory and printing it on a new line. */}
      <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
        <div className="bg-slate-950/90 rounded-2xl p-4 max-h-36 overflow-y-auto font-mono text-[11px] space-y-1.5">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start space-x-2 text-slate-400">
              <span className="text-slate-600 flex-shrink-0">[{log.time}]</span>
              <span>{log.text}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
