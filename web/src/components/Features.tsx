import { motion } from 'framer-motion'
import {
  Sparkles,
  Mic,
  IndianRupee,
  Store,
  BadgeCheck,
  CloudOff,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

interface Feature {
  icon: LucideIcon
  title: string
  desc: string
  glow: string
  ring: string
}

const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: 'AI Product Studio',
    desc: 'Transform raw smartphone photos into professional product visuals — clean backgrounds, balanced light, catalog-ready framing.',
    glow: 'bg-saffron/25',
    ring: 'ring-saffron/30',
  },
  {
    icon: Mic,
    title: 'Multilingual Voice-to-Listing',
    desc: 'Artisans simply speak about their product while AI structures titles, descriptions and attributes — in their language.',
    glow: 'bg-indian-green/25',
    ring: 'ring-indian-green/30',
  },
  {
    icon: IndianRupee,
    title: 'Dynamic Pricing Assistant',
    desc: 'Market-aware pricing recommendations grounded in live marketplace intelligence — no more guesswork or under-pricing.',
    glow: 'bg-saffron/25',
    ring: 'ring-saffron/30',
  },
  {
    icon: Store,
    title: 'Artisan Digital Storefront',
    desc: 'A shareable storefront and professional product catalog that puts every artisan one link away from a buyer.',
    glow: 'bg-navy/20',
    ring: 'ring-navy/25',
  },
  {
    icon: BadgeCheck,
    title: 'Digital Passport of Authenticity',
    desc: 'Verifiable product certificates containing craft and provenance details — building buyer trust and product value.',
    glow: 'bg-indian-green/25',
    ring: 'ring-indian-green/30',
  },
  {
    icon: CloudOff,
    title: 'Offline-First Experience',
    desc: 'Save work locally and automatically sync when connectivity returns. Built for rural workshops and haats.',
    glow: 'bg-saffron/25',
    ring: 'ring-saffron/30',
  },
]

export function Features() {
  return (
    <section id="features" className="section-pad relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      <div className="pattern-mandala absolute right-0 top-24 h-72 w-72 opacity-40" />

      <div className="container-shilp relative">
        <SectionHeading
          badge="Core Features"
          title={
            <>
              Everything an Artisan Needs. <span className="text-saffron">Nothing They Don’t.</span>
            </>
          }
          description="Six capabilities, one guiding idea — remove every barrier between a skilled hand and a paying market."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group relative h-full overflow-hidden rounded-3xl border border-navy/8 bg-cream/40 p-8 transition-all duration-300 hover:border-transparent hover:bg-white hover:shadow-card"
              >
                {/* glow layer */}
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full ${f.glow} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-80`}
                />

                {/* large icon */}
                <div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ${f.ring} transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]`}
                >
                  <f.icon className="h-8 w-8 text-navy" />
                </div>

                <h3 className="relative mt-6 text-xl font-bold text-navy">{f.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-navy/80">{f.desc}</p>

                {/* expand-on-hover underline */}
                <div className="relative mt-6 h-0.5 w-0 rounded-full bg-gradient-to-r from-saffron to-indian-green transition-all duration-500 group-hover:w-full" />
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}