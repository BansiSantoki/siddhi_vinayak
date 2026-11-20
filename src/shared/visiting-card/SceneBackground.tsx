import React from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

import { BACKGROUND_URL } from './contact'
import { LocationPin } from './LocationPin'

type Props = {
  scrollRef: React.RefObject<HTMLElement>
  showPin?: boolean
}

/**
 * The fixed scene behind the card. The photo is drawn in a box with its own
 * aspect ratio, anchored to the bottom, so the skyline and the pin always sit
 * at the bottom of the screen and every overlay lines up with the photo.
 */
export function SceneBackground({ scrollRef, showPin = false }: Props) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll({ container: scrollRef })
  const rawY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -18])
  const y = useSpring(rawY, { stiffness: 120, damping: 30, mass: 0.6 })
  const skyY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -40])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="absolute inset-0"
      >
        <motion.div style={{ y }} className="absolute bottom-0 left-1/2 h-full min-w-full -translate-x-1/2 aspect-[768/1376]">
          <div className="vc-breathe absolute inset-x-0 bottom-0 aspect-[768/1376] [transform-origin:50%_30%]">
            <img src={BACKGROUND_URL} alt="" className="absolute inset-0 size-full object-cover" draggable={false} />

            {/* Trees: gentle sway, isolated from the house with a soft mask */}
            <TreeSway mask="radial-gradient(ellipse 9% 13% at 95% 31%, #000 55%, transparent 100%)" origin="95% 44%" delay="0s" />
            <TreeSway mask="radial-gradient(ellipse 9% 4% at 22% 29%, #000 50%, transparent 100%)" origin="22% 33%" delay="-1.7s" />
            <TreeSway mask="radial-gradient(ellipse 6% 9% at 4% 41%, #000 50%, transparent 100%)" origin="4% 47%" delay="-3.1s" />

            {/* Warm sun on the right */}
            <div className="vc-sun absolute left-[93%] top-[37%] size-[55%] rounded-full bg-[radial-gradient(circle,rgba(255,214,140,0.85)_0%,rgba(255,190,90,0.35)_35%,transparent_70%)] mix-blend-screen" />
            <div className="vc-rays absolute left-[93%] top-[37%] size-[180%] opacity-35 mix-blend-soft-light [background:repeating-conic-gradient(from_0deg,rgba(255,236,190,0.9)_0deg_3deg,transparent_3deg_14deg)] [mask-image:radial-gradient(circle,#000_0%,transparent_55%)]" />

            {showPin && <LocationPin />}
          </div>
        </motion.div>

        {/* Drifting clouds, on their own slower parallax layer */}
        <motion.div style={{ y: skyY }} className="absolute inset-x-0 top-0 h-[34%] overflow-hidden">
          {CLOUDS.map((c, i) => (
            <div
              key={i}
              className="vc-cloud absolute left-[-40%]"
              style={{ top: c.top, width: c.w, animationDuration: c.dur, animationDelay: c.delay, opacity: c.o }}
            >
              <div className="aspect-[3/1] w-full rounded-full bg-white blur-xl" />
            </div>
          ))}
        </motion.div>

        {/* Pale haze at the top, as in the reference, so the logo reads cleanly */}
        <div className="absolute inset-x-0 top-0 h-[30%] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.82),rgba(255,255,255,0.45)_55%,transparent)]" />

        {/* Floating light particles */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="vc-particle absolute rounded-full bg-[#fff6dc] shadow-[0_0_8px_2px_rgba(255,226,160,0.8)]"
            style={{
              left: p.x,
              top: p.y,
              width: p.s,
              height: p.s,
              animationDuration: p.dur,
              animationDelay: p.delay,
              ['--dx' as string]: p.dx,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

function TreeSway({ mask, origin, delay }: { mask: string; origin: string; delay: string }) {
  return (
    <div
      className="vc-sway absolute inset-0"
      style={{
        backgroundImage: `url(${BACKGROUND_URL})`,
        backgroundSize: '100% 100%',
        WebkitMaskImage: mask,
        maskImage: mask,
        transformOrigin: origin,
        animationDelay: delay,
      }}
    />
  )
}

const CLOUDS = [
  { top: '6%', w: '46%', dur: '70s', delay: '-12s', o: 0.55 },
  { top: '22%', w: '34%', dur: '95s', delay: '-50s', o: 0.45 },
  { top: '48%', w: '52%', dur: '120s', delay: '-80s', o: 0.4 },
  { top: '64%', w: '30%', dur: '85s', delay: '-30s', o: 0.35 },
]

const PARTICLES = [
  { x: '78%', y: '42%', s: 4, dur: '9s', delay: '0s', dx: '-18px' },
  { x: '88%', y: '50%', s: 3, dur: '11s', delay: '-3s', dx: '-26px' },
  { x: '64%', y: '36%', s: 3, dur: '10s', delay: '-6s', dx: '14px' },
  { x: '92%', y: '30%', s: 5, dur: '13s', delay: '-2s', dx: '-30px' },
  { x: '52%', y: '48%', s: 2, dur: '8s', delay: '-5s', dx: '10px' },
  { x: '72%', y: '58%', s: 3, dur: '12s', delay: '-8s', dx: '-12px' },
  { x: '30%', y: '44%', s: 2, dur: '10s', delay: '-1s', dx: '16px' },
  { x: '84%', y: '64%', s: 4, dur: '14s', delay: '-9s', dx: '-20px' },
  { x: '16%', y: '52%', s: 2, dur: '11s', delay: '-4s', dx: '12px' },
  { x: '58%', y: '70%', s: 3, dur: '13s', delay: '-7s', dx: '-8px' },
  { x: '40%', y: '84%', s: 2, dur: '9s', delay: '-2.5s', dx: '10px' },
  { x: '68%', y: '88%', s: 3, dur: '12s', delay: '-6.5s', dx: '-14px' },
]
