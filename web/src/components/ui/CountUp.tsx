import { animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CountUpProps {
  to: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
  className?: string
}

/** Animated number counter that starts when scrolled into view. */
export function CountUp({
  to,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1.8,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return

    const controls = animate(0, to, {
      duration,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate: (v) => {
        node.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, to, suffix, prefix, decimals, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}