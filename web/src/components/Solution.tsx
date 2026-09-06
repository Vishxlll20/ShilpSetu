import { motion } from 'framer-motion'
import { Camera, Mic, Wand2, IndianRupee, Store, ArrowRight } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const STEPS = [
  {
    icon: Camera,
    step: '01',
    title: 'Capture',
    desc: 'Upload or capture a product photo — a phone snapshot is enough.',
    accent: '#F47C20',
  },
  {
    icon: Mic,
    step: '02',
    title: 'Speak',
    desc: 'Describe the product naturally in your own language.',
    accent: '#138808',
  },
  {
    icon: Wand2,
    step: '03',
    title: 'Create',
    desc: 'AI generates professional catalogs, tags and visuals.',
    accent: '#0B1F3A',
  },
  {
    icon: IndianRupee,
    step: '04',
    title: 'Price',
    desc: 'Live market intelligence suggests fair, defensible pricing.',
    accent: '#F47C20',
  },
  {
    icon: Store,
    step: '05',
    title: 'Sell',
    desc: 'Connect with buyers through digital channels and storefronts.',
    accent: '#138808',
  },
]

export function Solution() {
  return (
    <section id="solution" className="section-pad relative overflow-hidden bg-cream">
      <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-saffron/8 blur-3xl" />
      <div className="absolute left-0 bottom-20 h-72 w-72 rounded-full bg-indian-green/8 blur-3xl" />

      <div className="container-shilp relative">
        <SectionHeading
          badge="Our Solution"
          title={
            <>
              One Bridge. <span className="text-saffron">From Craft to Commerce.</span>
            </>
          }
          description="ShilpSetu transforms a simple photo and spoken description into a complete, professional, and market-ready digital product identity."
        />

        {/* Journey */}
        <div className="relative mt-20">
          {/* Animated connective line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[38px] hidden lg:block">
            <div className="relative mx-[4%] h-px bg-navy/10">
              <motion.div
                className="absolute left-0 top-1/2 h-full w-full -translate-y-1/2 bg-gradient-to-r from-saffron via-indian-green to-saffron"
                style={{ transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.4, ease: 'easeInOut' }}
              />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.12}>
                <div className="group flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.04 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex h-[76px] w-[76px] items-center justify-center rounded-3xl bg-white shadow-soft ring-1 ring-navy/5"
                  >
                    <step.icon className="h-8 w-8 transition-colors duration-300" style={{ color: step.accent }} />
                    <span
                      className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-md"
                      style={{ backgroundColor: step.accent }}
                    >
                      {step.step}
                    </span>
                    {/* hover glow */}
                    <div
                      className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30"
                      style={{ backgroundColor: step.accent }}
                    />
                  </motion.div>
                  <h3 className="mt-5 text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-navy/80">{step.desc}</p>

                  {/* Connector arrow on mobile */}
                  {i < STEPS.length - 1 && (
                    <ArrowRight className="mt-4 h-5 w-5 rotate-90 text-saffron/50 lg:hidden" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom loop note */}
        <Reveal delay={0.2}>
          <p className="mx-auto mt-16 max-w-md text-center text-sm leading-relaxed text-navy/70">
            The entire journey runs <span className="font-semibold text-navy">offline-first</span> and in the
            artisan’s language — complexity stays invisible, craft stays central.
          </p>
        </Reveal>
      </div>
    </section>
  )
}