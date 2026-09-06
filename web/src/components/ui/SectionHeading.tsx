import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  badge: string
  title: ReactNode
  description?: string
  align?: 'center' | 'left'
  light?: boolean
}

export function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const aligned = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-5 ${aligned}`}>
      <Reveal>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${
            light
              ? 'border-white/15 bg-white/5 text-saffron-light'
              : 'border-saffron/20 bg-saffron/5 text-saffron-dark'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
          {badge}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`prose-display max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight md:text-5xl ${
            light ? 'text-cream' : 'text-navy'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={`max-w-2xl text-base leading-relaxed md:text-lg ${
              light ? 'text-cream/80' : 'text-navy/80'
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}