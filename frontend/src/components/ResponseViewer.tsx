import React from 'react';
import { CheckCircle, Terminal } from 'lucide-react';

interface ResponseViewerProps {
  response: any;
}

export function ResponseViewer({ response }: ResponseViewerProps) {
  if (!response) return null;

  return (
    <div className="bg-emerald-950/25 border border-emerald-800/40 rounded-2xl p-4.5 space-y-2.5 animate-fadeIn">
      <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 uppercase tracking-wider">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Pipeline Response Payload</span>
        </div>
        <span className="text-[11px] font-mono text-emerald-400/80 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/40">
          200 OK
        </span>
      </div>
      <div className="relative">
        <pre className="text-xs font-mono text-emerald-200 bg-slate-950/90 p-4 rounded-xl overflow-x-auto border border-slate-800/80 leading-relaxed shadow-inner">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    </div>
  );
}
