import React from 'react'
import { motion } from 'framer-motion'

import { LOGO_SHEET_URL } from './contact'

/** Logo | divider | owner name and experience pill — as in the reference. */
export function BrandHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: 0.08 }}
      className="flex items-center justify-center gap-2.5"
    >
      <h1 className="m-0 w-[36%] max-w-[160px] shrink-0">
        <span className="sr-only">Siddhi Vinayak Realtors</span>
        <span className="relative block aspect-[695/465] w-full overflow-hidden">
          <img
            src={LOGO_SHEET_URL}
            alt=""
            draggable={false}
            className="absolute max-w-none mix-blend-multiply"
            style={{ width: '290.9%', left: '-33.8%', top: '-34.4%' }}
          />
        </span>
      </h1>

      <span aria-hidden className="h-[clamp(64px,20cqw,84px)] w-[2px] shrink-0 rounded-full bg-navy" />

      <div className="flex min-w-0 flex-col items-center gap-2">
        <p className="m-0 whitespace-nowrap text-[clamp(12px,3.35cqw,15px)] font-extrabold uppercase leading-none tracking-[-0.01em] text-brand-red">
          Jatin Kanubhai Shah
        </p>
        <p className="m-0 whitespace-nowrap rounded-full bg-navy px-4 py-[7px] text-[clamp(11.5px,3.1cqw,13.5px)] font-bold leading-none text-white shadow-[0_6px_14px_-6px_rgba(10,31,85,0.6)]">
          33 Years experience
        </p>
      </div>
    </motion.header>
  )
}
