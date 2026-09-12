import React from "react";
import Window from "../Window";
import { Heart } from "../Sticker";
import { skills } from "../../../data/mock";
import { Wrench, Code2, Database } from "lucide-react";

function Bar({ name, level, color }) {
  return (
    <div>
      <div className="flex items-center justify-between font-body text-[13px] text-[#4a2b5c]"><span>{name}</span><span className="text-[#a06a94]">{level}%</span></div>
      <div className="h-3 rounded-full bg-[#ffe6f3] border-[2px] border-[#4a2b5c] overflow-hidden">
        <div className="h-full" style={{ width: `${level}%`, background: `linear-gradient(90deg, ${color}, #ffd6ec)` }} />
      </div>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-8">
        <Window title="skills.exe" icon={<Wrench size={12} />}> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-bubble text-[24px] text-[#e77bb8] leading-none mb-3 flex items-center gap-2"><Database size={20} /> data ♡</div>
              <div className="space-y-3">
                {skills.data.map((s) => (<Bar key={s.name} name={s.name} level={s.level} color="#e77bb8" />))}
              </div>
            </div>
            <div>
              <div className="font-bubble text-[24px] text-[#b8a3e3] leading-none mb-3 flex items-center gap-2"><Code2 size={20} /> code ✦</div>
              <div className="space-y-3">
                {skills.code.map((s) => (<Bar key={s.name} name={s.name} level={s.level} color="#b8a3e3" />))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="font-pixel text-[12px] text-[#a06a94] mb-2">soft skills:</div>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((s) => (
                <span key={s} className="font-pixel text-[11px] px-2 py-1 rounded-md border-[2px] border-[#4a2b5c] bg-[#fff0f8] hover:bg-[#ffd6ec] transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </Window>
      </div>

      <aside className="col-span-12 md:col-span-4 space-y-4">
        <Window title="toolbelt" variant="purple"> 
          <div className="grid grid-cols-2 gap-2 font-pixel text-[11px] text-[#4a2b5c]">
            {["Python", "SQL", "AWS", "Docker", "Git", "PyTorch", "Pandas", "Spark", "Airflow", "Tableau"].map((t) => (
              <div key={t} className="px-2 py-2 rounded-md border-[2px] border-[#4a2b5c] bg-white text-center shadow-[2px_2px_0_0_#4a2b5c]">{t}</div>
            ))}
          </div>
        </Window>
        <Window title="currently learning" variant="yellow">
          <ul className="font-body text-[13px] text-[#4a2b5c] space-y-2">
            <li className="flex gap-2"><Heart className="w-3 h-3 shrink-0 mt-1" color="#e77bb8" /> Large-scale ML systems</li>
            <li className="flex gap-2"><Heart className="w-3 h-3 shrink-0 mt-1" color="#b8a3e3" /> Rust for data tooling</li>
            <li className="flex gap-2"><Heart className="w-3 h-3 shrink-0 mt-1" color="#f1a8d0" /> Causal inference</li>
          </ul>
        </Window>
      </aside>
    </div>
  );
}
