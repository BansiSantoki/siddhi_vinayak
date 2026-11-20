import React, { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, KeyRound, Handshake, RefreshCcw, Phone } from 'lucide-react'

import { SceneBackground } from '../shared/visiting-card/SceneBackground'
import { CardShell } from '../shared/visiting-card/CardShell'
import { CONTACT } from '../shared/visiting-card/contact'

type Props = Partial<typeof args> & { onBack?: () => void }

export default function Services(props: Props) {
  const { highlight, onBack } = { ...args, ...props }
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  return (
    <CardShell>
      <SceneBackground scrollRef={scrollRef} />
      {/* Frosted veil so the details read over the photo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] bg-white/35 backdrop-blur-[2px]" />

      <div ref={scrollRef} className="vc-scroll relative z-10 h-full overflow-y-auto overflow-x-hidden">
        <div className="flex min-h-full flex-col px-4 pb-16 pt-8 sm:px-5">
          <motion.button
            type="button"
            onClick={onBack}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="flex w-fit items-center gap-2 rounded-full border border-white/80 bg-white/85 py-2 pl-2.5 pr-4 text-[14px] font-bold text-navy shadow-[0_8px_20px_-12px_rgba(15,42,110,0.5)] backdrop-blur-md"
          >
            <ArrowLeft className="size-[18px]" strokeWidth={2.4} />
            Back to card
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="mt-7"
          >
            <p className="m-0 text-[13px] font-bold uppercase tracking-[0.08em] text-brand-red">Siddhi Vinayak Realtors</p>
            <h1 className="m-0 mt-1.5 text-[clamp(26px,7.4cqw,32px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-navy">
              Our Real Estate Services
            </h1>
            <p className="m-0 mt-3 max-w-[34ch] text-[15px] font-medium leading-relaxed text-ink">
              33 years of helping families and businesses across Surat find, sell and lease the right property.
            </p>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.12 } } }}
            className="m-0 mt-6 flex list-none flex-col overflow-hidden rounded-[26px] border border-white/80 bg-white/90 p-0 shadow-[0_18px_40px_-20px_rgba(15,42,110,0.45)] backdrop-blur-md"
          >
            {SERVICES.map((s, i) => {
              const active = s.id === highlight
              return (
                <motion.li
                  key={s.id}
                  variants={{
                    hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
                    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] } },
                  }}
                  className={`flex gap-3.5 px-4 py-5 sm:px-5 ${i > 0 ? 'border-t border-navy/10' : ''} ${active ? 'bg-brand-red/[0.05]' : ''}`}
                >
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-[14px] text-white ${
                      i % 2 === 0
                        ? 'bg-[linear-gradient(160deg,#f2453f,#d7151d_50%,#a90f16)]'
                        : 'bg-[linear-gradient(160deg,#2c4f9e,#13306f_50%,#0a1f55)]'
                    }`}
                  >
                    <s.icon className="size-5" strokeWidth={2.2} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="m-0 text-[17px] font-extrabold leading-tight text-navy">{s.title}</h2>
                    <p className="m-0 mt-1.5 text-[14px] font-medium leading-relaxed text-ink/85">{s.body}</p>
                  </div>
                </motion.li>
              )
            })}
          </motion.ul>

          <motion.a
            href={`tel:${CONTACT.phoneE164}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.32, ease: [0.23, 1, 0.32, 1] }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 flex items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(160deg,#f2453f,#d7151d_50%,#a90f16)] px-6 py-4 text-[16px] font-extrabold text-white no-underline shadow-[0_14px_28px_-12px_rgba(169,15,22,0.7)]"
          >
            <Phone className="size-[18px]" strokeWidth={2.4} />
            <span className="whitespace-nowrap">Call {CONTACT.phoneDisplay}</span>
          </motion.a>
          <p className="m-0 mt-3 text-center text-[13px] font-semibold text-ink/80">
            Jatin Kanubhai Shah · {CONTACT.addressShort}
          </p>
        </div>
      </div>
    </CardShell>
  )
}

export const args = {
  highlight: 'none',
}

export const argTypes = {
  highlight: { control: 'select', options: ['none', 'leasing', 'buying-selling', 'resale'] },
}

const SERVICES = [
  {
    id: 'leasing',
    icon: KeyRound,
    title: 'Property Leasing',
    body: 'Homes, offices and shops on rent — we shortlist, negotiate the terms and handle the agreement so you can move in without the paperwork.',
  },
  {
    id: 'buying-selling',
    icon: Handshake,
    title: 'Buying & Selling',
    body: 'Fair, well-researched pricing, verified titles and serious buyers. From the first site visit to registration, one person stays with you.',
  },
  {
    id: 'resale',
    icon: RefreshCcw,
    title: 'Resale',
    body: 'Ready-to-move resale flats, bungalows and plots across Rander Road and Surat, checked for documents and fairly valued.',
  },
]
