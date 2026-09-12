import React from "react";

// Small colored logos for the accomplishments list.
// Images are baked into /public/assets/logos so they always work in production.

const box = "w-10 h-10 rounded-md border-[2px] border-[#4a2b5c] bg-white shadow-[2px_2px_0_0_#4a2b5c] flex items-center justify-center shrink-0 overflow-hidden";

export function LogoImg({ src, alt, className = "" }) {
  return (
    <div className={box}>
      <img src={src} alt={alt} className={`w-6 h-6 object-contain ${className}`} />
    </div>
  );
}

export function MetaLogo() { return <LogoImg src="/assets/logos/meta.svg" alt="Meta" />; }
export function AmazonLogo() { return <LogoImg src="/assets/logos/amazon.svg" alt="Amazon" />; }
export function MicrosoftLogo() { return <LogoImg src="/assets/logos/microsoft.svg" alt="Microsoft" className="w-7 h-7" />; }
export function InstagramLogo() { return <LogoImg src="/assets/logos/instagram.svg" alt="Instagram" />; }
export function MlhLogo() { return <LogoImg src="/assets/logos/mlh.svg" alt="MLH" />; }

export function GeorgiaTechLogo() {
  return (
    <div className={box} style={{ background: "#B3A369" }}>
      <svg viewBox="0 0 40 40" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontFamily="'Rubik Bubbles', system-ui" fontSize="18" fontWeight="900" fill="#003057">GT</text>
      </svg>
    </div>
  );
}

export function TrophyLogo() {
  return (
    <div className={box} style={{ background: "#FFF4C9" }}>
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 4h12v3a6 6 0 0 1-12 0V4z" fill="#e6b800" stroke="#4a2b5c" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M4 5h2v3a2 2 0 1 1-2-2V5zM18 5h2v1a2 2 0 1 1-2 2V5z" fill="#e6b800" stroke="#4a2b5c" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 13h6v3H9z" fill="#e6b800" stroke="#4a2b5c" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 20h10v-2H7z" fill="#e6b800" stroke="#4a2b5c" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
