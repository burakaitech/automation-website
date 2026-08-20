import React from "react";
import { Terminal, CheckCircle } from "lucide-react";

interface ResponseViewerProps {
  response: any;
}

export function ResponseViewer({ response }: ResponseViewerProps) {
  if (!response) return null;

  return (
    <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-4 space-y-2.5 animate-fadeIn">
      <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 uppercase tracking-wider">
        <div className="flex items-center space-x-1.5">
          <CheckCircle className="w-4 h-4" />
          <span>Execution Response</span>
        </div>
        <span className="text-[11px] font-normal text-emerald-300/70 font-mono">status: 200 OK</span>
      </div>
      <pre className="text-xs font-mono text-emerald-200 bg-slate-950/80 p-3.5 rounded-lg overflow-x-auto border border-emerald-900/40 leading-relaxed shadow-inner">
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );
}
