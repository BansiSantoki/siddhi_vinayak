import React from 'react'

/** The glossy 3D red pin standing on the horizon at the bottom centre. */
export function LocationPin() {
  return (
    <>
      {/* Glow on the floor where the pin points */}
      <span className="absolute left-1/2 top-[94.4%] aspect-[3/1] w-[16%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-brand-red/50 bg-brand-red/10" />
      <span className="absolute left-1/2 top-[94.6%] aspect-[4/1] w-[9%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#7a0a0f] blur-[3px]" />
      <span className="absolute left-1/2 top-[94.4%] aspect-square w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,220,170,0.8),transparent_60%)] mix-blend-screen" />

      <div className="absolute left-1/2 top-[94.2%] w-[12%] -translate-x-1/2 -translate-y-full drop-shadow-[0_10px_14px_rgba(140,10,16,0.35)]">
        <svg viewBox="0 0 100 140" className="block w-full">
          <defs>
            <radialGradient id="vc-pin-body" cx="35%" cy="28%" r="80%">
              <stop offset="0%" stopColor="#ff6a5e" />
              <stop offset="45%" stopColor="#e3141c" />
              <stop offset="100%" stopColor="#9c0b12" />
            </radialGradient>
            <linearGradient id="vc-pin-hole" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3f3f3" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path
            d="M50 138 C44 118 8 86 8 50 A42 42 0 1 1 92 50 C92 86 56 118 50 138 Z"
            fill="url(#vc-pin-body)"
          />
          <ellipse cx="34" cy="28" rx="15" ry="9" fill="#fff" opacity="0.35" transform="rotate(-30 34 28)" />
          <circle cx="50" cy="49" r="17" fill="#8d0a10" opacity="0.5" />
          <circle cx="50" cy="48" r="16" fill="url(#vc-pin-hole)" />
        </svg>
      </div>
    </>
  )
}
