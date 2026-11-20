import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, Mail, MapPin, Phone, UserRoundPlus, Check } from 'lucide-react'

import { SceneBackground } from '../shared/visiting-card/SceneBackground'
import { CardShell } from '../shared/visiting-card/CardShell'
import { BrandHeader } from '../shared/visiting-card/BrandHeader'
import { ContactCard } from '../shared/visiting-card/ContactCard'
import { CONTACT, downloadVcf } from '../shared/visiting-card/contact'

type Props = Partial<typeof args> & { onOpenServices?: () => void }

export default function VisitingCard(props: Props) {
  const { state, onOpenServices } = { ...args, ...props }
  const scrollRef = useRef<HTMLDivElement>(null)
  const [saved, setSaved] = useState(state === 'saved')

  useEffect(() => setSaved(state === 'saved'), [state])
  useEffect(() => {
    if (!saved || state === 'saved') return
    const t = setTimeout(() => setSaved(false), 2600)
    return () => clearTimeout(t)
  }, [saved, state])

  return (
    <CardShell>
      <SceneBackground showPin />

      <div ref={scrollRef} className="vc-scroll relative z-10 h-full overflow-y-auto overflow-x-hidden">
        <div className="flex min-h-full flex-col px-4 pb-36 pt-9 sm:px-5">
          <BrandHeader />

          {/* House stays visible between header and cards */}
          <div className="h-[max(9rem,calc(49vh-10.5rem))] shrink-0 sm:h-[max(9rem,calc(46vh-10.5rem))]" aria-hidden />

          <ul className="flex flex-col gap-3.5">
            <ContactCard
              entranceDelay={0.08}
              tone="red"
              icon={Phone}
              title="Contact Us Now"
              description={CONTACT.phoneDisplay}
              href={`tel:${CONTACT.phoneE164}`}
              descriptionClassName="!text-[clamp(15px,4.1cqw,17.5px)] tracking-[0.01em]"
            />
            <ContactCard
              entranceDelay={0.2}
              tone="navy"
              icon={Home}
              title="Our Real Estate Services"
              description="Property Leasing | Buying & Selling | Resale"
              onClick={onOpenServices}
            />
            <ContactCard
              entranceDelay={0.32}
              tone="red"
              icon={Mail}
              title="Email Us"
              description={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
              descriptionClassName="break-words"
            />
            <ContactCard
              entranceDelay={0.44}
              tone="navy"
              icon={MapPin}
              title="Our Location"
              description={CONTACT.addressShort}
              href={CONTACT.mapsUrl}
              external
            />
            <ContactCard
              entranceDelay={0.56}
              tone="red"
              icon={UserRoundPlus}
              title="Save Contact"
              description="Save Jatin Kanubhai Shah's Contact"
              onClick={() => {
                downloadVcf()
                setSaved(true)
              }}
            />
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {saved && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-x-4 bottom-6 z-30 mx-auto flex max-w-sm items-center gap-3 rounded-2xl bg-navy-deep/95 px-4 py-3 text-white shadow-[0_18px_40px_-12px_rgba(10,31,85,0.6)] backdrop-blur"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-red">
              <Check className="size-4" strokeWidth={3} />
            </span>
            <span className="min-w-0 text-[13.5px] font-semibold leading-snug">
              Contact file downloaded. Open it to add Jatin to your contacts.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </CardShell>
  )
}

export const args = {
  state: 'default',
}

export const argTypes = {
  state: { control: 'radio', options: ['default', 'saved'] },
}
