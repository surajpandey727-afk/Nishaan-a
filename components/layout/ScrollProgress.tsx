'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/** A one-pixel ivory hairline. The only persistent chrome besides the nav. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 180, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-ivory/50"
      aria-hidden
    />
  )
}
