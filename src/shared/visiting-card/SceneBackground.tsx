import React from 'react'

import { BACKGROUND_URL } from './contact'
import { LocationPin } from './LocationPin'

type Props = {
  showPin?: boolean
}

/**
 * The fixed scene behind the card. The photo is drawn in a box with its own
 * aspect ratio, anchored to the bottom, so the skyline and the pin always sit
 * at the bottom of the screen and every overlay lines up with the photo.
 */
export function SceneBackground({ showPin = false }: Props) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-full min-w-full -translate-x-1/2 aspect-[768/1376]">
          <div className="absolute inset-x-0 bottom-0 aspect-[768/1376]">
            <img src={BACKGROUND_URL} alt="" className="absolute inset-0 size-full object-cover" draggable={false} />

            {/* Trees are isolated from the house with a soft mask. */}
            <TreeMask mask="radial-gradient(ellipse 9% 13% at 95% 31%, #000 55%, transparent 100%)" />
            <TreeMask mask="radial-gradient(ellipse 9% 4% at 22% 29%, #000 50%, transparent 100%)" />
            <TreeMask mask="radial-gradient(ellipse 6% 9% at 4% 41%, #000 50%, transparent 100%)" />

            <div className="absolute left-[93%] top-[37%] size-[55%] rounded-full bg-[radial-gradient(circle,rgba(255,214,140,0.85)_0%,rgba(255,190,90,0.35)_35%,transparent_70%)] mix-blend-screen" />
            <div className="absolute left-[93%] top-[37%] size-[180%] opacity-35 mix-blend-soft-light [background:repeating-conic-gradient(from_0deg,rgba(255,236,190,0.9)_0deg_3deg,transparent_3deg_14deg)] [mask-image:radial-gradient(circle,#000_0%,transparent_55%)]" />

            {showPin && <LocationPin />}
          </div>
        </div>

        <div className="absolute inset-x-0 top-0 h-[34%] overflow-hidden">
          {CLOUDS.map((c, i) => (
            <div
              key={i}
              className="absolute left-[-40%]"
              style={{ top: c.top, width: c.w, opacity: c.o }}
            >
              <div className="aspect-[3/1] w-full rounded-full bg-white blur-xl" />
            </div>
          ))}
        </div>

        {/* Pale haze at the top, as in the reference, so the logo reads cleanly */}
        <div className="absolute inset-x-0 top-0 h-[30%] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.82),rgba(255,255,255,0.45)_55%,transparent)]" />

        {/* Light particles */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#fff6dc] shadow-[0_0_8px_2px_rgba(255,226,160,0.8)]"
            style={{
              left: p.x,
              top: p.y,
              width: p.s,
              height: p.s,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function TreeMask({ mask }: { mask: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${BACKGROUND_URL})`,
        backgroundSize: '100% 100%',
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    />
  )
}

const CLOUDS = [
  { top: '6%', w: '46%', o: 0.55 },
  { top: '22%', w: '34%', o: 0.45 },
  { top: '48%', w: '52%', o: 0.4 },
  { top: '64%', w: '30%', o: 0.35 },
]

const PARTICLES = [
  { x: '78%', y: '42%', s: 4 },
  { x: '88%', y: '50%', s: 3 },
  { x: '64%', y: '36%', s: 3 },
  { x: '92%', y: '30%', s: 5 },
  { x: '52%', y: '48%', s: 2 },
  { x: '72%', y: '58%', s: 3 },
  { x: '30%', y: '44%', s: 2 },
  { x: '84%', y: '64%', s: 4 },
  { x: '16%', y: '52%', s: 2 },
  { x: '58%', y: '70%', s: 3 },
  { x: '40%', y: '84%', s: 2 },
  { x: '68%', y: '88%', s: 3 },
]
