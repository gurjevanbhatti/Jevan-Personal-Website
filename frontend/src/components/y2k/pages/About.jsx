import React from "react";
import Window from "../Window";
import { Heart, Star, Sparkle } from "../Sticker";
import { profile, about } from "../../../data/mock";
import { User, Mail, MapPin, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-8">
        <Window title="about_me.txt" icon={<User size={12} />}> 
          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-5 md:col-span-2">
              <div className="rounded-lg border-[2px] border-[#4a2b5c] p-2 bg-[#fff0f8]">
                <img src="/assets/jevan-about.jpg" alt="Jevan" className="w-full h-64 object-cover rounded" />
                <div className="mt-3 font-body text-[13px] text-[#4a2b5c] leading-relaxed space-y-1">
                  <div className="flex items-center gap-2"><span className="font-pixel text-[10px] text-[#a06a94] w-16">NAME</span> Gurjevan Kaur Bhatti</div>
                  <div className="flex items-center gap-2"><span className="font-pixel text-[10px] text-[#a06a94] w-16">CALL ME</span> Jevan</div>
                  <div className="flex items-center gap-2"><span className="font-pixel text-[10px] text-[#a06a94] w-16">LOCATION</span> Vancouver, BC</div>
                  <div className="flex items-center gap-2"><span className="font-pixel text-[10px] text-[#a06a94] w-16">STATUS</span> Open to internships</div>
                </div>
              </div>
            </div>
            <div className="col-span-5 md:col-span-3 font-body text-[15px] text-[#4a2b5c] leading-relaxed">
              <p className="font-bubble text-[30px] text-[#e77bb8] leading-none mb-3">Hi, I&apos;m Jevan ♡</p>
              <p className="text-[16px] text-[#a06a94] mb-3">{about.intro}</p>
              <p>{about.body}</p>
            </div>
          </div>
        </Window>
      </div>

      <aside className="col-span-12 md:col-span-4 space-y-4">
        <Window title="fun facts" variant="purple" icon={<Sparkle className="w-3 h-3" />}> 
          <ul className="font-body text-[14px] text-[#4a2b5c] space-y-3 leading-relaxed">
            {about.funFacts.map((f, i) => (
              <li key={i} className="flex gap-2"><Heart className="w-4 h-4 shrink-0 mt-0.5" color="#e77bb8" /> <span>{f}</span></li>
            ))}
          </ul>
        </Window>

        <Window title="receipts" variant="yellow" icon={<Sparkles size={12} />}> 
          <ul className="font-body text-[14px] text-[#4a2b5c] space-y-3 leading-relaxed">
            <li className="flex gap-2"><Star className="w-4 h-4 shrink-0 mt-0.5" color="#e6b800" /> <span>Undergraduate Award for Women in the Faculty of Science, 2025</span></li>
            <li className="flex gap-2"><Star className="w-4 h-4 shrink-0 mt-0.5" color="#b8a3e3" /> <span>Women in Computer Science (WiCS) member</span></li>
            <li className="flex gap-2"><Star className="w-4 h-4 shrink-0 mt-0.5" color="#f1a8d0" /> <span>Girls Who Code (GWC) member</span></li>
          </ul>
        </Window>
      </aside>
    </div>
  );
}
