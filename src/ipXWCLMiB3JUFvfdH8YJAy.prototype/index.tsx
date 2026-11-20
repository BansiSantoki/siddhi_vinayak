import React, { useState } from 'react'

import VisitingCard from '../3B6ZKpybwHj7QvsRH2ZuDW.frame'
import Services from '../pwY9dXmbu7jVRGxXuWVjXW.frame'

const CARD = '3B6ZKpybwHj7QvsRH2ZuDW'
const SERVICES = 'pwY9dXmbu7jVRGxXuWVjXW'

/** The size every frame draws at, unless one exports its own. */
export const viewport = 'mobile'

export default function Prototype({ start }: { start?: string }) {
  const [screen, setScreen] = useState(() => start ?? CARD)

  if (screen === SERVICES) {
    return <Services highlight="none" onBack={() => setScreen(CARD)} />
  }
  return <VisitingCard state="default" onOpenServices={() => setScreen(SERVICES)} />
}
