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
    <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-mono text-xs shadow-2xs">
      <Clock className="w-3.5 h-3.5 text-slate-500" />
      <div className="flex items-baseline gap-2">
        <span className="font-bold text-slate-900">{localTimeStr}</span>
        <span className="text-slate-500 text-[10px]">({utcTimeStr})</span>
        <span className="hidden md:inline text-slate-600 border-l border-slate-300 pl-2 text-[11px]">{dateStr}</span>
      </div>
    </div>
  );
};
