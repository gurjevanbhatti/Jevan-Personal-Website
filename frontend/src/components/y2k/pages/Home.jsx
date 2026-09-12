import React, { useState } from "react";
import Window from "../Window";
import { Butterfly, Heart, Star, Sparkle } from "../Sticker";
import { profile, quickLinks, playlist } from "../../../data/mock";
import { Link, useNavigate } from "react-router-dom";
import { Play, Pause, SkipBack, SkipForward, Music2, Heart as HeartIcon, Star as StarIcon, Sparkles, ChevronRight, GraduationCap, Wrench, Briefcase, Mail } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const [nowPlaying, setNowPlaying] = useState(playlist.find((p) => p.playing) || playlist[1]);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3 space-y-4">
          <Window title="quick links" icon={<Sparkle className="w-3 h-3" color="#4a2b5c" />}> 
            <ul className="font-pixel text-[13px] text-[#4a2b5c] divide-y divide-[#f7d8ea]">
              {quickLinks.map((q) => (
                <li key={q}>
                  <Link to={`/${q}`} className="w-full flex items-center justify-between py-2 hover:text-[#e77bb8] transition-colors">
                    <span className="flex items-center gap-2"><HeartIcon size={12} className="text-[#e77bb8]" /> {q}</span>
                    <ChevronRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </Window>

          <Window title="welcome babe!" variant="purple" icon={<Heart className="w-3 h-3" />}>
            <div className="flex gap-3">
              <div className="w-16 h-20 rounded-md border-[2px] border-[#4a2b5c] bg-gradient-to-b from-[#ffe6f3] to-[#ffc9e3] flex items-center justify-center shrink-0">
                <Heart className="w-9 h-9" color="#f1a8d0" />
              </div>
              <p className="font-body text-[13px] leading-relaxed text-[#4a2b5c]">
                thanks 4 stopping by! <br/>i hope u find<br/>something cute 2day <br/><span className="text-[#e77bb8]">♡ xoxo, {profile.firstName}</span>
              </p>
            </div>
          </Window>

          <Window title="stats" variant="yellow">
            <ul className="font-pixel text-[12px] text-[#4a2b5c] space-y-1">
              {profile.stats.map((s) => (
                <li key={s.k} className="flex justify-between"><span>{s.k}</span><b className="text-[#e77bb8]">{s.v}</b></li>
              ))}
            </ul>
          </Window>
        </div>

        <div className="col-span-12 md:col-span-6">
          <div className="relative bg-gradient-to-b from-[#d9ecff] to-[#ffe6f3] rounded-2xl border-[2px] border-[#4a2b5c] shadow-[4px_4px_0_0_#4a2b5c] p-5 md:p-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-60 clouds" />
            <div className="absolute top-3 right-4"><Sparkle className="w-4 h-4" color="#fff" /></div>
            <div className="absolute bottom-4 left-6 rotate-[-8deg] opacity-80"><Star className="w-8 h-8" color="#c9b6ff" /></div>
            <div className="grid grid-cols-5 gap-4 items-center relative">
              <div className="col-span-5 md:col-span-3">
                <div className="font-bubble text-[46px] md:text-[62px] leading-[0.95] tracking-tight bg-gradient-to-b from-[#e77bb8] via-[#f1a8d0] to-[#a06a94] text-transparent bg-clip-text drop-shadow-[2px_2px_0_#fff]">
                  hi, i&apos;m<br/>{profile.firstName} ♡
                </div>
                <p className="mt-3 font-body text-[14px] text-[#4a2b5c] leading-relaxed">{profile.headline}.<br/>{profile.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => navigate("/experience")} className="y2k-btn">see my work</button>
                  <button onClick={() => navigate("/about")} className="y2k-btn ghost">about me</button>
                  <button onClick={() => navigate("/contact")} className="y2k-btn ghost">say hi ♡</button>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 font-pixel text-[12px] text-[#a06a94]">
                  <span className="underline">msc @ gatech</span>
                  <span className="underline">ex meta · amazon</span>
                  <span className="underline">open 4 s27 ♡</span>
                </div>
              </div>
              <div className="col-span-5 md:col-span-2">
                <div className="relative">
                  <Window title="me.jpg" variant="purple" bodyClassName="p-1">
                    <img src={profile.avatar} alt="gurjevan" className="w-full h-[240px] object-cover rounded-md" />
                  </Window>
                  <div className="absolute -top-6 -left-6"><Butterfly className="w-14 h-14" color="#f1a8d0" /></div>
                  <div className="absolute -bottom-4 -right-4 rotate-12"><Star className="w-10 h-10" color="#f1a8d0" /></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { to: "/education", title: "education", Icon: GraduationCap, sub: "gatech + sfu" },
              { to: "/skills", title: "skills", Icon: Wrench, sub: "python, sql, ml, aws" },
              { to: "/experience", title: "experience", Icon: Briefcase, sub: "meta · amazon · instagram" },
              { to: "/contact", title: "contact", Icon: Mail, sub: "let's chat ♡" }
            ].map(({ to, title, Icon, sub }) => (
              <Link key={to} to={to} className="group">
                <div className="rounded-xl bg-white border-[2px] border-[#4a2b5c] shadow-[3px_3px_0_0_#4a2b5c] p-4 flex items-center gap-3 hover:-translate-y-1 transition-transform">
                  <div className="w-11 h-11 rounded-lg bg-[#fff0f8] border-[2px] border-[#4a2b5c] flex items-center justify-center text-[#a06a94]"><Icon size={22} /></div>
                  <div>
                    <div className="font-bubble text-[22px] text-[#e77bb8] leading-none">{title}</div>
                    <div className="font-body text-[12px] text-[#4a2b5c] mt-1">{sub}</div>
                  </div>
                  <ChevronRight className="ml-auto text-[#a06a94] group-hover:translate-x-1 transition-transform" size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="col-span-12 md:col-span-3 space-y-4">
          <Window title="new message!" variant="blue">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-md bg-[#ffe6f3] border-[2px] border-[#4a2b5c] flex items-center justify-center"><HeartIcon size={18} className="text-[#e77bb8]" /></div>
              <div className="font-body text-[13px] text-[#4a2b5c]">you have<br/><span className="text-[#e77bb8] font-bold">(1)</span> new message</div>
            </div>
            <button onClick={() => navigate("/contact")} className="mt-3 y2k-btn w-full">open ♡</button>
          </Window>

          <Window title="now playing" variant="pink" icon={<Music2 size={12} />}> 
            <div className="font-body text-[13px] text-[#4a2b5c]">{nowPlaying.t}.mp3<br/><span className="text-[#a06a94]">by everydream</span></div>
            <div className="mt-2 h-2 rounded-full bg-[#ffe6f3] overflow-hidden border border-[#4a2b5c]"><div className="h-full w-1/3 bg-[#e77bb8]" /></div>
            <div className="mt-2 flex items-center justify-around text-[#4a2b5c]">
              <button className="y2k-icon"><SkipBack size={16} /></button>
              <button className="y2k-icon" onClick={() => setIsPlaying((v) => !v)}>{isPlaying ? <Pause size={18} /> : <Play size={18} />}</button>
              <button className="y2k-icon"><SkipForward size={16} /></button>
            </div>
            <ul className="mt-3 font-body text-[12px] text-[#4a2b5c] max-h-[150px] overflow-auto pr-1">
              {playlist.map((p) => (
                <li key={p.n} onClick={() => setNowPlaying(p)} className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer hover:bg-[#ffe6f3] ${nowPlaying.n === p.n ? "bg-[#ffd6ec]" : ""}`}>
                  <span className="tabular-nums w-6">{p.n}</span>
                  <span className="flex-1 truncate px-2">{p.t}</span>
                  <span className="tabular-nums">{p.d}</span>
                </li>
              ))}
            </ul>
          </Window>

          <Window title="don't forget" variant="yellow">
            <ul className="font-body text-[13px] text-[#4a2b5c] space-y-1">
              <li>♡ drink water</li>
              <li>♡ review 1 ml paper</li>
              <li>♡ push code before sleep</li>
              <li>♡ be kind ♡</li>
            </ul>
          </Window>
        </aside>
      </div>

      <div className="mt-6">
        <div className="rounded-2xl border-[2px] border-[#4a2b5c] bg-gradient-to-r from-[#ffe6f3] via-[#f2e2ff] to-[#d9ecff] shadow-[4px_4px_0_0_#4a2b5c] px-4 py-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[{ Icon: Sparkles, t: "OPEN TO WORK", s: "summer 2027 internships" }, { Icon: HeartIcon, t: "BASED IN", s: "greater vancouver, bc" }, { Icon: StarIcon, t: "STUDYING", s: "msc ds @ georgia tech" }, { Icon: Music2, t: "CURRENTLY", s: "reading ml systems papers" }].map(({ Icon, t, s }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-white border-[2px] border-[#4a2b5c] shadow-[2px_2px_0_0_#4a2b5c] flex items-center justify-center text-[#a06a94]"><Icon size={22} /></div>
              <div className="font-body text-[12px] text-[#4a2b5c]"><div className="font-pixel text-[11px] text-[#a06a94]">{t}</div><div>{s}</div></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
