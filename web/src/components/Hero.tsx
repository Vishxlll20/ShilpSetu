import { motion } from 'framer-motion'
import { ArrowRight, Play, Download, Languages, Sparkles, Wifi, Store } from 'lucide-react'
import { FloatingCards, PhoneMockup } from './PhoneMockup'
import { ArchMotif } from './ui/ArchMotif'

const STATS = [
  { icon: Languages, label: '10+ Indian Languages' },
  { icon: Sparkles, label: 'AI-Powered Cataloging' },
  { icon: Wifi, label: 'Offline-First' },
  { icon: Store, label: 'Market Linked' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-cream pb-24 pt-32 md:pb-32 md:pt-40">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft radial glow */}
        <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(244,124,32,0.16),transparent_60%)]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(19,136,8,0.10),transparent_60%)]" />
        {/* Subtle dot pattern */}
        <div className="pattern-mandala absolute right-0 top-0 h-1/2 w-1/2 opacity-60" />
        <div className="pattern-mandala absolute bottom-0 left-0 h-1/3 w-1/2 opacity-40" />
        {/* Craft arch silhouettes — kept small so they don't overlap the stats row */}
        <ArchMotif className="absolute bottom-0 left-0 h-24 w-full text-navy opacity-[0.04]" />
      </div>

      <div className="container-shilp relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* LEFT */}
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-saffron/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-saffron-dark backdrop-blur">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-saffron animate-pulse" />
                AI-Powered Platform for Indian Artisans
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="prose-display mt-6 text-5xl font-semibold leading-[1.06] tracking-tight text-navy sm:text-6xl lg:text-[4.25rem]"
            >
              From Handmade to{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-saffron">Market-Ready.</span>
                <motion.span
                  className="absolute -bottom-2 left-0 z-0 h-3 w-full rounded-full bg-saffron/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.9, ease: 'easeOut' }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-xl text-base leading-relaxed text-navy/80 md:text-lg"
            >
              ShilpSetu transforms a simple product photo and voice description into a{' '}
              <span className="font-semibold text-navy">professional digital catalog</span>,{' '}
              <span className="font-semibold text-indian-green">fair price recommendation</span>, and
              direct market opportunity.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2.5 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-cream shadow-xl shadow-navy/20 transition-all duration-300 hover:bg-navy-light hover:shadow-glow-saffron"
              >
                Explore the Platform
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2.5 rounded-full border border-navy/15 bg-white/60 px-7 py-3.5 text-sm font-semibold text-navy backdrop-blur transition-all duration-300 hover:border-saffron/40 hover:bg-white"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron/15 text-saffron-dark transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-0.5 h-3 w-3 fill-current" />
                </span>
                See How It Works
              </a>
              <a
                href="/shilpsetu.apk"
                download="ShilpSetu.apk"
                className="group inline-flex items-center gap-2.5 rounded-full border border-indian-green/25 bg-indian-green/5 px-7 py-3.5 text-sm font-semibold text-indian-green backdrop-blur transition-all duration-300 hover:border-indian-green/50 hover:bg-indian-green/10"
              >
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                Download APK
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={item}
              className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-navy/8 pt-8 sm:grid-cols-4"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1.5">
                  <stat.icon className="h-5 w-5 text-saffron" />
                  <span className="text-xs font-semibold leading-snug text-navy/70">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            {/* Floating animation wrapper */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <PhoneMockup />
              <FloatingCards />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}