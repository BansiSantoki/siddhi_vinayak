import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { ChevronRight, type LucideIcon } from 'lucide-react'

type Props = {
  tone: 'red' | 'navy'
  icon: LucideIcon
  title: string
  description: string
  href?: string
  external?: boolean
  onClick?: () => void
  descriptionClassName?: string
}

/** One row of the visiting card: glossy icon tile, divider, text, red arrow. */
export function ContactCard({ tone, icon: Icon, title, description, href, external, onClick, descriptionClassName = '' }: Props) {
  const Tag = href ? motion.a : motion.button
  const linkProps = href
    ? { href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : { type: 'button' as const }

  return (
    <motion.li variants={entrance} className="list-none">
      <Tag
        {...linkProps}
        onClick={onClick}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap="tap"
        variants={card}
        className="vc-card group relative flex w-full cursor-pointer items-center gap-2.5 overflow-hidden rounded-[26px] border border-white/80 bg-white/[0.88] py-3.5 pl-3 pr-3 text-left no-underline outline-none backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] focus-visible:ring-2 focus-visible:ring-navy/40 sm:pl-3.5"
      >
        {/* Inner sheen: glass edge at the top */}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[26px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.9),transparent)]" />
        {/* Hover shine sweep */}
        <span aria-hidden className="vc-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)]" />

        <motion.span
          variants={iconTile}
          className={`relative grid size-[clamp(50px,14.5cqw,60px)] shrink-0 place-items-center overflow-hidden rounded-[18px] text-white ${
            tone === 'red'
              ? 'bg-[linear-gradient(160deg,#f2453f_0%,#d7151d_48%,#a90f16_100%)] shadow-[0_8px_16px_-6px_rgba(169,15,22,0.65),inset_0_-3px_6px_rgba(0,0,0,0.18)]'
              : 'bg-[linear-gradient(160deg,#2c4f9e_0%,#13306f_50%,#0a1f55_100%)] shadow-[0_8px_16px_-6px_rgba(10,31,85,0.65),inset_0_-3px_6px_rgba(0,0,0,0.2)]'
          }`}
        >
          <span aria-hidden className="absolute inset-x-1 top-0.5 h-[45%] rounded-[14px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.45),rgba(255,255,255,0.04))]" />
          <Icon className="relative size-[46%]" strokeWidth={2.1} />
        </motion.span>

        <span aria-hidden className={`h-9 w-[2px] shrink-0 rounded-full ${tone === 'red' ? 'bg-brand-red' : 'bg-navy'}`} />

        <span className="relative ml-0.5 flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="whitespace-nowrap text-[clamp(14.5px,4cqw,18px)] font-extrabold leading-tight tracking-[-0.01em] text-navy">
            {title}
          </span>
          <span className={`text-[clamp(12.5px,3.5cqw,15px)] font-medium leading-snug text-ink ${descriptionClassName}`}>
            {description}
          </span>
        </span>

        <motion.span variants={arrow} className="relative shrink-0 text-brand-red">
          <ChevronRight className="size-6" strokeWidth={2.6} />
        </motion.span>
      </Tag>
    </motion.li>
  )
}

const EASE = [0.23, 1, 0.32, 1] as const

const entrance: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.48, ease: EASE },
  },
}

const card: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 10px 24px -14px rgba(15,42,110,0.35), 0 2px 6px -2px rgba(15,42,110,0.12)',
    transition: { duration: 0.2, ease: EASE },
  },
  hover: {
    y: -3,
    scale: 1.012,
    boxShadow: '0 22px 40px -16px rgba(15,42,110,0.45), 0 4px 10px -4px rgba(15,42,110,0.16)',
    transition: { duration: 0.22, ease: EASE },
  },
  tap: { scale: 0.975, y: 0, transition: { duration: 0.12, ease: EASE } },
}

const iconTile: Variants = {
  rest: { scale: 1, transition: { duration: 0.18, ease: EASE } },
  hover: { scale: 1.04, transition: { duration: 0.2, ease: EASE } },
  tap: { scale: 0.9, transition: { duration: 0.1, ease: EASE } },
}

const arrow: Variants = {
  rest: { x: 0, transition: { duration: 0.18, ease: EASE } },
  hover: { x: 4, transition: { duration: 0.2, ease: EASE } },
  tap: { x: 2, transition: { duration: 0.1, ease: EASE } },
}
