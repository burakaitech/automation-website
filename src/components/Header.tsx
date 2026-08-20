import React from "react";
import { Zap, Activity } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 pb-5">
      <div className="flex items-center space-x-3.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">Automation Control Center</h1>
          <p className="text-xs text-slate-400 font-medium">Next.js 14 • React • Tailwind CSS • n8n</p>
        </div>
      </div>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/5">
        <Activity className="w-3.5 h-3.5 animate-pulse" />
        <span>Railway Live</span>
      </div>
    </header>
  );
}
