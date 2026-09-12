import React, { useEffect, useState } from "react";
import { Wifi, Volume2, BatteryFull, Sparkles } from "lucide-react";

export default function Taskbar({ tabs = [], onTabClick }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);
  const hh = time.getHours() % 12 || 12;
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ampm = time.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="h-10 border-t-[2px] border-[#4a2b5c] bg-gradient-to-b from-[#ffd6ec] to-[#ffb6d5] flex items-center px-2 gap-2">
        <button className="h-8 flex items-center gap-2 px-3 rounded-md bg-white/80 border-[2px] border-[#4a2b5c] shadow-[2px_2px_0_0_#4a2b5c] font-pixel text-[12px] text-[#4a2b5c] hover:bg-white transition-colors">
          <Sparkles size={14} className="text-[#a06a94]" /> start
        </button>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onTabClick?.(t.id)}
              className="h-8 shrink-0 px-3 rounded-md bg-white/80 border-[2px] border-[#4a2b5c] shadow-[2px_2px_0_0_#4a2b5c] font-pixel text-[11px] text-[#4a2b5c] hover:bg-white transition-colors"
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="ml-auto h-8 flex items-center gap-3 px-3 rounded-md bg-white/80 border-[2px] border-[#4a2b5c] shadow-[2px_2px_0_0_#4a2b5c] font-pixel text-[12px] text-[#4a2b5c]">
          <Wifi size={14} /> <Volume2 size={14} /> <BatteryFull size={14} />
          <span>{hh}:{mm} {ampm}</span>
        </div>
      </div>
    </div>
  );
}
