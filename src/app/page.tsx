"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { TriggerForm } from "@/components/TriggerForm";
import { ResponseViewer } from "@/components/ResponseViewer";
import { ActivityLog, LogItem } from "@/components/ActivityLog";
import { AlertTriangle } from "lucide-react";

export default function Home() {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogItem[]>([
    {
      id: "init",
      time: new Date().toLocaleTimeString(),
      text: "Next.js dashboard ready & connected to Railway pipeline.",
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

  const handleSuccess = (data: any) => {
    setError(null);
    setResponse(data);
  };

  const handleError = (errMsg: string) => {
    setResponse(null);
    setError(errMsg);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6">
          <Header />

          <TriggerForm
            onTriggerSuccess={handleSuccess}
            onTriggerError={handleError}
            onAddLog={addLog}
          />

          {error && (
            <div className="bg-rose-950/30 border border-rose-800/50 rounded-xl p-4 flex items-start space-x-3 text-xs text-rose-300 font-mono">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <ResponseViewer response={response} />

          <ActivityLog logs={logs} />
        </div>

        <footer className="text-center mt-6 text-xs text-slate-500">
          Built with Next.js 14 • React • Tailwind CSS • Deployed on Railway
        </footer>
      </div>
    </main>
  );
}
