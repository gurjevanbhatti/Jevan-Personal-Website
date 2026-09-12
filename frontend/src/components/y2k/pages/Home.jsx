import React from "react";
import Window from "../Window";
import { profile } from "../../../data/mock";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, GraduationCap, Wrench, Briefcase, Mail, Sparkles, Palmtree, MapPin, School } from "lucide-react";
import { MetaLogo, AmazonLogo, MicrosoftLogo, InstagramLogo, GeorgiaTechLogo, TrophyLogo } from "../Logos";

const accomplishments = [
  { Logo: GeorgiaTechLogo, text: <>&apos;27 Incoming <b>MSc Data Science</b> @ Georgia Tech</> },
  { Logo: MetaLogo,        text: <>&apos;25 Production Engineering Fellow @ <b>Meta</b> &times; MLH</> },
  { Logo: AmazonLogo,      text: <>&apos;24 Student Software Developer @ <b>Amazon</b> (SFU &times; AWS)</> },
  { Logo: InstagramLogo,   text: <>&apos;25 Analyzed <b>50M+ views</b> for Instagram Creators Platform</> },
  { Logo: MicrosoftLogo,   text: <>&apos;24 SWE Instructor @ <b>Microsoft</b> TEALS &middot; 30k+ students mentored</> },
  { Logo: TrophyLogo,      text: <><b>2nd Place</b> @ cmd-f 2024, Canada&apos;s largest women&apos;s hackathon</> }
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative bg-gradient-to-b from-[#d9ecff] to-[#ffe6f3] rounded-2xl border-[2px] border-[#4a2b5c] shadow-[4px_4px_0_0_#4a2b5c] p-6 md:p-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-60 clouds" />
        <div className="grid grid-cols-12 gap-6 items-start relative">
          <div className="col-span-12 md:col-span-7">
            <div className="font-bubble text-[52px] md:text-[76px] leading-[0.95] tracking-tight bg-gradient-to-b from-[#e77bb8] via-[#f1a8d0] to-[#a06a94] text-transparent bg-clip-text drop-shadow-[2px_2px_0_#fff]">
              Hi, I&apos;m Jevan ♡
            </div>
            <p className="mt-3 font-body text-[14px] md:text-[15px] text-[#4a2b5c] max-w-[520px]">
              Aspiring data scientist based in Vancouver. I love turning numbers into stories that actually mean something ♡
            </p>
            <ul className="mt-5 space-y-3">
              {accomplishments.map(({ Logo, text }, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Logo />
                  <span className="font-body text-[14px] md:text-[15px] text-[#4a2b5c] leading-snug">{text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => navigate("/experience")} className="y2k-btn">See my work</button>
              <button onClick={() => navigate("/about")} className="y2k-btn ghost">About me</button>
              <button onClick={() => navigate("/contact")} className="y2k-btn ghost">Message Me!</button>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div className="max-w-[340px] mx-auto md:sticky md:top-4">
              <Window title="me.jpg" variant="purple" bodyClassName="p-1">
                <img src={profile.avatar} alt="Jevan" className="w-full h-[340px] object-cover rounded-md" />
              </Window>
            </div>
          </div>
        </div>
      </div>

      {/* Cards row below hero */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { to: "/education", title: "Education", Icon: GraduationCap, sub: "Georgia Tech · SFU" },
          { to: "/skills", title: "Skills", Icon: Wrench, sub: "Python, SQL, ML, AWS" },
          { to: "/experience", title: "Experience", Icon: Briefcase, sub: "Meta · Amazon · IG" },
          { to: "/contact", title: "Contact", Icon: Mail, sub: "Let\u2019s chat ♡" }
        ].map(({ to, title, Icon, sub }) => (
          <Link key={to} to={to} className="group">
            <div className="h-full rounded-xl bg-white border-[2px] border-[#4a2b5c] shadow-[3px_3px_0_0_#4a2b5c] p-4 flex items-center gap-3 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-lg bg-[#fff0f8] border-[2px] border-[#4a2b5c] flex items-center justify-center text-[#a06a94] shrink-0"><Icon size={22} /></div>
              <div className="min-w-0">
                <div className="font-bubble text-[24px] text-[#e77bb8] leading-none">{title}</div>
                <div className="font-body text-[13px] text-[#4a2b5c] mt-1 truncate">{sub}</div>
              </div>
              <ChevronRight className="ml-auto text-[#a06a94] group-hover:translate-x-1 transition-transform shrink-0" size={18} />
            </div>
          </Link>
        ))}
      </div>

      {/* Info strip */}
      <div className="mt-6">
        <div className="rounded-2xl border-[2px] border-[#4a2b5c] bg-gradient-to-r from-[#ffe6f3] via-[#f2e2ff] to-[#d9ecff] shadow-[4px_4px_0_0_#4a2b5c] px-4 py-5 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { Icon: Sparkles, t: "OPEN TO WORK", s: "Summer 2027 Internships" },
            { Icon: MapPin, t: "BASED IN", s: "Greater Vancouver, BC" },
            { Icon: School, t: "STUDYING", s: "MSc Data Science @ Georgia Tech" },
            { Icon: Palmtree, t: "CURRENTLY", s: "Taking a break before school starts ♡" }
          ].map(({ Icon, t, s }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-white border-[2px] border-[#4a2b5c] shadow-[2px_2px_0_0_#4a2b5c] flex items-center justify-center text-[#a06a94] shrink-0"><Icon size={22} /></div>
              <div className="font-body text-[13px] text-[#4a2b5c] min-w-0">
                <div className="font-pixel text-[11px] text-[#a06a94]">{t}</div>
                <div className="truncate">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
