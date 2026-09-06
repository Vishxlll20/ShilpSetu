import { motion } from 'framer-motion'
import {
  Search,
  BookOpen,
  TrendingUp,
  FlaskConical,
  Lightbulb,
  ShieldCheck,
  Landmark,
  Building2,
  Globe2,
  Mic2,
  ScanEye,
  Tag,
  LineChart,
  CloudOff,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const FLOW = [
  { icon: Search, label: 'Problem Identification' },
  { icon: BookOpen, label: 'Literature & Market Study' },
  { icon: TrendingUp, label: 'Gap Analysis' },
  { icon: FlaskConical, label: 'Technology Exploration' },
  { icon: Lightbulb, label: 'Solution Design' },
  { icon: ShieldCheck, label: 'Validation & Feasibility' },
]

const REFS_GOV = [
  { icon: Landmark, label: 'Ministry of Social Justice & Empowerment' },
  { icon: Building2, label: 'Smart India Hackathon Problem Statement' },
  { icon: Globe2, label: 'ONDC', note: 'Open Network for Digital Commerce' },
  { icon: Building2, label: 'Government e-Marketplace (GeM)' },
  { icon: Mic2, label: 'Bhashini' },
]

const REFS_TECH = [
  { icon: Mic2, label: 'Multilingual Speech AI', note: 'Whisper + Indian low-resource ASR' },
  { icon: ScanEye, label: 'Computer Vision', note: 'product discovery & enhancement' },
  { icon: Tag, label: 'AI Product Cataloging', note: 'title, description, attributes' },
  { icon: LineChart, label: 'Market Pricing Analytics', note: 'live marketplace intelligence' },
  { icon: CloudOff, label: 'Offline-First Architecture', note: 'resilient rural connectivity' },
]

export function Research() {
  return (
    <section id="research" className="section-pad relative overflow-hidden bg-cream">
      <div className="absolute left-0 top-32 h-72 w-72 rounded-full bg-saffron/8 blur-3xl" />

      <div className="container-shilp relative">
        <SectionHeading
          badge="Research & References"
          title={
            <>
              Grounded in Study, <span className="text-saffron">Shaped by Reality.</span>
            </>
          }
          description="The problem, the evidence, and the technology — traced honestly from first question to working prototype."
        />

        {/* Research flow timeline */}
        <div className="relative mt-20">
          {/* horizontal line */}
          <div className="absolute left-0 right-0 top-5 hidden lg:block">
            <div className="h-px w-full bg-gradient-to-r from-saffron/30 via-navy/20 to-indian-green/30" />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {FLOW.map((step, i) => (
              <Reveal key={step.label} delay={i * 0.1}>
                <div className="group flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-navy/10 transition-colors group-hover:bg-saffron group-hover:ring-saffron"
                  >
                    <step.icon className="h-4.5 w-4.5 text-navy transition-colors group-hover:text-white" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[9px] font-bold text-cream">
                      {i + 1}
                    </span>
                  </motion.div>
                  <p className="mt-4 max-w-[140px] text-xs font-bold leading-snug text-navy">
                    {step.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Reference categories */}
        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          <ReferenceColumn
            title="Government & Ecosystem"
            desc="Policy context, open networks, and the mission this project serves."
            items={REFS_GOV}
            accent="#F47C20"
          />
          <ReferenceColumn
            title="Technology Research"
            desc="The research domains that shape how ShilpSetu works under the hood."
            items={REFS_TECH}
            accent="#138808"
          />
        </div>
      </div>
    </section>
  )
}

function ReferenceColumn({
  title,
  desc,
  items,
  accent,
}: {
  title: string
  desc: string
  items: { icon: LucideIcon; label: string; note?: string }[]
  accent: string
}) {
  return (
    <Reveal>
      <div className="h-full rounded-3xl border border-navy/8 bg-white p-8 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
          <h3 className="text-xl font-bold text-navy">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-navy/75">{desc}</p>
        <ul className="mt-6 space-y-2">
          {items.map((r) => (
            <li
              key={r.label}
              className="group flex items-center gap-4 rounded-2xl border border-transparent px-4 py-3 transition-all duration-200 hover:border-navy/8 hover:bg-cream"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${accent}14`, color: accent }}
              >
                <r.icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy">{r.label}</p>
                {r.note && <p className="text-xs text-navy/70">{r.note}</p>}
              </div>
              <ArrowRight className="h-4 w-4 text-navy/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-saffron" />
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}