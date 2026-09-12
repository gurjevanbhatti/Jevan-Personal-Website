import React from "react";

export function Butterfly({ className = "", color = "#f1a8d0" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#4a2b5c" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M32 34 C 10 10, 4 24, 12 40 C 18 52, 28 44, 32 34 Z" fill={color} />
        <path d="M32 34 C 54 10, 60 24, 52 40 C 46 52, 36 44, 32 34 Z" fill={color} />
        <path d="M32 34 C 22 44, 14 50, 16 58 C 22 56, 30 44, 32 34 Z" fill="#ffd6ec" />
        <path d="M32 34 C 42 44, 50 50, 48 58 C 42 56, 34 44, 32 34 Z" fill="#ffd6ec" />
        <path d="M32 20 v22" />
        <circle cx="32" cy="20" r="2.5" fill="#4a2b5c" />
      </g>
    </svg>
  );
}

export function Star({ className = "", color = "#b8a3e3" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M32 4 L38 24 L60 26 L42 40 L48 60 L32 48 L16 60 L22 40 L4 26 L26 24 Z" fill={color} stroke="#4a2b5c" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="26" cy="22" r="3" fill="#fff" opacity="0.7" />
    </svg>
  );
}

export function Heart({ className = "", color = "#f1a8d0" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M32 56 C 8 40, 4 22, 18 14 C 26 10, 30 16, 32 20 C 34 16, 38 10, 46 14 C 60 22, 56 40, 32 56 Z" fill={color} stroke="#4a2b5c" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="24" cy="22" rx="5" ry="3" fill="#fff" opacity="0.6" />
    </svg>
  );
}

export function Sparkle({ className = "", color = "#e77bb8" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0 L18 14 L32 16 L18 18 L16 32 L14 18 L0 16 L14 14 Z" fill={color} />
    </svg>
  );
}
