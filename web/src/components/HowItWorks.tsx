import { motion } from 'framer-motion'
import {
  Camera,
  ArrowDown,
  AudioLines,
  WandSparkles,
  ImagePlus,
  LineChart,
  PackageCheck,
  Building2,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

interface Stage {
  title: string
  icon: LucideIcon
  items: { label: string; note: string }[]
}

const STAGES: Stage[] = [
  {
    title: 'AI Catalog Generation',
    icon: WandSparkles,
    items: [
      { label: 'Title & Description', note: 'SEO-ready copy' },
      { label: 'Tags & Attributes', note: 'material · size · craft' },
    ],
  },
  {
    title: 'AI Image Enhancement',
    icon: ImagePlus,
    items: [
      { label: 'Professional Presentation', note: 'auto-background, light' },
    ],
  },
  {
    title: 'Live Market Search',
    icon: LineChart,
    items: [
      { label: 'Marketplace Intelligence', note: 'real-time pricing signal' },
    ],
  },
]

const INPUT = { title: 'Input', icon: Camera, items: [
  { label: 'Product Photo', note: 'any smartphone frame' },
  { label: 'Voice Description', note: 'speak in your language' },
] }

const AI = { title: 'AI Processing', icon: AudioLines, items: [
  { label: 'Speech-to-Text & Translation', note: 'Whisper + Bhashini' },
] }

const OUTPUT = { title: 'Output', icon: PackageCheck, items: [
  { label: 'Professional Product Images', note: '' },
  { label: 'SEO-ready Catalog', note: '' },
  { label: 'Price Recommendation', note: '' },
  { label: 'Digital Passport', note: 'of authenticity' },
] }

const MARKET = { title: 'Market Linkage', icon: Building2, items: [
  { label: 'Artisan Storefront', note: 'shareable link' },
  { label: 'PDF / WhatsApp Catalog', note: 'share-ready' },
  { label: 'B2B Inquiries', note: 'direct leads' },
  { label: 'ONDC / GeM', note: 'gov marketplaces' },
] }

function NodeCard({ title, icon: Icon, items, highlight }: { title: string; icon: LucideIcon; items: {label:string;note:string}[]; highlight?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-3xl border p-6 transition-shadow duration-300 ${
        highlight
          ? 'border-saffron/30 bg-white shadow-soft'
          : 'border-navy/8 bg-white shadow-soft'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
            highlight ? 'bg-saffron text-white' : 'bg-navy text-cream'
          }`}
        >
          <Icon className="h-5.5 w-5.5" />
        </div>
        <h4 className="font-bold text-navy">{title}</h4>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it.label} className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-navy/80">{it.label}</p>
              {it.note && <p className="text-xs text-navy/70">{it.note}</p>}
            </div>
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron/70" />
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad relative overflow-hidden bg-navy-darker">
      <div className="pattern-mandala-light absolute inset-0 opacity-60" />
      <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-saffron/10 blur-3xl" />
      <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-indian-green/10 blur-3xl" />

      <div className="container-shilp relative">
        <SectionHeading
          light
          badge="How ShilpSetu Works"
          title={
            <>
              A Quiet Pipeline Behind <span className="text-saffron-light">One Simple Photo.</span>
            </>
          }
          description="Five invisible stages transform raw craft into a market-ready digital identity — no technical skill required."
        />

        <div className="mt-20 flex flex-col items-center gap-4 lg:flex-row lg:items-stretch lg:gap-6">
          {/* INPUT */}
          <Reveal className="w-full lg:w-[22%]">
            <NodeCard title={INPUT.title} icon={INPUT.icon} items={INPUT.items} />
          </Reveal>

          <Connector label="AI Processing" />

          {/* AI PROCESSING */}
          <Reveal delay={0.1} className="w-full lg:w-[30%]">
            <div className="space-y-4">
              <NodeCard title={AI.title} icon={AI.icon} items={AI.items} highlight />
              <div className="grid gap-4">
                {STAGES.map((s) => (
                  <NodeCard key={s.title} title={s.title} icon={s.icon} items={s.items} />
                ))}
              </div>
            </div>
          </Reveal>

          <Connector />

          {/* OUTPUT + MARKET */}
          <Reveal delay={0.2} className="w-full lg:w-[40%]">
            <div className="grid gap-4 sm:grid-cols-2">
              <NodeCard title={OUTPUT.title} icon={OUTPUT.icon} items={OUTPUT.items} highlight />
              <NodeCard title={MARKET.title} icon={MARKET.icon} items={MARKET.items} />
            </div>
          </Reveal>
        </div>

        {/* Honest tag */}
        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-cream/80">
              <ArrowUpRight className="h-4 w-4 text-saffron" />
              From a bare photo + voice note to a sellable digital identity — in minutes.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Connector({ label }: { label?: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1 py-2 text-cream/75 lg:px-1">
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center"
      >
        <ArrowDown className="h-5 w-5 text-saffron lg:rotate-[-90deg]" />
        {label && (
          <span className="mt-2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider lg:-rotate-90">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  )
}