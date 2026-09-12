import React from "react";
import Window from "../Window";
import { Heart, Star, Sparkle } from "../Sticker";
import { profile, about } from "../../../data/mock";
import { User } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-8">
        <Window title="about_me.txt" icon={<User size={12} />}> 
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-5 md:col-span-2">
              <div className="rounded-lg border-[2px] border-[#4a2b5c] p-2 bg-[#fff0f8]">
                <img src={profile.avatar} alt="me" className="w-full h-52 object-cover rounded" />
                <div className="mt-2 font-pixel text-[11px] text-[#4a2b5c] leading-relaxed">
                  <div><b>NAME:</b> {profile.name}</div>
                  <div><b>PRONOUNS:</b> {profile.pronouns}</div>
                  <div><b>LOCATION:</b> {profile.location}</div>
                  <div><b>STATUS:</b> {profile.status}</div>
                  <div><b>LIKES:</b> {profile.likes.join(", ")}</div>
                  <div><b>DISLIKES:</b> {profile.dislikes.join(", ")}</div>
                </div>
              </div>
            </div>
            <div className="col-span-5 md:col-span-3 font-body text-[15px] text-[#4a2b5c] leading-relaxed">
              <p className="font-bubble text-[26px] text-[#e77bb8] leading-none mb-3">hi, i&apos;m {profile.firstName} ♡</p>
              <p className="text-[16px] text-[#a06a94] mb-2">{about.intro}</p>
              <p>{about.body}</p>
              <div className="mt-4 rounded-md border-[2px] border-dashed border-[#f1a8d0] bg-[#fff7fb] p-3">
                <div className="font-bubble text-[20px] text-[#e77bb8] leading-none">fun facts ♡</div>
                <ul className="mt-2 space-y-1">
                  {about.funFacts.map((f, i) => (<li key={i} className="flex gap-2"><Heart className="w-3 h-3 shrink-0 mt-1" color="#e77bb8" /> {f}</li>))}
                </ul>
              </div>
            </div>
          </div>
        </Window>
      </div>

      <aside className="col-span-12 md:col-span-4 space-y-4">
        <Window title="lately" variant="purple" icon={<Sparkle className="w-3 h-3" />}> 
          <ul className="font-body text-[13px] text-[#4a2b5c] space-y-2">
            <li>♡ prepping for gatech ms in ds</li>
            <li>♡ mentoring cs students @ codepath</li>
            <li>♡ finishing bs in ds @ sfu</li>
            <li>♡ open to summer 2027 internships</li>
          </ul>
        </Window>
        <Window title="receipts" variant="yellow">
          <div className="font-pixel text-[12px] text-[#4a2b5c] space-y-2">
            <div>✦ undergraduate award for women in science 2025</div>
            <div>✦ women in cs (wics) member</div>
            <div>✦ girls who code (gwc) member</div>
            <div>✦ 2,084 followers · 500+ connections</div>
          </div>
        </Window>
        <Window title="sticker pack" variant="blue">
          <div className="grid grid-cols-3 gap-2 p-1">
            <div className="flex items-center justify-center h-16 rounded-md bg-[#fff0f8] border-[2px] border-[#4a2b5c]"><Heart className="w-10 h-10" color="#f1a8d0" /></div>
            <div className="flex items-center justify-center h-16 rounded-md bg-[#e6f0ff] border-[2px] border-[#4a2b5c]"><Star className="w-10 h-10" color="#b8a3e3" /></div>
            <div className="flex items-center justify-center h-16 rounded-md bg-[#fff7d6] border-[2px] border-[#4a2b5c]"><Sparkle className="w-8 h-8" color="#e77bb8" /></div>
          </div>
        </Window>
      </aside>
    </div>
  );
}
