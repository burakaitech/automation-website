import React from 'react';
import { Zap, Activity, Code2 } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800/80 pb-5">
      <div className="flex items-center space-x-3.5">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Automation Hub
            <span className="text-[11px] font-semibold tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Code2 className="w-3 h-3" /> Python + React
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">FastAPI Backend • Modern React 18 • n8n</p>
        </div>
      </div>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
        <Activity className="w-3.5 h-3.5 animate-pulse" />
        <span>Live</span>
      </div>
    </header>
  );
}
