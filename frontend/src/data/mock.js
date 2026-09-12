// Portfolio content — personalized for Gurjevan Kaur Bhatti
export const profile = {
  name: "gurjevan kaur bhatti",
  firstName: "Jevan",
  pronouns: "she/her",
  handle: "@gurjevan.exe",
  headline: "incoming msc data science @ georgia tech",
  tagline: "i build scalable systems and love working with data \u2661",
  location: "greater vancouver, bc",
  status: "open to summer 2027 internships",
  avatar: "/assets/jevan.jpg",
  sign: "data \u2661",
  likes: ["python", "clean data", "boba", "long walks"],
  dislikes: ["nulls", "unlabelled axes"],
  email: "gurjevanbhatti@gmail.com",
  linkedin: "https://www.linkedin.com/in/gurjevan-kaur-bhatti-35b42a185",
  socials: [
    { label: "linkedin", url: "https://www.linkedin.com/in/gurjevan-kaur-bhatti-35b42a185" },
    { label: "github", url: "#" },
    { label: "email", url: "mailto:gurjevanbhatti@gmail.com" }
  ],
  stats: [
    { k: "followers", v: "2,084" },
    { k: "connections", v: "500+" },
    { k: "skills", v: "48" }
  ]
};

export const about = {
  intro: "Hi! I'm Jevan, an incoming MS in Data Science at Georgia Tech with a soft spot for scalable systems and thoughtful data work.",
  body: "Previously at Meta, Amazon, Instagram, and Microsoft. I love turning messy data into clear stories, shipping backends that don't fall over, and mentoring students from underrepresented communities. Recently graduated with a BS in Data Science from Simon Fraser University and open to Summer 2027 internships.",
  funFacts: [
    "Analyzed 50M+ views across 1M+ posts for Instagram \u00d7 TikTok Creators",
    "Deployed Lambdas across 30+ AWS regions handling 330k requests/sec",
    "Supported 30,000+ CS students through CodePath + TEALS"
  ]
};

export const education = [
  {
    school: "Georgia Institute of Technology",
    degree: "MSc, Data Science",
    years: "incoming 2027",
    detail: "admitted to the online ms in data science program."
  },
  {
    school: "Simon Fraser University",
    degree: "BS, Data Science",
    years: "2022 \u2014 2026",
    detail: "awards: undergraduate award for women in the faculty of science 2025. activities: women in computer science (wics), girls who code (gwc)."
  }
];

export const skills = {
  data: [
    { name: "Python", level: 95 },
    { name: "SQL", level: 92 },
    { name: "Machine Learning", level: 85 },
    { name: "Big Data", level: 82 }
  ],
  code: [
    { name: "AWS (Lambda, CDK)", level: 88 },
    { name: "Flask / MySQL", level: 84 },
    { name: "Distributed Systems", level: 80 },
    { name: "Data Viz", level: 82 }
  ],
  soft: ["mentorship", "technical interviewing", "analytics", "data storytelling", "cross-team collab", "community building"]
};

export const experience = [
  {
    company: "Microsoft (TEALS)",
    role: "SWE Instructor \u00b7 On-call",
    years: "Jan 2024 \u2014 Aug 2026",
    location: "Remote",
    bullets: [
      "Provided technical interview prep + career coaching to college CS students through CodePath.",
      "Supported 30,000+ students from underrepresented communities across the U.S."
    ]
  },
  {
    company: "Meta \u00d7 Major League Hacking",
    role: "Production Engineering Fellow",
    years: "Sep 2025 \u2014 Dec 2025",
    location: "Remote",
    bullets: [
      "Engineered a production-ready Flask & MySQL web-app template.",
      "Established a reusable, scalable architecture for deploying secure environments."
    ]
  },
  {
    company: "Instagram",
    role: "Student Data Scientist",
    years: "May 2025 \u2014 Aug 2025",
    location: "Vancouver, BC \u00b7 Remote",
    bullets: [
      "Led an engagement analytics blueprint with Instagram \u00d7 TikTok Digital Creators.",
      "Analyzed 50M+ views across 1M+ posts to identify drivers of high-performing content."
    ]
  },
  {
    company: "Amazon",
    role: "Student Software Engineer",
    years: "May 2024 \u2014 Sep 2024",
    location: "Vancouver, BC \u00b7 Remote",
    bullets: [
      "Designed a serverless, distributed architecture across 30+ AWS regions using CDK.",
      "Efficiently managed up to 330,000 client requests / second with strong availability."
    ]
  }
];

export const quickLinks = ["about", "education", "skills", "experience", "contact"];

export const playlist = [
  { n: "01", t: "gradient descent", d: "2:31" },
  { n: "02", t: "vida digital", d: "3:12", playing: true },
  { n: "03", t: "sql lullaby", d: "2:45" },
  { n: "04", t: "aws sunrise", d: "3:07" },
  { n: "05", t: "pandas & dreams", d: "4:09" },
  { n: "06", t: "say my name (remix)", d: "2:56" },
  { n: "07", t: "cyber crush", d: "3:33" },
  { n: "08", t: "pixel heart", d: "2:22" }
];
