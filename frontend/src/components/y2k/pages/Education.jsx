import React from "react";
import Window from "../Window";
import { Star } from "../Sticker";
import { education } from "../../../data/mock";
import { GraduationCap, Award } from "lucide-react";

export default function EducationPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-8">
        <Window title="education.doc" icon={<GraduationCap size={12} />}> 
          <div className="space-y-3">
            {education.map((e, i) => (
              <div key={i} className="rounded-md border-[2px] border-[#4a2b5c] bg-[#fff7fb] p-4 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-30"><Star className="w-14 h-14" color="#b8a3e3" /></div>
                <div className="flex items-center justify-between gap-2">
                  <div className="font-bubble text-[24px] text-[#e77bb8] leading-none">{e.school}</div>
                  <span className="font-pixel text-[11px] px-2 py-1 rounded bg-[#ffe6f3] border-[2px] border-[#4a2b5c] shadow-[2px_2px_0_0_#4a2b5c] whitespace-nowrap">{e.years}</span>
                </div>
                <div className="font-body text-[14px] text-[#4a2b5c] mt-2 font-semibold">{e.degree}</div>
                <div className="font-body text-[13px] text-[#a06a94] mt-1">{e.detail}</div>
              </div>
            ))}
          </div>
        </Window>
      </div>

      <aside className="col-span-12 md:col-span-4 space-y-4">
        <Window title="awards" variant="yellow" icon={<Award size={12} />}> 
          <ul className="font-body text-[13px] text-[#4a2b5c] space-y-2">
            <li className="flex gap-2"><Star className="w-4 h-4 shrink-0 mt-0.5" color="#e77bb8" /> Undergraduate Award for Women in Faculty of Science 2025</li>
            <li className="flex gap-2"><Star className="w-4 h-4 shrink-0 mt-0.5" color="#b8a3e3" /> Simon Fraser Data Science Dean's shout-out</li>
          </ul>
        </Window>
        <Window title="communities" variant="purple">
          <ul className="font-body text-[13px] text-[#4a2b5c] space-y-2">
            <li>♡ Women in Computer Science (WiCS)</li>
            <li>♡ Girls Who Code (GWC)</li>
            <li>♡ CodePath · TEALS mentor</li>
          </ul>
        </Window>
        <Window title="coursework" variant="blue">
          <div className="flex flex-wrap gap-2">
            {["Machine Learning", "Big Data", "Databases", "Algorithms", "Stats", "Distributed Sys", "Data Viz", "NLP"].map((c) => (
              <span key={c} className="font-pixel text-[11px] px-2 py-1 rounded-md border-[2px] border-[#4a2b5c] bg-white hover:bg-[#ffe6f3] transition-colors">{c}</span>
            ))}
          </div>
        </Window>
      </aside>
    </div>
  );
}
