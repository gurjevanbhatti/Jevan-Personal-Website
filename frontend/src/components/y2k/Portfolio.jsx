import React, { useState } from "react";
import Window from "./Window";
import Taskbar from "./Taskbar";
import { Butterfly, Heart, Star, Sparkle } from "./Sticker";
import { profile, about, education, skills, experience, quickLinks, playlist } from "../../data/mock";
import {
  Home, User, GraduationCap, Wrench, Briefcase, Mail, Search, MousePointer2,
  Play, Pause, SkipBack, SkipForward, Github, Linkedin, Twitter, Dribbble,
  Heart as HeartIcon, Send, ChevronRight, Music2, Star as StarIcon, Award, Sparkles
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";

const navItems = [
  { id: "home", label: "home", Icon: Home },
  { id: "about", label: "about", Icon: User },
  { id: "education", label: "education", Icon: GraduationCap },
  { id: "skills", label: "skills", Icon: Wrench },
  { id: "experience", label: "experience", Icon: Briefcase },
  { id: "contact", label: "contact", Icon: Mail }
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Portfolio() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState({ name: "", email: "", note: "" });
  const [nowPlaying, setNowPlaying] = useState(playlist.find((p) => p.playing) || playlist[1]);
  const [isPlaying, setIsPlaying] = useState(true);
  const { toast } = useToast();

  const submitClub = (e) => {
    e.preventDefault();
    if (!email) return;
    toast({ title: "welcome to the club babe ♥", description: `we'll email cute drops to ${email}` });
    setEmail("");
  };

  const submitContact = (e) => {
    e.preventDefault();
    if (!msg.name || !msg.email || !msg.note) {
      toast({ title: "fill it all in, bestie ♡", description: "name, email + a lil' note please!" });
      return;
    }
    toast({ title: "message sent ♡", description: "kimmy will reply between glitter breaks." });
    setMsg({ name: "", email: "", note: "" });
  };

  return (
    <div className="y2k-root min-h-screen w-full pb-16">
      {/* Top marquee bar */}
      <div className="h-8 bg-[#ff2e93] text-white flex items-center overflow-hidden border-b-[2px] border-[#3b1f4a]">
        <div className="marquee flex gap-10 whitespace-nowrap font-pixel text-[12px] px-4">
          <span>✦ NEW DROP ALERT!</span>
          <span>✦ CHECK OUT THE <u>Y2K PORTFOLIO</u></span>
          <span>✦ FREE VIBES ON PROJECTS OVER $0</span>
          <span>✦ STAY CUTE, STAY WEIRD</span>
          <span>✦ NEW DROP ALERT!</span>
          <span>✦ CHECK OUT THE <u>Y2K PORTFOLIO</u></span>
          <span>✦ FREE VIBES ON PROJECTS OVER $0</span>
          <span>✦ STAY CUTE, STAY WEIRD</span>
        </div>
      </div>

      {/* Header / nav row */}
      <header className="px-4 md:px-8 pt-6">
        <div className="max-w-[1240px] mx-auto grid grid-cols-12 gap-4 items-start">
          {/* Logo card */}
          <div className="col-span-12 md:col-span-3">
            <div className="relative bg-white border-[2px] border-[#3b1f4a] rounded-2xl px-4 py-3 shadow-[4px_4px_0_0_#3b1f4a] overflow-hidden">
              <div className="absolute -top-4 -right-4 rotate-12"><Butterfly className="w-14 h-14" /></div>
              <div className="font-bubble text-[38px] leading-[0.9] text-[#ff2e93] drop-shadow-[2px_2px_0_#fff]">doll<span className="text-[#a97dff]">.house</span></div>
              <div className="font-pixel text-[10px] text-[#3b1f4a] mt-1">// {profile.name}&apos;s portfolio</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="col-span-12 md:col-span-6">
            <div className="bg-white border-[2px] border-[#3b1f4a] rounded-2xl px-3 py-3 shadow-[4px_4px_0_0_#3b1f4a] flex items-center justify-between gap-2">
              {navItems.map(({ id, label, Icon }) => (
                <button key={id} onClick={() => scrollTo(id)} className="nav-item group">
                  <div className="nav-icon"><Icon size={22} strokeWidth={2.2} /></div>
                  <div className="font-pixel text-[11px] mt-1">{label}</div>
                </button>
              ))}
            </div>
          </nav>

          {/* Search */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white border-[2px] border-[#3b1f4a] rounded-2xl p-2 shadow-[4px_4px_0_0_#3b1f4a] flex items-center gap-2">
              <input placeholder="search the site..." className="flex-1 h-10 px-3 rounded-lg border-[2px] border-[#3b1f4a] bg-white font-pixel text-[12px] outline-none focus:ring-2 focus:ring-[#ff9ed6]" />
              <button className="h-10 px-3 rounded-lg bg-[#ff2e93] border-[2px] border-[#3b1f4a] text-white shadow-[2px_2px_0_0_#3b1f4a] hover:bg-[#ff58a8] transition-colors">
                <Search size={16} />
              </button>
              <MousePointer2 size={22} className="text-[#3b1f4a] -ml-1 rotate-12" />
            </div>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <main id="home" className="px-4 md:px-8 mt-6">
        <div className="max-w-[1240px] mx-auto grid grid-cols-12 gap-4">
          {/* Quick Links */}
          <div className="col-span-12 md:col-span-3 space-y-4">
            <Window title="quick links" icon={<Sparkle className="w-3 h-3" color="#3b1f4a" />}>
              <ul className="font-pixel text-[13px] text-[#3b1f4a] divide-y divide-[#ffd0ea]">
                {quickLinks.map((q) => (
                  <li key={q}>
                    <button onClick={() => scrollTo(q)} className="w-full flex items-center justify-between py-2 hover:text-[#ff2e93] transition-colors">
                      <span className="flex items-center gap-2"><HeartIcon size={12} className="text-[#ff2e93]" /> {q}</span>
                      <ChevronRight size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </Window>

            <Window title="welcome babe!" variant="purple" icon={<Heart className="w-3 h-3" />}> 
              <div className="flex gap-3">
                <div className="w-16 h-20 rounded-md border-[2px] border-[#3b1f4a] bg-gradient-to-b from-[#ffd6ec] to-[#ff9ed6] flex items-center justify-center shrink-0">
                  <Heart className="w-9 h-9" />
                </div>
                <p className="font-pixel text-[12px] leading-relaxed text-[#3b1f4a]">
                  thanks 4 stopping by! <br/>i hope u find<br/>something cute 2day <br/><span className="text-[#ff2e93]">♥ xoxo, {profile.name}</span>
                </p>
              </div>
            </Window>

            <Window title="blog corner" variant="yellow">
              <ul className="font-pixel text-[12px] text-[#3b1f4a] space-y-2">
                <li className="leading-tight">&raquo; 10 y2k trends we&apos;re <u className="text-[#ff2e93]">obsessed with</u></li>
                <li className="leading-tight">&raquo; how to style <u className="text-[#a97dff]">bubblegum pink</u></li>
                <li className="leading-tight">&raquo; the ultimate 2000s <u className="text-[#ff2e93]">playlist</u></li>
              </ul>
              <button className="mt-3 font-pixel text-[11px] text-[#a63e91] hover:underline">read more on the blog →</button>
            </Window>
          </div>

          {/* Hero */}
          <div className="col-span-12 md:col-span-6 space-y-4">
            <div className="relative bg-gradient-to-b from-[#bfe3ff] to-[#ffd6ec] rounded-2xl border-[2px] border-[#3b1f4a] shadow-[4px_4px_0_0_#3b1f4a] p-5 md:p-6 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-60 clouds" />
              <div className="absolute top-3 right-4"><Sparkle className="w-4 h-4" color="#fff" /></div>
              <div className="absolute bottom-4 left-6 rotate-[-8deg]"><Star className="w-8 h-8" /></div>
              <div className="grid grid-cols-5 gap-4 items-center relative">
                <div className="col-span-5 md:col-span-3">
                  <div className="font-bubble text-[54px] md:text-[68px] leading-[0.9] tracking-tight bg-gradient-to-b from-[#ff2e93] via-[#ff6fbf] to-[#a63e91] text-transparent bg-clip-text drop-shadow-[2px_2px_0_#fff]">
                    made 4<br/>the internet
                  </div>
                  <p className="mt-3 font-pixel text-[13px] text-[#3b1f4a]">design portfolio of {profile.name} —<br/>cute code, digital dreams, and good vibes only.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={() => scrollTo("experience")} className="y2k-btn">see my work</button>
                    <button onClick={() => scrollTo("about")} className="y2k-btn ghost">about me</button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 font-pixel text-[12px] text-[#a63e91]">
                    <span className="underline">hire me</span>
                    <span className="underline">now hiring vibes</span>
                    <span className="underline">back in stock ♡</span>
                  </div>
                </div>
                <div className="col-span-5 md:col-span-2">
                  <div className="relative">
                    <Window title="cute.jpg" variant="purple" bodyClassName="p-1">
                      <img src={profile.avatar} alt="avatar" className="w-full h-[240px] object-cover rounded-md" />
                    </Window>
                    <div className="absolute -top-6 -left-6"><Butterfly className="w-14 h-14" /></div>
                    <div className="absolute -bottom-4 -right-4 rotate-12"><Star className="w-10 h-10" color="#ff5db1" /></div>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <section id="about">
              <Window title="about_me.txt" icon={<User size={12} />}>
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-5 md:col-span-2">
                    <div className="rounded-lg border-[2px] border-[#3b1f4a] p-2 bg-[#fff0f8]">
                      <img src={profile.avatar} alt="me" className="w-full h-40 object-cover rounded" />
                      <div className="mt-2 font-pixel text-[11px] text-[#3b1f4a] leading-relaxed">
                        <div><b>NAME:</b> {profile.name}</div>
                        <div><b>AGE:</b> {profile.age}</div>
                        <div><b>SIGN:</b> {profile.sign}</div>
                        <div><b>LIKES:</b> {profile.likes.join(", ")}</div>
                        <div><b>DISLIKE:</b> {profile.dislikes.join(", ")}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-5 md:col-span-3 font-pixel text-[13px] text-[#3b1f4a] leading-relaxed">
                    <p className="text-[16px] text-[#a63e91] mb-2">{about.intro}</p>
                    <p>{about.body}</p>
                    <div className="mt-3 rounded-md border-[2px] border-dashed border-[#ff9ed6] bg-[#fff7fb] p-3">
                      <div className="font-bubble text-[18px] text-[#ff2e93] leading-none">fun facts ♡</div>
                      <ul className="mt-2 space-y-1">
                        {about.funFacts.map((f, i) => (<li key={i} className="flex gap-2"><Heart className="w-3 h-3 shrink-0 mt-1" /> {f}</li>))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Window>
            </section>
          </div>

          {/* Right column */}
          <aside className="col-span-12 md:col-span-3 space-y-4">
            <Window title="new message!" variant="blue">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-[#ffd6ec] border-[2px] border-[#3b1f4a] flex items-center justify-center"><HeartIcon size={18} className="text-[#ff2e93]" /></div>
                <div className="font-pixel text-[12px] text-[#3b1f4a]">you have<br/><span className="text-[#ff2e93]">(1)</span> new message</div>
              </div>
              <button className="mt-3 y2k-btn w-full">ok</button>
            </Window>

            <Window title="now playing" variant="pink" icon={<Music2 size={12} />}>
              <div className="font-pixel text-[13px] text-[#3b1f4a]">{nowPlaying.t}.mp3<br/><span className="text-[#a63e91]">by everydream</span></div>
              <div className="mt-2 h-2 rounded-full bg-[#ffd6ec] overflow-hidden border border-[#3b1f4a]"><div className="h-full w-1/3 bg-[#ff2e93]" /></div>
              <div className="mt-2 flex items-center justify-around text-[#3b1f4a]">
                <button className="y2k-icon"><SkipBack size={16} /></button>
                <button className="y2k-icon" onClick={() => setIsPlaying((v) => !v)}>{isPlaying ? <Pause size={18} /> : <Play size={18} />}</button>
                <button className="y2k-icon"><SkipForward size={16} /></button>
              </div>
            </Window>

            <Window title="don't forget" variant="yellow">
              <ul className="font-pixel text-[12px] text-[#3b1f4a] space-y-1">
                <li>♡ drink water</li>
                <li>♡ be kind</li>
                <li>♡ call ur bff</li>
                <li>♡ ship the cute thing</li>
              </ul>
            </Window>

            <Window title="my faves" variant="purple" icon={<StarIcon size={12} />}>
              <ul className="font-pixel text-[12px] text-[#3b1f4a] space-y-1">
                <li className="flex justify-between"><span>saved projects</span><b>(12)</b></li>
                <li className="flex justify-between"><span>wish list</span><b>(8)</b></li>
                <li className="flex justify-between"><span>recently viewed</span><b>(15)</b></li>
                <li className="flex justify-between"><span>skills guide</span><b>&raquo;&raquo;</b></li>
              </ul>
            </Window>
          </aside>
        </div>

        {/* Info strip */}
        <div className="max-w-[1240px] mx-auto mt-6">
          <div className="rounded-2xl border-[2px] border-[#3b1f4a] bg-gradient-to-r from-[#ffd6ec] via-[#f6d1ff] to-[#bfe3ff] shadow-[4px_4px_0_0_#3b1f4a] px-4 py-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[{ Icon: Wrench, t: "FAST SHIPPING", s: "of ideas worldwide" }, { Icon: HeartIcon, t: "EASY REVISIONS", s: "no stress" }, { Icon: Award, t: "SECURE PROJECTS", s: "100% cute" }, { Icon: Sparkles, t: "BONUS SPARKLE", s: "free with every build" }].map(({ Icon, t, s }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-white border-[2px] border-[#3b1f4a] shadow-[2px_2px_0_0_#3b1f4a] flex items-center justify-center text-[#a63e91]"><Icon size={22} /></div>
                <div className="font-pixel text-[12px] text-[#3b1f4a]"><div className="font-bold">{t}</div><div>{s}</div></div>
              </div>
            ))}
          </div>
        </div>

        {/* Education, playlist, community */}
        <div className="max-w-[1240px] mx-auto grid grid-cols-12 gap-4 mt-6">
          <section id="education" className="col-span-12 md:col-span-5">
            <Window title="education.doc" icon={<GraduationCap size={12} />}>
              <div className="space-y-3">
                {education.map((e, i) => (
                  <div key={i} className="rounded-md border-[2px] border-[#3b1f4a] bg-[#fff7fb] p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-bubble text-[18px] text-[#ff2e93] leading-none">{e.school}</div>
                      <span className="font-pixel text-[10px] px-2 py-0.5 rounded bg-[#ffd6ec] border border-[#3b1f4a]">{e.years}</span>
                    </div>
                    <div className="font-pixel text-[12px] text-[#3b1f4a] mt-1">{e.degree}</div>
                    <div className="font-pixel text-[11px] text-[#a63e91] mt-1">{e.detail}</div>
                  </div>
                ))}
              </div>
            </Window>
          </section>

          <section className="col-span-12 md:col-span-4">
            <Window title="community vibes" variant="purple">
              <div className="relative h-[210px]">
                <div className="polaroid absolute left-2 top-2 -rotate-6">
                  <img src="https://images.unsplash.com/photo-1596738244048-5d8ebf7e9c58?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxwaW5rJTIwYnV0dGVyZmx5fGVufDB8fHx8MTc4OTEwODk2MHww&ixlib=rb-4.1.0&q=85" alt="vibe" />
                  <div className="font-pixel text-[10px]">so cute!</div>
                </div>
                <div className="polaroid absolute left-24 top-4 rotate-3">
                  <img src="https://images.unsplash.com/photo-1731909008517-e8ece183974d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwxfHxmbGlwJTIwcGhvbmV8ZW58MHx8fHwxNzg5MTA4OTYwfDA&ixlib=rb-4.1.0&q=85" alt="vibe" />
                  <div className="font-pixel text-[10px]">u cute</div>
                </div>
                <div className="polaroid absolute right-2 top-8 -rotate-3">
                  <img src="https://images.unsplash.com/photo-1580508158643-4bf9f8da03c6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxnbGl0dGVyJTIwaGVhcnR8ZW58MHx8fHwxNzg5MTA4OTY2fDA&ixlib=rb-4.1.0&q=85" alt="vibe" />
                  <div className="font-pixel text-[10px]">y2k ♡</div>
                </div>
              </div>
              <div className="mt-1 font-pixel text-[12px] text-[#3b1f4a] text-center">tag {profile.handle} to be featured!</div>
              <button onClick={() => toast({ title: "pic uploaded ♡", description: "we'll add it to the wall soon." })} className="mt-2 y2k-btn w-full">upload pics ♥</button>
            </Window>
          </section>

          <section className="col-span-12 md:col-span-3">
            <Window title="playlist" variant="pink" icon={<Music2 size={12} />}>
              <ul className="font-pixel text-[12px] text-[#3b1f4a]">
                {playlist.map((p) => (
                  <li key={p.n} onClick={() => setNowPlaying(p)} className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer hover:bg-[#ffe6f3] ${nowPlaying.n === p.n ? "bg-[#ff9ed6] text-[#3b1f4a]" : ""}`}>
                    <span className="tabular-nums w-6">{p.n}</span>
                    <span className="flex-1 truncate px-2">{p.t}</span>
                    <span className="tabular-nums">{p.d}</span>
                  </li>
                ))}
              </ul>
            </Window>
          </section>
        </div>

        {/* Skills */}
        <div id="skills" className="max-w-[1240px] mx-auto grid grid-cols-12 gap-4 mt-6">
          <section className="col-span-12 md:col-span-8">
            <Window title="skills.exe" icon={<Wrench size={12} />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="font-bubble text-[22px] text-[#ff2e93] leading-none mb-2">design ♡</div>
                  <div className="space-y-2">
                    {skills.design.map((s) => (
                      <SkillBar key={s.name} name={s.name} level={s.level} color="#ff2e93" />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-bubble text-[22px] text-[#a97dff] leading-none mb-2">code ✦</div>
                  <div className="space-y-2">
                    {skills.code.map((s) => (
                      <SkillBar key={s.name} name={s.name} level={s.level} color="#a97dff" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="font-pixel text-[12px] text-[#3b1f4a] mb-2">soft skills:</div>
                <div className="flex flex-wrap gap-2">
                  {skills.soft.map((s) => (
                    <span key={s} className="font-pixel text-[11px] px-2 py-1 rounded-md border-[2px] border-[#3b1f4a] bg-[#fff0f8] hover:bg-[#ffd6ec] transition-colors">{s}</span>
                  ))}
                </div>
              </div>
            </Window>
          </section>
          <section className="col-span-12 md:col-span-4">
            <Window title="join the club!" variant="purple">
              <div className="font-pixel text-[12px] text-[#3b1f4a]">get cute emails +<br/><u>secret drops</u></div>
              <form onSubmit={submitClub} className="mt-3 flex gap-2">
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter email" className="flex-1 h-10 px-3 rounded-md border-[2px] border-[#3b1f4a] font-pixel text-[12px] outline-none focus:ring-2 focus:ring-[#a97dff]" />
                <button className="y2k-btn" type="submit">go!</button>
              </form>
              <div className="mt-4 rounded-md border-[2px] border-dashed border-[#a97dff] bg-[#f7efff] p-3 font-pixel text-[11px] text-[#3b1f4a]">
                <b>certified cutie ♡</b><br/>{profile.name} is available for freelance & full-time roles.
              </div>
            </Window>
          </section>
        </div>

        {/* Experience */}
        <div id="experience" className="max-w-[1240px] mx-auto grid grid-cols-12 gap-4 mt-6">
          <section className="col-span-12">
            <Window title="work_history.doc" icon={<Briefcase size={12} />}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {experience.map((x, i) => (
                  <div key={i} className="rounded-md border-[2px] border-[#3b1f4a] bg-white p-3 shadow-[3px_3px_0_0_#3b1f4a] hover:-translate-y-1 transition-transform">
                    <div className="flex items-center justify-between">
                      <div className="font-bubble text-[20px] text-[#ff2e93] leading-none">{x.company}</div>
                      <Heart className="w-5 h-5" />
                    </div>
                    <div className="font-pixel text-[12px] text-[#a63e91] mt-1">{x.role}</div>
                    <div className="font-pixel text-[10px] text-[#3b1f4a] mt-1">{x.years}</div>
                    <ul className="mt-2 space-y-1 font-pixel text-[11px] text-[#3b1f4a]">
                      {x.bullets.map((b, j) => (<li key={j} className="flex gap-2"><Star className="w-3 h-3 shrink-0 mt-1" /> {b}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </Window>
          </section>
        </div>

        {/* Contact */}
        <div id="contact" className="max-w-[1240px] mx-auto grid grid-cols-12 gap-4 mt-6">
          <section className="col-span-12 md:col-span-7">
            <Window title="send_message.exe" icon={<Mail size={12} />} variant="pink">
              <form onSubmit={submitContact} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input value={msg.name} onChange={(e) => setMsg({ ...msg, name: e.target.value })} placeholder="ur name" className="y2k-input" />
                <input value={msg.email} onChange={(e) => setMsg({ ...msg, email: e.target.value })} placeholder="ur email" className="y2k-input" />
                <textarea value={msg.note} onChange={(e) => setMsg({ ...msg, note: e.target.value })} placeholder="say hi ♥" rows={5} className="y2k-input md:col-span-2 resize-none" />
                <div className="md:col-span-2 flex items-center justify-between">
                  <div className="font-pixel text-[11px] text-[#a63e91]">i reply between glitter breaks ♡</div>
                  <button className="y2k-btn" type="submit"><span className="inline-flex items-center gap-2"><Send size={14} /> send</span></button>
                </div>
              </form>
            </Window>
          </section>
          <section className="col-span-12 md:col-span-5 space-y-4">
            <Window title="contact_info.txt" variant="blue">
              <ul className="font-pixel text-[12px] text-[#3b1f4a] space-y-2">
                <li className="flex items-center gap-2"><Mail size={14} /> {profile.email}</li>
                <li className="flex items-center gap-2"><StarIcon size={14} /> {profile.location}</li>
                <li className="flex items-center gap-2"><HeartIcon size={14} className="text-[#ff2e93]" /> status: {profile.status}</li>
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <SocialBtn Icon={Github} label="github" />
                <SocialBtn Icon={Linkedin} label="linkedin" />
                <SocialBtn Icon={Dribbble} label="dribbble" />
                <SocialBtn Icon={Twitter} label="twitter" />
              </div>
            </Window>
            <Window title="let's be friends!" variant="purple">
              <div className="font-pixel text-[12px] text-[#3b1f4a]">click below to download my resume in .pdf</div>
              <button onClick={() => toast({ title: "resume queued ♡", description: "pretend a cute .pdf just downloaded!" })} className="y2k-btn w-full mt-3">download resume.pdf</button>
            </Window>
          </section>
        </div>

        {/* Footer strip */}
        <div className="max-w-[1240px] mx-auto mt-6">
          <div className="h-9 rounded-md border-[2px] border-[#3b1f4a] overflow-hidden bg-white flex items-center">
            <div className="marquee flex gap-8 whitespace-nowrap font-pixel text-[11px] text-[#ff2e93] px-4">
              <span>✦ FREE VIBES OVER $75</span><span>✦ NEW DROP EVERY FRIDAY</span><span>✦ EXPRESS YOURSELF</span><span>✦ STAY Y2K</span>
              <span>✦ FREE VIBES OVER $75</span><span>✦ NEW DROP EVERY FRIDAY</span><span>✦ EXPRESS YOURSELF</span><span>✦ STAY Y2K</span>
            </div>
          </div>
          <div className="mt-4 mb-6 grid grid-cols-2 md:grid-cols-5 gap-4 font-pixel text-[12px] text-[#3b1f4a]">
            <div>
              <div className="font-bubble text-[24px] text-[#ff2e93] leading-none">doll.house™</div>
              <div className="text-[10px] mt-1">© 2000-2025 {profile.name}<br/>all rights reserved.</div>
            </div>
            <div><div className="font-bold">portfolio</div><ul className="mt-1 space-y-1"><li>projects</li><li>case studies</li><li>press kit</li></ul></div>
            <div><div className="font-bold">help</div><ul className="mt-1 space-y-1"><li>faq</li><li>hire me</li><li>collab</li></ul></div>
            <div><div className="font-bold">company</div><ul className="mt-1 space-y-1"><li>about</li><li>careers</li><li>wholesale</li></ul></div>
            <div><div className="font-bold">legal</div><ul className="mt-1 space-y-1"><li>terms</li><li>privacy</li><li>cookies</li></ul></div>
          </div>
        </div>
      </main>

      <Taskbar
        tabs={[
          { id: "home", label: "welcome 2 my world.html" },
          { id: "about", label: "about_me.txt" },
          { id: "experience", label: "work_history.doc" }
        ]}
        onTabClick={scrollTo}
      />
    </div>
  );
}

function SkillBar({ name, level, color }) {
  return (
    <div>
      <div className="flex items-center justify-between font-pixel text-[12px] text-[#3b1f4a]"><span>{name}</span><span>{level}%</span></div>
      <div className="h-3 rounded-full bg-[#ffe6f3] border-[2px] border-[#3b1f4a] overflow-hidden">
        <div className="h-full" style={{ width: `${level}%`, background: `linear-gradient(90deg, ${color}, #ffb0dd)` }} />
      </div>
    </div>
  );
}

function SocialBtn({ Icon, label }) {
  return (
    <button className="h-9 px-3 rounded-md bg-white border-[2px] border-[#3b1f4a] shadow-[2px_2px_0_0_#3b1f4a] hover:bg-[#ffe6f3] transition-colors font-pixel text-[11px] text-[#3b1f4a] inline-flex items-center gap-2">
      <Icon size={14} /> {label}
    </button>
  );
}
