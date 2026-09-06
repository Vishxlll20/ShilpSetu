import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import {
  Smartphone,
  HardDrive,
  RefreshCw,
  Server,
  BrainCircuit,
  Cloud,
  ChevronDown,
  Code2,
  Mic,
  Database,
  Layers,
  Boxes,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

/* ---- Architecture pipeline ---- */
const LAYERS = [
  { label: 'Mobile App', icon: Smartphone, note: 'React Native + Expo' },
  { label: 'Local Storage', icon: HardDrive, note: 'works offline, on-device' },
  { label: 'Sync Queue', icon: RefreshCw, note: 'reconnects automatically' },
  { label: 'Backend Server', icon: Server, note: 'API orchestration' },
  { label: 'AI Services + Market APIs', icon: BrainCircuit, note: 'catalog · pricing' },
  { label: 'Cloud Storage', icon: Cloud, note: 'secure asset hosting' },
]

/* ---- Tech categories (expandable) ---- */
interface Tech {
  category: string
  icon: LucideIcon
  blurb: string
  stack: { name: string; role: string }[]
}

const TECH: Tech[] = [
  {
    category: 'Frontend',
    icon: Code2,
    blurb: 'A fast, familiar mobile experience artisans can adopt in minutes.',
    stack: [
      { name: 'React Native + Expo', role: 'cross-platform app' },
      { name: 'TypeScript', role: 'type-safe codebase' },
    ],
  },
  {
    category: 'Backend',
    icon: Server,
    blurb: 'Lean services that tie every AI and market signal together.',
    stack: [
      { name: 'Node.js', role: 'runtime' },
      { name: 'Express', role: 'API layer' },
    ],
  },
  {
    category: 'AI',
    icon: BrainCircuit,
    blurb: 'Fast, low-cost LLM inference for catalogs, at Indian scale.',
    stack: [
      { name: 'Groq', role: 'fast inference' },
      { name: 'Whisper', role: 'speech-to-text' },
      { name: 'GPT OSS', role: 'catalog generation' },
    ],
  },
  {
    category: 'Language',
    icon: Mic,
    blurb: 'Speaking every artisan’s language, not just English.',
    stack: [{ name: 'Bhashini', role: 'Indian language support' }],
  },
  {
    category: 'Market Data',
    icon: Database,
    blurb: 'Real market signals to price fairly and sell confidently.',
    stack: [{ name: 'Tavily Search', role: 'marketplace intelligence' }],
  },
  {
    category: 'Infrastructure',
    icon: Boxes,
    blurb: 'A CI/CD pipeline that ships updates without downtime.',
    stack: [
      { name: 'Render', role: 'hosting' },
      { name: 'GitHub Actions', role: 'CI/CD' },
      { name: 'EAS Build', role: 'mobile builds' },
    ],
  },
]

export function Technology() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="technology" className="section-pad relative overflow-hidden bg-cream">
      <div className="absolute right-0 bottom-32 h-80 w-80 rounded-full bg-indian-green/8 blur-3xl" />

      <div className="container-shilp relative">
        <SectionHeading
          badge="Data & Technology Architecture"
          title={
            <>
              Simple to Use. <span className="text-saffron">Seriously Engineered Behind It.</span>
            </>
          }
          description="An offline-first, AI-assisted pipeline designed for low connectivity — no jargon, just how it fits together."
        />

        {/* Architecture pipeline */}
        <Reveal delay={0.1}>
          <div className="mt-16 -mx-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0">
            <div className="flex min-w-[820px] items-center justify-start gap-0 lg:min-w-0 lg:justify-center">
              {LAYERS.map((layer, i) => (
                <div key={layer.label} className="flex shrink-0 items-center">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group flex w-[150px] flex-col items-center gap-2 rounded-2xl border border-navy/8 bg-white px-4 py-5 text-center shadow-soft"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 transition-colors group-hover:bg-saffron/10">
                      <layer.icon className="h-5 w-5 text-navy" />
                    </div>
                    <p className="text-xs font-bold leading-tight text-navy">{layer.label}</p>
                    <p className="text-[10px] leading-tight text-navy/70">{layer.note}</p>
                  </motion.div>
                  {i < LAYERS.length - 1 && (
                    <motion.div
                      className="mx-1 flex w-8 items-center"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-saffron">
                        <path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Expandable tech categories */}
        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TECH.map((tech, i) => {
            const expanded = open === tech.category
            return (
              <Reveal key={tech.category} delay={(i % 3) * 0.08}>
                <div
                  className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                    expanded
                      ? 'border-saffron/30 bg-white shadow-card'
                      : 'border-navy/8 bg-white/60 hover:border-saffron/20'
                  }`}
                >
                  <button
                    onClick={() => setOpen(expanded ? null : tech.category)}
                    aria-expanded={expanded}
                    className="flex w-full items-center gap-4 p-6 text-left"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-cream">
                      <tech.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-saffron-dark">
                        <Layers className="h-3 w-3" /> {tech.stack.length} {tech.stack.length === 1 ? 'technology' : 'technologies'}
                      </p>
                      <h3 className="text-lg font-bold text-navy">{tech.category}</h3>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-navy/60 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-navy/5 px-6 pb-6 pt-4">
                          <p className="text-sm leading-relaxed text-navy/80">{tech.blurb}</p>
                          <ul className="mt-4 space-y-3">
                            {tech.stack.map((s) => (
                              <li key={s.name} className="flex items-center justify-between gap-3 text-sm">
                                <span className="font-semibold text-navy">{s.name}</span>
                                <span className="rounded-full bg-cream px-2.5 py-0.5 text-[11px] text-navy/75 ring-1 ring-navy/8">
                                  {s.role}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}