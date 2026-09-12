import React, { useState } from "react";
import Window from "../Window";
import { Heart, Star, Sparkle } from "../Sticker";
import { profile } from "../../../data/mock";
import { Mail, Send, Linkedin, Github, MapPin, Star as StarIcon, Heart as HeartIcon, Loader2 } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactPage() {
  const [msg, setMsg] = useState({ name: "", email: "", note: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    if (!msg.name || !msg.email || !msg.note) {
      toast({ title: "fill it all in, bestie ♡", description: "name, email + a lil' note please!" });
      return;
    }
    setSending(true);
    try {
      const res = await axios.post(`${API}/contact`, msg);
      const delivered = res?.data?.delivered;
      setSent(true);
      toast({
        title: delivered ? "message sent ♡" : "got it! ♡",
        description: delivered ? "gurjevan will get back to you soon." : "saved your message — she'll see it soon."
      });
      setMsg({ name: "", email: "", note: "" });
    } catch (err) {
      toast({ title: "oh no, try again bestie ♡", description: err?.response?.data?.detail?.[0]?.msg || err.message || "network hiccup" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-7">
        <Window title="send_message.exe" icon={<Mail size={12} />} variant="pink">
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={msg.name} onChange={(e) => setMsg({ ...msg, name: e.target.value })} placeholder="your name" className="y2k-input" />
            <input type="email" value={msg.email} onChange={(e) => setMsg({ ...msg, email: e.target.value })} placeholder="your email" className="y2k-input" />
            <textarea value={msg.note} onChange={(e) => setMsg({ ...msg, note: e.target.value })} placeholder="say hi ♡, share an opportunity, or just be cute" rows={6} className="y2k-input md:col-span-2 resize-none" />
            <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-3">
              <div className="font-body text-[12px] text-[#a06a94]">i reply within 24-48 hrs ♡</div>
              <button className="y2k-btn min-w-[140px]" type="submit" disabled={sending}>
                <span className="inline-flex items-center gap-2">
                  {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  {sending ? "sending..." : sent ? "send again" : "send ♡"}
                </span>
              </button>
            </div>
          </form>
        </Window>

        <div className="mt-4">
          <Window title="faq.txt" variant="blue">
            <ul className="font-body text-[13px] text-[#4a2b5c] space-y-2">
              <li><b className="text-[#e77bb8]">Q:</b> are you open to internships? <b>A:</b> yes! summer 2027 ♡</li>
              <li><b className="text-[#e77bb8]">Q:</b> where are you based? <b>A:</b> greater vancouver, bc · remote-friendly</li>
              <li><b className="text-[#e77bb8]">Q:</b> what are you looking for? <b>A:</b> data science / ml / production eng roles</li>
            </ul>
          </Window>
        </div>
      </div>

      <aside className="col-span-12 md:col-span-5 space-y-4">
        <Window title="contact_info.txt" variant="purple">
          <ul className="font-body text-[14px] text-[#4a2b5c] space-y-3">
            <li className="flex items-center gap-3"><div className="y2k-icon"><Mail size={16} /></div> <a href={`mailto:${profile.email}`} className="hover:text-[#e77bb8] underline">{profile.email}</a></li>
            <li className="flex items-center gap-3"><div className="y2k-icon"><Linkedin size={16} /></div> <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#e77bb8] underline">/in/gurjevan-kaur-bhatti</a></li>
            <li className="flex items-center gap-3"><div className="y2k-icon"><MapPin size={16} /></div> {profile.location}</li>
            <li className="flex items-center gap-3"><div className="y2k-icon"><HeartIcon size={16} className="text-[#e77bb8]" /></div> {profile.status}</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="social-btn"><Linkedin size={14} /> linkedin</a>
            <a href="#" className="social-btn"><Github size={14} /> github</a>
            <a href={`mailto:${profile.email}`} className="social-btn"><Mail size={14} /> email</a>
          </div>
        </Window>

        <Window title="let's be friends!" variant="yellow">
          <div className="font-body text-[13px] text-[#4a2b5c]">tap below to pop over to my linkedin ♡</div>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <button className="y2k-btn w-full mt-3">open linkedin →</button>
          </a>
        </Window>

        <div className="relative h-16">
          <div className="absolute -top-2 left-4"><Heart className="w-10 h-10" color="#f1a8d0" /></div>
          <div className="absolute top-4 left-24"><Star className="w-8 h-8" color="#b8a3e3" /></div>
          <div className="absolute top-0 right-8"><Sparkle className="w-6 h-6" color="#e77bb8" /></div>
        </div>
      </aside>
    </div>
  );
}
