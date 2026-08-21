import React from 'react';
import { Terminal, Clock } from 'lucide-react';

export interface LogItem {
  id: string;
  time: string;
  text: string;
}

interface ActivityLogProps {
  logs: LogItem[];
}

export function ActivityLog({ logs }: ActivityLogProps) {
  return (
    <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-slate-500" />
          <span>Real-Time Logs</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">{logs.length} events recorded</span>
      </div>
      <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800/80 max-h-40 overflow-y-auto font-mono text-[11px] space-y-1.5 scrollbar-thin">
        {logs.map((log, index) => (
          <div key={log.id} className="flex items-start space-x-2 text-slate-400">
            <span className="text-slate-600 flex-shrink-0">[{log.time}]</span>
            <span className={index === 0 ? 'text-blue-400 font-medium' : 'text-slate-400'}>
              {log.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
