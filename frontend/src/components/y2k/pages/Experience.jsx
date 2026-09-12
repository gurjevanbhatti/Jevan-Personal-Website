import React from "react";
import Window from "../Window";
import { Heart, Star } from "../Sticker";
import { experience } from "../../../data/mock";
import { Briefcase, MapPin } from "lucide-react";

export default function ExperiencePage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <Window title="work_history.doc" icon={<Briefcase size={12} />}> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experience.map((x, i) => (
              <div key={i} className="rounded-md border-[2px] border-[#4a2b5c] bg-white p-4 shadow-[3px_3px_0_0_#4a2b5c] hover:-translate-y-1 transition-transform relative overflow-hidden">
                <div className="absolute -right-3 -top-3 opacity-30 rotate-12"><Star className="w-14 h-14" color="#b8a3e3" /></div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bubble text-[22px] text-[#e77bb8] leading-none">{x.company}</div>
                    <div className="font-body text-[14px] text-[#4a2b5c] mt-1 font-semibold">{x.role}</div>
                  </div>
                  <Heart className="w-5 h-5 shrink-0" color="#f1a8d0" />
                </div>
                <div className="font-pixel text-[11px] text-[#a06a94] mt-2 flex items-center gap-2"><span>{x.years}</span><span className="opacity-60">·</span><span className="inline-flex items-center gap-1"><MapPin size={11} /> {x.location}</span></div>
                <ul className="mt-3 space-y-2 font-body text-[13px] text-[#4a2b5c]">
                  {x.bullets.map((b, j) => (<li key={j} className="flex gap-2"><Star className="w-3 h-3 shrink-0 mt-1.5" color="#e77bb8" /> <span>{b}</span></li>))}
                </ul>
              </div>
            ))}
          </div>
        </Window>
      </div>
    </div>
  );
}
