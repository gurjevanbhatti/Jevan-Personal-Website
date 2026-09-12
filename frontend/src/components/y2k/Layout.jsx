import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, User, GraduationCap, Wrench, Briefcase, Mail, Search, MousePointer2 } from "lucide-react";
import Taskbar from "./Taskbar";

const navItems = [
  { to: "/", label: "home", Icon: Home, tab: "welcome.html" },
  { to: "/about", label: "about", Icon: User, tab: "about_me.txt" },
  { to: "/education", label: "education", Icon: GraduationCap, tab: "education.doc" },
  { to: "/skills", label: "skills", Icon: Wrench, tab: "skills.exe" },
  { to: "/experience", label: "experience", Icon: Briefcase, tab: "work.doc" },
  { to: "/contact", label: "contact", Icon: Mail, tab: "contact.exe" }
];

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);

  const activeTab = navItems.find((n) => n.to === pathname) || navItems[0];
  const tabs = [
    { id: activeTab.to, label: activeTab.tab },
    ...navItems.filter((n) => n.to !== activeTab.to).slice(0, 2).map((n) => ({ id: n.to, label: n.tab }))
  ];

  return (
    <div className="y2k-root min-h-screen w-full pb-20">
      <div className="h-8 bg-[#e77bb8] text-white flex items-center overflow-hidden border-b-[2px] border-[#4a2b5c]">
        <div className="marquee flex gap-10 whitespace-nowrap font-pixel text-[12px] px-4">
          <span>✦ Hi babe ♡ welcome to Jevan's portfolio</span>
          <span>✦ Open to Summer 2027 internships</span>
          <span>✦ Ex Meta · Amazon · Instagram · Microsoft</span>
          <span>✦ MSc Data Science @ Georgia Tech</span>
          <span>✦ Hi babe ♡ welcome to Jevan's portfolio</span>
          <span>✦ Open to Summer 2027 internships</span>
          <span>✦ Ex Meta · Amazon · Instagram · Microsoft</span>
          <span>✦ MSc Data Science @ Georgia Tech</span>
        </div>
      </div>

      <header className="px-4 md:px-8 pt-6">
        <div className="max-w-[1240px] mx-auto grid grid-cols-12 gap-4 items-start">
          <div className="col-span-12 md:col-span-3">
            <NavLink to="/" className="block">
              <div className="relative bg-white border-[2px] border-[#4a2b5c] rounded-2xl px-4 py-4 shadow-[4px_4px_0_0_#4a2b5c] hover:-translate-y-[2px] transition-transform text-center">
                <div className="font-bubble text-[28px] leading-[1] bg-gradient-to-b from-[#e77bb8] to-[#a06a94] text-transparent bg-clip-text drop-shadow-[2px_2px_0_#fff]">Personal Portfolio</div>
              </div>
            </NavLink>
          </div>

          <nav className="col-span-12 md:col-span-6">
            <div className="bg-white border-[2px] border-[#4a2b5c] rounded-2xl px-3 py-3 shadow-[4px_4px_0_0_#4a2b5c] flex items-center justify-between gap-2">
              {navItems.map(({ to, label, Icon }) => (
                <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => `nav-item ${isActive ? "nav-active" : ""}`}>
                  <div className="nav-icon"><Icon size={22} strokeWidth={2.2} /></div>
                  <div className="font-pixel text-[11px] mt-1">{label}</div>
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="col-span-12 md:col-span-3">
            <form onSubmit={(e) => { e.preventDefault(); navigate("/contact"); }} className="bg-white border-[2px] border-[#4a2b5c] rounded-2xl p-2 shadow-[4px_4px_0_0_#4a2b5c] flex items-center gap-2">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Message Jevan here!" className="flex-1 h-10 px-3 rounded-lg border-[2px] border-[#4a2b5c] bg-white font-body text-[13px] outline-none focus:ring-2 focus:ring-[#f1a8d0]" />
              <button className="h-10 px-3 rounded-lg bg-[#e77bb8] border-[2px] border-[#4a2b5c] text-white shadow-[2px_2px_0_0_#4a2b5c] hover:bg-[#d76aa9] transition-colors" aria-label="go to contact">
                <Search size={16} />
              </button>
              <MousePointer2 size={22} className="text-[#4a2b5c] -ml-1 rotate-12" />
            </form>
          </div>
        </div>
      </header>

      <main className="px-4 md:px-8 mt-6">
        <div className="max-w-[1240px] mx-auto">
          <Outlet />
        </div>
      </main>

      <Taskbar tabs={tabs} onTabClick={(id) => navigate(id)} />
    </div>
  );
}
