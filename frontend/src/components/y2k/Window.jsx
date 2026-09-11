import React from "react";
import { Minus, Square, X } from "lucide-react";

/**
 * Y2K/XP-style window frame.
 * variant: "pink" | "purple" | "blue" | "yellow"
 */
export default function Window({ title, icon, variant = "pink", className = "", bodyClassName = "", children, headerRight }) {
  const bars = {
    pink: "from-[#ff9ed6] via-[#ff6fbf] to-[#ff9ed6]",
    purple: "from-[#c9a8ff] via-[#a97dff] to-[#c9a8ff]",
    blue: "from-[#a8dcff] via-[#7fbfff] to-[#a8dcff]",
    yellow: "from-[#ffe58a] via-[#ffd24a] to-[#ffe58a]"
  }[variant];

  return (
    <div className={`y2k-window relative rounded-[10px] bg-white border-[2px] border-[#3b1f4a] shadow-[4px_4px_0_0_#3b1f4a] ${className}`}>
      <div className={`title-bar flex items-center justify-between gap-2 px-2 py-1 rounded-t-[8px] bg-gradient-to-b ${bars} border-b-[2px] border-[#3b1f4a]`}>
        <div className="flex items-center gap-2 min-w-0">
          {icon ? <span className="shrink-0 text-[#3b1f4a]">{icon}</span> : null}
          <span className="font-pixel text-[13px] tracking-wide text-[#3b1f4a] truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          {headerRight}
          <button aria-label="minimize" className="win-btn"><Minus size={10} strokeWidth={3} /></button>
          <button aria-label="maximize" className="win-btn"><Square size={9} strokeWidth={3} /></button>
          <button aria-label="close" className="win-btn"><X size={10} strokeWidth={3} /></button>
        </div>
      </div>
      <div className={`p-3 ${bodyClassName}`}>{children}</div>
    </div>
  );
}
