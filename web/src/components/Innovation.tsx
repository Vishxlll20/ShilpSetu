import { motion } from 'framer-motion'
import {
  AudioLines,
  MessageCircle,
  BadgeCheck,
  Map as Heatmap,
  CloudOff,
  Languages,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

interface Innovation {
  icon: LucideIcon
  title: string
  desc: string
  tag: string
  badge?: string
  tone: 'saffron' | 'green' | 'navy'
}

const INNOVATIONS: Innovation[] = [
  {
    icon: AudioLines,
    title: 'Hands-Free Voice Navigation',
    desc: 'Navigate the entire app by voice. Commands like "Mera stock dikhao" surface exactly what you asked for.',
    tag: 'Voice-Native UX',
    badge: '"Mera stock dikhao"',
    tone: 'saffron',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Business Bot',
    desc: 'Create catalogs directly through photo + voice on WhatsApp — no app install required for quick starts.',
    tag: 'Zero-Install',
    tone: 'green',
  },
  {
    icon: BadgeCheck,
    title: 'Digital Passport of Authenticity',
    desc: 'Bundles product image, voice snippet and craft details into a verifiable identity any buyer can trust.',
    tag: 'Trust Layer',
    tone: 'navy',
  },
  {
    icon: Heatmap,
    title: 'Predictive Demand Heatmaps',
    desc: 'Aggregates market intelligence to surface demand trends — decision-grade insight for MoSJE and artisans.',
    tag: 'Policy & Market Intel',
    tone: 'saffron',
  },
  {
    icon: CloudOff,
    title: 'Offline-First Sync Queue',
    desc: 'Designed for rural and low-connectivity environments — work persists locally, syncs the moment you reconnect.',
    tag: 'Resilient by Design',
    tone: 'green',
  },
  {
    icon: Languages,
    title: 'Bhashini Integration',
    desc: 'Supports Indian and low-resource languages alongside Whisper — the platform speaks Bharat, not just English.',
    tag: 'Inclusive AI',
    tone: 'navy',
  },
]

const TONES = {
  saffron: {
    dot: 'bg-saffron',
    chip: 'bg-saffron/10 text-saffron-dark border-saffron/20',
    glow: 'group-hover:from-saffron/20',
  },
  green: {
    dot: 'bg-indian-green',
    chip: 'bg-indian-green/10 text-indian-green border-indian-green/20',
    glow: 'group-hover:from-indian-green/20',
  },
  navy: {
    dot: 'bg-navy',
    chip: 'bg-navy/8 text-navy border-navy/15',
    glow: 'group-hover:from-navy/15',
  },
} as const

export function Innovation() {
  return (
    <section id="innovation" className="section-pad relative overflow-hidden bg-navy-darker">
      <div className="pattern-mandala-light absolute inset-0 opacity-50" />
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-saffron/40 to-transparent" />

      <div className="container-shilp relative">
        <SectionHeading
          light
          badge="Innovation & Uniqueness"
          title={
            <>
              Built Beyond <span className="text-saffron-light">Catalog Generation.</span>
            </>
          }
          description="Six differentiators that make ShilpSetu a market-access system, not just a catalog tool."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INNOVATIONS.map((item, i) => {
            const tone = TONES[item.tone]
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.1}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  {/* sheen on hover */}
                  <div
                    className={`pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r to-transparent ${tone.glow}`}
                  />

                  <div className="flex items-start justify-between">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <item.icon className="h-7 w-7 text-cream" />
                      <span className={`absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${tone.chip}`}>
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-cream">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/80">{item.desc}</p>

                  {item.badge && (
                    <div className="mt-5 flex items-center gap-2 rounded-xl border border-saffron/20 bg-saffron/8 px-4 py-2.5">
                      <AudioLines className="h-4 w-4 text-saffron" />
                      <span className="font-mono text-sm text-saffron-light italic">“{item.badge}”</span>
                    </div>
                  )}

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-cream/75 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Differentiator
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </motion.article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}