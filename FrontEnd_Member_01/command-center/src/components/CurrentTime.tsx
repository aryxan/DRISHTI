import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const CurrentTime: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const localTimeStr = time.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const utcTimeStr = time.toISOString().substring(11, 19) + ' UTC';
  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex items-center gap-2.5 px-3 py-1 bg-slate-900/90 border border-slate-800 rounded-lg text-slate-300 font-mono text-xs">
      <Clock className="w-3.5 h-3.5 text-cyan-400" />
      <div className="flex items-baseline gap-2">
        <span className="font-semibold text-slate-100">{localTimeStr}</span>
        <span className="text-slate-500 text-[10px]">({utcTimeStr})</span>
        <span className="hidden md:inline text-slate-400 border-l border-slate-800 pl-2 text-[11px]">{dateStr}</span>
      </div>
    </div>
  );
};
