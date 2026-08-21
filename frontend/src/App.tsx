import React, { useState } from 'react';
import { Header } from './components/Header';
import { TriggerForm } from './components/TriggerForm';
import { ResponseViewer } from './components/ResponseViewer';
import { ActivityLog, LogItem } from './components/ActivityLog';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogItem[]>([
    {
      id: 'init',
      time: new Date().toLocaleTimeString(),
      text: 'FastAPI Backend & React Frontend synchronized and connected to n8n.',
    },
  ]);

  const addLog = (text: string) => {
    setLogs((prev) => [
      {
        id: Math.random().toString(36).substring(2, 9),
        time: new Date().toLocaleTimeString(),
        text,
      },
      ...prev.slice(0, 20),
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
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Header */}
          <Header />

          {/* Form */}
          <TriggerForm
            onTriggerSuccess={handleSuccess}
            onTriggerError={handleError}
            onAddLog={addLog}
          />

          {/* Error display */}
          {error && (
            <div className="bg-rose-950/30 border border-rose-800/50 rounded-2xl p-4 flex items-start space-x-3 text-xs text-rose-300 font-mono">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Response Payload */}
          <ResponseViewer response={response} />

          {/* Activity Log */}
          <ActivityLog logs={logs} />
        </div>

        {/* Footer */}
        <footer className="text-center mt-6 text-xs text-slate-500 space-y-1">
          <p>
            FastAPI Backend (<code className="text-blue-400">Python 3.14</code>) • React 18 UI • Deployed on Railway
          </p>
          <p className="text-[11px] text-slate-600">
            OpenAPI Docs: <a href="/docs" target="_blank" className="text-slate-400 hover:text-blue-400 underline">/docs</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
