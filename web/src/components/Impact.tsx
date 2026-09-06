import { motion } from 'framer-motion'
import {
  Users,
  ShoppingBag,
  IndianRupee,
  Globe2,
  HandHeart,
  Landmark,
  Sparkles,
  ArrowDown,
} from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { CountUp } from './ui/CountUp'

const METRICS = [
  { value: 10, suffix: '+', label: 'Indian Languages', note: 'speech-native support' },
  { value: 60, suffix: '%', label: 'Potential Income Lift', note: 'fair pricing, direct sales' },
  { value: 100, suffix: '+', label: 'Craft Communities', note: 'aspirational reach' },
  { value: 24, suffix: 'm', label: 'Catalogue Time', note: 'photo + voice → ready listing' },
]

const JOURNEY = [
  { icon: Users, label: 'More Digital Inclusion', tone: 'text-saffron' },
  { icon: Sparkles, label: 'Better Product Visibility', tone: 'text-indian-green' },
  { icon: IndianRupee, label: 'Fair Pricing', tone: 'text-saffron' },
  { icon: Globe2, label: 'Expanded Market Access', tone: 'text-indian-green' },
  { icon: HandHeart, label: 'Higher Artisan Income', tone: 'text-navy' },
]

const STAKEHOLDERS = [
  { icon: Users, title: 'ARTISANS', desc: 'Easy digital adoption', tone: '#F47C20' },
  { icon: ShoppingBag, title: 'BUYERS', desc: 'Trusted handcrafted products', tone: '#138808' },
  { icon: Landmark, title: 'GOVERNMENT / MoSJE', desc: 'Demand and market insights', tone: '#0B1F3A' },
  { icon: Globe2, title: 'INDIAN CRAFT ECOSYSTEM', desc: 'Stronger digital presence', tone: '#F47C20' },
]

export function Impact() {
  return (
    <section id="impact" className="section-pad relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      <div className="pattern-mandala absolute -left-20 bottom-20 h-72 w-72 opacity-40" />

      <div className="container-shilp relative">
        <SectionHeading
          badge="Impact"
          title={
            <>
              Technology That <span className="text-indian-green">Empowers Craft.</span>
            </>
          }
          description="Aspirational outcomes — measured in livelihoods, not just downloads."
        />

        {/* Metric counters */}
        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <div className="group rounded-3xl border border-navy/8 bg-cream/50 p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-saffron/25 hover:bg-white hover:shadow-card">
                <p className="prose-display text-4xl font-semibold text-navy md:text-5xl">
                  <CountUp to={m.value} suffix={m.suffix} />
                </p>
                <p className="mt-2 text-sm font-bold text-navy">{m.label}</p>
                <p className="mt-1 text-xs text-navy/75">{m.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Outcome ladder */}
          <Reveal>
            <div className="flex h-full flex-col items-center justify-center gap-0">
              {JOURNEY.map((step, i) => (
                <div key={step.label} className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 rounded-2xl border border-navy/8 bg-white px-6 py-4 shadow-soft"
                  >
                    <step.icon className={`h-5 w-5 ${step.tone}`} />
                    <span className="text-sm font-bold text-navy md:text-base">
                      {i + 1}. {step.label}
                    </span>
                  </motion.div>
                  {i < JOURNEY.length - 1 && (
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className="py-1"
                    >
                      <ArrowDown className="h-4 w-4 text-saffron/60" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Ecosystem */}
          <div>
            <Reveal>
              <h3 className="prose-display text-2xl font-semibold text-navy">
                The Ecosystem We Strengthen
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-navy/80">
                ShilpSetu does not replace a single participant — it connects the entire craft economy.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {STAKEHOLDERS.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group relative h-full overflow-hidden rounded-3xl border border-navy/8 bg-cream/40 p-6 transition-colors duration-300 hover:bg-white"
                  >
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                      style={{ backgroundColor: s.tone }}
                    />
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-soft ring-1"
                      style={{ ['--tw-ring-color' as string]: `${s.tone}33` }}
                    >
                      <s.icon className="h-5 w-5" style={{ color: s.tone }} />
                    </div>
                    <h4 className="mt-4 text-base font-bold text-navy">{s.title}</h4>
                    <p className="mt-1.5 text-sm text-navy/75">{s.desc}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}