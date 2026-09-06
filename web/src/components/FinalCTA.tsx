import { motion } from 'framer-motion'
import { ArrowRight, Play, Download } from 'lucide-react'
import { ArchMotif } from './ui/ArchMotif'
import { Reveal } from './ui/Reveal'

export function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden py-28 md:py-40">
      {/* Saffron → green wash background */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron/12 via-cream to-indian-green/10" />
      {/* Craft silhouettes */}
      <ArchMotif className="absolute bottom-0 left-0 h-52 w-full text-navy opacity-[0.06]" />
      <ArchMotif className="absolute top-0 left-0 h-40 w-full -scale-y-100 text-navy opacity-[0.04]" />
      {/* Radial centers */}
      <div className="absolute left-1/4 top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-saffron/12 blur-3xl" />
      <div className="absolute right-1/4 bottom-0 h-80 w-80 translate-y-1/2 rounded-full bg-indian-green/12 blur-3xl" />

      <div className="container-shilp relative text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-saffron/25 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-saffron-dark backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
            Smart India Hackathon 2026
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="prose-display mx-auto mt-7 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-navy md:text-6xl">
            Every Craft Has a Story.
            <br />
            <span className="bg-gradient-to-r from-saffron to-indian-green bg-clip-text text-transparent">
              Every Artisan Deserves a Market.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-navy/80 md:text-lg">
            ShilpSetu bridges India’s traditional craftsmanship with the opportunities of the digital
            economy — one photo, one voice, one fair price at a time.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href="#how-it-works"
              whileHover={{ y: -2 }}
              className="group inline-flex items-center gap-2.5 rounded-full bg-navy px-8 py-4 text-sm font-semibold text-cream shadow-xl shadow-navy/25 transition-all duration-300 hover:bg-navy-light hover:shadow-glow-saffron"
            >
              Explore Prototype
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#home"
              whileHover={{ y: -2 }}
              className="group inline-flex items-center gap-2.5 rounded-full border border-navy/20 bg-white/70 px-8 py-4 text-sm font-semibold text-navy backdrop-blur transition-all duration-300 hover:border-saffron/40"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron/15 text-saffron-dark">
                <Play className="ml-0.5 h-3 w-3 fill-current" />
              </span>
              View Project
            </motion.a>
            <motion.a
              href="/shilpsetu.apk"
              download="ShilpSetu.apk"
              whileHover={{ y: -2 }}
              className="group inline-flex items-center gap-2.5 rounded-full border border-indian-green/30 bg-indian-green/10 px-8 py-4 text-sm font-semibold text-indian-green backdrop-blur transition-all duration-300 hover:border-indian-green/60 hover:bg-indian-green/20"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download App
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}