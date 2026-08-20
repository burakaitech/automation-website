"use client";

import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";

interface TriggerFormProps {
  onTriggerSuccess: (data: any) => void;
  onTriggerError: (err: string) => void;
  onAddLog: (msg: string) => void;
}

export function TriggerForm({ onTriggerSuccess, onTriggerError, onAddLog }: TriggerFormProps) {
  const [message, setMessage] = useState("Automated trigger from Next.js website");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    onAddLog(`Dispatching trigger to n8n webhook with payload: "${message}"`);

    try {
      const res = await fetch("/api/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to trigger automation workflow");
      }

      onTriggerSuccess(data);
      onAddLog("Success! Workflow executed and returned response.");
    } catch (err: any) {
      onTriggerError(err.message || "An unexpected error occurred");
      onAddLog(`Failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="payload" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Payload Message
        </label>
        <input
          id="payload"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message to pass to the workflow..."
          className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition duration-150"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] disabled:opacity-50 text-white font-semibold py-3 px-5 rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center space-x-2 transition duration-150 cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Executing Workflow...</span>
          </>
        ) : (
          <>
            <span>Trigger Webhook</span>
            <Send className="w-4 h-4 ml-1" />
          </>
        )}
      </button>
    </form>
  );
}
