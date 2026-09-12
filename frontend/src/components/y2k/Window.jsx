import React, { useState } from "react";
import { Minus, Square, X, ChevronUp } from "lucide-react";

export default function Window({ title, icon, variant = "pink", className = "", bodyClassName = "", children, headerRight, defaultMinimized = false }) {
  const [minimized, setMinimized] = useState(defaultMinimized);
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  const bars = {
    pink: "from-[#ffe6f3] via-[#ffb6d5] to-[#ffe6f3]",
    purple: "from-[#efe1ff] via-[#d0bcf3] to-[#efe1ff]",
    blue: "from-[#e2f0ff] via-[#b8d6ff] to-[#e2f0ff]",
    yellow: "from-[#fff4c9] via-[#ffe58a] to-[#fff4c9]"
  }[variant];

  const toggleMin = (e) => { e?.stopPropagation?.(); setMinimized((m) => !m); };
  const close = (e) => { e?.stopPropagation?.(); setClosed(true); };

  return (
    <div className={`y2k-window relative rounded-[10px] bg-white border-[2px] border-[#4a2b5c] shadow-[4px_4px_0_0_#4a2b5c] ${minimized ? "overflow-hidden" : ""} ${className}`}>
      <div
        className={`title-bar flex items-center justify-between gap-2 px-2 py-1.5 rounded-t-[8px] bg-gradient-to-b ${bars} ${minimized ? "rounded-b-[8px] cursor-pointer hover:brightness-105" : "border-b-[2px] border-[#4a2b5c]"}`}
        onDoubleClick={() => setMinimized((m) => !m)}
        onClick={minimized ? () => setMinimized(false) : undefined}
        title={minimized ? "Click to expand" : "Double-click to minimize"}
      >
        <div className="flex items-center gap-2 min-w-0">
          {icon ? <span className="shrink-0 text-[#4a2b5c]">{icon}</span> : null}
          <span className="font-pixel text-[13px] tracking-wide text-[#4a2b5c] truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {headerRight}
          <button aria-label={minimized ? "restore" : "minimize"} onClick={toggleMin} className="win-btn">
            {minimized ? <ChevronUp size={10} strokeWidth={3} /> : <Minus size={10} strokeWidth={3} />}
          </button>
          <button aria-label="toggle" onClick={toggleMin} className="win-btn"><Square size={9} strokeWidth={3} /></button>
          <button aria-label="close" onClick={close} className="win-btn hover:bg-[#ffb6d5]"><X size={10} strokeWidth={3} /></button>
        </div>
      </div>
      {!minimized && <div className={`p-3 md:p-4 ${bodyClassName}`}>{children}</div>}
    </div>
  );
}
