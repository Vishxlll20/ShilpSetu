import { motion } from 'framer-motion'
import { Languages, Image as ImageIcon, IndianRupee, Store, WifiOff, ArrowDown, TrendingDown } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const CHALLENGES = [
  {
    icon: Languages,
    title: 'Digital & Language Barriers',
    desc: 'Communities juggle 100+ languages and dialects — yet digital tools speak only a handful, leaving most artisans unheard.',
    accent: 'from-saffron/10 to-saffron/0 text-saffron-dark',
  },
  {
    icon: ImageIcon,
    title: 'Poor Product Presentation',
    desc: 'Phone photos and raw descriptions weaken a product’s perceived value, hiding the craftsmanship buyers want to see.',
    accent: 'from-indian-green/10 to-indian-green/0 text-indian-green',
  },
  {
    icon: IndianRupee,
    title: 'Lack of Pricing Intelligence',
    desc: 'Without market awareness, artisans underprice their craft — losing income to intermediaries and guesswork.',
    accent: 'from-saffron/10 to-saffron/0 text-saffron-dark',
  },
  {
    icon: Store,
    title: 'Limited Market Access',
    desc: 'Pathways to ONDC, GeM and global buyers stay closed when products never reach a digital-first marketplace.',
    accent: 'from-navy/10 to-navy/0 text-navy',
  },
  {
    icon: WifiOff,
    title: 'Low Connectivity',
    desc: 'Rural workshops and haats operate on weak, intermittent networks that break always-online workflows.',
    accent: 'from-indian-green/10 to-indian-green/0 text-indian-green',
  },
]

export function Problem() {
  return (
    <section id="problem" className="section-pad relative overflow-hidden bg-white">
      {/* subtle top sep */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      <div className="pattern-mandala absolute -left-24 top-32 h-72 w-72 opacity-40" />

      <div className="container-shilp relative">
        <SectionHeading
          badge="The Problem"
          title={
            <>
              The <span className="text-saffron">Digital-to-Market</span> Gap
            </>
          }
          description="India's artisans create exceptional products but face a critical digital-to-market gap — limited digital literacy, language barriers, lack of pricing intelligence, poor product presentation, and weak market access keep handcrafted products from reaching the right buyers."
        />

        {/* Challenge cards */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-navy/8 bg-cream/50 p-7 transition-colors duration-300 hover:border-saffron/25 hover:bg-white"
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${c.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60`}
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-navy/5 group-hover:scale-105 transition-transform duration-300">
                  <c.icon className="h-6 w-6 text-saffron-dark" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{c.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-navy/80">{c.desc}</p>
              </motion.div>
            </Reveal>
          ))}

          {/* Filler cells for the visual connection (desktop 3-col grid) */}
          <Reveal delay={0.45} className="hidden lg:block">
            <div className="flex h-full min-h-[160px] items-center justify-center rounded-3xl border border-dashed border-navy/10 bg-cream/30">
              <p className="text-center text-xs font-medium italic text-navy/70">
                The gap is not the artisan —<br />it is the bridge.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Visual connection: ARTISAN → DIGITAL GAP → LOST MARKET */}
        <Reveal delay={0.2}>
          <div className="mt-20 flex flex-col items-center gap-0 sm:flex-row sm:items-stretch sm:gap-6">
            {/* Artisan */}
            <div className="flex w-full flex-col items-center gap-3 sm:w-auto">
              <Node label="ARTISAN" sub="World-class craft, zero digital presence" tone="saffron" />
            </div>

            {/* Connector */}
            <div className="flex items-center justify-center py-2 sm:px-2 sm:py-0">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="text-saffron"
              >
                <ArrowDown className="h-6 w-6 sm:rotate-[-90deg]" />
              </motion.div>
            </div>

            {/* Gap */}
            <div className="relative w-full sm:w-auto">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-darker to-navy-light px-8 py-6 ring-1 ring-white/10">
                <div className="pattern-mandala-light absolute inset-0" />
                <div className="relative flex flex-col items-center gap-2">
                  <TrendingDown className="h-6 w-6 text-saffron" />
                  <p className="prose-display text-lg font-semibold text-cream">DIGITAL GAP</p>
                  <p className="text-center text-xs text-cream/80">No language in common · no price signal · no channel</p>
                </div>
              </div>
            </div>

            {/* Connector */}
            <div className="flex items-center justify-center py-2 sm:px-2 sm:py-0">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="text-saffron"
              >
                <ArrowDown className="h-6 w-6 sm:rotate-[-90deg]" />
              </motion.div>
            </div>

            {/* Lost market */}
            <div className="flex w-full flex-col items-center gap-3 sm:w-auto">
              <div className="flex flex-col items-center gap-2 rounded-3xl border border-navy/8 bg-cream px-8 py-6 text-center">
                <span className="text-2xl">🔻</span>
                <p className="prose-display text-lg font-semibold text-navy/80">LOST MARKET OPPORTUNITIES</p>
                <p className="max-w-[240px] text-xs text-navy/75">Trade flows past, incomes plateau, craft fades online</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Node({ label, sub, tone }: { label: string; sub: string; tone: 'saffron' | 'green' }) {
  const styles =
    tone === 'saffron'
      ? 'border-saffron/25 text-saffron-dark'
      : 'border-indian-green/25 text-indian-green'
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`rounded-3xl border bg-white px-8 py-6 text-center shadow-soft ${styles}`}>
        <p className="prose-display text-lg font-semibold">{label}</p>
        <p className="mt-1 max-w-[220px] text-xs text-navy/75">{sub}</p>
      </div>
    </div>
  )
}