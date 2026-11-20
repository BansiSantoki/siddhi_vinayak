import React from 'react'
import { motion } from 'framer-motion'

import { BACKGROUND_URL } from './contact'

/** Full-screen on phones; a centred phone-sized card on tablet and desktop. */
export function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="vc-shell relative flex w-full items-center justify-center overflow-hidden bg-[#dfe9f5] font-sans">
      {/* Soft, blurred echo of the scene behind the card on wide screens */}
      <div
        aria-hidden
        className="absolute inset-0 hidden scale-110 bg-cover bg-center opacity-80 blur-2xl sm:block"
        style={{ backgroundImage: `url(${BACKGROUND_URL})` }}
      />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="@container relative h-full w-full overflow-hidden bg-[#cfe3f7] sm:h-[calc(100%-48px)] sm:max-h-[920px] sm:max-w-[430px] sm:rounded-[40px] sm:shadow-[0_40px_90px_-30px_rgba(10,31,85,0.55)] sm:ring-1 sm:ring-white/60"
      >
        {children}
      </motion.main>
    </div>
  )
}
