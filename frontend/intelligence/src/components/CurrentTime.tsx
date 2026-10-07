import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const CurrentTime: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const localTimeStr = time.toLocaleTimeString('en-US', { hour12: false });
  const utcTimeStr = time.toISOString().substring(11, 19) + ' UTC';
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex items-center gap-2 bg-slate-100 border border-slate-300 px-3 py-1 rounded-lg text-xs font-mono text-slate-700 shadow-2xs">
      <Clock className="w-3.5 h-3.5 text-slate-500" />
      <span className="font-bold text-slate-900">{localTimeStr}</span>
      <span className="text-slate-400 text-[10px]">({utcTimeStr})</span>
      <span className="text-slate-300">|</span>
      <span className="text-slate-600 font-sans text-[11px]">{dateStr}</span>
    </div>
  );
};
